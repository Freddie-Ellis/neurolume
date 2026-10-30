"""Live training: ``neurolume.watch()`` shows a model while it trains.

    live = neurolume.watch(model, sample)
    for step, batch in enumerate(loader):
        loss = train_step(batch)
        live.log(step, loss=loss.item())
    live.finish()

The viewer is the same as ``show()``'s, plus a run strip, and it only gets live
code when the graph says ``live``. ``log()`` runs on the training thread and
never blocks: it records the point and asks the server thread to send new
points in a batch, at most every ``FLUSH_SECONDS``. For PyTorch models it also
reads the model at most every ``every_seconds``: the drawn connections' weights
and gradients (the edges brighten and fade as it learns) and stats about all
its parameters together (``LiveStats``). ``predictions()`` shows what the
model predicts next to the truth. Each reading is kept (thinned to
``READINGS_KEPT``), so the viewer's timeline can scrub back through the run
and ``Session.save()`` / ``open_run()`` can keep it as a file.
"""

from __future__ import annotations

import asyncio
import base64
import gzip
import math
import threading
import time
import webbrowser
from collections.abc import Callable
from pathlib import Path
from typing import Any

import numpy as np

from .adapters import to_graph
from .adapters.base import detect_framework
from .schema import Graph, LiveHello, LiveLayout, LiveMetrics, LivePredictions, LiveStats, LiveStatus, LiveWeights, MetricPoint, ParamStats, RunState, SavedRun
from .server import Viewer, _free_port, _is_interactive, create_app
from .system import SEPARATOR, System

FLUSH_SECONDS = 0.25
# (predicted, true) pairs kept from a regression's predictions() call.
MAX_PREDICTIONS = 1000
# Classes in a confusion matrix, at most.
MAX_CLASSES = 50
# Readings (weights + stats) kept for the timeline; past this, every other one is dropped (oldest first).
READINGS_KEPT = 200
# Snapshots in an exported page, which has to carry them all.
EXPORT_SNAPSHOTS = 50
# Feature maps are redrawn at most this often (a whole forward pass and trace of the sample),
# and less often if needed to keep them under MAPS_SHARE of the time (ResNet-18 on a CPU: ~65 ms).
MAPS_SECONDS = 2.0
MAPS_SHARE = 0.02


class Run:
    """A training run's history, shared with every viewer connected to the server's /ws."""

    def __init__(self, graph: Graph, headline: str | None = None, layout: LiveLayout | None = None) -> None:
        self.graph = graph
        self.headline = headline
        self.layout = layout or LiveLayout()
        self.stats: list[LiveStats] = []
        self.snapshots: list[LiveWeights] = []  # the weights at each stats reading's step
        self._stats_pending: list[LiveStats] = []
        self.state: RunState = "running"
        self.points: list[MetricPoint] = []
        self.predictions: LivePredictions | None = None  # only the latest matters
        self._predictions_pending = False
        self._pending: list[MetricPoint] = []
        self._weights_pending = False
        self._lock = threading.Lock()
        self._sockets: set[Any] = set()  # tornado WebSocketHandlers, used on the server thread only
        self._loop: asyncio.AbstractEventLoop | None = None
        self._scheduled = False

    # Training thread.

    def add(self, point: MetricPoint) -> None:
        with self._lock:
            self.points.append(point)
            self._pending.append(point)
            self._schedule()

    @classmethod
    def from_saved(cls, saved: SavedRun) -> Run:
        run = cls(saved.graph, saved.hello.headline, saved.hello.layout)
        run.state = "finished"  # whatever it was when saved, nothing is training it now
        run.points, run.stats, run.snapshots = saved.hello.points, saved.hello.stats, saved.snapshots
        run.predictions = saved.hello.predictions
        return run

    @property
    def weights(self) -> LiveWeights | None:
        """The latest weights (all a live viewer needs)."""
        return self.snapshots[-1] if self.snapshots else None

    def set_weights(self, weights: LiveWeights, stats: LiveStats) -> None:
        with self._lock:
            self.snapshots.append(weights)
            self._weights_pending = True
            self.stats.append(stats)
            self._stats_pending.append(stats)
            if len(self.stats) > READINGS_KEPT:
                # Every other one, counted back from the newest; both lists alike, so their steps stay paired.
                self.stats, self.snapshots = self.stats[::-2][::-1], self.snapshots[::-2][::-1]
            self._schedule()

    def set_predictions(self, predictions: LivePredictions) -> None:
        with self._lock:
            self.predictions = predictions
            self._predictions_pending = True
            self._schedule()

    def finish(self) -> None:
        with self._lock:
            self.state = "finished"
            self._schedule()

    def _schedule(self) -> None:
        """Ask the server thread to flush soon (once per batch). Call with the lock held."""
        if self._loop and not self._scheduled and not self._loop.is_closed():
            self._scheduled = True
            self._loop.call_soon_threadsafe(self._loop.call_later, FLUSH_SECONDS, self._flush)

    # Any thread.

    def hello(self) -> LiveHello:
        with self._lock:
            return LiveHello(
                state=self.state,
                headline=self.headline,
                points=list(self.points),
                weights=self.weights,
                stats=list(self.stats),
                layout=self.layout,
                predictions=self.predictions,
            )

    def snapshot(self, step: int) -> LiveWeights | None:
        """The weights at ``step``, or the latest snapshot before it, with the latest maps by then (for the timeline)."""
        with self._lock:
            before = [snapshot for snapshot in self.snapshots if snapshot.step <= step]
        maps = next((snapshot.maps for snapshot in reversed(before) if snapshot.maps), {})
        return before[-1].model_copy(update={"maps": maps}) if before else None

    def saved(self, snapshots: int | None = None) -> SavedRun:
        """The run as a file; with ``snapshots``, only that many, evenly spread (and the stats read with them)."""
        hello = self.hello()
        with self._lock:
            kept = list(self.snapshots)
        if snapshots is not None and len(kept) > snapshots:
            keep = {round(i * (len(kept) - 1) / (snapshots - 1)) for i in range(snapshots)}
            kept = [snapshot for i, snapshot in enumerate(kept) if i in keep]
            steps = {snapshot.step for snapshot in kept}
            hello.stats = [reading for reading in hello.stats if reading.step in steps]
        return SavedRun(graph=self.graph, hello=hello, snapshots=kept)

    # Server thread.

    def join(self, socket: Any) -> None:
        self._loop = asyncio.get_running_loop()
        self._flush()  # viewers already here get what's pending first; the newcomer gets it in its hello
        with self._lock:
            self._stats_pending = []  # in the hello
            self._predictions_pending = False
        socket.write_message(self.hello().model_dump_json())
        self._sockets.add(socket)

    def leave(self, socket: Any) -> None:
        self._sockets.discard(socket)

    def _flush(self) -> None:
        with self._lock:
            points, self._pending = self._pending, []
            weights = self.weights if self._weights_pending else None
            self._weights_pending = False
            stats, self._stats_pending = self._stats_pending, []
            predictions = self.predictions if self._predictions_pending else None
            self._predictions_pending = False
            self._scheduled = False
            state = self.state
        messages = [LiveMetrics(points=points).model_dump_json()] if points else []
        if weights:
            messages.append(weights.model_dump_json())
        messages += [reading.model_dump_json() for reading in stats]
        if predictions:
            messages.append(predictions.model_dump_json())
        if state == "finished":
            messages.append(LiveStatus(state=state).model_dump_json())
        for socket in list(self._sockets):
            for message in messages:
                socket.write_message(message)


class Session:
    """What ``watch()`` returns: log metrics with :meth:`log`, end with :meth:`finish`."""

    def __init__(
        self,
        run: Run,
        viewer: Viewer,
        sample_model: Callable[[int], dict[str, Any]] | None = None,
        every_seconds: float = 0.5,
        block_on_finish: bool | None = None,
        read_maps: Callable[[], dict[str, Any]] | None = None,
    ) -> None:
        self.run = run
        self.viewer = viewer
        self.url = viewer.url
        self._sample_model = sample_model
        self._read_maps = read_maps
        self._maps_at = -math.inf
        self._maps_cost = 0.0
        self._every_seconds = every_seconds
        self._sampled_at = -math.inf
        self._sampled_step: int | None = None
        self._block_on_finish = block_on_finish

    def log(self, step: int, split: str | None = None, network: str | None = None, **values: Any) -> None:
        """Record metrics for ``step``: numbers, or 0-d tensors (``loss=loss`` works without ``.item()``).

        ``split="val"`` records them as ``loss/val``, drawn on one chart with the
        training ``loss``, and compared with it (the gap, overfitting). In a
        System, ``network="critic"`` records ``loss/critic``.
        """
        suffix = "".join(f"/{part}" for part in (network, split) if part)
        # .item() reads a tensor without autograd's warning about tensors that still need grad.
        clean = {f"{name}{suffix}": float(value.item() if hasattr(value, "item") else value) for name, value in values.items()}
        self.run.add(MetricPoint(step=int(step), values={k: v if math.isfinite(v) else None for k, v in clean.items()}))
        now = time.monotonic()
        # One reading per step at most (Keras logs validation at the last batch's step).
        if self._sample_model and now - self._sampled_at >= self._every_seconds and step != self._sampled_step:
            self._sampled_at, self._sampled_step = now, step
            reading = self._sample_model(int(step))
            maps = {}
            if self._read_maps and now - self._maps_at >= max(MAPS_SECONDS, self._every_seconds, self._maps_cost / MAPS_SHARE):
                self._maps_at = now
                started = time.monotonic()
                maps = self._read_maps()
                self._maps_cost = time.monotonic() - started
            weights = LiveWeights(
                step=int(step),
                layers={node_id: _encode(values) for node_id, values in reading["weights"].items()},
                gradients={node_id: _encode(values) for node_id, values in reading["gradients"].items()},
                maps=maps,
            )
            networks = {name: ParamStats(**_finite(stats)) for name, stats in reading["stats"].items()}
            self.run.set_weights(weights, LiveStats(step=int(step), networks=networks))

    def predictions(self, step: int, predicted: Any, target: Any) -> None:
        """Show what the model predicts next to the truth, e.g. on a validation batch (latest call wins).

        Integer ``target`` labels with ``predicted`` scores per class (or labels)
        give a confusion matrix; anything else is regression, drawn as predicted
        against true for every output (the first ``MAX_PREDICTIONS``). Tensors or arrays.
        """
        self.run.set_predictions(_predictions(int(step), _numpy(predicted), _numpy(target)))

    def finish(self, block: bool | None = None) -> None:
        """Mark the run finished. The viewer stays up; in a script this waits for Ctrl+C so you can keep looking."""
        self.run.finish()
        block = self._block_on_finish if block is None else block
        if block is None:
            block = not _is_interactive()
        if block:
            print(f"Training finished. The viewer is still at {self.url}; press Ctrl+C to stop.")
            self.viewer.wait()

    def save(self, path: str | Path) -> Path:
        """Write the run so far (metrics, stats, weight snapshots and the graph) to a file for ``open_run()``."""
        return save_run(self.run.saved(), path)

    def stop(self) -> None:
        """Shut down the viewer server."""
        self.viewer.stop()

    def __enter__(self) -> Session:
        return self

    def __exit__(self, *exc: object) -> None:
        self.finish(block=False if exc[0] else None)


def start(
    model: Any,
    sample: Any = None,
    *,
    headline: str | None = None,
    pinned: list[str] | None = None,
    charts: list[str | list[str]] | None = None,
    every_seconds: float = 0.5,
    port: int | None = None,
    block_on_finish: bool | None = None,
    **adapter_options: Any,
) -> Session:
    """The graph (marked live), its run, a server for both and the session; ``watch()`` and the Qt widget open it."""
    graph = to_graph(model, sample, **adapter_options).model_copy(update={"live": True})
    layout = LiveLayout(pinned=pinned or [], charts=[[chart] if isinstance(chart, str) else list(chart) for chart in charts or []])
    run = Run(graph, headline, layout)
    viewer = Viewer(create_app(graph, run), port or _free_port())
    return Session(run, viewer, _model_sampler(model, graph, sample), every_seconds, block_on_finish, _maps_reader(model, graph, sample))


def watch(
    model: Any,
    sample: Any = None,
    *,
    headline: str | None = None,
    pinned: list[str] | None = None,
    charts: list[str | list[str]] | None = None,
    every_seconds: float = 0.5,
    port: int | None = None,
    open_browser: bool = True,
    **adapter_options: Any,
) -> Session:
    """Show ``model`` while it trains and return a :class:`Session` to log metrics to.

    Takes the same ``sample`` and options as ``show()``. ``headline`` picks the
    metric shown large in the run strip (default ``loss`` if you log one); you
    can switch it in the viewer, which remembers your choice per model.
    ``pinned`` metrics sit beside it, and ``charts`` sets the metrics drawer's
    charts (a name, or a list of names drawn together); other metrics get a
    chart each, grouped by the prefix before ``/``. Choices made in the viewer
    win. ``every_seconds`` is how often ``log()`` reads the weights, gradients
    and layer stats; call ``log()`` after ``backward()`` so it sees gradients.
    """
    session = start(
        model, sample, headline=headline, pinned=pinned, charts=charts, every_seconds=every_seconds, port=port, **adapter_options
    )
    print(f"Neurolume live viewer running at {session.url}")
    if open_browser:
        webbrowser.open(session.url)
    return session


def save_run(saved: SavedRun, path: str | Path) -> Path:
    """A saved run as gzipped JSON (``.nlrun``)."""
    target = Path(path)
    target.write_bytes(gzip.compress(saved.model_dump_json().encode("utf-8")))
    return target


def open_run(path: str | Path, *, port: int | None = None, open_browser: bool = True, block: bool | None = None) -> Viewer:
    """Show a run saved with ``Session.save()``: the network, its charts and the timeline, as they were.

    Blocks like ``show()``: until Ctrl+C in a script, not in a REPL or notebook.
    """
    saved = SavedRun.model_validate_json(gzip.decompress(Path(path).read_bytes()))
    viewer = Viewer(create_app(saved.graph, Run.from_saved(saved)), port or _free_port())
    print(f"Neurolume viewer running at {viewer.url}")
    if open_browser:
        webbrowser.open(viewer.url)
    if block if block is not None else not _is_interactive():
        print("Press Ctrl+C to stop.")
        viewer.wait()
    return viewer


def _model_sampler(model: Any, graph: Graph, sample: Any) -> Callable[[int], dict[str, Any]] | None:
    """Reads weights, gradients and parameter stats of a PyTorch or Keras model, or of every network in a System.

    Stats come keyed by network: the model's name, or each System network's name.
    """
    if isinstance(model, System):
        parts = _per_network(model, _model_sampler)

        def read_all(step: int) -> dict[str, Any]:
            merged: dict[str, Any] = {"weights": {}, "gradients": {}, "stats": {}}
            for name, read in parts.items():
                reading = read(step)
                for key in ("weights", "gradients"):
                    merged[key].update({f"{name}{SEPARATOR}{node_id}": value for node_id, value in reading[key].items()})
                merged["stats"][name] = next(iter(reading["stats"].values()))
            return merged

        return read_all if parts else None
    try:
        framework = detect_framework(model)
    except TypeError:
        return None  # a ready-made Graph: nothing to read
    if framework == "keras":
        from .adapters.keras_adapter import live_sampler as keras_sampler

        read = keras_sampler(model, graph)
    else:
        from .adapters.torch_adapter import live_sampler

        read = live_sampler(model, graph.weights or {})

    def read_one(step: int) -> dict[str, Any]:
        reading = read(step)
        return {**reading, "stats": {graph.model.name: reading["stats"]}}

    return read_one


def _maps_reader(model: Any, graph: Graph, sample: Any) -> Callable[[], dict[str, Any]] | None:
    """Redraws the graph's feature maps (PyTorch models given real data, also in a System; None otherwise)."""
    if isinstance(model, System):
        parts = _per_network(model, _maps_reader)
        return (lambda: {f"{name}{SEPARATOR}{node_id}": maps for name, read in parts.items() for node_id, maps in read().items()}) if parts else None
    try:
        if not graph.feature_maps or detect_framework(model) != "pytorch":
            return None
    except TypeError:
        return None  # a System or a Graph
    from .adapters.torch_adapter import live_maps

    return live_maps(model, sample, {node_id: maps.channels for node_id, maps in graph.feature_maps.items()})


def _per_network(system: System, reader: Callable[[Any, Graph, Any], Any]) -> dict[str, Any]:
    """``reader`` for each network of a System that has one; their ids get the network's prefix in the System's graph."""
    parts = {name: reader(model, system._networks[name], sample) for name, (model, sample) in system._models.items()}
    return {name: part for name, part in parts.items() if part is not None}


def _numpy(values: Any) -> np.ndarray:
    """A tensor (any framework) or array-like as a numpy array, detached and on the CPU."""
    if hasattr(values, "detach"):
        values = values.detach().cpu()
    return np.asarray(values)


def _predictions(step: int, predicted: np.ndarray, target: np.ndarray) -> LivePredictions:
    if np.issubdtype(target.dtype, np.integer):
        scores = predicted.ndim == target.ndim + 1  # one score per class: the prediction is the highest
        labels = predicted.argmax(-1) if scores else predicted.astype(np.int64)
        classes = min(MAX_CLASSES, predicted.shape[-1] if scores else int(max(labels.max(), target.max())) + 1)
        matrix = np.zeros((classes, classes), dtype=np.int64)
        keep = (target.ravel() < classes) & (labels.ravel() < classes)
        np.add.at(matrix, (target.ravel()[keep], labels.ravel()[keep]), 1)
        return LivePredictions(step=step, kind="classification", matrix=matrix.tolist())
    if predicted.size != target.size:
        raise ValueError(f"predictions(): {predicted.size} predicted values but {target.size} targets; pass matching shapes")
    pairs = np.stack([predicted.ravel(), target.ravel()]).astype(np.float64)[:, :MAX_PREDICTIONS]
    pairs = pairs[:, np.isfinite(pairs).all(0)]
    return LivePredictions(step=step, kind="regression", predicted=pairs[0].tolist(), target=pairs[1].tolist())


def _finite(stats: dict[str, Any]) -> dict[str, Any]:
    """Non-finite numbers as None (JSON has no NaN); `finite` already says the weights went bad."""
    return {key: None if isinstance(value, float) and not math.isfinite(value) else value for key, value in stats.items()}


def _encode(values: Any) -> str:
    """A numpy array as base64 little-endian float32, the encoding LiveWeights documents."""
    return base64.b64encode(values.astype("<f4").tobytes()).decode("ascii")
