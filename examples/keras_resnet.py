"""A small Keras ResNet built from nested models.

Each residual block is its own keras.Model, used as a layer. Neurolume opens
nested models up: the overview shows one card per block, and opening a block
shows its layers, with the skip connection (block input -> Add) drawn as an
arc under the panels.

Each block is built for the size of the maps it receives, so Neurolume can
show its shapes; a block made with keras.Input((None, None, 8)) would leave
the height and width unknown.
"""

import os

os.environ.setdefault("KERAS_BACKEND", "torch")

import keras

import neurolume
from neurolume.demo import sample_digit


def residual_block(shape: tuple[int, int, int], name: str) -> keras.Model:
    """conv -> conv, plus the block's input added back in: out = relu(x + F(x))."""
    channels = shape[-1]
    x = keras.Input(shape)
    y = keras.layers.Conv2D(channels, 3, padding="same", activation="relu")(x)
    y = keras.layers.Conv2D(channels, 3, padding="same")(y)
    y = keras.layers.Add()([x, y])
    return keras.Model(x, keras.layers.ReLU()(y), name=name)


def build_resnet() -> keras.Model:
    image = keras.Input((28, 28, 1))
    x = keras.layers.Conv2D(8, 3, padding="same", activation="relu", name="stem")(image)
    x = residual_block(x.shape[1:], "block1")(x)
    x = keras.layers.MaxPooling2D(2, name="pool")(x)
    x = residual_block(x.shape[1:], "block2")(x)
    x = keras.layers.GlobalAveragePooling2D(name="gap")(x)
    return keras.Model(image, keras.layers.Dense(10, name="classifier")(x), name="KerasResNet")


if __name__ == "__main__":
    keras.utils.set_random_seed(0)
    neurolume.show(build_resnet(), sample_digit().reshape(1, 28, 28, 1))
