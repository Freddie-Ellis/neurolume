"""Local web server for the Neurolume viewer."""

from __future__ import annotations

import threading
import webbrowser
from pathlib import Path
from typing import Any

import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from .schema import Graph

_STATIC_DIR = Path(__file__).parent / "static"


def demo_graph() -> Graph:
    """Return the small graph used to verify the Phase 0 viewer."""
    return Graph(
        model={"name": "Neurolume demo", "framework": "demo", "total_params": 0},
        nodes=[
            {"id": "input", "type": "input", "label": "Input", "output_shape": [4]},
            {"id": "hidden", "type": "dense", "label": "Hidden", "input_shape": [4], "output_shape": [4]},
            {"id": "output", "type": "output", "label": "Output", "input_shape": [4], "output_shape": [2]},
        ],
        edges=[
            {"source": "input", "target": "hidden", "tensor_shape": [4]},
            {"source": "hidden", "target": "output", "tensor_shape": [2]},
        ],
    )


def create_app(graph: Graph | None = None) -> FastAPI:
    """Create the viewer application with an optional graph override."""
    app = FastAPI(title="Neurolume")
    current_graph = graph or demo_graph()

    @app.get("/api/graph")
    def get_graph() -> dict[str, Any]:
        return current_graph.model_dump(mode="json")

    @app.get("/", response_class=HTMLResponse)
    def index() -> str:
        index_file = _STATIC_DIR / "index.html"
        if index_file.exists():
            return index_file.read_text(encoding="utf-8")
        return _fallback_page()

    return app


def show(graph: Graph | None = None, *, port: int = 0, open_browser: bool = True) -> None:
    """Serve a graph locally and optionally open it in the default browser."""
    app = create_app(graph)
    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="info")
    server = uvicorn.Server(config)

    def run() -> None:
        server.run()

    thread = threading.Thread(target=run, daemon=True)
    thread.start()
    if open_browser:
        # Uvicorn chooses a port only after startup; a fixed default keeps the
        # Phase 0 API deterministic while later phases can add port discovery.
        url = f"http://127.0.0.1:{port or 8000}"
        webbrowser.open(url)


def show_demo() -> None:
    """Open the Phase 0 demo viewer."""
    show()


def _fallback_page() -> str:
    graph = demo_graph().model_dump_json()
    return f"""<!doctype html>
<html><head><meta charset="utf-8"><title>Neurolume demo</title>
<style>body{{margin:0;background:#06104a;color:#fff;font:16px sans-serif}}
main{{display:flex;justify-content:space-evenly;align-items:center;height:100vh}}
.column{{display:flex;flex-direction:column;gap:14px;align-items:center}}
.node{{width:18px;height:18px;border-radius:50%;background:#ddd;box-shadow:0 0 16px #a24dff}}
</style></head><body><main id="viewer"></main>
<script>const graph={graph};const viewer=document.querySelector('#viewer');
for (const node of graph.nodes) {{ const col=document.createElement('section');
col.className='column'; col.innerHTML=`<h2>${{node.label}}</h2>`;
for (let i=0;i<Math.min(node.output_shape[0]||2,4);i++) {{
const dot=document.createElement('span');dot.className='node';col.append(dot);}}
viewer.append(col);}}</script></body></html>"""
