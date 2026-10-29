"""A LeNet-style CNN for 28x28 greyscale images (MNIST), the Phase 2 reference model.

Convolution and pooling layers are drawn as stacks of feature maps: one slab
per channel, sized by the map's height and width. `keras_cnn.py` builds the
same network in Keras, and the two produce matching graphs.
"""

import neurolume
import torch
from torch import nn


class LeNet(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.conv1 = nn.Conv2d(1, 6, kernel_size=5, padding=2)  # 6 x 28 x 28
        self.relu1 = nn.ReLU()
        self.pool1 = nn.MaxPool2d(2)  # 6 x 14 x 14
        self.conv2 = nn.Conv2d(6, 16, kernel_size=5)  # 16 x 10 x 10
        self.norm2 = nn.BatchNorm2d(16)
        self.relu2 = nn.ReLU()
        self.pool2 = nn.MaxPool2d(2)  # 16 x 5 x 5
        self.flatten = nn.Flatten()  # 400
        self.fc1 = nn.Linear(400, 120)
        self.relu3 = nn.ReLU()
        self.dropout = nn.Dropout(0.25)
        self.fc2 = nn.Linear(120, 84)
        self.relu4 = nn.ReLU()
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.pool1(self.relu1(self.conv1(x)))
        x = self.pool2(self.relu2(self.norm2(self.conv2(x))))
        x = self.dropout(self.relu3(self.fc1(self.flatten(x))))
        x = self.relu4(self.fc2(x))
        return self.fc3(x)


if __name__ == "__main__":
    neurolume.show(LeNet(), torch.randn(1, 1, 28, 28))
