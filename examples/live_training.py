"""Train a small regression model and watch it live: ``neurolume.watch()`` instead of ``show()``.

Numbers in, numbers out: the model learns a wavy function of 8 inputs from
only 200 noisy examples, so after about 6,000 steps it starts memorising
them: validation loss turns back up while training loss keeps falling. The
Training panel shows the training and validation loss on one chart, says when
the run is improving, has converged or is overfitting, plots its predictions
against the truth on held-out data, and shows how its parameters move.
"""

import neurolume
import torch
from torch import nn


def target(x: torch.Tensor) -> torch.Tensor:
    return torch.sin(2 * x[:, :1]) + x[:, 1:2] * x[:, 2:3] - 0.5 * x[:, 3:4] ** 2


def main(steps: int = 20000) -> None:
    torch.manual_seed(0)
    x_train, x_val = torch.randn(200, 8), torch.randn(512, 8)
    y_train = target(x_train) + 0.8 * torch.randn(200, 1)
    y_val = target(x_val) + 0.8 * torch.randn(512, 1)
    model = nn.Sequential(nn.Linear(8, 128), nn.ReLU(), nn.Linear(128, 128), nn.ReLU(), nn.Linear(128, 1))
    optimiser = torch.optim.Adam(model.parameters(), lr=5e-5)

    with neurolume.watch(model, (8,)) as live:
        for step in range(steps):
            batch = torch.randint(0, 200, (32,))
            loss = nn.functional.mse_loss(model(x_train[batch]), y_train[batch])
            optimiser.zero_grad()
            loss.backward()
            optimiser.step()
            live.log(step, loss=loss)  # after backward(), so the parameter stats see the gradients
            if step % 100 == 0:
                with torch.no_grad():
                    predicted = model(x_val)
                live.log(step, split="val", loss=nn.functional.mse_loss(predicted, y_val))
                live.predictions(step, predicted, y_val)


if __name__ == "__main__":
    main()
