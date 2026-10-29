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
    return to_graph(MLP(), torch.randn(1, 1, 28, 28), weights=None, feature_maps=False)


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


def test_feature_maps_are_recorded_after_folded_activations() -> None:
    import base64

    from cnn import LeNet
    from neurolume.demo import sample_digit

    torch.manual_seed(0)
    digit = torch.from_numpy(sample_digit()).reshape(1, 1, 28, 28)
    maps = to_graph(LeNet(), digit, weights=None).feature_maps
    assert maps is not None
    assert set(maps) == {"input", "conv1", "pool1", "conv2", "norm2", "pool2"}
    assert (sorted(maps["conv1"].channels), maps["conv1"].height, maps["conv1"].width) == (list(range(6)), 28, 28)
    assert (len(maps["pool2"].channels), maps["pool2"].height) == (12, 5)  # 16 channels, capped at 12

    # conv1's ReLU is folded into it, so its maps are taken after the ReLU: the
    # darkest value is exactly zero, which maps to 0 and stays common.
    pixels = base64.b64decode(maps["conv1"].data)
    assert len(pixels) == 6 * 28 * 28
    assert pixels.count(0) > len(pixels) // 10


def test_a_shape_is_enough_to_measure_a_model() -> None:
    from cnn import LeNet

    from_shape = to_graph(LeNet(), (1, 28, 28), weights=None)
    from_size = to_graph(LeNet(), torch.Size([1, 28, 28]), weights=None)
    from_data = to_graph(LeNet(), torch.randn(1, 1, 28, 28), weights=None, feature_maps=False)
    assert from_shape.nodes == from_size.nodes == from_data.nodes
    assert from_shape.feature_maps is None  # made-up zeros would only give blank pictures


def test_missing_sample_explains_what_to_pass() -> None:
    with pytest.raises(ValueError, match=r"shape of one input .* \(1, 28, 28\)"):
        to_graph(MLP())


class _Block(nn.Module):
    """A ResNet basic block: two convs, plus the block's input added back in."""

    def __init__(self, channels: int) -> None:
        super().__init__()
        self.conv1 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn1 = nn.BatchNorm2d(channels)
        self.conv2 = nn.Conv2d(channels, channels, 3, padding=1)
        self.bn2 = nn.BatchNorm2d(channels)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        y = self.bn2(self.conv2(torch.relu(self.bn1(self.conv1(x)))))
        return torch.relu(x + y)


class _TinyResNet(nn.Module):
    def __init__(self) -> None:
        super().__init__()
        self.conv1 = nn.Conv2d(1, 4, 3, padding=1)
        self.pool = nn.MaxPool2d(2)
        self.stage1 = nn.Sequential(_Block(4), _Block(4))
        self.stage2 = nn.Sequential(_Block(4), _Block(4))
        self.avgpool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Linear(4, 10)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.stage2(self.stage1(self.pool(self.conv1(x))))
        return self.fc(torch.flatten(self.avgpool(x), 1))


def test_big_groups_split_into_their_own_modules() -> None:
    graph = to_graph(_TinyResNet(), (1, 8, 8), weights=None)
    assert [(group.id, group.parent) for group in graph.groups] == [
        ("stem", None),
        ("stage1", None),
        ("stage1.0", "stage1"),
        ("stage1.1", "stage1"),
        ("stage2", None),
        ("stage2.0", "stage2"),
        ("stage2.1", "stage2"),
        ("head", None),
    ]
    # The residual add is a function call, not a module, but it belongs to its block.
    adds = [node for node in graph.nodes if node.type == "add"]
    assert [node.group for node in adds] == ["stage1.0", "stage1.1", "stage2.0", "stage2.1"]
    # It reads both the block's last layer and the block's input: a skip connection.
    first_add = adds[0].id
    assert sorted(edge.source for edge in graph.edges if edge.target == first_add) == ["pool", "stage1_0_bn2"]
    # Layers outside the stages are gathered into a stem and a head.
    assert {node.id: node.group for node in graph.nodes if node.group in ("stem", "head")} == {
        "conv1": "stem",
        "pool": "stem",
        "avgpool": "head",
        "flatten": "head",
        "fc": "head",
    }


def test_small_groups_are_not_split() -> None:
    from autoencoder import Autoencoder

    graph = to_graph(Autoencoder(), (1, 28, 28), weights=None)
    assert all(group.parent is None for group in graph.groups)


def test_add_and_concat_keep_every_branch() -> None:
    from branches import Branches

    graph = to_graph(Branches(), (1, 28, 28), weights=None)
    by_type = {node.type: node.id for node in graph.nodes}
    incoming = lambda node_id: sorted(edge.source for edge in graph.edges if edge.target == node_id)  # noqa: E731
    assert incoming(by_type["add"]) == ["res_conv2", "stem"]
    assert incoming(by_type["concat"]) == ["branch_1x1", "branch_3x3"]
    assert graph.groups == []  # every layer is a direct child, so it stays one network


def test_torchvision_resnet18_opens_as_a_few_parts() -> None:
    torchvision = pytest.importorskip("torchvision")
    graph = to_graph(torchvision.models.resnet18(), (3, 224, 224), weights=None)
    top = [group.id for group in graph.groups if group.parent is None]
    assert top == ["stem", "layer1", "layer2", "layer3", "layer4", "head"]
    assert [group.id for group in graph.groups if group.parent == "layer2"] == ["layer2.0", "layer2.1"]
    # The downsample path of layer2.0 stays inside its block, next to the add it feeds.
    assert {node.group for node in graph.nodes if "downsample" in node.id} == {"layer2.0", "layer3.0", "layer4.0"}
