import { describe, expect, it } from "vitest";
import type { Graph, GraphNode } from "../schema";
import { nameLayers, titleFor } from "./network";

function node(id: string, type: GraphNode["type"], group: string | null = null, label = "Linear"): GraphNode {
  return { id, type, label, group, input_shape: [], output_shape: [4], params: {}, param_count: 0, activation: null };
}

function graph(nodes: GraphNode[]): Graph {
  return { schema_version: "1.1", model: { name: "m", framework: "pytorch", total_params: 0 }, nodes, edges: [], groups: [], weights: null };
}

describe("layer names", () => {
  it("numbers Sequential children in drawing order, skipping folded activations", () => {
    // Sequential(Linear, ReLU, Linear): the ReLU (index 1) was folded into layer 0.
    const nodes = [node("input", "input"), node("encoder/0", "dense", "encoder"), node("encoder/2", "dense", "encoder")];
    nameLayers(graph(nodes));
    expect(nodes.map(titleFor)).toEqual(["Input", "Layer 1", "Layer 2"]);
  });

  it("strips a grouped module's prefix and names numbered bands by their kind", () => {
    const nodes = [node("encoder_0", "flatten", "encoder", "Flatten"), node("encoder_1", "dense", "encoder"), node("fc1", "dense")];
    nameLayers(graph(nodes));
    expect(nodes.map(titleFor)).toEqual(["Flatten", "Layer 1", "fc1"]);
  });
});
