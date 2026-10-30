"""Local web server for the Neurolume viewer."""

from __future__ import annotations

import asyncio
import re
import socket
import sys
import threading
import webbrowser
from pathlib import Path
from typing import Any

import tornado.web
import tornado.websocket

from .adapters import to_graph
from .export import standalone_page
from .schema import Graph

_STATIC_DIR = Path(__file__).parent / "static"


def demo_graph() -> Graph:
    """The demo network as a ready-made graph, for when torch is not installed.

    It mirrors what the torch adapter produces for ``neurolume.demo.demo_model()``
    (tests/test_demo.py checks this), minus the sampled weights.
    """
    dense = {"type": "dense", "label": "Linear"}

    def linear(node_id: str, inputs: int, outputs: int, activation: str) -> dict[str, Any]:
        params = {"in_features": inputs, "out_features": outputs, "bias": True}
        return {
            **dense,
            "id": node_id,
            "input_shape": [inputs],
            "output_shape": [outputs],
            "params": params,
            "param_count": inputs * outputs + outputs,
            "activation": activation,
        }

    nodes: list[dict[str, Any]] = [
        {"id": "input", "type": "input", "label": "Input", "output_shape": [8]},
        linear("hidden1", 8, 12, "relu"),
        linear("hidden2", 12, 12, "relu"),
        linear("hidden3", 12, 12, "relu"),
        linear("hidden4", 12, 12, "relu"),
        linear("scores", 12, 4, "softmax"),
        {"id": "output", "type": "output", "label": "Output", "input_shape": [4], "output_shape": [4]},
    ]
    edges = [
        {"source": source["id"], "target": target["id"], "tensor_shape": source["output_shape"]}
        for source, target in zip(nodes, nodes[1:])
    ]
    return Graph.model_validate(
        {
            "model": {
                "name": "DemoNet",
                "framework": "demo",
                "total_params": sum(node.get("param_count", 0) for node in nodes),
            },
            "nodes": nodes,
            "edges": edges,
        }
    )


class _GraphHandler(tornado.web.RequestHandler):
    def initialize(self, graph: Graph) -> None:
        self.graph = graph

    def get(self) -> None:
        self.set_header("Content-Type", "application/json")
        self.write(self.graph.model_dump_json())


class _ExportHandler(tornado.web.RequestHandler):
    """The standalone HTML file, as a download (the viewer's Settings > Export button); a live run's history goes in too."""

    def initialize(self, graph: Graph, run: Any) -> None:
        self.graph = graph
        self.run = run

    def get(self) -> None:
        name = re.sub(r"[^\w.-]+", "_", self.graph.model.name).strip("_") or "model"
        self.set_header("Content-Type", "text/html; charset=utf-8")
        self.set_header("Content-Disposition", f'attachment; filename="{name}.html"')
        self.write(standalone_page(self.graph, self.run))


class _SnapshotHandler(tornado.web.RequestHandler):
    """/api/run/weights?step=N: the run's weights at a step, for the viewer's timeline."""

    def initialize(self, run: Any) -> None:
        self.run = run

    def get(self) -> None:
        snapshot = self.run.snapshot(int(self.get_query_argument("step")))
        if snapshot is None:
            raise tornado.web.HTTPError(404)
        self.set_header("Content-Type", "application/json")
        self.write(snapshot.model_dump_json())


class _LiveSocket(tornado.websocket.WebSocketHandler):
    """/ws: live training updates from a ``neurolume.live.Run`` (only on servers started by ``watch()``)."""

    def initialize(self, run: Any) -> None:
        self.run = run

    def open(self) -> None:  # type: ignore[override]
        self.run.join(self)

    def on_close(self) -> None:
        self.run.leave(self)


class _IndexHandler(tornado.web.RequestHandler):
    def get(self) -> None:
        index_file = _STATIC_DIR / "index.html"
        self.write(index_file.read_text(encoding="utf-8") if index_file.exists() else _fallback_page())


def create_app(graph: Graph | None = None, run: Any = None) -> tornado.web.Application:
    """The viewer application: the page, its assets, the graph at /api/graph, the standalone file at
    /api/export and, with a ``run`` (from ``watch()`` or ``open_run()``), its updates at /ws and its
    weight snapshots at /api/run/weights."""
    graph = graph or demo_graph()
    live = [(r"/ws", _LiveSocket, {"run": run}), (r"/api/run/weights", _SnapshotHandler, {"run": run})] if run is not None else []
    return tornado.web.Application(
        [
            (r"/", _IndexHandler),
            (r"/api/graph", _GraphHandler, {"graph": graph}),
            (r"/api/export", _ExportHandler, {"graph": graph, "run": run}),
            (r"/assets/(.*)", tornado.web.StaticFileHandler, {"path": str(_STATIC_DIR / "assets")}),
            *live,
        ],
        log_function=lambda handler: None,  # no request log in the user's terminal
    )


class Viewer:
    """A running viewer server, on its own thread and event loop. Call :meth:`stop` to shut it down."""

    def __init__(self, app: tornado.web.Application, port: int) -> None:
        self.url = f"http://127.0.0.1:{port}"
        self._started = threading.Event()
        self._error: OSError | None = None
        self._loop: asyncio.AbstractEventLoop | None = None
        self._stopping: asyncio.Event | None = None
        self._thread = threading.Thread(target=lambda: asyncio.run(self._serve(app, port)), name="neurolume-server", daemon=True)
        self._thread.start()
        self._started.wait()
        if self._error:
            raise RuntimeError(f"the Neurolume server failed to start on port {port}") from self._error

    async def _serve(self, app: tornado.web.Application, port: int) -> None:
        try:
            server = app.listen(port, address="127.0.0.1")
        except OSError as error:
            self._error = error
            self._started.set()
            return
        self._loop = asyncio.get_running_loop()
        self._stopping = asyncio.Event()
        self._started.set()
        await self._stopping.wait()
        server.stop()

    def stop(self) -> None:
        if self._loop and self._stopping:
            self._loop.call_soon_threadsafe(self._stopping.set)
        self._thread.join(timeout=5)

    def wait(self) -> None:
        """Block until the server stops or the user presses Ctrl+C."""
        try:
            while self._thread.is_alive():
                self._thread.join(timeout=0.5)
        except KeyboardInterrupt:
            self.stop()

    def __repr__(self) -> str:
        return f"Viewer(url={self.url!r})"


def show(
    model: Any = None,
    sample: Any = None,
    *,
    port: int | None = None,
    open_browser: bool = True,
    block: bool | None = None,
    **adapter_options: Any,
) -> Viewer:
    """Visualise a model (or a ready-made Graph) in the browser.

    ``sample`` tells Neurolume what goes into the model, so it can measure each
    layer: the shape of one input without the batch dimension, like
    ``keras.Input`` (``show(model, (1, 28, 28))``), or real data such as an
    image batch, which also draws what each convolution outputs. PyTorch models
    need one; Keras models that start with ``keras.Input`` don't.

    The server runs on a background thread. By default ``show`` blocks until
    Ctrl+C when run as a script, and returns immediately in an interactive
    session such as a REPL or notebook. Pass ``block`` to override this.
    """
    graph = demo_graph() if model is None else to_graph(model, sample, **adapter_options)
    viewer = Viewer(create_app(graph), port or _free_port())
    print(f"Neurolume viewer running at {viewer.url}")
    if open_browser:
        webbrowser.open(viewer.url)

    if block is None:
        block = not _is_interactive()
    if block:
        print("Press Ctrl+C to stop.")
        viewer.wait()
    return viewer


def show_demo() -> None:
    """Open the viewer on the demo network, a small real PyTorch model.

    Without torch installed, it shows the same network from a ready-made graph.
    """
    try:
        from .demo import demo_input, demo_model

        model, sample = demo_model(), demo_input()
    except ImportError:
        print("torch is not installed, so the demo uses a ready-made graph. For the live model: pip install neurolume[torch]")
        show(block=True)
        return
    show(model, sample, block=True)


def _free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
        probe.bind(("127.0.0.1", 0))
        return int(probe.getsockname()[1])


def _is_interactive() -> bool:
    return hasattr(sys, "ps1") or bool(sys.flags.interactive) or "ipykernel" in sys.modules


def _fallback_page() -> str:
    """A tiny page used when the frontend bundle has not been built."""
    return """<!doctype html>
<html><head><meta charset="utf-8"><title>Neurolume</title>
<style>body{margin:0;background:#06104a;color:#fff;font:16px sans-serif}
main{display:flex;justify-content:space-evenly;align-items:center;height:100vh}
.column{display:flex;flex-direction:column;gap:14px;align-items:center}
.node{width:18px;height:18px;border-radius:50%;background:#ddd;box-shadow:0 0 16px #a24dff}
</style></head><body><main id="viewer"></main>
<script>fetch('/api/graph').then(r=>r.json()).then(graph=>{
const viewer=document.querySelector('#viewer');
for (const node of graph.nodes) { const col=document.createElement('section');
col.className='column'; const title=document.createElement('h2'); title.textContent=node.label; col.append(title);
const units=(node.output_shape||[]).reduce((a,b)=>a*b,1)||2;
for (let i=0;i<Math.min(units,8);i++) {
const dot=document.createElement('span');dot.className='node';col.append(dot);}
viewer.append(col);}});</script></body></html>"""
