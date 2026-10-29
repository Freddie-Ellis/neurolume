import base64

import numpy as np
import pytest

from neurolume.demo import sample_digit
from neurolume.feature_maps import MAX_CHANNELS, MAX_SIZE, feature_maps


def _pixels(maps) -> np.ndarray:
    return np.frombuffer(base64.b64decode(maps.data), dtype=np.uint8).reshape(len(maps.channels), maps.height, maps.width)


def test_channels_are_ordered_by_activity_and_scaled_on_their_own() -> None:
    ramp = np.arange(16, dtype=np.float32).reshape(4, 4)
    maps = feature_maps(np.stack([ramp, -np.ones((4, 4)), ramp * 100]))
    assert maps.channels == [2, 0, 1]  # most varied first, the flat channel last
    pixels = _pixels(maps)
    assert np.array_equal(pixels[0], pixels[1])  # scale is per channel
    assert (pixels[0, 0, 0], pixels[0, 3, 3]) == (0, 255)  # rows from the top, left to right
    assert pixels[2].max() == 0  # a flat channel has nothing to show


def test_channels_are_capped_and_big_maps_shrunk() -> None:
    maps = feature_maps(np.random.default_rng(0).random((64, 100, 70)))
    assert len(maps.channels) == MAX_CHANNELS
    assert max(maps.height, maps.width) <= MAX_SIZE
    assert (maps.height, maps.width) == (25, 18)  # shrunk 4x, rounding up


def test_needs_channels_height_and_width() -> None:
    with pytest.raises(ValueError):
        feature_maps(np.zeros((28, 28)))


def test_sample_digit_is_a_white_stroke_on_black() -> None:
    digit = sample_digit()
    assert digit.shape == (28, 28) and digit.dtype == np.float32
    assert digit.max() == 1.0 and digit[0, 0] == 0.0
    assert 0.08 < (digit > 0.5).mean() < 0.3
