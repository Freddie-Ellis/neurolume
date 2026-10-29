import { describe, expect, it } from "vitest";
import type { Graph, GraphNode } from "../schema";
import {
  MAX_NEURONS_SHOWN,
  MAX_NEURON_SPACING,
  layoutGraph,
  linkSegments,
  neuronSlots,
  slotFor,
  unitCount,
} from "./columns";

function node(id: string, type: GraphNode["type"], output_shape: number[], input_shape: number[] = []): GraphNode {
  return { id, type, label: id, group: null, input_shape, output_shape, params: {}, param_count: 0, activation: null, notes: null };
}

const mlp: Graph = {
  schema_version: "1.0",
  model: { name: "MLP", framework: "pytorch", total_params: 0 },
  nodes: [
    node("input", "input", [1, 28, 28]),
    node("flatten", "flatten", [784], [1, 28, 28]),
    node("fc1", "dense", [512], [784]),
    node("dropout", "dropout", [512], [512]),
    node("fc2", "dense", [10], [512]),
    node("output", "output", [10], [10]),
  ],
  edges: [],
  groups: [],
  weights: null,
  feature_maps: null,
};

describe("unitCount", () => {
  it("multiplies the output shape", () => {
    expect(unitCount(node("x", "input", [1, 28, 28]))).toBe(784);
  });
});

describe("neuronSlots", () => {
  it("shows every neuron in small layers", () => {
    const { slots, ellipsisY } = neuronSlots(3);
    expect(slots).toHaveLength(3);
    expect(slots[1]).toBe(0);
    expect(ellipsisY).toBeNull();
  });

  it("caps large layers and leaves a gap", () => {
    const { slots, ellipsisY } = neuronSlots(512);
    expect(slots).toHaveLength(MAX_NEURONS_SHOWN);
    expect(ellipsisY).toBeCloseTo(0);
  });
});

describe("slotFor", () => {
  it("maps the full index range onto the visible neurons", () => {
    expect(slotFor(0, 512, 64)).toBe(0);
    expect(slotFor(511, 512, 64)).toBe(63);
    expect(slotFor(8, 512, 64)).toBe(1);
  });
});

describe("layoutGraph", () => {
  const layout = layoutGraph(mlp);

  it("turns neuron layers into columns and the rest into bands", () => {
    expect(layout.columns.map((c) => c.node.id)).toEqual(["input", "fc1", "fc2"]);
    expect(layout.bands.map((b) => b.node.id)).toEqual(["flatten", "dropout", "output"]);
  });

  it("keeps panels tall and spreads out the neurons of small layers", () => {
    const tiny: Graph = { ...mlp, nodes: [node("a", "input", [4]), node("b", "dense", [4], [4])] };
    const { columns } = layoutGraph(tiny);
    const panel = columns[0].panel;
    expect(panel.top - panel.bottom).toBeGreaterThan(panel.right - panel.left);
    expect(columns[0].slots[0] - columns[0].slots[1]).toBe(MAX_NEURON_SPACING);
  });

  it("places bands between the columns they sit between", () => {
    const [input, fc1] = layout.columns;
    const flatten = layout.bands[0];
    expect(flatten.x).toBeGreaterThan(input.x);
    expect(flatten.x).toBeLessThan(fc1.x);
  });

  it("links consecutive columns with a colour position from 0 to 1", () => {
    expect(layout.links.map((l) => [l.from.node.id, l.to.node.id, l.t])).toEqual([
      ["input", "fc1", 0],
      ["fc1", "fc2", 1],
    ]);
  });
});

describe("linkSegments", () => {
  const link = layoutGraph(mlp).links[0];

  it("connects every visible pair without weights", () => {
    expect(linkSegments(link, undefined).pairs).toHaveLength(64 * 64);
  });

  it("merges sampled weights onto visible neurons", () => {
    const sample = { mode: "topk" as const, k: 3, pairs: [[0, 0, 0.5], [1, 1, -1.0], [783, 511, 0.1]] as [number, number, number][] };
    const { pairs, strength } = linkSegments(link, sample);
    expect(pairs).toEqual([[0, 0], [63, 63]]);
    expect(strength[0]).toBe(1); // |-1.0| is the strongest in the merged slot
  });
});
