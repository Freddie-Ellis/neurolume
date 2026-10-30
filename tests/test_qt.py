import json
import os
import urllib.request

import pytest

pytest.importorskip("qtpy.QtWebEngineWidgets")
os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")

# isort: off
from neurolume.qt import NeurolumeWidget  # noqa: E402  (QtWebEngine before QApplication)
from neurolume.server import demo_graph  # noqa: E402
from qtpy.QtWidgets import QApplication  # noqa: E402
# isort: on


def test_widget_serves_its_model_and_swaps_it() -> None:
    app = QApplication.instance() or QApplication([])
    widget = NeurolumeWidget(demo_graph())
    first = widget.viewer
    assert first and widget.url().toString() == first.url
    with urllib.request.urlopen(first.url + "/api/graph") as response:
        assert json.loads(response.read())["model"]["name"] == demo_graph().model.name

    widget.set_model(demo_graph())  # replaces the server
    assert widget.viewer is not first
    widget.stop()
    assert widget.viewer is None
    widget.deleteLater()
    app.processEvents()


def test_widget_watch_streams_a_live_run() -> None:
    app = QApplication.instance() or QApplication([])
    widget = NeurolumeWidget()
    session = widget.watch(demo_graph())
    assert widget.viewer is session.viewer and widget.url().toString() == session.url
    with urllib.request.urlopen(session.url + "/api/graph") as response:
        assert json.loads(response.read())["live"] is True
    session.log(0, loss=1.0)
    session.finish()  # never blocks inside a Qt app
    widget.stop()
    widget.deleteLater()
    app.processEvents()
