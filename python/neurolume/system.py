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

from dataclasses import dataclass
from typing import Any

from .schema import Graph, GraphEdge, GraphGroup, GraphNode, ModelInfo, WeightSample

SEPARATOR = "/"


@dataclass(frozen=True)
class Component:
    """A network or block inside a System. Pass it to :meth:`System.connect`."""

    name: str
    kind: str  # "network" or "block"


class System:
    def __init__(self, name: str = "System") -> None:
        self.name = name
        self._networks: dict[str, Graph] = {}
        self._labels: dict[str, str] = {}
        self._blocks: dict[str, GraphNode] = {}
        self._links: list[tuple[Component, Component, str | None]] = []

    def add(self, name: str, model: Any, example_input: Any = None, *, label: str | None = None, **adapter_options: Any) -> Component:
        """Add a network: a PyTorch or Keras model, or a ready-made Graph."""
        from .adapters import to_graph

        self._check_name(name)
        self._networks[name] = to_graph(model, example_input, **adapter_options)
        self._labels[name] = label or name
        return Component(name, "network")

    def block(
        self,
        name: str,
        *,
        label: str | None = None,
        description: str | None = None,
        input_shape: list[int] | None = None,
        output_shape: list[int] | None = None,
    ) -> Component:
        """Add a plain labelled block, such as a tokenizer, data source or loss."""
        self._check_name(name)
        self._blocks[name] = GraphNode(
            id=name,
            type="custom",
            label=label or name,
            input_shape=input_shape or [],
            output_shape=output_shape or [],
            params={"description": description} if description else {},
        )
        return Component(name, "block")

    def connect(self, source: Component, target: Component, *, label: str | None = None) -> None:
        """Feed the output of `source` into the input of `target`."""
        for component in (source, target):
            if component.name not in self._networks and component.name not in self._blocks:
                raise ValueError(f"{component.name!r} is not part of this system")
        self._links.append((source, target, label))

    def to_graph(self) -> Graph:
        nodes: list[GraphNode] = []
        edges: list[GraphEdge] = []
        groups: list[GraphGroup] = []
        weights: dict[str, WeightSample] = {}

        for name, graph in self._networks.items():
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
        nodes.extend(self._blocks.values())

        for source, target, label in self._links:
            exit_node = self._exit_node(source)
            edges.append(
                GraphEdge(
                    source=exit_node.id,
                    target=self._entry_node(target).id,
                    tensor_shape=exit_node.output_shape,
                    label=label,
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
        )

    def _check_name(self, name: str) -> None:
        if not name or SEPARATOR in name:
            raise ValueError(f"component names must be non-empty and cannot contain {SEPARATOR!r}: {name!r}")
        if name in self._networks or name in self._blocks:
            raise ValueError(f"a component called {name!r} already exists")

    def _exit_node(self, component: Component) -> GraphNode:
        """The node whose output leaves a component: a network's output, or the block itself."""
        if component.name in self._blocks:
            return self._blocks[component.name]
        graph = self._networks[component.name]
        outputs = [node for node in graph.nodes if node.type == "output"]
        node = outputs[-1] if outputs else graph.nodes[-1]
        return node.model_copy(update={"id": f"{component.name}{SEPARATOR}{node.id}"})

    def _entry_node(self, component: Component) -> GraphNode:
        """The node that receives input: a network's (first) input, or the block itself."""
        if component.name in self._blocks:
            return self._blocks[component.name]
        graph = self._networks[component.name]
        inputs = [node for node in graph.nodes if node.type == "input"]
        node = inputs[0] if inputs else graph.nodes[0]
        return node.model_copy(update={"id": f"{component.name}{SEPARATOR}{node.id}"})
