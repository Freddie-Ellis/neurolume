"""Watch a nested system train: the plant monitor from `nested_system.py`, live.

Two parts learn at once, on synthetic data so it runs anywhere:

- the **denoiser** (the Autoencoder from `autoencoder.py`) learns to clean
  noisy camera frames of a drawn "7", moved about the frame;
- the **fault detector**, a System of its own (encoder, decoder, classifier),
  learns to rebuild 32 sensor readings and to name one of three fault types.

Each logs its own loss with ``network=``, so the Training panel draws
``loss/denoiser`` and ``loss/detector`` on charts of their own, each with its
validation line, and every network's parameters get a line of their own (the detector's
as ``detector/encoder`` and so on). The classifier's validation predictions
fill a confusion matrix. Open the cards to watch the edges change inside each
network, and drag the timeline to replay the run.
"""

import torch
import torch.nn.functional as F

import neurolume
from autoencoder import Autoencoder
from neurolume.demo import sample_digit
from system import mlp

FAULTS = 3


def build(denoiser: Autoencoder, encoder, decoder, classifier) -> neurolume.System:
    """The plant monitor of nested_system.py, around networks this script trains."""
    detector = neurolume.System("Fault detector")
    sensor = detector.block("sensor", label="Sensor", description="32 readings per sample", output_shape=[32])
    parts = {name: detector.add(name, net, (size,), label=name.title()) for name, net, size in [("encoder", encoder, 32), ("decoder", decoder, 16), ("classifier", classifier, 16)]}
    loss = detector.block("loss", label="Reconstruction loss", description="Mean squared error", input_shape=[32])
    prediction = detector.block("prediction", label="Fault type", input_shape=[FAULTS])
    detector.connect(sensor, parts["encoder"], label="readings")
    detector.connect(parts["encoder"], parts["decoder"], label="latent")
    detector.connect(parts["encoder"], parts["classifier"], label="latent")
    detector.connect(parts["decoder"], loss)
    detector.connect(parts["classifier"], prediction, label="logits")

    plant = neurolume.System("Plant monitor")
    camera = plant.block("camera", label="Camera", description="Noisy 28 x 28 frames", output_shape=[1, 28, 28])
    clean = plant.add("denoiser", denoiser, (1, 28, 28), label="Denoiser")
    sensors = plant.block("sensors", label="Sensor bus", description="32 readings per tick", output_shape=[32])
    faults = plant.add("detector", detector, label="Fault detector")
    alarm = plant.block("alarm", label="Alarm", description="Raise a ticket on a fault", input_shape=[FAULTS])
    display = plant.block("display", label="Operator screen", input_shape=[784])
    plant.connect(camera, clean, label="frames")
    plant.connect(clean, display, label="clean frames")
    plant.connect(sensors, faults, label="readings")
    plant.connect(faults, alarm, label="fault type", from_="prediction")
    return plant


def frames(count: int) -> tuple[torch.Tensor, torch.Tensor]:
    """Noisy frames and the clean ones behind them: the digit, shifted a few pixels."""
    digit = torch.from_numpy(sample_digit())
    clean = torch.stack([digit.roll((int(dy), int(dx)), (0, 1)) for dy, dx in torch.randint(-4, 5, (count, 2))]).unsqueeze(1)
    return (clean + 0.5 * torch.randn_like(clean)).clamp(0, 1), clean


def readings(count: int, patterns: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor]:
    """Sensor readings: each fault type's own pattern under heavy noise, and which fault it was."""
    fault = torch.randint(0, FAULTS, (count,))
    return patterns[fault] + torch.randn(count, 32), fault


def main(steps: int = 4000) -> None:
    torch.manual_seed(0)
    denoiser, encoder, decoder, classifier = Autoencoder(), mlp(32, 64, 64, 16), mlp(16, 64, 64, 32), mlp(16, 12, FAULTS)
    optimiser = torch.optim.Adam([*denoiser.parameters(), *encoder.parameters(), *decoder.parameters(), *classifier.parameters()], lr=1e-3)
    patterns = torch.randn(FAULTS, 32) * 0.6
    val_frames, val_readings = frames(64), readings(256, patterns)

    def losses(noisy_clean, sensor_fault):
        (noisy, clean), (sensor, fault) = noisy_clean, sensor_fault
        latent = encoder(sensor)
        logits = classifier(latent)
        denoise = F.mse_loss(denoiser(noisy), clean.flatten(1))
        detect = F.mse_loss(decoder(latent), sensor) + F.cross_entropy(logits, fault)
        return denoise, detect, logits

    with neurolume.watch(build(denoiser, encoder, decoder, classifier), headline="loss/detector") as live:
        for step in range(steps):
            denoise, detect, logits = losses(frames(32), batch := readings(64, patterns))
            optimiser.zero_grad()
            (denoise + detect).backward()
            optimiser.step()
            # After backward(), so every network's parameter stats see their gradients.
            live.log(step, network="denoiser", loss=denoise)
            live.log(step, network="detector", loss=detect, accuracy=(logits.argmax(1) == batch[1]).float().mean())
            if step % 100 == 0:
                with torch.no_grad():
                    denoise, detect, logits = losses(val_frames, val_readings)
                live.log(step, split="val", network="denoiser", loss=denoise)
                live.log(step, split="val", network="detector", loss=detect, accuracy=(logits.argmax(1) == val_readings[1]).float().mean())
                live.predictions(step, logits, val_readings[1])  # integer fault labels: a confusion matrix


if __name__ == "__main__":
    main()
