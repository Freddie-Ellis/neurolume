import importlib.util
import json
import urllib.request
from pathlib import Path

import pytest
from pydantic import ValidationError

from neurolume.schema import SCHEMA_VERSION, Graph
from neurolume.server import demo_graph, show

ROOT = Path(__file__).resolve().parent.parent


def _minimal_graph(**overrides: object) -> dict[str, object]:
    graph: dict[str, object] = {
        "model": {"name": "tiny", "framework": "demo", "total_params": 0},
        "nodes": [
            {"id": "input", "type": "input", "label": "Input"},
            {"id": "fc", "type": "dense", "label": "Linear"},
        ],
        "edges": [{"source": "input", "target": "fc"}],
    }
    graph.update(overrides)
    return graph


def test_demo_graph_uses_versioned_schema() -> None:
    graph = demo_graph()
    assert graph.schema_version == SCHEMA_VERSION
    types = [node.type for node in graph.nodes]
    assert types[0] == "input" and types[-1] == "output"
    assert set(types[1:-1]) == {"dense"}


def _get(path: str) -> str:
    """Fetch a path from a real running viewer server (the demo graph)."""
    viewer = show(open_browser=False, block=False)
    try:
        with urllib.request.urlopen(viewer.url + path) as response:
            return response.read().decode()
    finally:
        viewer.stop()


def test_graph_endpoint_returns_json() -> None:
    assert json.loads(_get("/api/graph"))["schema_version"] == SCHEMA_VERSION


def test_index_page_is_served() -> None:
    assert "<html" in _get("/").lower()


def test_unknown_node_type_is_rejected() -> None:
    nodes = [{"id": "input", "type": "Linear", "label": "Input"}]
    with pytest.raises(ValidationError):
        Graph.model_validate(_minimal_graph(nodes=nodes, edges=[]))


def test_edges_must_refer_to_known_nodes() -> None:
    with pytest.raises(ValidationError, match="unknown node"):
        Graph.model_validate(_minimal_graph(edges=[{"source": "input", "target": "missing"}]))


def test_node_ids_must_be_unique() -> None:
    nodes = [{"id": "a", "type": "input", "label": "A"}, {"id": "a", "type": "dense", "label": "B"}]
    with pytest.raises(ValidationError, match="unique"):
        Graph.model_validate(_minimal_graph(nodes=nodes, edges=[]))


def test_weights_round_trip_as_triples() -> None:
    weights = {"fc": {"mode": "topk", "k": 1, "pairs": [[0, 1, 0.5]]}}
    graph = Graph.model_validate(_minimal_graph(weights=weights))
    assert graph.model_dump(mode="json")["weights"]["fc"]["pairs"] == [[0, 1, 0.5]]


def test_generated_typescript_schema_is_up_to_date() -> None:
    spec = importlib.util.spec_from_file_location("generate_schema_ts", ROOT / "scripts" / "generate_schema_ts.py")
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    committed = (ROOT / "frontend" / "src" / "schema.ts").read_text(encoding="utf-8")
    assert committed == module.generate(), "run: python scripts/generate_schema_ts.py"
