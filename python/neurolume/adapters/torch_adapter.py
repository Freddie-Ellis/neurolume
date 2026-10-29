"""PyTorch adapter.

The model is traced with ``torch.fx`` to find its topology, then the example
input is run through the traced graph once so every node records its real
tensor shape. Models that ``torch.fx`` cannot trace (for example because of
data-dependent control flow) fall back to a sequential walk of the leaf modules.
"""

from __future__ import annotations

import operator
import warnings
from collections import Counter
from collections.abc import Callable
from typing import Any

import torch
import torch.nn.functional as F
from torch import fx, nn
from torch.fx.passes.shape_prop import ShapeProp

from ..feature_maps import feature_maps as encode_feature_maps
from ..schema import FeatureMaps, Graph, GraphEdge, GraphGroup, GraphNode, ModelInfo, NodeType, WeightSample
from ..weights import DEFAULT_K, SampleMode, sample_dense
from .base import carry_through_folds, fold_activations, is_shape, needs_sample_error

ACTIVATION_MODULES: dict[type[nn.Module], str] = {
    nn.ReLU: "relu",
    nn.ReLU6: "relu6",
    nn.LeakyReLU: "leaky_relu",
    nn.ELU: "elu",
    nn.GELU: "gelu",
    nn.SiLU: "silu",
    nn.Mish: "mish",
    nn.Sigmoid: "sigmoid",
    nn.Tanh: "tanh",
    nn.Softplus: "softplus",
    nn.Softmax: "softmax",
    nn.LogSoftmax: "log_softmax",
}

ACTIVATION_FUNCTIONS: dict[Callable[..., Any], str] = {
    torch.relu: "relu",
    F.relu: "relu",
    F.leaky_relu: "leaky_relu",
    F.elu: "elu",
    F.gelu: "gelu",
    F.silu: "silu",
    torch.sigmoid: "sigmoid",
    F.sigmoid: "sigmoid",
    torch.tanh: "tanh",
    F.tanh: "tanh",
    torch.softmax: "softmax",
    F.softmax: "softmax",
    F.log_softmax: "log_softmax",
}

ACTIVATION_METHODS = {"relu", "sigmoid", "tanh", "softmax", "log_softmax"}


def from_torch(
    model: nn.Module,
    sample: Any = None,
    *,
    fold_activations_into_layers: bool = True,
    weights: SampleMode | None = "topk",
    weight_k: int = DEFAULT_K,
    group_submodules: bool | None = None,
    feature_maps: bool = True,
) -> Graph:
    """Build a Graph from a PyTorch module and a sample: an input shape or real data (see ``to_graph``).

    With real data, ``feature_maps`` records the output of image-like layers for
    the first example in the batch, which the viewer paints onto their slabs.

    ``group_submodules`` groups layers by the top-level child module they live
    in (``self.encoder``, ``self.decoder``), so the viewer shows each as its own
    network in a system overview. ``None`` does this automatically when the
    model has at least two such sub-networks.
    """
    if sample is None:
        raise needs_sample_error(model)
    real_data = not _is_shapes(sample)
    inputs = _as_inputs(sample)
    was_training = model.training
    model.eval()  # avoid updating BatchNorm statistics while measuring shapes
    try:
        with torch.no_grad():
            try:
                nodes, edges, modules, outputs = _trace_with_fx(model, inputs)
            except Exception as error:  # fx raises many different error types
                warnings.warn(
                    f"torch.fx could not trace {type(model).__name__} ({error}); "
                    "falling back to a sequential walk of its modules",
                    stacklevel=3,
                )
                nodes, edges, modules = _walk_modules(model, inputs)
                outputs = {}
    finally:
        model.train(was_training)

    if fold_activations_into_layers:
        edges_before = edges
        nodes, edges = fold_activations(nodes, edges)
        outputs = carry_through_folds(edges_before, nodes, outputs)

    maps: dict[str, FeatureMaps] = {}
    if feature_maps and real_data:  # zeros made up from a shape would only give blank pictures
        maps = {node_id: encode_feature_maps(output.numpy()) for node_id, output in outputs.items()}

    groups: list[GraphGroup] = []
    if group_submodules is not False:
        nodes, groups = _group_by_submodule(model, nodes, modules, minimum=1 if group_submodules else 2)

    weight_samples: dict[str, WeightSample] | None = None
    if weights is not None:
        weight_samples = {
            node.id: sample_dense(modules[node.id].weight.detach().cpu().numpy(), k=weight_k, mode=weights)
            for node in nodes
            if node.type == "dense" and node.id in modules
        }

    return Graph(
        model=ModelInfo(
            name=type(model).__name__,
            framework="pytorch",
            total_params=sum(parameter.numel() for parameter in model.parameters()),
        ),
        nodes=nodes,
        edges=edges,
        groups=groups,
        weights=weight_samples or None,
        feature_maps=maps or None,
    )


class _RecordingShapeProp(ShapeProp):
    """ShapeProp that also keeps every image-like output (the first example of the batch)."""

    def __init__(self, module: fx.GraphModule) -> None:
        super().__init__(module)
        self.outputs: dict[str, torch.Tensor] = {}

    def run_node(self, n: fx.Node) -> Any:
        result = super().run_node(n)
        if isinstance(result, torch.Tensor) and result.dim() == 4:  # [batch, channels, height, width]
            self.outputs[n.name] = result[0].detach().float().cpu()
        return result


def _group_by_submodule(
    model: nn.Module, nodes: list[GraphNode], modules: dict[str, nn.Module], *, minimum: int
) -> tuple[list[GraphNode], list[GraphGroup]]:
    """Put each layer in a group named after the top-level child module that contains it.

    Only children that hold at least two layers count as sub-networks; if fewer
    than ``minimum`` are found, the graph is left ungrouped. Layers outside any
    sub-network (and operations such as torch.cat between them) stay ungrouped.
    """
    qualified_names = {id(module): name for name, module in model.named_modules() if name}
    owner: dict[str, str] = {}
    for node in nodes:
        module = modules.get(node.id)
        name = qualified_names.get(id(module)) if module is not None else None
        if name and "." in name:
            owner[node.id] = name.split(".")[0]

    layer_counts = Counter(owner.values())
    networks = [child for child, count in layer_counts.items() if count >= 2]
    if len(networks) < minimum:
        return nodes, []

    grouped = [node.model_copy(update={"group": owner[node.id]}) if owner.get(node.id) in networks else node for node in nodes]
    return grouped, [GraphGroup(id=child, label=child, framework="pytorch") for child in networks]


def _trace_with_fx(
    model: nn.Module, inputs: tuple[Any, ...]
) -> tuple[list[GraphNode], list[GraphEdge], dict[str, nn.Module], dict[str, torch.Tensor]]:
    traced = fx.symbolic_trace(model)
    recorder = _RecordingShapeProp(traced)
    if inputs:
        recorder.propagate(*inputs)

    nodes: list[GraphNode] = []
    edges: list[GraphEdge] = []
    modules: dict[str, nn.Module] = {}
    ids: dict[str, str] = {}  # fx node name -> graph node id
    placeholders = [fx_node for fx_node in traced.graph.nodes if fx_node.op == "placeholder"]

    for fx_node in traced.graph.nodes:
        if fx_node.op == "get_attr":
            continue  # parameters read directly are not layers

        # Prefer readable ids such as "fc1" or "encoder_0" over fx's "_0" style.
        preferred = fx_node.name
        if fx_node.op == "call_module":
            preferred = str(fx_node.target).replace(".", "_")
        elif fx_node.op == "placeholder" and len(placeholders) == 1:
            preferred = "input"
        node_id = preferred if preferred not in ids.values() else fx_node.name
        ids[fx_node.name] = node_id

        sources = [source for source in fx_node.all_input_nodes if source.name in ids]
        input_shape = _shape_of(sources[0]) if sources else []

        if fx_node.op == "placeholder":
            node = GraphNode(id=node_id, type="input", label="Input", output_shape=_shape_of(fx_node))
        elif fx_node.op == "output":
            node = GraphNode(
                id=node_id, type="output", label="Output", input_shape=input_shape, output_shape=input_shape
            )
        elif fx_node.op == "call_module":
            module = traced.get_submodule(fx_node.target)
            modules[node_id] = module
            node = _module_node(node_id, module, input_shape, _shape_of(fx_node))
        else:
            node_type, activation = _describe_call(fx_node)
            node = GraphNode(
                id=node_id,
                type=node_type,
                label=_call_label(fx_node),
                input_shape=input_shape,
                output_shape=_shape_of(fx_node),
                activation=activation,
            )

        nodes.append(node)
        edges.extend(
            GraphEdge(source=ids[source.name], target=node_id, tensor_shape=_shape_of(source)) for source in sources
        )

    outputs = {ids[name]: output for name, output in recorder.outputs.items() if name in ids}
    return nodes, edges, modules, outputs


def _walk_modules(
    model: nn.Module, inputs: tuple[Any, ...]
) -> tuple[list[GraphNode], list[GraphEdge], dict[str, nn.Module]]:
    """Fallback: treat the leaf modules as a chain, in the order they run."""
    leaves = [(name, module) for name, module in model.named_modules() if name and not any(module.children())]
    if not leaves:
        leaves = [(type(model).__name__.lower(), model)]

    calls: list[tuple[str, nn.Module, list[int], list[int]]] = []
    if inputs:
        handles = [
            module.register_forward_hook(
                lambda module, args, output, name=name: calls.append(
                    (name, module, _tensor_shape(args[0] if args else None), _tensor_shape(output))
                )
            )
            for name, module in leaves
        ]
        try:
            model(*inputs)
        finally:
            for handle in handles:
                handle.remove()
    else:
        calls = [(name, module, [], []) for name, module in leaves]

    first_shape = _tensor_shape(inputs[0]) if inputs else []
    nodes = [GraphNode(id="input", type="input", label="Input", output_shape=first_shape)]
    modules: dict[str, nn.Module] = {}
    for index, (name, module, input_shape, output_shape) in enumerate(calls):
        node_id = name.replace(".", "_")
        if node_id in modules:  # a module called twice gets a numbered id
            node_id = f"{node_id}_{index}"
        modules[node_id] = module
        nodes.append(_module_node(node_id, module, input_shape, output_shape))
    last_shape = nodes[-1].output_shape
    nodes.append(GraphNode(id="output", type="output", label="Output", input_shape=last_shape, output_shape=last_shape))

    edges = [
        GraphEdge(source=source.id, target=target.id, tensor_shape=source.output_shape)
        for source, target in zip(nodes, nodes[1:])
    ]
    return nodes, edges, modules


def _module_node(node_id: str, module: nn.Module, input_shape: list[int], output_shape: list[int]) -> GraphNode:
    node_type: NodeType = "custom"
    params: dict[str, Any] = {}
    activation: str | None = None

    if isinstance(module, nn.Linear):
        node_type = "dense"
        params = {"in_features": module.in_features, "out_features": module.out_features, "bias": module.bias is not None}
    elif type(module) in ACTIVATION_MODULES:
        node_type = "activation"
        activation = ACTIVATION_MODULES[type(module)]
    elif isinstance(module, nn.modules.dropout._DropoutNd):
        node_type = "dropout"
        params = {"p": module.p}
    elif isinstance(module, nn.Flatten):
        node_type = "flatten"
    elif isinstance(module, (nn.Conv1d, nn.Conv2d)):
        node_type = "conv1d" if isinstance(module, nn.Conv1d) else "conv2d"
        params = {
            "in_channels": module.in_channels,
            "out_channels": module.out_channels,
            "kernel_size": list(module.kernel_size),
            "stride": list(module.stride),
            "padding": _padding(module.padding, module.kernel_size, module.stride),
            "bias": module.bias is not None,
        }
    elif isinstance(module, (nn.MaxPool1d, nn.MaxPool2d, nn.AvgPool1d, nn.AvgPool2d)):
        node_type = "pool"
        dims = 1 if isinstance(module, (nn.MaxPool1d, nn.AvgPool1d)) else 2
        kernel = _pair(module.kernel_size, dims)
        stride = _pair(module.stride or module.kernel_size, dims)
        params = {
            "mode": "max" if isinstance(module, (nn.MaxPool1d, nn.MaxPool2d)) else "avg",
            "kernel_size": kernel,
            "stride": stride,
            "padding": _padding(_pair(module.padding, dims), kernel, stride),
        }
    elif isinstance(module, (nn.AdaptiveAvgPool1d, nn.AdaptiveAvgPool2d, nn.AdaptiveMaxPool1d, nn.AdaptiveMaxPool2d)):
        node_type = "pool"
        mode = "max" if isinstance(module, (nn.AdaptiveMaxPool1d, nn.AdaptiveMaxPool2d)) else "avg"
        params = {"mode": mode, "output_size": module.output_size}
    elif isinstance(module, nn.modules.batchnorm._BatchNorm):
        node_type = "norm"
        params = {"num_features": module.num_features, "eps": module.eps}

    return GraphNode(
        id=node_id,
        type=node_type,
        label=type(module).__name__,
        input_shape=input_shape,
        output_shape=output_shape,
        params=params,
        param_count=sum(parameter.numel() for parameter in module.parameters()),
        activation=activation,
    )


def _pair(value: int | tuple[int, ...], dims: int) -> list[int]:
    """`2` -> `[2, 2]`, so kernel sizes and strides always have one entry per spatial dimension."""
    return list(value) if isinstance(value, tuple) else [value] * dims


def _padding(padding: str | tuple[int, ...] | list[int], kernel: tuple[int, ...] | list[int], stride: tuple[int, ...] | list[int]) -> str | list[int]:
    """Describe padding the way Keras does where they mean the same thing.

    No padding is ``"valid"``; padding that keeps the size of an odd kernel at
    stride 1 is ``"same"``; anything else stays a list of per-side amounts.
    """
    if isinstance(padding, str):
        return padding
    amounts = list(padding)
    if all(amount == 0 for amount in amounts):
        return "valid"
    if all(s == 1 and k % 2 == 1 and p == (k - 1) // 2 for p, k, s in zip(amounts, kernel, stride)):
        return "same"
    return amounts


def _describe_call(fx_node: fx.Node) -> tuple[NodeType, str | None]:
    """Map a call_function or call_method node onto the schema vocabulary."""
    target = fx_node.target
    if fx_node.op == "call_method":
        if target in ACTIVATION_METHODS:
            return "activation", str(target)
        if target == "flatten":
            return "flatten", None
        if target in ("view", "reshape"):
            return "reshape", None
        if target == "add":
            return "add", None
        return "custom", None

    if target in ACTIVATION_FUNCTIONS:
        return "activation", ACTIVATION_FUNCTIONS[target]
    if target is torch.flatten:
        return "flatten", None
    if target is torch.reshape:
        return "reshape", None
    if target in (operator.add, torch.add):
        return "add", None
    if target is torch.cat:
        return "concat", None
    if target in (F.max_pool1d, F.max_pool2d, F.avg_pool1d, F.avg_pool2d, F.adaptive_avg_pool2d):
        return "pool", None
    return "custom", None


def _call_label(fx_node: fx.Node) -> str:
    target = fx_node.target
    return target if isinstance(target, str) else getattr(target, "__name__", str(target))


def _shape_of(fx_node: fx.Node) -> list[int]:
    """Shape recorded by ShapeProp, without the batch dimension."""
    meta = fx_node.meta.get("tensor_meta")
    shape = getattr(meta, "shape", None)
    return list(shape[1:]) if shape is not None else []


def _tensor_shape(value: Any) -> list[int]:
    return list(value.shape[1:]) if isinstance(value, torch.Tensor) else []


def _is_shapes(sample: Any) -> bool:
    """A shape, or one shape per input of a multi-input model."""
    return is_shape(sample) or (isinstance(sample, (tuple, list)) and len(sample) > 0 and all(is_shape(item) for item in sample))


def _as_inputs(sample: Any) -> tuple[Any, ...]:
    """The model's positional inputs: real tensors as given, or a zero batch of one per shape."""
    if is_shape(sample):
        return (torch.zeros(1, *sample),)
    items = tuple(sample) if isinstance(sample, (tuple, list)) else (sample,)
    return tuple(torch.zeros(1, *item) if is_shape(item) else item for item in items)
