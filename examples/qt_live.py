"""Live training inside a Qt window: a small logger with Start/Stop and the live viewer beside it.

Trains the regression model from `live_training.py` on a background thread, so
the window stays responsive; `log()` and `predictions()` are safe to call from
any thread. The viewer shows the run strip, the Training panel (overfitting
verdict, predictions vs truth, parameters) and the timeline, as in a browser.

Run with a Qt binding that has QtWebEngine installed, e.g.
``uv pip install qtpy PySide6``.
"""

import threading

from neurolume.qt import NeurolumeWidget  # before QApplication: Qt loads QtWebEngine first
from qtpy.QtCore import QTimer
from qtpy.QtWidgets import QApplication, QLabel, QMainWindow, QPushButton, QSplitter, QVBoxLayout, QWidget

import torch
from live_training import target
from torch import nn


def build_model() -> nn.Module:
    return nn.Sequential(nn.Linear(8, 128), nn.ReLU(), nn.Linear(128, 128), nn.ReLU(), nn.Linear(128, 1))


class Trainer:
    """The training loop, on its own thread; `step` and `running` are read by the window's timer."""

    def __init__(self, model: nn.Module, session, steps: int = 20000) -> None:
        self.model = model
        self.session = session
        self.steps = steps
        self.step = 0
        self.stopping = threading.Event()
        self.thread = threading.Thread(target=self.run, daemon=True)

    @property
    def running(self) -> bool:
        return self.thread.is_alive()

    def run(self) -> None:
        torch.manual_seed(0)
        x_train, x_val = torch.randn(200, 8), torch.randn(512, 8)
        y_train = target(x_train) + 0.8 * torch.randn(200, 1)
        y_val = target(x_val) + 0.8 * torch.randn(512, 1)
        model = self.model
        optimiser = torch.optim.Adam(model.parameters(), lr=5e-5)
        for self.step in range(self.steps):
            if self.stopping.is_set():
                break
            batch = torch.randint(0, 200, (32,))
            loss = nn.functional.mse_loss(model(x_train[batch]), y_train[batch])
            optimiser.zero_grad()
            loss.backward()
            optimiser.step()
            self.session.log(self.step, loss=loss)  # after backward(), so the parameter stats see the gradients
            if self.step % 100 == 0:
                with torch.no_grad():
                    predicted = model(x_val)
                self.session.log(self.step, split="val", loss=nn.functional.mse_loss(predicted, y_val))
                self.session.predictions(self.step, predicted, y_val)
        self.session.finish()  # in a widget this never blocks


def main() -> None:
    app = QApplication([])
    viewer = NeurolumeWidget(build_model(), (8,))  # the architecture until a run starts
    trainer: Trainer | None = None

    start, stop, status = QPushButton("Start training"), QPushButton("Stop"), QLabel("Not started")
    stop.setEnabled(False)

    def begin() -> None:
        nonlocal trainer
        model = build_model()
        session = viewer.watch(model, (8,), headline="loss")  # a fresh run each time, shown in the widget
        trainer = Trainer(model, session)
        trainer.thread.start()
        start.setEnabled(False)
        stop.setEnabled(True)

    def refresh() -> None:  # Qt widgets belong to the main thread, so the panel polls rather than being told
        if trainer is None:
            return
        status.setText(f"Step {trainer.step:,}" + ("" if trainer.running else " · finished"))
        if not trainer.running:
            start.setEnabled(True)
            stop.setEnabled(False)

    start.clicked.connect(begin)
    stop.clicked.connect(lambda: trainer and trainer.stopping.set())
    timer = QTimer()
    timer.timeout.connect(refresh)
    timer.start(250)

    panel = QWidget()
    layout = QVBoxLayout(panel)
    for widget in (QLabel("<b>Training logger</b>"), start, stop, status):
        layout.addWidget(widget)
    layout.addStretch()
    splitter = QSplitter()
    splitter.addWidget(panel)
    splitter.addWidget(viewer)
    splitter.setSizes([220, 1180])

    window = QMainWindow()
    window.setWindowTitle("Training logger · live")
    window.setCentralWidget(splitter)
    window.resize(1400, 900)
    window.show()
    app.exec()
    if trainer:
        trainer.stopping.set()


if __name__ == "__main__":
    main()
