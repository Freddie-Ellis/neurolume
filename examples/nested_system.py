"""Systems inside systems, and models with parts inside systems.

- The "denoiser" is the Autoencoder model from examples/autoencoder.py. It
  has parts of its own (encoder and decoder), so its card opens as an overview
  of those parts, and each part opens to its layers.
- The "fault detector" is the whole System from examples/system.py, added as
  one component. Its card opens to its own overview. Links from the outer
  system attach to its ends: the input reaches its sensor block, and the
  output leaves from its prediction block.

Zoom out, press Esc or click Overview to go back up one level at a time.
"""

import torch

import neurolume
from autoencoder import Autoencoder
from system import build_system


def build_nested_system() -> neurolume.System:
    torch.manual_seed(0)
    plant = neurolume.System("Plant monitor")
    camera = plant.block("camera", label="Camera", description="Noisy 28 x 28 frames", output_shape=[1, 28, 28])
    denoiser = plant.add("denoiser", Autoencoder(), (1, 28, 28), label="Denoiser")
    sensors = plant.block("sensors", label="Sensor bus", description="32 readings per tick", output_shape=[32])
    detector = plant.add("detector", build_system(), label="Fault detector")
    alarm = plant.block("alarm", label="Alarm", description="Raise a ticket on a fault", input_shape=[3])
    display = plant.block("display", label="Operator screen", input_shape=[784])

    plant.connect(camera, denoiser, label="frames")
    plant.connect(denoiser, display, label="clean frames")
    plant.connect(sensors, detector, label="readings")
    plant.connect(detector, alarm, label="fault type", from_="prediction")
    return plant


if __name__ == "__main__":
    neurolume.show(build_nested_system())
