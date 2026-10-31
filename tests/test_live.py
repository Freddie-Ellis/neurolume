import asyncio
import base64
import json
import math
import urllib.request

import numpy
import pytest
from tornado.websocket import websocket_connect

import neurolume
from neurolume.server import demo_graph


async def _messages(url: str, session: neurolume.Session) -> list[dict]:
    """Connect like the viewer does, log while connected, finish, and collect what arrives."""
    socket = await websocket_connect(url.replace("http", "ws") + "/ws")
    received = [json.loads(await socket.read_message())]  # hello
    session.log(2, loss=0.5, reward=math.nan)
    session.log(3, loss=0.25)
    session.finish(block=False)
    while received[-1]["type"] != "status":
        received.append(json.loads(await asyncio.wait_for(socket.read_message(), 5)))
    socket.close()
    return received


def test_watch_streams_history_metrics_and_finish() -> None:
    session = neurolume.watch(demo_graph(), headline="loss", open_browser=False)
    try:
        session.log(1, loss=1.0)  # before any viewer connects: arrives in the hello
        with urllib.request.urlopen(session.url + "/api/graph") as response:
            assert json.loads(response.read())["live"] is True
        hello, *rest = asyncio.run(_messages(session.url, session))
    finally:
        session.stop()

    assert hello == {"type": "hello", "state": "running", "headline": "loss", "points": [{"step": 1, "values": {"loss": 1.0}}], "weights": None, "stats": [], "layout": {"pinned": [], "charts": []}, "predictions": None}
    points = [point for message in rest if message["type"] == "metrics" for point in message["points"]]
    assert points == [{"step": 2, "values": {"loss": 0.5, "reward": None}}, {"step": 3, "values": {"loss": 0.25}}]
    assert rest[-1] == {"type": "status", "state": "finished"}


def test_plain_viewers_are_not_live() -> None:
    viewer = neurolume.show(demo_graph(), open_browser=False, block=False)
    try:
        with urllib.request.urlopen(viewer.url + "/api/graph") as response:
            assert json.loads(response.read())["live"] is False
    finally:
        viewer.stop()


async def _first_weights(url: str, session: neurolume.Session) -> dict:
    socket = await websocket_connect(url.replace("http", "ws") + "/ws")
    await socket.read_message()  # hello
    session.log(0, loss=1.0)  # the first log() always reads the weights
    while True:
        message = json.loads(await asyncio.wait_for(socket.read_message(), 5))
        if message["type"] == "weights":
            socket.close()
            return message


def test_watch_streams_the_drawn_connections_weights() -> None:
    torch = pytest.importorskip("torch")
    model = torch.nn.Sequential(torch.nn.Linear(4, 3), torch.nn.ReLU(), torch.nn.Linear(3, 2))
    session = neurolume.watch(model, (4,), open_browser=False)
    try:
        with urllib.request.urlopen(session.url + "/api/graph") as response:
            samples = json.loads(response.read())["weights"]
        with torch.no_grad():
            model[0].weight.mul_(2)  # training moved the weights after the graph was made
        message = asyncio.run(_first_weights(session.url, session))
    finally:
        session.stop()

    assert set(message["layers"]) == set(samples) == {"0", "2"}
    values = numpy.frombuffer(base64.b64decode(message["layers"]["0"]), dtype="<f4")
    expected = [model[0].weight[out, inp].item() for inp, out, _ in samples["0"]["pairs"]]
    assert values.tolist() == pytest.approx(expected)


def test_param_stats_describe_the_whole_model() -> None:
    torch = pytest.importorskip("torch")
    from neurolume.adapters.torch_adapter import live_sampler

    model = torch.nn.Sequential(torch.nn.Linear(4, 3), torch.nn.ReLU(), torch.nn.Linear(3, 2))
    read = live_sampler(model, {})
    optimiser = torch.optim.SGD(model.parameters(), lr=0.1)

    def train_step() -> None:
        optimiser.zero_grad()
        model(torch.randn(8, 4)).sum().backward()
        optimiser.step()

    first = read(0)["stats"]
    assert first["grad_norm"] is None and first["update_ratio"] is None  # no backward() yet, nothing to compare with
    everything = torch.cat([p.detach().flatten() for p in model.parameters()])
    assert first["weight_norm"] == pytest.approx(float(everything.norm()))
    assert len(first["percentiles"]) == 9 and first["percentiles"] == sorted(first["percentiles"])
    assert first["percentiles"][0] >= float(everything.min()) and first["percentiles"][-1] <= float(everything.max())
    train_step()
    second = read(2)["stats"]
    assert second["grad_norm"] > 0 and second["update_ratio"] > 0
    with torch.no_grad():
        model[2].weight[0, 0] = float("nan")
    broken = read(3)["stats"]
    assert broken["finite"] is False and broken["weight_norm"] is None and broken["percentiles"] == []


def test_update_ratio_is_estimated_from_the_param_sample() -> None:
    torch = pytest.importorskip("torch")
    from neurolume.adapters.torch_adapter import live_sampler

    torch.manual_seed(0)
    model = torch.nn.Sequential(torch.nn.Linear(256, 256), torch.nn.ReLU(), torch.nn.Linear(256, 64))
    read = live_sampler(model, {}, param_sample=5000)
    read(0)
    before = torch.cat([p.detach().flatten() for p in model.parameters()])
    with torch.no_grad():
        for param in model.parameters():
            param.add_(0.01 * torch.randn_like(param))
    after = torch.cat([p.detach().flatten() for p in model.parameters()])
    exact = float((after - before).norm() / before.norm()) / 4
    reading = read(4)["stats"]
    assert reading["update_ratio"] == pytest.approx(exact, rel=0.1)  # 5,000 of ~82,000 values estimate it well


def test_splits_and_predictions() -> None:
    session = neurolume.watch(demo_graph(), open_browser=False)
    try:
        session.log(0, loss=1.0)
        session.log(0, split="val", loss=1.5)
        session.predictions(0, numpy.array([[1.0], [2.0]]), numpy.array([[1.5], [2.5]]))
        regression = session.run.predictions
        logits = numpy.array([[0.9, 0.1], [0.2, 0.8], [0.7, 0.3]])
        session.predictions(1, logits, numpy.array([0, 1, 1]))
    finally:
        session.stop()
    assert [p.values for p in session.run.points] == [{"loss": 1.0}, {"loss/val": 1.5}]
    assert regression.kind == "regression" and regression.predicted == [1.0, 2.0] and regression.target == [1.5, 2.5]
    assert session.run.predictions.kind == "classification"
    assert session.run.predictions.matrix == [[1, 0], [1, 1]]  # rows: true class, columns: predicted


def test_keras_callback_streams_batches_validation_weights_and_health() -> None:
    keras = pytest.importorskip("keras")
    model = keras.Sequential([keras.Input((4,)), keras.layers.Dense(3, activation="relu"), keras.layers.Dense(2)], name="tiny")
    model.compile("sgd", "mse")
    x = numpy.random.default_rng(0).random((32, 4), dtype="float32")
    live = neurolume.keras.Live(x, validation=(x[:8], x[:8, :2]), open_browser=False, block_on_finish=False, every_seconds=0)
    model.fit(x, x[:, :2], batch_size=8, epochs=2, validation_split=0.25, verbose=0, callbacks=[live])
    run = live.session.run
    try:
        assert run.state == "finished"
        assert [p.step for p in run.points if "loss" in p.values] == list(range(6))  # 3 batches a epoch, counted across epochs
        assert [p.step for p in run.points if "loss/val" in p.values] == [2, 5]
        kernel = keras.ops.convert_to_numpy(model.layers[0].kernel)
        with urllib.request.urlopen(live.session.url + "/api/graph") as response:
            pairs = json.loads(response.read())["weights"][model.layers[0].name]["pairs"]
        values = numpy.frombuffer(base64.b64decode(run.weights.layers[model.layers[0].name]), dtype="<f4")
        assert values.tolist() == pytest.approx([kernel[inp, out] for inp, out, _ in pairs])
        stats = run.stats[-1].networks["tiny"]
        assert stats.grad_norm > 0 and stats.update_ratio > 0  # torch backend: gradients too
        assert run.predictions.kind == "regression" and len(run.predictions.predicted) == 16  # validation=(x, y), 8 rows x 2
    finally:
        live.session.stop()


def test_history_scrubs_saves_reopens_and_exports(tmp_path, monkeypatch) -> None:
    torch = pytest.importorskip("torch")
    from neurolume import live

    monkeypatch.setattr(live, "READINGS_KEPT", 4)
    model = torch.nn.Sequential(torch.nn.Linear(4, 3), torch.nn.ReLU(), torch.nn.Linear(3, 2))
    session = neurolume.watch(model, (4,), open_browser=False, every_seconds=0)
    try:
        for step in range(6):
            with torch.no_grad():
                model[0].weight.add_(1)
            session.log(step, loss=1 / (step + 1))
        run = session.run
        # Thinned in pairs, newest kept, so every timeline step has its weights.
        assert [s.step for s in run.stats] == [w.step for w in run.snapshots] == [0, 2, 4, 5]
        with urllib.request.urlopen(session.url + "/api/run/weights?step=3") as response:
            assert json.loads(response.read())["step"] == 2  # the latest snapshot at or before step 3
        path = session.save(tmp_path / "run.nlrun")
        page = neurolume.export_html(session, path=tmp_path / "run.html").read_text(encoding="utf-8")
    finally:
        session.stop()

    viewer = neurolume.open_run(path, open_browser=False, block=False)
    try:
        with urllib.request.urlopen(viewer.url + "/api/graph") as response:
            assert json.loads(response.read())["live"] is True
        hello = asyncio.run(_hello(viewer.url))
        assert hello["state"] == "finished" and len(hello["points"]) == 6 and len(hello["stats"]) == 4
        with urllib.request.urlopen(viewer.url + "/api/run/weights?step=5") as response:
            assert json.loads(response.read())["layers"] == run.snapshots[-1].layers
    finally:
        viewer.stop()
    assert "window.__NEUROLUME_RUN__ = " in page and '"live":true' in page


async def _hello(url: str) -> dict:
    socket = await websocket_connect(url.replace("http", "ws") + "/ws")
    hello = json.loads(await socket.read_message())
    socket.close()
    return hello


def test_feature_maps_refresh_on_the_same_channels() -> None:
    torch = pytest.importorskip("torch")
    from neurolume.demo import sample_digit

    torch.manual_seed(0)
    model = torch.nn.Sequential(torch.nn.Conv2d(1, 4, 3), torch.nn.ReLU(), torch.nn.Flatten(), torch.nn.Linear(4 * 26 * 26, 2))
    image = torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28)
    session = neurolume.watch(model, image, open_browser=False, every_seconds=0)
    try:
        first = session.run.graph.feature_maps["0"]
        with torch.no_grad():
            model[0].weight.mul_(-1)  # what the conv responds to flips
        session.log(0, loss=1.0)
        maps = session.run.snapshots[-1].maps["0"]
        session.log(1, loss=1.0)  # too soon for another drawing
        with urllib.request.urlopen(session.url + "/api/run/weights?step=1") as response:
            assert json.loads(response.read())["maps"]["0"] == maps.model_dump()  # the timeline carries the latest
    finally:
        session.stop()
    assert maps.channels == first.channels and maps.data != first.data
    assert session.run.snapshots[-1].maps == {}


def test_systems_read_every_network_and_log_per_network() -> None:
    torch = pytest.importorskip("torch")
    actor = torch.nn.Sequential(torch.nn.Linear(4, 3), torch.nn.ReLU(), torch.nn.Linear(3, 2))
    critic = torch.nn.Sequential(torch.nn.Linear(6, 1))
    system = neurolume.System("Agent")
    a, c = system.add("actor", actor, (4,)), system.add("critic", critic, (6,))
    system.connect(a, c)
    session = neurolume.watch(system, open_browser=False)
    try:
        session.log(0, network="critic", loss=0.5)
        session.log(0, reward=1.0)
        graph_weights = session.run.graph.weights
    finally:
        session.stop()
    assert [point.values for point in session.run.points] == [{"loss/critic": 0.5}, {"reward": 1.0}]
    assert set(session.run.snapshots[0].layers) == set(graph_weights) == {"actor/0", "actor/2", "critic/0"}
    assert set(session.run.stats[0].networks) == {"actor", "critic"}


def test_nested_systems_keep_every_inner_network() -> None:
    torch = pytest.importorskip("torch")
    inner = neurolume.System("Detector")
    encoder = inner.add("encoder", torch.nn.Sequential(torch.nn.Linear(4, 3)), (4,))
    head = inner.add("head", torch.nn.Sequential(torch.nn.Linear(3, 2)), (3,))
    inner.connect(encoder, head)
    outer = neurolume.System("Plant")
    outer.add("camera_net", torch.nn.Sequential(torch.nn.Linear(6, 2)), (6,))
    outer.add("detector", inner)
    session = neurolume.watch(outer, open_browser=False)
    try:
        session.log(0, network="detector", loss=1.0)
        graph_weights = set(session.run.graph.weights)
    finally:
        session.stop()
    assert set(session.run.stats[0].networks) == {"camera_net", "detector/encoder", "detector/head"}
    assert set(session.run.snapshots[0].layers) == graph_weights == {"camera_net/0", "detector/encoder/0", "detector/head/0"}
