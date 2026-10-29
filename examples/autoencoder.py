"""One PyTorch module made of sub-networks, shown as a system automatically.

Because `Autoencoder` keeps its parts in `self.encoder` and `self.decoder`,
Neurolume groups their layers and opens on an overview with one card per part.
"""

import torch
from torch import nn

import neurolume


class Autoencoder(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.encoder = nn.Sequential(nn.Flatten(), nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 32))
        self.decoder = nn.Sequential(nn.Linear(32, 128), nn.ReLU(), nn.Linear(128, 784), nn.Sigmoid())

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.decoder(self.encoder(x))


if __name__ == "__main__":
    neurolume.show(Autoencoder(), torch.randn(1, 1, 28, 28))
