"""The demo network: a small real PyTorch classifier.

torch is imported inside the functions, not at the top of the module, so
`import neurolume` keeps working when torch is not installed.
"""

from __future__ import annotations

from collections import OrderedDict
from typing import TYPE_CHECKING

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
