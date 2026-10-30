import sys
from pathlib import Path

import pytest

from neurolume import Component, System, to_graph
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


def test_block_notes_are_dedented_markdown() -> None:
    system = System()
    system.block(
        "loss",
        notes=r"""
            # Loss
            Mean squared error: $\frac{1}{n}\sum (x - \hat{x})^2$
        """,
    )
    system.block("plain")
    nodes = {node.id: node for node in to_graph(system).nodes}

    assert nodes["loss"].notes == "# Loss\nMean squared error: $\\frac{1}{n}\\sum (x - \\hat{x})^2$"
    assert nodes["plain"].notes is None


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


def test_a_system_inside_a_system_links_to_its_ends() -> None:
    pytest.importorskip("torch")
    sys.path.insert(0, str(ROOT / "examples"))
    from system import build_system

    outer = System("Outer")
    source = outer.block("Source", output_shape=[32])
    pipeline = outer.add("pipe", build_system())
    sink = outer.block("Sink")
    outer.connect(source, pipeline)
    outer.connect(pipeline, sink)
    graph = outer.to_graph()

    # The inner System opens as its own overview: its networks are groups inside "pipe".
    assert {(group.id, group.parent) for group in graph.groups} >= {("pipe", None), ("pipe/encoder", "pipe")}
    # Links attach to the inner system's ends (its sensor and prediction blocks), not to a network inside it.
    assert any(edge.source == "Source" and edge.target == "pipe/sensor" for edge in graph.edges)
    assert any(edge.source == "pipe/prediction" and edge.target == "Sink" for edge in graph.edges)


def _three_input_system() -> tuple[System, list[str]]:
    torch = pytest.importorskip("torch")

    class TwinQ(torch.nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.fc = torch.nn.Linear(7, 1)

        def forward(self, obs, priv, act):  # type: ignore[no-untyped-def]
            return self.fc(torch.cat([obs, priv, act], dim=-1))

    system = System()
    critic = system.add("critic", TwinQ(), (torch.randn(1, 3), torch.randn(1, 2), torch.randn(1, 2)))
    names = [node.id for node in system.to_graph().nodes if node.type == "input"]
    for name in ("obs", "priv", "act"):
        system.connect(system.block(name, output_shape=[62]), critic, to=None if name == "obs" else name)
    return system, names


def test_connect_to_picks_one_of_several_inputs() -> None:
    system, names = _three_input_system()
    assert names == ["critic/obs", "critic/priv", "critic/act"]
    links = {(edge.source, edge.target) for edge in system.to_graph().edges if "/" not in edge.source}
    # Without `to`, the first input is used, as before.
    assert links == {("obs", "critic/obs"), ("priv", "critic/priv"), ("act", "critic/act")}


def test_connect_to_an_unknown_input_lists_the_names() -> None:
    system, _ = _three_input_system()
    source = system.block("extra")
    with pytest.raises(ValueError, match="obs, priv, act"):
        system.connect(source, Component("critic", "network"), to="action")
    with pytest.raises(ValueError, match="block"):
        system.connect(Component("critic", "network"), source, to="x")


def test_connect_shape_overrides_the_link_shape() -> None:
    system = System()
    env = system.block("env", output_shape=[62])
    priv = system.block("priv")
    system.connect(env, priv, shape=[4])
    assert system.to_graph().edges[0].tensor_shape == [4]
