"""The Keras MLP from `keras_mlp.py`, trained live with the `neurolume.keras.Live` callback.

The data is synthetic (ten noisy 28x28 templates, one per class), so it runs
anywhere without a download. Validation metrics show as `loss/val`, on the
same chart as `loss`, and `validation=` adds a confusion matrix each epoch.
"""

import os

os.environ.setdefault("KERAS_BACKEND", "torch")

import keras  # noqa: E402
import numpy as np  # noqa: E402

import neurolume  # noqa: E402
from keras_mlp import build_mlp  # noqa: E402


def main(epochs: int = 20) -> None:
    rng = np.random.default_rng(0)
    templates = rng.random((10, 28, 28, 1)).astype("float32")
    labels = rng.integers(0, 10, 6000)
    images = templates[labels] + rng.normal(0, 3.0, (6000, 28, 28, 1)).astype("float32")

    model = build_mlp()
    model.compile(optimizer="adam", loss=keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=["accuracy"])
    live = neurolume.keras.Live(images[:64], validation=(images[-600:], labels[-600:]))  # validation_split takes the last 10%
    model.fit(images, labels, epochs=epochs, batch_size=64, validation_split=0.1, verbose=0, callbacks=[live])


if __name__ == "__main__":
    main()
