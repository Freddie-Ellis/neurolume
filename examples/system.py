"""Link several networks and plain blocks into one system schematic.

A sensor feeds an encoder; its latent code goes both to a decoder (trained to
reconstruct the input) and to a classifier. Click a network card in the viewer
to open its layers; press Esc to go back to the overview.
"""

import torch
from torch import nn

import neurolume


def mlp(*sizes: int) -> nn.Sequential:
    """Linear layers of the given sizes with ReLU between them."""
    layers: list[nn.Module] = []
    for i, (inputs, outputs) in enumerate(zip(sizes, sizes[1:])):
        layers.append(nn.Linear(inputs, outputs))
        if i < len(sizes) - 2:
            layers.append(nn.ReLU())
    return nn.Sequential(*layers)


def build_system() -> neurolume.System:
    torch.manual_seed(0)
    system = neurolume.System("Sensor autoencoder")

    sensor = system.block("sensor", label="Sensor", description="32 readings per sample", output_shape=[32])
    encoder = system.add("encoder", mlp(32, 64, 64, 16), torch.randn(1, 32), label="Encoder")
    decoder = system.add("decoder", mlp(16, 64, 64, 32), torch.randn(1, 16), label="Decoder")
    classifier = system.add("classifier", mlp(16, 12, 3), torch.randn(1, 16), label="Classifier")
    loss = system.block("loss", label="Reconstruction loss", input_shape=[32])
    prediction = system.block("prediction", label="Fault type", input_shape=[3])

    system.connect(sensor, encoder, label="readings")
    system.connect(encoder, decoder, label="latent")
    system.connect(encoder, classifier, label="latent")
    system.connect(decoder, loss)
    system.connect(classifier, prediction, label="logits")
    return system


if __name__ == "__main__":
    neurolume.show(build_system())
