"""Link several networks (and plain blocks) into one system schematic.

    system = neurolume.System("Sensor pipeline")
    sensor = system.block("Sensor", output_shape=[32])
    encoder = system.add("encoder", encoder_model, torch.randn(1, 32))
    head = system.add("classifier", classifier_model, torch.randn(1, 16))
    system.connect(sensor, encoder)
    system.connect(encoder, head, label="latent")
    neurolume.show(system)

Each network becomes a group in the combined graph and its node ids are
prefixed with the network's name ("encoder/fc1"), so two networks can have
layers with the same name.
"""

from __future__ import annotations

import inspect
import warnings
from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from .schema import FeatureMaps, Graph, GraphEdge, GraphGroup, GraphNode, ModelInfo, WeightSample

SEPARATOR = "/"


@dataclass(frozen=True)
class Component:
    """A network or block inside a System. Pass it to :meth:`System.connect`."""

    name: str
    kind: str  # "network" or "block"


@dataclass(frozen=True)
class _Link:
    """One `System.connect` call."""

    source: Component
    target: Component
    label: str | None
    to: str | None
    from_: str | None
    shape: list[int] | None


class System:
    def __init__(self, name: str = "System") -> None:
        self.name = name
        self._networks: dict[str, Graph] = {}
        self._models: dict[str, tuple[Any, Any]] = {}  # name -> (model, sample), for watch() to read as it trains
        self._labels: dict[str, str] = {}
        self._blocks: dict[str, GraphNode] = {}
        self._links: list[_Link] = []
        self._order: list[str] = []  # component names in the order they were added

    def add(self, name: str, model: Any, sample: Any = None, *, label: str | None = None, **adapter_options: Any) -> Component:
        """Add a network: a PyTorch or Keras model, or a ready-made Graph.

        ``sample`` is an input shape such as ``(1, 28, 28)`` or real data (see ``neurolume.to_graph``).
        """
        from .adapters import to_graph

        self._check_name(name)
        self._networks[name] = to_graph(model, sample, **adapter_options)
        self._models[name] = (model, sample)
        self._labels[name] = label or name
        self._order.append(name)
        return Component(name, "network")

    def block(
        self,
        name: str,
        *,
        label: str | None = None,
        description: str | None = None,
        input_shape: list[int] | None = None,
        output_shape: list[int] | None = None,
        notes: str | None = None,
    ) -> Component:
        """Add a plain labelled block, such as a tokenizer, data source or loss.

        `description` is one short line shown on the block's card. `notes` is
        Markdown shown on its own page when the block is opened; it may contain
        maths as LaTeX between `$...$` (inline) or `$$...$$` (display). Use a
        raw string (an r-prefixed string) so backslashes reach LaTeX unchanged.
        """
        self._check_name(name)
        self._blocks[name] = GraphNode(
            id=name,
            type="custom",
            label=label or name,
            input_shape=input_shape or [],
            output_shape=output_shape or [],
            params={"description": description} if description else {},
            # cleandoc strips the indentation of a triple-quoted string, which
            # Markdown would otherwise read as a code block.
            notes=inspect.cleandoc(notes) if notes else None,
        )
        self._order.append(name)
        return Component(name, "block")

    def connect(
        self,
        source: Component,
        target: Component,
        *,
        label: str | None = None,
        to: str | None = None,
        from_: str | None = None,
        shape: list[int] | None = None,
    ) -> None:
        """Feed the output of `source` into the input of `target`.

        For a network with several inputs, `to` names the one to feed (a
        PyTorch input is named after its `forward` argument, e.g. ``to="act"``);
        `from_` likewise picks one of several outputs. `shape` overrides the
        shape the link carries, e.g. when a block sends different things to
        different targets.
        """
        for component in (source, target):
            if component.name not in self._networks and component.name not in self._blocks:
                raise ValueError(f"{component.name!r} is not part of this system")
        link = _Link(source, target, label, to, from_, shape)
        # Fail now, not in to_graph, when a name is wrong, and warn when a missing name leaves a guess.
        self._exit_node(source, from_, warn=True)
        self._entry_node(target, to, warn=True)
        self._links.append(link)

    def to_graph(self) -> Graph:
        nodes: list[GraphNode] = []
        edges: list[GraphEdge] = []
        groups: list[GraphGroup] = []
        weights: dict[str, WeightSample] = {}
        feature_maps: dict[str, FeatureMaps] = {}

        # Components in the order they were added: the viewer breaks feedback
        # loops starting from the first one, so it reads left to right.
        for name in self._order:
            if name in self._blocks:
                nodes.append(self._blocks[name])
                continue
            graph = self._networks[name]
            prefix = f"{name}{SEPARATOR}"
            groups.append(GraphGroup(id=name, label=self._labels[name], framework=graph.model.framework))
            for group in graph.groups:
                groups.append(group.model_copy(update={"id": prefix + group.id, "parent": prefix + group.parent if group.parent else name}))
            for node in graph.nodes:
                group = prefix + node.group if node.group else name
                nodes.append(node.model_copy(update={"id": prefix + node.id, "group": group}))
            for edge in graph.edges:
                edges.append(edge.model_copy(update={"source": prefix + edge.source, "target": prefix + edge.target}))
            for node_id, sample in (graph.weights or {}).items():
                weights[prefix + node_id] = sample
            for node_id, maps in (graph.feature_maps or {}).items():
                feature_maps[prefix + node_id] = maps

        for link in self._links:
            exit_node = self._exit_node(link.source, link.from_)
            edges.append(
                GraphEdge(
                    source=exit_node.id,
                    target=self._entry_node(link.target, link.to).id,
                    tensor_shape=link.shape if link.shape is not None else exit_node.output_shape,
                    label=link.label,
                )
            )

        frameworks = {graph.model.framework for graph in self._networks.values()}
        return Graph(
            model=ModelInfo(
                name=self.name,
                framework=frameworks.pop() if len(frameworks) == 1 else "mixed",
                total_params=sum(graph.model.total_params for graph in self._networks.values()),
            ),
            nodes=nodes,
            edges=edges,
            groups=groups,
            weights=weights or None,
            feature_maps=feature_maps or None,
        )

    def _check_name(self, name: str) -> None:
        if not name or SEPARATOR in name:
            raise ValueError(f"component names must be non-empty and cannot contain {SEPARATOR!r}: {name!r}")
        if name in self._networks or name in self._blocks:
            raise ValueError(f"a component called {name!r} already exists")

    def _exit_node(self, component: Component, name: str | None = None, *, warn: bool = False) -> GraphNode:
        """The node whose output leaves a component: the block itself, or the last
        node of a network that feeds nothing else (its output, or for a System
        added as a network, its last end, such as a prediction block). `name`
        picks one of those ends by id."""
        feeds = {edge.source for edge in self._networks[component.name].edges} if component.name in self._networks else set()
        return self._end(component, name, "from_", lambda node: node.id not in feeds, last=True, warn=warn)

    def _entry_node(self, component: Component, name: str | None = None, *, warn: bool = False) -> GraphNode:
        """The node that receives input: the block itself, or the first node of a
        network that nothing feeds (its input, or for a System, its first source).
        `name` picks one of those inputs by id."""
        fed = {edge.target for edge in self._networks[component.name].edges} if component.name in self._networks else set()
        return self._end(component, name, "to", lambda node: node.id not in fed, last=False, warn=warn)

    def _end(
        self, component: Component, name: str | None, argument: str, is_end: Callable[[GraphNode], bool], *, last: bool, warn: bool
    ) -> GraphNode:
        if component.name in self._blocks:
            if name is not None:
                raise ValueError(f"{argument}={name!r}: {component.name!r} is a block, which has only one input and output")
            return self._blocks[component.name]
        graph = self._networks[component.name]
        ends = [node for node in graph.nodes if is_end(node)] or [graph.nodes[-1] if last else graph.nodes[0]]
        if name is None:
            node = ends[-1] if last else ends[0]
            if warn and len(ends) > 1:
                # A PyTorch network gets one input per `forward` argument, so without a name every link would
                # silently land on the first one.
                warnings.warn(
                    f"{component.name!r} has several {'outputs' if last else 'inputs'} "
                    f"({', '.join(end.id for end in ends)}); linking to {node.id!r}. "
                    f"Pass {argument}='<name>' to connect the right one",
                    stacklevel=4,
                )
        else:
            matches = [node for node in ends if node.id == name]
            if not matches:
                raise ValueError(f"{argument}={name!r} is not one of {component.name!r}'s names: {', '.join(node.id for node in ends)}")
            node = matches[0]
        return node.model_copy(update={"id": f"{component.name}{SEPARATOR}{node.id}"})
