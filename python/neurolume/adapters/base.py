"""Framework detection, dispatch, and graph clean-up shared by all adapters."""

from __future__ import annotations

from typing import Any, TypeVar

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


def to_graph(model: Any, sample: Any = None, **options: Any) -> Graph:
    """Convert a PyTorch or Keras model, a System, or an existing Graph into a Graph.

    ``sample`` is what to run through the model to measure it, either:

    - the **shape** of one input, without the batch dimension, like
      ``keras.Input``: ``(1, 28, 28)``. Enough to draw the architecture.
    - **real data**, a batch such as ``torch.randn(1, 1, 28, 28)`` or an image.
      Also records what each convolution outputs, drawn on its feature maps.

    PyTorch models need one, because they don't store their input size. Keras
    models that start with ``keras.Input`` don't.
    """
    if isinstance(model, Graph):
        return model
    if isinstance(model, System):
        return model.to_graph()

    framework = detect_framework(model)
    if framework == "pytorch":
        from .torch_adapter import from_torch

        return from_torch(model, sample, **options)
    from .keras_adapter import from_keras

    return from_keras(model, sample, **options)


def is_shape(value: Any) -> bool:
    """True for an input shape such as ``(1, 28, 28)`` or a ``torch.Size``; False for data."""
    return isinstance(value, (tuple, list)) and len(value) > 0 and all(isinstance(size, int) and not isinstance(size, bool) for size in value)


def needs_sample_error(model: Any) -> ValueError:
    return ValueError(
        f"{type(model).__name__} doesn't record its input size, so Neurolume runs one input through it to "
        "measure every layer. Pass the shape of one input (without the batch dimension), for example "
        "neurolume.show(model, (1, 28, 28)), or real data such as an image batch, which also draws what "
        "each convolution outputs."
    )


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


T = TypeVar("T")


def carry_through_folds(edges_before: list[GraphEdge], nodes_after: list[GraphNode], per_node: dict[str, T]) -> dict[str, T]:
    """Re-key per-node data after fold_activations.

    A layer that had its activation folded into it now stands for the
    activation's output too, so it takes the data recorded for that
    activation (e.g. its feature maps after the ReLU).
    """
    kept = {node.id for node in nodes_after}
    result = {node_id: value for node_id, value in per_node.items() if node_id in kept}
    for edge in edges_before:
        if edge.target not in kept and edge.source in kept and edge.target in per_node:
            result[edge.source] = per_node[edge.target]
    return result
