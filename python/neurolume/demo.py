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


def live_demo(steps: int = 20000) -> None:
    """Train a small regression model live (``examples/live_training.py``): it overfits after about 6,000 steps."""
    import torch
    from torch import nn

    from .live import watch

    def target(x: torch.Tensor) -> torch.Tensor:
        return torch.sin(2 * x[:, :1]) + x[:, 1:2] * x[:, 2:3] - 0.5 * x[:, 3:4] ** 2

    torch.manual_seed(0)
    x_train, x_val = torch.randn(200, 8), torch.randn(512, 8)
    y_train, y_val = target(x_train) + 0.8 * torch.randn(200, 1), target(x_val) + 0.8 * torch.randn(512, 1)
    model = nn.Sequential(nn.Linear(8, 128), nn.ReLU(), nn.Linear(128, 128), nn.ReLU(), nn.Linear(128, 1))
    optimiser = torch.optim.Adam(model.parameters(), lr=5e-5)
    with watch(model, (8,)) as live:
        for step in range(steps):
            batch = torch.randint(0, 200, (32,))
            loss = nn.functional.mse_loss(model(x_train[batch]), y_train[batch])
            optimiser.zero_grad()
            loss.backward()
            optimiser.step()
            live.log(step, loss=loss)
            if step % 100 == 0:
                with torch.no_grad():
                    predicted = model(x_val)
                live.log(step, split="val", loss=nn.functional.mse_loss(predicted, y_val))
                live.predictions(step, predicted, y_val)


def main() -> None:
    """The ``neurolume-demo`` command: the demo network, or ``--live`` to watch a model train."""
    import sys

    from .server import show_demo

    if "--live" not in sys.argv[1:]:
        show_demo()
        return
    try:
        import torch  # noqa: F401
    except ImportError:
        sys.exit('The live demo trains a PyTorch model: pip install "neurolume[torch]"')
    live_demo()
