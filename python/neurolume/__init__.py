"""Public API for Neurolume."""

import importlib
from typing import Any

from .adapters import to_graph
from .export import export_html
from .live import Session, open_run, watch
from .schema import SCHEMA_VERSION, Graph
from .server import Viewer, show, show_demo
from .system import Component, System

__all__ = ["SCHEMA_VERSION", "Component", "Graph", "Session", "System", "Viewer", "export_html", "open_run", "show", "show_demo", "to_graph", "watch"]


def __getattr__(name: str) -> Any:
    """``neurolume.keras`` (the live callback) is imported on first use, so ``import neurolume`` never imports Keras."""
    if name == "keras":
        return importlib.import_module(".keras", __name__)
    raise AttributeError(f"module 'neurolume' has no attribute {name!r}")
