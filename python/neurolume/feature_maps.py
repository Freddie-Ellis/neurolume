"""Small images of a layer's real output, for drawing on its feature-map slabs.

A convolution's output for one example is a stack of images (channels x
height x width). We keep the most active few channels, most active first (the
viewer puts the first on the front slab), shrink big maps, and scale each to
0-255, so the viewer can paint them onto the slabs it draws.
Framework-free: the adapters hand over plain numpy arrays.
"""

from __future__ import annotations

import base64
import math

import numpy as np
import numpy.typing as npt

from .schema import FeatureMaps

# The viewer draws at most 12 slabs per stack (MAX_MAPS_SHOWN in frontend/src/layout/maps.ts).
MAX_CHANNELS = 12
# Bigger maps are shrunk by averaging blocks of pixels, which keeps the payload small.
MAX_SIZE = 32


def feature_maps(values: npt.ArrayLike) -> FeatureMaps:
    """Encode a [channels, height, width] array (one example, channels first)."""
    array = np.asarray(values, dtype=np.float32)
    if array.ndim != 3:
        raise ValueError(f"expected [channels, height, width], got shape {array.shape}")

    # Most active first: a channel that barely responds to this input says little.
    order = np.argsort(-array.std(axis=(1, 2)), kind="stable")[:MAX_CHANNELS]
    array = array[order]
    factor = math.ceil(max(array.shape[1], array.shape[2]) / MAX_SIZE)
    if factor > 1:
        array = _shrink(array, factor)

    # Scale each channel to 0-255 on its own; a flat channel becomes all zeros.
    low = array.min(axis=(1, 2), keepdims=True)
    span = array.max(axis=(1, 2), keepdims=True) - low
    scaled = np.where(span > 0, (array - low) / np.where(span > 0, span, 1), 0)
    pixels = np.round(scaled * 255).astype(np.uint8)

    return FeatureMaps(
        channels=[int(channel) for channel in order],
        height=int(pixels.shape[1]),
        width=int(pixels.shape[2]),
        data=base64.b64encode(pixels.tobytes()).decode("ascii"),
    )


def _shrink(array: npt.NDArray[np.float32], factor: int) -> npt.NDArray[np.float32]:
    """Average factor x factor blocks, padding the edges by repeating the last row and column."""
    channels, height, width = array.shape
    pad_height = -height % factor
    pad_width = -width % factor
    padded = np.pad(array, ((0, 0), (0, pad_height), (0, pad_width)), mode="edge")
    blocks = padded.reshape(channels, padded.shape[1] // factor, factor, padded.shape[2] // factor, factor)
    return blocks.mean(axis=(2, 4))
