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
    ``model`` can also be a live ``Session`` (from ``watch()``): the file then
    holds the run too, with its charts and timeline (``EXPORT_SNAPSHOTS`` steps).
    """
    from .live import Session

    target = Path(path)
    if isinstance(model, Session):
        page = standalone_page(model.run.graph, model.run)
    else:
        page = standalone_page(to_graph(model, sample, **adapter_options))
    target.write_text(page, encoding="utf-8")
    return target


def standalone_page(graph: Graph, run: Any = None) -> str:
    """The viewer and ``graph`` as one HTML page (also served at /api/export for the Settings button).

    With a ``run`` (``neurolume.live.Run``) the page holds its history as
    ``window.__NEUROLUME_RUN__`` (a ``SavedRun`` without the graph) and shows it
    as a finished run; without one, a live graph is exported as a plain one.
    """
    from .live import EXPORT_SNAPSHOTS

    page = (_EXPORT_DIR / "index.html").read_text(encoding="utf-8")
    script = (_EXPORT_DIR / "viewer.js").read_text(encoding="utf-8")
    style = (_EXPORT_DIR / "viewer.css").read_text(encoding="utf-8")
    # "</" would end an inline <script> early; "<\/" means the same inside JS and JSON strings.
    data = graph.model_copy(update={"live": run is not None}).model_dump_json().replace("</", "<\\/")
    history = ""
    if run is not None:
        saved = run.saved(EXPORT_SNAPSHOTS).model_dump_json(exclude={"graph"}).replace("</", "<\\/")
        history = f"window.__NEUROLUME_RUN__ = {saved};"
    script = script.replace("</script", "<\\/script")
    inline = f'<script>window.__NEUROLUME_GRAPH__ = {data};{history}</script><script type="module">{script}</script>'
    # Lambdas, so backslashes in the code aren't read as regex escapes.
    page = re.sub(r'<script[^>]*src="\./viewer\.js"></script>', lambda _: inline, page)
    page = re.sub(r'<link[^>]*href="\./viewer\.css">', lambda _: f"<style>{style}</style>", page)
    return page.replace("<title>Neurolume</title>", f"<title>{html.escape(graph.model.name)} · Neurolume</title>")
