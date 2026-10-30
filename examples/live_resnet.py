"""Watch torchvision's ResNet-18 learn, live: feature maps, layer health and the timeline.

A toy task that runs on a CPU with no download: the drawn "7" from
`neurolume.demo`, turned 0, 90, 180 or 270 degrees, shifted about and buried
in noise; the network learns which way up it is (about 150 steps, ~0.2 s each
on a laptop CPU). The sample passed to `watch()` is the upright 7, so the
feature-map slabs repaint as the filters learn (open a stage, then a block,
to see them). Every 50 steps a fixed validation batch gives `loss/val`,
`accuracy/val` and a confusion matrix in the Training panel; the timeline
scrubs back to step 0.

Needs torchvision: pip install torchvision
"""

import torch
import torch.nn.functional as F
from torchvision.models import resnet18

import neurolume
from neurolume.demo import sample_digit

SIZE = 64  # small images keep a CPU step quick; ResNet-18 works on any size


def main(steps: int = 1000) -> None:
    torch.manual_seed(0)
    digit = torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28)
    upright = F.interpolate(digit, size=SIZE, mode="bilinear").repeat(1, 3, 1, 1)  # 3 colour channels, as ResNet expects
    model = resnet18(num_classes=4)
    optimiser = torch.optim.SGD(model.parameters(), lr=0.005, momentum=0.9)

    def batch(size: int) -> tuple[torch.Tensor, torch.Tensor]:
        turns = torch.randint(0, 4, (size,))
        shifts = torch.randint(-SIZE // 4, SIZE // 4 + 1, (size, 2))
        images = torch.stack(
            [torch.rot90(upright[0], int(k), (1, 2)).roll((int(dy), int(dx)), (1, 2)) for k, (dy, dx) in zip(turns, shifts)]
        )
        return images + torch.randn_like(images) * 2.5, turns

    val_images, val_turns = batch(64)
    with neurolume.watch(model, upright, headline="loss", pinned=["accuracy"]) as live:
        for step in range(steps):
            images, turns = batch(16)
            logits = model(images)
            loss = F.cross_entropy(logits, turns)
            optimiser.zero_grad()
            loss.backward()
            optimiser.step()
            # After backward(), so the layer health sees this step's gradients.
            live.log(step, loss=loss, accuracy=(logits.argmax(1) == turns).float().mean())
            if step % 50 == 0:
                model.eval()
                with torch.no_grad():
                    val_logits = model(val_images)
                model.train()
                live.log(step, split="val", loss=F.cross_entropy(val_logits, val_turns), accuracy=(val_logits.argmax(1) == val_turns).float().mean())
                live.predictions(step, val_logits, val_turns)  # integer labels: a confusion matrix


if __name__ == "__main__":
    main()
