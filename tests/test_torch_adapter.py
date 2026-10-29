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
