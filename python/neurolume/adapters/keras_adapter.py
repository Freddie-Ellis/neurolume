"""Keras 3 adapter.

Keras models already know their own graph: every layer records the layers
that feed it ("inbound nodes") and the shape of its output. This adapter reads
that graph and maps each layer onto the schema vocabulary, describing layers
the same way the PyTorch adapter does, so the same architecture built in
either framework produces an equivalent Graph.

Keras stores images channels-last, (height, width, channels); the schema uses
channels-first, (channels, height, width), like PyTorch. Shapes are converted
here, so the frontend never needs to know which framework a model came from.

A model used as a layer inside another model (an encoder, a backbone) is
opened up: its layers become nodes in a group named after it, so the viewer
shows it as its own network that opens to its layers.
"""

from __future__ import annotations

from typing import Any

import keras
import numpy as np

from ..feature_maps import feature_maps as encode_feature_maps
from ..schema import FeatureMaps, Graph, GraphEdge, GraphGroup, GraphNode, ModelInfo, NodeType, WeightSample
from ..weights import DEFAULT_K, SampleMode, sample_dense
from .base import carry_through_folds, fold_activations, is_shape

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
    sample: Any = None,
    *,
    fold_activations_into_layers: bool = True,
    weights: SampleMode | None = "topk",
    weight_k: int = DEFAULT_K,
    feature_maps: bool = True,
) -> Graph:
    """Build a Graph from a Keras model.

    Models that start with ``keras.Input`` already know their shapes, so
    ``sample`` is optional. A Sequential model without one is built from the
    sample: an input shape such as ``(28, 28, 1)`` (channels-last, as in
    Keras) or real data. With real data, ``feature_maps`` also records the
    output of image-like layers for its first example, which the viewer
    paints onto their slabs.
    """
    real_data = sample is not None and not is_shape(sample)
    if not model.built or not getattr(model, "inputs", None):
        if sample is None:
            raise ValueError(
                f"{model.name} doesn't know its input size yet. Start it with keras.Input(...), or pass the shape "
                "of one input (without the batch dimension), for example neurolume.show(model, (28, 28, 1))."
            )
        model(np.zeros((1, *sample), dtype="float32") if is_shape(sample) else sample)

    channels_last = keras.config.image_data_format() == "channels_last"
    nodes: list[GraphNode] = []
    edges: list[GraphEdge] = []
    ids: dict[str, str] = {}  # Keras layer name -> graph node id

    # Inputs: functional models list an InputLayer; Sequential models hide it.
    for index, tensor in enumerate(model.inputs):
        name = tensor._keras_history.operation.name
        ids[name] = "input" if len(model.inputs) == 1 else f"input_{index}"
        nodes.append(GraphNode(id=ids[name], type="input", label="Input", output_shape=_shape(tensor.shape, channels_last)))

    groups: list[GraphGroup] = []
    leaves: list[keras.layers.Layer] = []  # every layer that became a node, nested ones too
    _read_layers(model, None, channels_last, ids, nodes, edges, groups, leaves)
    layers = _own_layers(model)

    for index, tensor in enumerate(model.outputs):
        node_id = "output" if len(model.outputs) == 1 else f"output_{index}"
        shape = _shape(tensor.shape, channels_last)
        nodes.append(GraphNode(id=node_id, type="output", label="Output", input_shape=shape, output_shape=shape))
        edges.append(GraphEdge(source=ids[tensor._keras_history.operation.name], target=node_id, tensor_shape=shape))

    outputs: dict[str, np.ndarray] = {}
    if feature_maps and real_data:
        outputs = _image_outputs(model, channels_last, sample if isinstance(sample, (list, tuple)) else [sample])
        example = np.asarray(keras.ops.convert_to_numpy(sample))
        if len(model.inputs) == 1 and example.ndim == 4:  # the input image itself
            outputs[nodes[0].id] = _channels_first(example[0], channels_last)

    if fold_activations_into_layers:
        edges_before = edges
        nodes, edges = fold_activations(nodes, edges)
        outputs = carry_through_folds(edges_before, nodes, outputs)

    maps: dict[str, FeatureMaps] = {node_id: encode_feature_maps(output) for node_id, output in outputs.items()}

    weight_samples: dict[str, WeightSample] | None = None
    if weights is not None:
        by_name = {layer.name: layer for layer in leaves}
        weight_samples = {}
        for node in nodes:
            if node.type != "dense" or node.id not in by_name:
                continue
            kernel = keras.ops.convert_to_numpy(by_name[node.id].kernel)
            flattened = _flattened_image_shape(node, nodes, edges)
            if flattened is not None and channels_last:
                kernel = _rows_channels_first(kernel, flattened)
            # Keras stores dense kernels as (in, out); sample_dense expects PyTorch's (out, in).
            weight_samples[node.id] = sample_dense(kernel.T, k=weight_k, mode=weights)

    return Graph(
        model=ModelInfo(name=model.name, framework="keras", total_params=sum(_param_count(layer) for layer in layers)),
        nodes=nodes,
        edges=edges,
        groups=groups,
        weights=weight_samples or None,
        feature_maps=maps or None,
    )


def _own_layers(model: keras.Model) -> list[keras.layers.Layer]:
    return [layer for layer in model.layers if type(layer).__name__ != "InputLayer"]


def _read_layers(
    model: keras.Model,
    group: str | None,
    channels_last: bool,
    ids: dict[str, str],
    nodes: list[GraphNode],
    edges: list[GraphEdge],
    groups: list[GraphGroup],
    leaves: list[keras.layers.Layer],
) -> None:
    """Turn a model's layers into nodes and edges, opening up nested models.

    ``ids`` maps a Keras layer name to the node that carries its output. A
    nested model's inputs are mapped to whatever feeds it in the outer model,
    and its own name to its output layer, so edges pass straight through it.
    """
    for layer in _own_layers(model):
        sources = [ids[name] for name in _inbound_layers(layer) if name in ids]
        if isinstance(layer, keras.Model):
            groups.append(GraphGroup(id=layer.name, label=layer.name, parent=group, framework="keras"))
            for tensor, source in zip(layer.inputs, sources):
                ids[tensor._keras_history.operation.name] = source
            _read_layers(layer, layer.name, channels_last, ids, nodes, edges, groups, leaves)
            ids[layer.name] = ids[layer.outputs[0]._keras_history.operation.name]
            continue
        ids[layer.name] = layer.name
        leaves.append(layer)
        input_shape = _shape(_input_shape(layer), channels_last)
        node = _layer_node(layer, input_shape, _shape(layer.output.shape, channels_last))
        nodes.append(node.model_copy(update={"group": group}))
        edges.extend(GraphEdge(source=source, target=layer.name, tensor_shape=input_shape) for source in sources)


def _flattened_image_shape(node: GraphNode, nodes: list[GraphNode], edges: list[GraphEdge]) -> list[int] | None:
    """The [channels, height, width] shape a dense layer reads through a Flatten, if it does."""
    by_id = {candidate.id: candidate for candidate in nodes}
    current = node
    while True:
        sources = [edge.source for edge in edges if edge.target == current.id]
        if len(sources) != 1:
            return None
        current = by_id[sources[0]]
        if current.type == "flatten":
            return current.input_shape if len(current.input_shape) == 3 else None
        if current.type not in ("dropout", "activation"):  # layers that pass values through unchanged
            return None


def _rows_channels_first(kernel: np.ndarray, shape: list[int]) -> np.ndarray:
    """Reorder a dense kernel's input rows from Keras's (height, width, channels)
    flattening to the (channels, height, width) order the schema uses, so input
    index i means the same map cell in both frameworks."""
    channels, height, width = shape
    units = kernel.shape[1]
    return kernel.reshape(height, width, channels, units).transpose(2, 0, 1, 3).reshape(channels * height * width, units)


def _image_outputs(model: keras.Model, channels_last: bool, inputs: list[Any]) -> dict[str, np.ndarray]:
    """Each image-like layer's output for the first example, as [channels, height, width] arrays.

    A second model over the same layers returns every image-like output at once,
    plus the value going into each nested model, which is then probed the same
    way with that value as its input.
    """
    own = _own_layers(model)
    wanted = [layer for layer in own if not isinstance(layer, keras.Model) and len(layer.output.shape) == 4]
    nested = [layer for layer in own if isinstance(layer, keras.Model) and len(layer.inputs) == 1 and layer._inbound_nodes]
    feeds = [layer._inbound_nodes[0].input_tensors[0] for layer in nested]
    if not wanted and not nested:
        return {}
    probe = keras.Model(model.inputs, [layer.output for layer in wanted] + feeds)
    values = probe(inputs)
    values = list(values) if isinstance(values, (list, tuple)) else [values]

    outputs = {
        layer.name: _channels_first(keras.ops.convert_to_numpy(value)[0], channels_last)
        for layer, value in zip(wanted, values)
    }
    for layer, value in zip(nested, values[len(wanted) :]):
        outputs.update(_image_outputs(layer, channels_last, [value]))
    return outputs


def _channels_first(image: np.ndarray, channels_last: bool) -> np.ndarray:
    return np.transpose(image, (2, 0, 1)) if channels_last else image


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
