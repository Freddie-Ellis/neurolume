"""Export a model as one standalone HTML file that opens offline, with no Python running."""

from __future__ import annotations

import html
import re
from pathlib import Path
from typing import Any

from .adapters import to_graph
from .schema import Graph

# Built by scripts/build_frontend.ps1 (`vite build --mode export`): one JS bundle and one
# CSS file with the fonts inlined, so the page needs nothing else.
_EXPORT_DIR = Path(__file__).parent / "static" / "export"


def export_html(model: Any, sample: Any = None, path: str | Path = "model.html", **adapter_options: Any) -> Path:
    """Write the viewer for ``model`` to ``path`` as a single HTML file and return its path.

    Takes the same ``sample`` and options as ``show``. The file embeds the graph
    and the whole viewer, so it opens from disk or an email attachment, offline.
    """
    target = Path(path)
    target.write_text(standalone_page(to_graph(model, sample, **adapter_options)), encoding="utf-8")
    return target


def standalone_page(graph: Graph) -> str:
    """The viewer and ``graph`` as one HTML page (also served at /api/export for the Settings button)."""
    page = (_EXPORT_DIR / "index.html").read_text(encoding="utf-8")
    script = (_EXPORT_DIR / "viewer.js").read_text(encoding="utf-8")
    style = (_EXPORT_DIR / "viewer.css").read_text(encoding="utf-8")
    # "</" would end an inline <script> early; "<\/" means the same inside JS and JSON strings.
    data = graph.model_dump_json().replace("</", "<\\/")
    script = script.replace("</script", "<\\/script")
    inline = f'<script>window.__NEUROLUME_GRAPH__ = {data};</script><script type="module">{script}</script>'
    # Lambdas, so backslashes in the code aren't read as regex escapes.
    page = re.sub(r'<script[^>]*src="\./viewer\.js"></script>', lambda _: inline, page)
    page = re.sub(r'<link[^>]*href="\./viewer\.css">', lambda _: f"<style>{style}</style>", page)
    return page.replace("<title>Neurolume</title>", f"<title>{html.escape(graph.model.name)} · Neurolume</title>")
