"""The LeNet-style CNN from `cnn.py`, built in Keras.

Keras 3 can run on PyTorch, TensorFlow or JAX. TensorFlow has no wheels for
Python 3.14 yet, so this example uses the PyTorch backend unless KERAS_BACKEND
is already set. The backend must be chosen before Keras is imported.

A Keras model that starts with `keras.Input` knows its shapes, so no example
input is needed.
"""

import os

os.environ.setdefault("KERAS_BACKEND", "torch")

import keras  # noqa: E402
from keras import layers  # noqa: E402

import neurolume  # noqa: E402


def build_lenet() -> keras.Model:
    return keras.Sequential(
        [
            keras.Input((28, 28, 1)),  # Keras is channels-last; Neurolume shows 1 x 28 x 28
            layers.Conv2D(6, 5, padding="same", activation="relu"),
            layers.MaxPooling2D(2),
            layers.Conv2D(16, 5),
            layers.BatchNormalization(epsilon=1e-5),  # PyTorch's default epsilon, so the graphs match
            layers.ReLU(),
            layers.MaxPooling2D(2),
            layers.Flatten(),
            layers.Dense(120, activation="relu"),
            layers.Dropout(0.25),
            layers.Dense(84, activation="relu"),
            layers.Dense(10),
        ],
        name="LeNet",
    )


if __name__ == "__main__":
    neurolume.show(build_lenet())
