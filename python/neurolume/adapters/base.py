"""Framework detection, dispatch, and graph clean-up shared by all adapters."""

from __future__ import annotations

from typing import Any

from ..schema import Graph, GraphEdge, GraphNode
from ..system import System


def detect_framework(model: Any) -> str:
    """Name the framework a model comes from, without importing that framework."""
    modules = {cls.__module__.split(".")[0] for cls in type(model).__mro__}
    # Keras first: with the PyTorch backend, Keras models also subclass torch.nn.Module.
    if "keras" in modules or "tensorflow" in modules:
        return "keras"
    if "torch" in modules:
        return "pytorch"
    raise TypeError(f"unsupported model type {type(model).__name__}; expected a PyTorch or Keras model")


def to_graph(model: Any, example_input: Any = None, **options: Any) -> Graph:
    """Convert a PyTorch or Keras model, a System, or an existing Graph into a Graph."""
    if isinstance(model, Graph):
        return model
    if isinstance(model, System):
        return model.to_graph()

    framework = detect_framework(model)
    if framework == "pytorch":
        from .torch_adapter import from_torch

        return from_torch(model, example_input, **options)
    from .keras_adapter import from_keras

    return from_keras(model, example_input, **options)


def fold_activations(nodes: list[GraphNode], edges: list[GraphEdge]) -> tuple[list[GraphNode], list[GraphEdge]]:
    """Merge standalone activation nodes into the layer that feeds them.

    ``Linear -> ReLU`` becomes a single ``Linear`` node with ``activation="relu"``.
    A node is only folded when the merge is unambiguous: the activation has one
    producer, and that producer feeds nothing else and has no activation yet.
    """
    by_id = {node.id: node.model_copy() for node in nodes}
    edges = [edge.model_copy() for edge in edges]

    for node in nodes:
        if node.type != "activation":
            continue
        incoming = [edge for edge in edges if edge.target == node.id]
        if len(incoming) != 1:
            continue
        producer = by_id[incoming[0].source]
        producer_outgoing = [edge for edge in edges if edge.source == producer.id]
        if producer.type in ("input", "activation") or producer.activation or len(producer_outgoing) != 1:
            continue

        producer.activation = node.activation or node.label.lower()
        edges.remove(incoming[0])
        for edge in edges:
            if edge.source == node.id:
                edge.source = producer.id
        del by_id[node.id]

    kept = [by_id[node.id] for node in nodes if node.id in by_id]
    return kept, edges
