"""The demo network: a small real PyTorch classifier.

torch is imported inside the functions, not at the top of the module, so
`import neurolume` keeps working when torch is not installed.
"""

from __future__ import annotations

from collections import OrderedDict
from typing import TYPE_CHECKING

import numpy as np

if TYPE_CHECKING:
    import torch

INPUT_FEATURES = 8
HIDDEN_UNITS = 12
HIDDEN_LAYERS = 4
CLASSES = 4



def demo_model() -> torch.nn.Module:
    """Build the demo classifier: 8 inputs, four hidden layers of 12, 4 class scores.

    The weights are seeded, so the demo looks the same every time.
    """
    import torch
    from torch import nn

    class DemoNet(nn.Sequential):
        """A small fully connected classifier."""

    torch.manual_seed(0)
    layers: OrderedDict[str, nn.Module] = OrderedDict()
    width = INPUT_FEATURES
    for index in range(1, HIDDEN_LAYERS + 1):
        layers[f"hidden{index}"] = nn.Linear(width, HIDDEN_UNITS)
        layers[f"relu{index}"] = nn.ReLU()
        width = HIDDEN_UNITS
    layers["scores"] = nn.Linear(width, CLASSES)
    layers["softmax"] = nn.Softmax(dim=1)
    return DemoNet(layers)


def demo_input() -> torch.Tensor:
    """A batch of one example with the shape the demo network expects."""
    import torch

    return torch.randn(1, INPUT_FEATURES)


# A "7" as strokes between points in a 28 x 28 image (x, y from the top left).
_SEVEN = [((6.5, 7.0), (21.0, 7.0)), ((21.0, 7.0), (12.0, 23.0)), ((10.0, 15.0), (19.0, 15.0))]


def sample_digit(size: int = 28) -> np.ndarray:
    """A handwritten-looking "7" as a float32 image in [0, 1], MNIST style (white on black).

    Feeding a CNN a real-looking picture, instead of random noise, makes the
    feature maps the viewer draws on each layer worth looking at. Built from a
    few anti-aliased strokes, so no dataset download is needed.
    """
    scale = size / 28
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32) + 0.5
    distance = np.full((size, size), np.inf, dtype=np.float32)
    for (x0, y0), (x1, y1) in _SEVEN:
        x0, y0, x1, y1 = (value * scale for value in (x0, y0, x1, y1))
        # Distance from every pixel to the stroke's line segment.
        dx, dy = x1 - x0, y1 - y0
        t = np.clip(((xs - x0) * dx + (ys - y0) * dy) / (dx * dx + dy * dy), 0, 1)
        distance = np.minimum(distance, np.hypot(xs - (x0 + t * dx), ys - (y0 + t * dy)))
    return np.clip(1.6 * scale - distance + 0.5, 0, 1).astype(np.float32)  # strokes about 3 px wide
