"""Framework-independent graph data used by the viewer.

This module is the contract between the Python adapters and the frontend.
Shapes exclude the batch dimension and are channels-first for images
([channels, height, width]) whatever the framework.
Any change here must bump ``SCHEMA_VERSION`` and regenerate
``frontend/src/schema.ts`` with ``python scripts/generate_schema_ts.py``.
"""

from typing import Any, ClassVar, Final, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

SCHEMA_VERSION: Final[str] = "1.3"

NodeType = Literal[
    "input",
    "output",
    "dense",
    "conv1d",
    "conv2d",
    "pool",
    "norm",
    "activation",
    "dropout",
    "flatten",
    "reshape",
    "embedding",
    "attention",
    "recurrent",
    "add",
    "concat",
    "custom",
]


class ModelInfo(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    name: str
    framework: str
    total_params: int = Field(ge=0)


class GraphNode(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    id: str
    type: NodeType
    label: str
    group: str | None = None
    input_shape: list[int] = Field(default_factory=list)
    output_shape: list[int] = Field(default_factory=list)
    params: dict[str, Any] = Field(default_factory=dict)
    param_count: int = Field(default=0, ge=0)
    activation: str | None = None
    # Longer Markdown text (with $LaTeX$ maths) shown when the node is opened, e.g. a System block.
    notes: str | None = None


class GraphEdge(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    source: str
    target: str
    tensor_shape: list[int] = Field(default_factory=list)
    # Optional caption for the connection, e.g. "latent" between two networks.
    label: str | None = None


class GraphGroup(BaseModel):
    """A set of nodes shown together, such as one network inside a larger system."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    id: str
    label: str
    parent: str | None = None
    collapsed: bool = False
    # Set when the group is a whole network, so mixed PyTorch/Keras systems can say which is which.
    framework: str | None = None


class WeightSample(BaseModel):
    """A sampled subset of one dense layer's weights.

    Each pair is ``[from_index, to_index, value]``: ``from_index`` is an input
    feature of the layer and ``to_index`` is one of its output units.
    """

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    mode: Literal["topk", "random"]
    k: int = Field(ge=0)
    pairs: list[tuple[int, int, float]]


class FeatureMaps(BaseModel):
    """A few channels of one layer's output for the sample input, as small greyscale images.

    ``channels`` are the channel numbers shown, most active first. ``data`` is base64 of ``len(channels) * height * width`` bytes: channel by
    channel, each image row by row from the top. Each channel is scaled to
    0-255 on its own, so the images show where a channel responds, not how strongly.
    """

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    channels: list[int]
    height: int = Field(ge=1)
    width: int = Field(ge=1)
    data: str


class Graph(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    schema_version: str = SCHEMA_VERSION
    model: ModelInfo
    nodes: list[GraphNode]
    edges: list[GraphEdge]
    groups: list[GraphGroup] = Field(default_factory=list)
    weights: dict[str, WeightSample] | None = None
    # Outputs of image-like layers for the sample input (real data only), keyed by node id.
    feature_maps: dict[str, FeatureMaps] | None = None

    @model_validator(mode="after")
    def _check_references(self) -> "Graph":
        node_ids = [node.id for node in self.nodes]
        known_nodes = set(node_ids)
        if len(known_nodes) != len(node_ids):
            raise ValueError("node ids must be unique")

        known_groups = {group.id for group in self.groups}
        for edge in self.edges:
            for end in (edge.source, edge.target):
                if end not in known_nodes:
                    raise ValueError(f"edge refers to unknown node {end!r}")
        for node in self.nodes:
            if node.group is not None and node.group not in known_groups:
                raise ValueError(f"node {node.id!r} refers to unknown group {node.group!r}")
        for group in self.groups:
            if group.parent is not None and group.parent not in known_groups:
                raise ValueError(f"group {group.id!r} refers to unknown parent {group.parent!r}")
        for node_id in self.weights or {}:
            if node_id not in known_nodes:
                raise ValueError(f"weights refer to unknown node {node_id!r}")
        for node_id in self.feature_maps or {}:
            if node_id not in known_nodes:
                raise ValueError(f"feature maps refer to unknown node {node_id!r}")
        return self
