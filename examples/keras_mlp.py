"""The 784-512-256-10 MLP from `mlp.py`, built in Keras (see keras_cnn.py for the backend note)."""

import os

os.environ.setdefault("KERAS_BACKEND", "torch")

import keras  # noqa: E402
from keras import layers  # noqa: E402

import neurolume  # noqa: E402


def build_mlp() -> keras.Model:
    return keras.Sequential(
        [
            keras.Input((28, 28, 1)),
            layers.Flatten(),
            layers.Dense(512, activation="relu"),
            layers.Dropout(0.2),
            layers.Dense(256, activation="relu"),
            layers.Dense(10),
        ],
        name="MLP",
    )


if __name__ == "__main__":
    neurolume.show(build_mlp())
