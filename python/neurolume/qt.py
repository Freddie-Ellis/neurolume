"""The viewer as a Qt widget, for embedding in a Qt app such as a QtPy training logger.

Needs ``qtpy`` and a Qt binding with QtWebEngine (PySide6, or PyQt6 plus
PyQt6-WebEngine). Import this module before creating the ``QApplication``:
Qt requires QtWebEngine to be loaded first.

    from neurolume.qt import NeurolumeWidget

    app = QApplication([])
    widget = NeurolumeWidget(model, (1, 28, 28))
    layout.addWidget(widget)

The widget runs the same local viewer server as ``neurolume.show`` (on its own
thread and a free port) and shows it in a ``QWebEngineView``, so the browser
and the widget are one UI.
"""

from __future__ import annotations

from typing import Any

from qtpy.QtCore import QUrl
from qtpy.QtWebEngineWidgets import QWebEngineView
from qtpy.QtWidgets import QFileDialog, QWidget

from .adapters import to_graph
from .live import Session, start
from .server import Viewer, _free_port, create_app


class NeurolumeWidget(QWebEngineView):
    """Shows ``model`` (or a ``System`` or ``Graph``); empty until given one. Takes the same options as ``show``."""

    def __init__(self, model: Any = None, sample: Any = None, parent: QWidget | None = None, **adapter_options: Any) -> None:
        super().__init__(parent)
        self.viewer: Viewer | None = None
        # The Settings > Export button downloads a file; a web view drops downloads unless asked where to save them.
        self.page().profile().downloadRequested.connect(self._save_download)
        # A child widget gets no closeEvent when its window closes, so stop the server with the widget instead.
        self.destroyed.connect(lambda: self.stop())
        if model is not None:
            self.set_model(model, sample, **adapter_options)

    def set_model(self, model: Any, sample: Any = None, **adapter_options: Any) -> None:
        """Show another model, replacing the current one."""
        graph = to_graph(model, sample, **adapter_options)
        self.stop()
        self.viewer = Viewer(create_app(graph), _free_port())
        self.setUrl(QUrl(self.viewer.url))

    def watch(self, model: Any, sample: Any = None, **options: Any) -> Session:
        """Show ``model`` while it trains, like ``neurolume.watch()`` (same options), and return the session to log to."""
        # The Qt app keeps running, so finish() never waits.
        session = start(model, sample, block_on_finish=False, **options)
        self.stop()
        self.viewer = session.viewer
        self.setUrl(QUrl(session.url))
        return session

    def stop(self) -> None:
        """Shut down the widget's viewer server (it also stops when the widget is destroyed)."""
        if self.viewer:
            self.viewer.stop()
            self.viewer = None

    def _save_download(self, download: Any) -> None:
        qt6 = hasattr(download, "downloadFileName")  # Qt 6 QWebEngineDownloadRequest; Qt 5 QWebEngineDownloadItem
        suggested = download.downloadFileName() if qt6 else download.path()
        path, _ = QFileDialog.getSaveFileName(self, "Save standalone HTML", suggested, "HTML files (*.html)")
        if not path:
            download.cancel()
            return
        if qt6:
            directory, _, name = path.replace("\\", "/").rpartition("/")
            download.setDownloadDirectory(directory)
            download.setDownloadFileName(name)
        else:
            download.setPath(path)
        download.accept()
