import numpy as np
import pytest

from neurolume.weights import sample_dense


def test_topk_keeps_the_largest_magnitudes() -> None:
    # Shape (out=2, in=3), PyTorch convention.
    weight = np.array([[0.1, -0.9, 0.2], [0.8, 0.0, -0.3]])
    sample = sample_dense(weight, k=2)
    assert sample.mode == "topk"
    assert sample.k == 2
    # pairs are [in_index, out_index, value], sorted
    assert sample.pairs == [(0, 1, 0.8), (1, 0, -0.9)]


def test_k_is_capped_at_the_number_of_weights() -> None:
    sample = sample_dense(np.ones((2, 2)), k=100)
    assert sample.k == 4
    assert len(sample.pairs) == 4


def test_random_sampling_is_reproducible() -> None:
    weight = np.arange(100, dtype=float).reshape(10, 10)
    first = sample_dense(weight, k=5, mode="random", seed=3)
    second = sample_dense(weight, k=5, mode="random", seed=3)
    assert first.pairs == second.pairs
    assert len({(a, b) for a, b, _ in first.pairs}) == 5


def test_rejects_non_matrices() -> None:
    with pytest.raises(ValueError):
        sample_dense(np.ones(3))
