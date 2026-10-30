"""Framework-independent graph data used by the viewer.

This module is the contract between the Python adapters and the frontend.
Shapes exclude the batch dimension and are channels-first for images
([channels, height, width]) whatever the framework.
Any change here must bump ``SCHEMA_VERSION`` and regenerate
``frontend/src/schema.ts`` with ``python scripts/generate_schema_ts.py``.
"""

from typing import Any, ClassVar, Final, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

SCHEMA_VERSION: Final[str] = "1.7"

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
    # A model being trained with neurolume.watch(): the viewer connects to /ws for live updates.
    live: bool = False

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


# ---- Live training (neurolume.watch): messages sent over the /ws WebSocket ----

RunState = Literal["running", "finished"]


class MetricPoint(BaseModel):
    """The metrics logged at one step, e.g. ``{"loss": 0.03, "reward": 12.5}``. Non-finite values arrive as null."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    step: int
    values: dict[str, float | None]


class LiveWeights(BaseModel):
    """Current values of the connections the graph sampled (``Graph.weights``), per dense layer.

    Each value is base64 little-endian float32, in the order of that layer's
    ``WeightSample.pairs``, so the viewer updates the edges it already draws.
    Sent at most every ``watch(every_seconds=...)``; only the latest counts.
    """

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["weights"] = "weights"
    step: int
    layers: dict[str, str]
    # The same connections' gradients from the last backward(), where there were any (same encoding).
    gradients: dict[str, str] = Field(default_factory=dict)
    # Feature maps for the sample as the model is now (same channels as Graph.feature_maps); only on
    # readings that refreshed them, every few seconds. Snapshots from /api/run/weights carry the latest.
    maps: dict[str, FeatureMaps] = Field(default_factory=dict)


# The percentiles in ParamStats.percentiles (TensorBoard's distribution bands: min, ±1.5σ, ±1σ, ±0.5σ, median, max).
PERCENTILES: Final = (0.0, 6.68, 15.87, 30.85, 50.0, 69.15, 84.13, 93.32, 100.0)


class ParamStats(BaseModel):
    """How a whole model's parameters are learning, at one reading (all its parameters together)."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    weight_norm: float | None  # the size of all parameters, as one vector; None once any is NaN or infinite
    grad_norm: float | None  # the same for their gradients; None without a gradient since the last zero_grad()
    update_ratio: float | None  # |w - w_before| / |w_before| per step since the last reading
    finite: bool  # False once any parameter is NaN or infinite
    percentiles: list[float]  # parameter values at PERCENTILES (from a fixed sample of them); empty if not finite


class LiveStats(BaseModel):
    """Parameter stats for each network (the model's name, or each network of a System)."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["stats"] = "stats"
    step: int
    networks: dict[str, ParamStats]


class LivePredictions(BaseModel):
    """What the model predicts next to the truth (``Session.predictions``); only the latest counts.

    Regression: up to ``MAX_PREDICTIONS`` (predicted, true) pairs, every output
    flattened. Classification (integer targets): ``matrix[true][predicted]`` counts.
    """

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["predictions"] = "predictions"
    step: int
    kind: Literal["regression", "classification"]
    predicted: list[float] = Field(default_factory=list)
    target: list[float] = Field(default_factory=list)
    matrix: list[list[int]] = Field(default_factory=list)


class LiveLayout(BaseModel):
    """Layout defaults from code (``watch(pinned=..., charts=...)``); choices made in the viewer win."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    pinned: list[str] = Field(default_factory=list)
    # Each chart is the metrics drawn on it together, e.g. [["loss/train", "loss/val"], ["lr"]].
    charts: list[list[str]] = Field(default_factory=list)


class LiveHello(BaseModel):
    """First message to every client, with the history so far, so a refreshed page or a late Qt widget catches up."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["hello"] = "hello"
    state: RunState
    # The metric shown large in the run strip, from watch(headline=...); the viewer's own choice wins.
    headline: str | None = None
    points: list[MetricPoint] = Field(default_factory=list)
    # The latest weights, if any were sent yet, the parameter stats so far (thinned on long runs) and the latest predictions.
    weights: LiveWeights | None = None
    stats: list[LiveStats] = Field(default_factory=list)
    layout: LiveLayout = Field(default_factory=LiveLayout)
    predictions: LivePredictions | None = None


class LiveMetrics(BaseModel):
    """New points since the last message (sent in batches, a few times a second)."""

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["metrics"] = "metrics"
    points: list[MetricPoint]


class LiveStatus(BaseModel):
    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    type: Literal["status"] = "status"
    state: RunState


LIVE_MESSAGES: Final = (LiveHello, LiveMetrics, LiveWeights, LiveStats, LivePredictions, LiveStatus)


class SavedRun(BaseModel):
    """A run kept as a file (``Session.save()``, ``open_run()``) or inlined in an exported page.

    ``hello`` holds the metrics and stats; ``snapshots`` the weights at the
    steps of the stats readings (the timeline), oldest first.
    """

    model_config: ClassVar[ConfigDict] = ConfigDict(extra="forbid")

    graph: Graph
    hello: LiveHello
    snapshots: list[LiveWeights] = Field(default_factory=list)
