"""The viewer embedded in a Qt window, as it would sit in a QtPy training logger.

Run with a Qt binding that has QtWebEngine installed, e.g.
``uv pip install qtpy PySide6``.
"""

from neurolume.qt import NeurolumeWidget  # before QApplication: Qt loads QtWebEngine first
from qtpy.QtWidgets import QApplication, QLabel, QMainWindow, QSplitter

from mlp import MLP
from nested_system import build_nested_system


def main() -> None:
    app = QApplication([])
    window = QMainWindow()
    window.setWindowTitle("Training logger")
    splitter = QSplitter()
    splitter.addWidget(QLabel("  Your logger's own panels go here  "))
    splitter.addWidget(NeurolumeWidget(build_nested_system()))
    splitter.setSizes([250, 1100])
    window.setCentralWidget(splitter)
    window.resize(1400, 850)
    window.show()
    app.exec()


if __name__ == "__main__":
    main()
