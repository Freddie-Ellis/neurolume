"""A small CNN that branches: a residual add and an Inception-style concat.

The layers run in one row, left to right. Edges that skip over layers are
drawn as arcs under the panels:

- the residual block adds its input back in (stem -> add), and
- two branches read the same maps (a 1x1 and a 3x3 conv) and are joined by
  torch.cat, so both arrive at the "concat" band.

All layers are direct children of the model, so it opens as one network
rather than an overview (compare examples/resnet.py).
"""

import torch
import torch.nn.functional as F
from torch import nn

import neurolume
from neurolume.demo import sample_digit


class Branches(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.stem = nn.Conv2d(1, 8, 3, padding=1)
        self.res_conv1 = nn.Conv2d(8, 8, 3, padding=1)
        self.res_conv2 = nn.Conv2d(8, 8, 3, padding=1)
        self.branch_1x1 = nn.Conv2d(8, 8, 1)
        self.branch_3x3 = nn.Conv2d(8, 8, 3, padding=1)
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(16 * 14 * 14, 10)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = F.relu(self.stem(x))
        x = F.relu(x + self.res_conv2(F.relu(self.res_conv1(x))))  # residual: add the input back in
        x = torch.cat([self.branch_1x1(x), self.branch_3x3(x)], dim=1)  # two branches side by side
        x = self.pool(x)
        return self.fc(torch.flatten(x, 1))


if __name__ == "__main__":
    torch.manual_seed(0)
    neurolume.show(Branches(), torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28))
