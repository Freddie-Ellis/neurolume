"""Edge sampling for dense layers.

A dense layer with 784 inputs and 512 outputs has 401,408 weights, which is far
too many lines to draw. We keep only ``k`` of them: either the strongest by
absolute value (``"topk"``) or a uniform random sample (``"random"``).
"""

from __future__ import annotations

from typing import Literal

import numpy as np
import numpy.typing as npt

from .schema import WeightSample

DEFAULT_K = 4000

SampleMode = Literal["topk", "random"]


def sample_dense(
    weight: npt.ArrayLike,
    *,
    k: int = DEFAULT_K,
    mode: SampleMode = "topk",
    seed: int = 0,
) -> WeightSample:
    """Sample up to ``k`` connections from a dense weight matrix.

    ``weight`` has shape ``(out_features, in_features)``, which is the PyTorch
    convention. Keras stores ``(in, out)``, so its adapter must transpose first.
    """
    matrix = np.asarray(weight, dtype=np.float32)
    if matrix.ndim != 2:
        raise ValueError(f"expected a 2D weight matrix, got shape {matrix.shape}")

    flat = matrix.ravel()
    count = min(k, flat.size)
    if mode == "topk":
        # argpartition finds the k largest without sorting the whole matrix.
        chosen = np.argpartition(np.abs(flat), flat.size - count)[flat.size - count :]
    elif mode == "random":
        chosen = np.random.default_rng(seed).choice(flat.size, size=count, replace=False)
    else:
        raise ValueError(f"unknown sampling mode {mode!r}")

    out_index, in_index = np.unravel_index(chosen, matrix.shape)
    pairs = [
        (int(source), int(target), round(float(flat[flat_index]), 4))
        for source, target, flat_index in zip(in_index, out_index, chosen)
    ]
    pairs.sort()
    return WeightSample(mode=mode, k=count, pairs=pairs)
