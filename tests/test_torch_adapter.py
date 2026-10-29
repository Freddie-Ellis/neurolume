import json
import sys
from pathlib import Path

import pytest

torch = pytest.importorskip("torch")
from torch import nn  # noqa: E402

from neurolume import to_graph  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "examples"))

from mlp import MLP  # noqa: E402

SNAPSHOTS = Path(__file__).parent / "snapshots"


def _mlp_graph():
    torch.manual_seed(0)
    return to_graph(MLP(), torch.randn(1, 1, 28, 28), weights=None)


def test_mlp_shapes_and_parameter_counts() -> None:
    graph = _mlp_graph()
    dense = {node.id: node for node in graph.nodes if node.type == "dense"}
    assert {node_id: (node.input_shape, node.output_shape) for node_id, node in dense.items()} == {
        "fc1": ([784], [512]),
        "fc2": ([512], [256]),
        "fc3": ([256], [10]),
    }
    assert [node.param_count for node in dense.values()] == [401_920, 131_328, 2_570]
    assert graph.model.total_params == 535_818


def test_activations_fold_into_the_previous_layer() -> None:
    graph = _mlp_graph()
    assert [node.type for node in graph.nodes] == ["input", "flatten", "dense", "dropout", "dense", "dense", "output"]
    assert {node.id: node.activation for node in graph.nodes if node.type == "dense"} == {
        "fc1": "relu",
        "fc2": "relu",
        "fc3": None,
    }


def test_activations_can_stay_as_separate_nodes() -> None:
    torch.manual_seed(0)
    graph = to_graph(MLP(), torch.randn(1, 1, 28, 28), fold_activations_into_layers=False, weights=None)
    assert [node.type for node in graph.nodes].count("activation") == 2


def test_dense_weights_are_sampled() -> None:
    torch.manual_seed(0)
    graph = to_graph(MLP(), torch.randn(1, 1, 28, 28), weight_k=50)
    assert graph.weights is not None
    assert set(graph.weights) == {"fc1", "fc2", "fc3"}
    from_index, to_index, _ = graph.weights["fc1"].pairs[0]
    assert 0 <= from_index < 784 and 0 <= to_index < 512


def test_untraceable_model_falls_back_to_module_walk() -> None:
    class Dynamic(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.first = nn.Linear(4, 8)
            self.second = nn.Linear(8, 2)

        def forward(self, x):
            if x.sum() > 0:  # data-dependent branch: torch.fx cannot trace this
                x = torch.relu(x)
            return self.second(self.first(x))

    with pytest.warns(UserWarning, match="falling back"):
        graph = to_graph(Dynamic(), torch.ones(1, 4), weights=None)
    assert [(node.id, node.output_shape) for node in graph.nodes] == [
        ("input", [4]),
        ("first", [8]),
        ("second", [2]),
        ("output", [2]),
    ]


def test_mlp_matches_snapshot() -> None:
    """Guards the exact JSON contract. Delete the snapshot file to regenerate it."""
    actual = _mlp_graph().model_dump(mode="json")
    snapshot = SNAPSHOTS / "mlp.json"
    if not snapshot.exists():
        snapshot.parent.mkdir(exist_ok=True)
        snapshot.write_text(json.dumps(actual, indent=2) + "\n", encoding="utf-8")
    assert actual == json.loads(snapshot.read_text(encoding="utf-8"))


def test_lenet_conv_pool_and_norm_layers() -> None:
    from cnn import LeNet

    graph = to_graph(LeNet(), torch.randn(1, 1, 28, 28), weights=None)
    nodes = {node.id: node for node in graph.nodes}
    assert [node.type for node in graph.nodes] == [
        "input", "conv2d", "pool", "conv2d", "norm", "pool", "flatten", "dense", "dropout", "dense", "dense", "output",
    ]
    # Shapes are channels-first and exclude the batch dimension.
    assert [nodes[name].output_shape for name in ("conv1", "pool1", "conv2", "pool2")] == [
        [6, 28, 28], [6, 14, 14], [16, 10, 10], [16, 5, 5],
    ]
    assert nodes["conv1"].params == {
        "in_channels": 1, "out_channels": 6, "kernel_size": [5, 5], "stride": [1, 1], "padding": "same", "bias": True,
    }
    assert nodes["conv2"].params["padding"] == "valid"
    assert nodes["pool1"].params == {"mode": "max", "kernel_size": [2, 2], "stride": [2, 2], "padding": "valid"}
    # BatchNorm counts its weight and bias, not its running statistics (buffers).
    assert (nodes["norm2"].params, nodes["norm2"].param_count, nodes["norm2"].activation) == (
        {"num_features": 16, "eps": 1e-5}, 32, "relu",
    )
    assert graph.model.total_params == 61_738


def test_padding_that_is_not_same_stays_explicit() -> None:
    graph = to_graph(nn.Sequential(nn.Conv2d(3, 8, 3, stride=2, padding=1)), torch.randn(1, 3, 32, 32))
    conv = next(node for node in graph.nodes if node.type == "conv2d")
    assert (conv.params["padding"], conv.output_shape) == ([1, 1], [8, 16, 16])
