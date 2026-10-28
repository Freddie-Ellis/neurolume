"""Framework-independent graph data used by the viewer."""

from typing import Any

from pydantic import BaseModel, ConfigDict, Field

SCHEMA_VERSION = "1.0"


class ModelInfo(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    framework: str
    total_params: int = Field(ge=0)


class GraphNode(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    type: str
    label: str
    group: str | None = None
    input_shape: list[int] = Field(default_factory=list)
    output_shape: list[int] = Field(default_factory=list)
    params: dict[str, Any] = Field(default_factory=dict)
    param_count: int = Field(default=0, ge=0)
    activation: str | None = None


class GraphEdge(BaseModel):
    model_config = ConfigDict(extra="forbid")

    source: str
    target: str
    tensor_shape: list[int] = Field(default_factory=list)


class GraphGroup(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    label: str
    parent: str | None = None
    collapsed: bool = False


class Graph(BaseModel):
    model_config = ConfigDict(extra="forbid")

    schema_version: str = SCHEMA_VERSION
    model: ModelInfo
    nodes: list[GraphNode]
    edges: list[GraphEdge]
    groups: list[GraphGroup] = Field(default_factory=list)
    weights: dict[str, Any] | None = None
