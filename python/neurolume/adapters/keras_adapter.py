"""Keras 3 adapter.

Keras models already know their own graph: every layer records the layers
that feed it ("inbound nodes") and the shape of its output. This adapter reads
that graph and maps each layer onto the schema vocabulary, describing layers
the same way the PyTorch adapter does, so the same architecture built in
either framework produces an equivalent Graph.

Keras stores images channels-last, (height, width, channels); the schema uses
channels-first, (channels, height, width), like PyTorch. Shapes are converted
here, so the frontend never needs to know which framework a model came from.
"""

from __future__ import annotations

from typing import Any

import keras
import numpy as np

from ..schema import Graph, GraphEdge, GraphNode, ModelInfo, NodeType, WeightSample
from ..weights import DEFAULT_K, SampleMode, sample_dense
from .base import fold_activations

# Weights that hold running statistics rather than learned parameters. PyTorch
# keeps these as buffers, which it does not count as parameters, so neither do we.
STATISTICS = {"moving_mean", "moving_variance"}

ACTIVATION_LAYERS: dict[str, str] = {
    "ReLU": "relu",
    "LeakyReLU": "leaky_relu",
    "ELU": "elu",
    "Softmax": "softmax",
}


def from_keras(
    model: keras.Model,
    example_input: Any = None,
    *,
    fold_activations_into_layers: bool = True,
    weights: SampleMode | None = "topk",
    weight_k: int = DEFAULT_K,
) -> Graph:
    """Build a Graph from a Keras model.

    Models with an ``Input`` already know their shapes; a Sequential model
    without one is built by running ``example_input`` through it once.
    """
    if not model.built or not getattr(model, "inputs", None):
        if example_input is None:
            raise ValueError(
                f"{model.name} has not been built; pass an example input batch, or start the model with keras.Input(...)"
            )
        model(example_input)

    channels_last = keras.config.image_data_format() == "channels_last"
    nodes: list[GraphNode] = []
    edges: list[GraphEdge] = []
    ids: dict[str, str] = {}  # Keras layer name -> graph node id

    # Inputs: functional models list an InputLayer; Sequential models hide it.
    for index, tensor in enumerate(model.inputs):
        name = tensor._keras_history.operation.name
        ids[name] = "input" if len(model.inputs) == 1 else f"input_{index}"
        nodes.append(GraphNode(id=ids[name], type="input", label="Input", output_shape=_shape(tensor.shape, channels_last)))

    layers = [layer for layer in model.layers if type(layer).__name__ != "InputLayer"]
    for layer in layers:
        ids[layer.name] = layer.name
    for layer in layers:
        sources = [ids[name] for name in _inbound_layers(layer) if name in ids]
        input_shape = _shape(_input_shape(layer), channels_last)
        nodes.append(_layer_node(layer, input_shape, _shape(layer.output.shape, channels_last)))
        edges.extend(GraphEdge(source=source, target=layer.name, tensor_shape=input_shape) for source in sources)

    for index, tensor in enumerate(model.outputs):
        node_id = "output" if len(model.outputs) == 1 else f"output_{index}"
        shape = _shape(tensor.shape, channels_last)
        nodes.append(GraphNode(id=node_id, type="output", label="Output", input_shape=shape, output_shape=shape))
        edges.append(GraphEdge(source=ids[tensor._keras_history.operation.name], target=node_id, tensor_shape=shape))

    if fold_activations_into_layers:
        nodes, edges = fold_activations(nodes, edges)

    weight_samples: dict[str, WeightSample] | None = None
    if weights is not None:
        by_name = {layer.name: layer for layer in layers}
        weight_samples = {
            # Keras stores dense kernels as (in, out); sample_dense expects PyTorch's (out, in).
            node.id: sample_dense(keras.ops.convert_to_numpy(by_name[node.id].kernel).T, k=weight_k, mode=weights)
            for node in nodes
            if node.type == "dense" and node.id in by_name
        }

    return Graph(
        model=ModelInfo(name=model.name, framework="keras", total_params=sum(_param_count(layer) for layer in layers)),
        nodes=nodes,
        edges=edges,
        weights=weight_samples or None,
    )


def _layer_node(layer: keras.layers.Layer, input_shape: list[int], output_shape: list[int]) -> GraphNode:
    config = layer.get_config()
    kind = type(layer).__name__
    node_type: NodeType = "custom"
    params: dict[str, Any] = {}
    activation = _activation_name(config.get("activation"))

    if kind == "Dense":
        node_type = "dense"
        params = {"in_features": int(layer.kernel.shape[0]), "out_features": config["units"], "bias": config["use_bias"]}
    elif kind in ("Conv1D", "Conv2D"):
        node_type = "conv1d" if kind == "Conv1D" else "conv2d"
        params = {
            "in_channels": int(layer.kernel.shape[-2]),  # kernels are (*kernel_size, in, out)
            "out_channels": config["filters"],
            "kernel_size": list(config["kernel_size"]),
            "stride": list(config["strides"]),
            "padding": config["padding"],
            "bias": config["use_bias"],
        }
    elif kind in ("MaxPooling1D", "MaxPooling2D", "AveragePooling1D", "AveragePooling2D"):
        node_type = "pool"
        params = {
            "mode": "max" if kind.startswith("Max") else "avg",
            "kernel_size": list(config["pool_size"]),
            "stride": list(config["strides"]),
            "padding": config["padding"],
        }
    elif kind in ("GlobalAveragePooling1D", "GlobalAveragePooling2D", "GlobalMaxPooling1D", "GlobalMaxPooling2D"):
        node_type = "pool"
        params = {"mode": "max" if "Max" in kind else "avg", "global": True}
    elif kind == "BatchNormalization":
        node_type = "norm"
        params = {"num_features": int(layer.gamma.shape[0]) if layer.gamma is not None else None, "eps": config["epsilon"]}
    elif kind == "Dropout":
        node_type = "dropout"
        params = {"p": config["rate"]}
    elif kind == "Flatten":
        node_type = "flatten"
    elif kind == "Reshape":
        node_type = "reshape"
    elif kind == "Add":
        node_type = "add"
    elif kind == "Concatenate":
        node_type = "concat"
    elif kind == "Activation" or kind in ACTIVATION_LAYERS:
        node_type = "activation"
        activation = ACTIVATION_LAYERS.get(kind) or activation

    if node_type == "activation" and activation is None:
        node_type = "custom"  # a "linear" Activation layer does nothing worth drawing as an activation
    return GraphNode(
        id=layer.name,
        type=node_type,
        label=kind,
        input_shape=input_shape,
        output_shape=output_shape,
        params=params,
        param_count=_param_count(layer),
        activation=activation,
    )


def _activation_name(value: Any) -> str | None:
    """Keras configs name activations ("relu"), or serialise them as dicts; "linear" means none."""
    if isinstance(value, dict):
        value = value.get("config", {}).get("name") or value.get("class_name")
    if not isinstance(value, str) or value == "linear":
        return None
    return value.lower()


def _inbound_layers(layer: keras.layers.Layer) -> list[str]:
    """Names of the layers whose outputs this layer consumes."""
    names: list[str] = []
    for node in layer._inbound_nodes:
        for tensor in node.input_tensors:
            name = tensor._keras_history.operation.name
            if name not in names:
                names.append(name)
    return names


def _input_shape(layer: keras.layers.Layer) -> tuple[int | None, ...]:
    tensors = layer._inbound_nodes[0].input_tensors if layer._inbound_nodes else []
    return tuple(tensors[0].shape) if tensors else ()


def _shape(shape: tuple[int | None, ...], channels_last: bool) -> list[int]:
    """Drop the batch dimension and move channels first for image-like tensors."""
    dims = [int(size) for size in shape[1:] if size is not None]
    if channels_last and len(dims) == 3:
        dims = [dims[2], dims[0], dims[1]]
    return dims


def _param_count(layer: keras.layers.Layer) -> int:
    return int(sum(np.prod(weight.shape) for weight in layer.weights if weight.name not in STATISTICS))
