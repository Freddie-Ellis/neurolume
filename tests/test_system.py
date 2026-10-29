import sys
from pathlib import Path

import pytest

from neurolume import System, to_graph
from neurolume.server import demo_graph

ROOT = Path(__file__).resolve().parent.parent


def test_networks_become_groups_with_prefixed_ids() -> None:
    system = System("Pair")
    first = system.add("first", demo_graph())
    second = system.add("second", demo_graph(), label="Second net")
    system.connect(first, second, label="scores")
    graph = system.to_graph()

    assert [(group.id, group.label) for group in graph.groups] == [("first", "first"), ("second", "Second net")]
    assert {node.group for node in graph.nodes} == {"first", "second"}
    assert "first/hidden1" in {node.id for node in graph.nodes}
    link = graph.edges[-1]
    assert (link.source, link.target, link.label) == ("first/output", "second/input", "scores")
    assert link.tensor_shape == [4]
    assert graph.model.total_params == 2 * demo_graph().model.total_params


def test_blocks_are_ungrouped_nodes() -> None:
    system = System()
    source = system.block("camera", label="Camera", output_shape=[3, 64, 64], description="RGB frames")
    net = system.add("net", demo_graph())
    system.connect(source, net)
    graph = to_graph(system)

    camera = next(node for node in graph.nodes if node.id == "camera")
    assert (camera.type, camera.label, camera.group) == ("custom", "Camera", None)
    assert camera.params == {"description": "RGB frames"}
    assert graph.edges[-1].source == "camera" and graph.edges[-1].target == "net/input"


def test_component_names_must_be_unique_and_simple() -> None:
    system = System()
    system.block("a")
    with pytest.raises(ValueError, match="already exists"):
        system.block("a")
    with pytest.raises(ValueError, match="cannot contain"):
        system.block("a/b")


def test_connecting_a_foreign_component_fails() -> None:
    other = System().block("elsewhere")
    with pytest.raises(ValueError, match="not part of this system"):
        System().connect(other, other)


def test_example_system_builds() -> None:
    pytest.importorskip("torch")
    sys.path.insert(0, str(ROOT / "examples"))
    from system import build_system

    graph = build_system().to_graph()
    assert graph.model.framework == "pytorch"
    assert [group.id for group in graph.groups] == ["encoder", "decoder", "classifier"]
    assert graph.weights is not None and "encoder/0" in graph.weights


def test_torch_submodules_are_grouped_automatically() -> None:
    torch = pytest.importorskip("torch")
    sys.path.insert(0, str(ROOT / "examples"))
    from autoencoder import Autoencoder

    graph = to_graph(Autoencoder(), torch.randn(1, 1, 28, 28), weights=None)
    assert [group.id for group in graph.groups] == ["encoder", "decoder"]
    grouped = {node.id: node.group for node in graph.nodes}
    assert grouped["encoder_1"] == "encoder" and grouped["decoder_0"] == "decoder"
    assert grouped["input"] is None and grouped["output"] is None

    flat = to_graph(Autoencoder(), torch.randn(1, 1, 28, 28), weights=None, group_submodules=False)
    assert flat.groups == []
