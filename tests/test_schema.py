from neurolume.schema import SCHEMA_VERSION, Graph
from neurolume.server import create_app, demo_graph


def test_demo_graph_uses_versioned_schema() -> None:
    graph = demo_graph()
    assert graph.schema_version == SCHEMA_VERSION
    assert [node.label for node in graph.nodes] == ["Input", "Hidden", "Output"]


def test_graph_endpoint_returns_json() -> None:
    app = create_app()
    routes = {route.path for route in app.routes}
    assert "/api/graph" in routes
