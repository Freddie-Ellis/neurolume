"""A 784-512-256-10 MLP for MNIST-sized inputs: the simplest thing to show."""

import torch
from torch import nn

import neurolume


class MLP(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(784, 512)
        self.relu1 = nn.ReLU()
        self.dropout = nn.Dropout(0.2)
        self.fc2 = nn.Linear(512, 256)
        self.relu2 = nn.ReLU()
        self.fc3 = nn.Linear(256, 10)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.flatten(x)
        x = self.dropout(self.relu1(self.fc1(x)))
        x = self.relu2(self.fc2(x))
        return self.fc3(x)


if __name__ == "__main__":
    neurolume.show(MLP(), (1, 28, 28))  # the shape of one input: 1 channel, 28 x 28 pixels
