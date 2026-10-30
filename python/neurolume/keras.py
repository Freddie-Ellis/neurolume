"""Live training for Keras: a callback that does what ``watch()`` and ``log()`` do.

    model.fit(x, y, epochs=5, callbacks=[neurolume.keras.Live(x[:64])])

Opens the live viewer when training starts, logs every batch's metrics
(``loss``, ``accuracy``, ...) and each epoch's validation metrics as
``loss/val``, ``accuracy/val`` so they share a chart with the training ones.
Weights, gradients (torch backend) and parameter stats are read as for
PyTorch; with ``validation=(x, y)`` each epoch also shows predictions vs truth.
Importing this module imports Keras, so ``import neurolume`` never does.
"""

from __future__ import annotations

from typing import Any

import keras

from .live import Session, watch


class Live(keras.callbacks.Callback):
    """Show the model live while ``fit()`` trains it.

    ``sample`` is real data (a batch of inputs) or an input shape, as for
    ``show()``; the other
    options are ``watch()``'s. ``validation=(x, y)``: after each epoch the model
    predicts ``x`` and the viewer shows that against ``y`` (a scatter, or a
    confusion matrix for integer labels). To show the run in a Qt widget instead, pass the
    widget's session: ``Live(session=widget.watch(model, x))``. When ``fit()``
    ends the run is marked finished; in a script the viewer then stays up
    until Ctrl+C, unless ``block_on_finish=False``.
    """

    def __init__(
        self,
        sample: Any = None,
        *,
        validation: tuple[Any, Any] | None = None,
        session: Session | None = None,
        block_on_finish: bool | None = None,
        **options: Any,
    ) -> None:
        super().__init__()
        self.sample = sample
        self.validation = validation
        self.session = session
        self.options = options
        self.block_on_finish = block_on_finish
        self.step = 0

    def on_train_begin(self, logs: dict[str, Any] | None = None) -> None:
        if self.session is None:
            self.session = watch(self.model, self.sample, **self.options)

    def on_train_batch_end(self, batch: int, logs: dict[str, Any] | None = None) -> None:
        self.session.log(self.step, **(logs or {}))
        self.step += 1

    def on_epoch_end(self, epoch: int, logs: dict[str, Any] | None = None) -> None:
        validation = {f"{name[4:]}/val": value for name, value in (logs or {}).items() if name.startswith("val_")}
        if validation:
            self.session.log(self.step - 1, **validation)
        if self.validation is not None:
            x, y = self.validation
            self.session.predictions(self.step - 1, self.model.predict(x, verbose=0), y)

    def on_train_end(self, logs: dict[str, Any] | None = None) -> None:
        self.session.finish(block=self.block_on_finish)
