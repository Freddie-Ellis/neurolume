"""Shared test setup."""

import os

# Keras 3 picks its backend once, on first import. TensorFlow has no Python 3.14
# wheels yet, so the Keras tests run on the PyTorch backend unless told otherwise.
os.environ.setdefault("KERAS_BACKEND", "torch")
