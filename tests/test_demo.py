import pytest

from neurolume.server import demo_graph

torch = pytest.importorskip("torch")

from neurolume import to_graph  # noqa: E402
from neurolume.demo import demo_input, demo_model  # noqa: E402


def test_demo_model_runs_through_the_torch_adapter() -> None:
    graph = to_graph(demo_model(), demo_input())
    assert graph.model.name == "DemoNet"
    assert graph.model.framework == "pytorch"
    assert [node.id for node in graph.nodes] == ["input", "hidden1", "hidden2", "hidden3", "hidden4", "scores", "output"]
    assert graph.weights is not None and set(graph.weights) == {"hidden1", "hidden2", "hidden3", "hidden4", "scores"}


def test_fallback_graph_matches_the_real_model() -> None:
    """The ready-made graph used without torch must describe the same network."""
    real = to_graph(demo_model(), demo_input(), weights=None)
    fallback = demo_graph()
    assert fallback.nodes == real.nodes
    assert fallback.edges == real.edges
    assert fallback.model.total_params == real.model.total_params
