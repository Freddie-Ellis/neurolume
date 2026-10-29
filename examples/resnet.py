"""torchvision's ResNet-18: a big model that opens as a few readable parts.

Neurolume groups the layers by the modules that hold them, so the overview
shows the stem, the four stages (layer1 to layer4) and the head. Open a stage
to see its two residual blocks, and open a block to see its layers, with the
skip connection drawn as an arc under the panels into the block's add.
Zoom out, press Esc or click Overview to go back up a level.

Needs torchvision: pip install torchvision
"""

import torch
import torch.nn.functional as F
from torchvision.models import resnet18

import neurolume
from neurolume.demo import sample_digit

if __name__ == "__main__":
    torch.manual_seed(0)
    # A real picture (a drawn "7", in colour and at ResNet's input size), so the
    # feature-map slabs show what each layer responds to. A shape such as
    # (3, 224, 224) works too, but gives blank slabs.
    digit = torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28)
    image = F.interpolate(digit, size=224, mode="bilinear").repeat(1, 3, 1, 1)
    neurolume.show(resnet18(), image)
