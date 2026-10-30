import json
import re
from pathlib import Path

from neurolume import export_html
from neurolume.server import demo_graph


def test_export_is_one_file_with_the_graph_inlined(tmp_path: Path) -> None:
    graph = demo_graph()
    path = export_html(graph, path=tmp_path / "demo.html")
    page = path.read_text(encoding="utf-8")
    # Nothing to fetch: no external scripts, stylesheets or asset URLs.
    assert not re.search(r"<script[^>]*\ssrc=|<link[^>]*\shref=", page)
    assert "url(/assets" not in page and "url(./" not in page
    embedded = re.search(r"window\.__NEUROLUME_GRAPH__ = (.*?);</script>", page, re.S)
    assert embedded and json.loads(embedded.group(1).replace("<\\/", "</")) == json.loads(graph.model_dump_json())
    assert f"<title>{graph.model.name} · Neurolume</title>" in page
