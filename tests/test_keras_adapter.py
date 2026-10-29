import sys
from pathlib import Path

import numpy as np
import pytest

keras = pytest.importorskip("keras")
torch = pytest.importorskip("torch")
from keras import layers  # noqa: E402

from neurolume import System, to_graph  # noqa: E402
from neurolume.adapters.base import detect_framework  # noqa: E402
from neurolume.schema import Graph  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "examples"))

from cnn import LeNet  # noqa: E402
from keras_cnn import build_lenet  # noqa: E402
from keras_mlp import build_mlp  # noqa: E402
from mlp import MLP  # noqa: E402


def _architecture(graph: Graph) -> list[tuple[object, ...]]:
    """Everything that describes the network, leaving out framework-specific ids and class names."""
    return [
        (node.type, node.input_shape, node.output_shape, node.param_count, node.activation, node.params)
        for node in graph.nodes
    ]


def test_keras_models_are_detected_before_torch() -> None:
    # On the PyTorch backend a Keras model is also a torch.nn.Module.
    assert detect_framework(build_lenet()) == "keras"


def test_lenet_matches_between_pytorch_and_keras() -> None:
    torch_graph = to_graph(LeNet(), torch.randn(1, 1, 28, 28), weights=None)
    keras_graph = to_graph(build_lenet(), weights=None)

    assert _architecture(keras_graph) == _architecture(torch_graph)
    assert len(keras_graph.edges) == len(torch_graph.edges)
    assert keras_graph.model.total_params == torch_graph.model.total_params == 61_738
    assert keras_graph.model.framework == "keras"


def test_mlp_matches_between_pytorch_and_keras() -> None:
    torch_graph = to_graph(MLP(), torch.randn(1, 1, 28, 28), weights=None)
    assert _architecture(to_graph(build_mlp(), weights=None)) == _architecture(torch_graph)


def test_image_shapes_are_channels_first() -> None:
    graph = to_graph(build_lenet(), weights=None)
    assert graph.nodes[0].output_shape == [1, 28, 28]  # keras.Input((28, 28, 1))


def test_dense_kernels_are_transposed_before_sampling() -> None:
    model = keras.Sequential([keras.Input((3,)), layers.Dense(2)])
    kernel = np.zeros((3, 2), dtype="float32")
    kernel[2, 1] = 5.0  # input 2 -> output 1
    model.layers[0].kernel.assign(kernel)

    weights = to_graph(model, weight_k=1).weights
    assert weights is not None
    assert [list(pair) for pair in weights[model.layers[0].name].pairs] == [[2, 1, 5.0]]


def test_functional_models_keep_their_branches() -> None:
    inputs = keras.Input((8,))
    left = layers.Dense(4, name="left")(inputs)
    right = layers.Dense(4, name="right")(inputs)
    model = keras.Model(inputs, layers.Add(name="sum")([left, right]))

    graph = to_graph(model, weights=None)
    assert [node.id for node in graph.nodes] == ["input", "left", "right", "sum", "output"]
    assert {(edge.source, edge.target) for edge in graph.edges} == {
        ("input", "left"), ("input", "right"), ("left", "sum"), ("right", "sum"), ("sum", "output"),
    }
    assert graph.nodes[3].type == "add"


def test_unbuilt_sequential_needs_an_example_input() -> None:
    model = keras.Sequential([layers.Dense(3), layers.Dense(2)])
    with pytest.raises(ValueError, match="example input"):
        to_graph(model)
    graph = to_graph(keras.Sequential([layers.Dense(3), layers.Dense(2)]), np.zeros((1, 5), dtype="float32"))
    assert [node.output_shape for node in graph.nodes] == [[5], [3], [2], [2]]


def test_systems_can_mix_frameworks() -> None:
    system = System("Mixed")
    features = system.add("features", build_lenet())
    head = system.add("head", torch.nn.Linear(10, 2), torch.randn(1, 10))
    system.connect(features, head)
    graph = system.to_graph()

    assert {group.id: group.framework for group in graph.groups} == {"features": "keras", "head": "pytorch"}
    assert graph.model.framework == "mixed"
