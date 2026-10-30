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


def test_unbuilt_sequential_needs_a_shape_or_data() -> None:
    with pytest.raises(ValueError, match=r"keras\.Input"):
        to_graph(keras.Sequential([layers.Dense(3), layers.Dense(2)]))
    from_shape = to_graph(keras.Sequential([layers.Dense(3), layers.Dense(2)]), (5,))
    from_data = to_graph(keras.Sequential([layers.Dense(3), layers.Dense(2)]), np.zeros((1, 5), dtype="float32"))
    assert [node.output_shape for node in from_shape.nodes] == [node.output_shape for node in from_data.nodes] == [[5], [3], [2], [2]]


def test_systems_can_mix_frameworks() -> None:
    system = System("Mixed")
    features = system.add("features", build_lenet())
    head = system.add("head", torch.nn.Linear(10, 2), torch.randn(1, 10))
    system.connect(features, head)
    graph = system.to_graph()

    assert {group.id: group.framework for group in graph.groups} == {"features": "keras", "head": "pytorch"}
    assert graph.model.framework == "mixed"


def test_keras_feature_maps_need_real_data_and_are_channels_first() -> None:
    from neurolume.demo import sample_digit

    assert to_graph(build_lenet(), weights=None).feature_maps is None
    assert to_graph(build_lenet(), (28, 28, 1), weights=None).feature_maps is None  # a shape draws plain slabs
    graph = to_graph(build_lenet(), sample_digit().reshape(1, 28, 28, 1), weights=None)
    maps = graph.feature_maps
    assert maps is not None
    # Keras numbers layer names per session (conv2d_3, ...), so compare by layer in order.
    assert [(node.type, len(maps[node.id].channels), maps[node.id].height) for node in graph.nodes if node.id in maps] == [
        ("input", 1, 28),
        ("conv2d", 6, 28),
        ("pool", 6, 14),
        ("conv2d", 12, 10),
        ("norm", 12, 10),  # its ReLU layer is folded in
        ("pool", 12, 5),
    ]


def test_systems_keep_feature_maps_under_prefixed_ids() -> None:
    from neurolume.demo import sample_digit

    system = System()
    system.add("cnn", LeNet(), torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28))
    maps = system.to_graph().feature_maps
    assert maps is not None and "cnn/conv1" in maps


def test_dense_weights_after_flatten_use_channels_first_indices() -> None:
    # One strong weight from row 1, column 2, channel 3 of a 2 x 4 x 5 (H x W x C) map.
    model = keras.Sequential([keras.Input((2, 4, 5)), layers.Flatten(), layers.Dense(1, use_bias=False)])
    kernel = np.zeros((2 * 4 * 5, 1), dtype="float32")
    kernel[(1 * 4 + 2) * 5 + 3, 0] = 9.0  # Keras flattens height, width, channels
    model.layers[1].kernel.assign(kernel)

    weights = to_graph(model, weight_k=1).weights
    assert weights is not None
    [(index, _, value)] = next(iter(weights.values())).pairs
    assert (index, value) == (3 * (2 * 4) + 1 * 4 + 2, 9.0)  # channels-first: channel, row, column


def test_nested_models_become_groups_that_edges_pass_through() -> None:
    from keras_resnet import build_resnet
    from neurolume.demo import sample_digit

    keras.utils.set_random_seed(0)
    graph = to_graph(build_resnet(), sample_digit().reshape(1, 28, 28, 1))
    assert [(group.id, group.parent) for group in graph.groups] == [("block1", None), ("block2", None)]
    groups = {node.id: node.group for node in graph.nodes}
    block1 = [node for node in graph.nodes if node.group == "block1"]
    assert [node.type for node in block1] == ["conv2d", "conv2d", "add"]
    # The block's first conv is fed by the stem, and its add reads the stem too (the skip connection).
    add = block1[-1].id
    assert sorted(edge.source for edge in graph.edges if edge.target == add) == sorted([block1[1].id, "stem"])
    # The layer after the block reads the block's add (its ReLU is folded in), not the block itself.
    assert [edge.source for edge in graph.edges if edge.target == "pool"] == [add]
    assert "block1" not in groups  # the nested model is not a node of its own
    # Shapes and feature maps are known inside the nested blocks too.
    assert block1[0].output_shape == [8, 28, 28]
    assert graph.feature_maps is not None and block1[0].id in graph.feature_maps
