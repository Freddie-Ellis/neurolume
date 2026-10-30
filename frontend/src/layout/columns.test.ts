import { describe, expect, it } from "vitest";
import { limits } from "../limits";
import type { Graph, GraphNode } from "../schema";
import {
  ARC_LANE_GAP,
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
    expect(slots).toHaveLength(limits.neurons);
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
    expect(layout.arcs).toEqual([]); // a graph without edges is a plain chain
  });
});

describe("branching graphs", () => {
  const edge = (source: string, target: string) => ({ source, target, tensor_shape: [8], label: null });
  // A residual block with a projection: input -> fc1 -> fc2 -> add, and input -> proj -> add.
  const residual: Graph = {
    ...mlp,
    nodes: [
      node("input", "input", [8]),
      node("fc1", "dense", [8], [8]),
      node("fc2", "dense", [8], [8]),
      node("proj", "dense", [8], [8]),
      node("add", "add", [8], [8]),
      node("output", "output", [8], [8]),
    ],
    edges: [edge("input", "fc1"), edge("fc1", "fc2"), edge("input", "proj"), edge("fc2", "add"), edge("proj", "add"), edge("add", "output")],
  };
  const layout = layoutGraph(residual);

  it("links neighbouring columns only where the signal flows between them", () => {
    expect(layout.links.map((l) => [l.from.node.id, l.to.node.id])).toEqual([
      ["input", "fc1"],
      ["fc1", "fc2"],
    ]); // fc2 does not feed proj, so they are not linked
  });

  it("draws every other edge as an arc under the panels, into the add", () => {
    expect(layout.arcs.map((a) => [a.source.id, a.target.id])).toEqual([
      ["input", "proj"],
      ["fc2", "add"],
    ]);
    const panelBottom = Math.min(...layout.columns.map((c) => c.panel.bottom));
    for (const arc of layout.arcs) expect(arc.laneY).toBeLessThan(panelBottom);
    expect(layout.bounds.bottom).toBeLessThan(Math.min(...layout.arcs.map((a) => a.laneY)));
  });

  it("makes add a merge point, and converges a column's otherwise loose output on it", () => {
    expect(layout.bands.find((b) => b.node.id === "add")?.kind).toBe("merge");
    // proj feeds the add, but no column follows it: its edges converge on the add.
    expect(layout.stubs.map((s) => [s.from.node.id, s.to.node.id])).toEqual([["proj", "add"]]);
    // The arc into the add starts at fc2's neurons and ends at the add's node.
    const intoAdd = layout.arcs.find((a) => a.target.id === "add")!;
    expect("column" in intoAdd.start && intoAdd.start.column.node.id).toBe("fc2");
    expect("band" in intoAdd.end && intoAdd.end.band.node.id).toBe("add");
  });

  it("gives overlapping arcs separate lanes, the shorter one nearer the panels", () => {
    const [long, short] = layout.arcs; // input -> proj spans further than fc2 -> add, and they overlap
    expect(Math.abs(long.x1 - long.x0)).toBeGreaterThan(Math.abs(short.x1 - short.x0));
    expect(short.laneY).toBeGreaterThan(long.laneY);
  });
});

describe("parallel branches", () => {
  const edge = (source: string, target: string) => ({ source, target, tensor_shape: [4], label: null });
  const graph = (nodes: GraphNode[], edges: [string, string][]): Graph => ({ ...mlp, nodes, edges: edges.map(([s, t]) => edge(s, t)) });

  it("stacks two heads on one trunk in the same slot, linked directly, without arcs", () => {
    const heads = graph(
      [node("input", "input", [4]), node("a", "dense", [8], [4]), node("b", "dense", [2], [8]), node("c", "dense", [2], [8])],
      [["input", "a"], ["a", "b"], ["a", "c"]],
    );
    const layout = layoutGraph(heads);
    const [, , b, c] = layout.columns;
    expect(b.x).toBe(c.x);
    expect(b.panel.bottom).toBeGreaterThan(c.panel.top); // b above c, panels apart
    expect(Math.min(...b.slots)).toBeGreaterThan(Math.max(...c.slots));
    expect(layout.links.map((l) => [l.from.node.id, l.to.node.id])).toEqual([
      ["input", "a"],
      ["a", "b"],
      ["a", "c"],
    ]);
    expect(layout.arcs).toEqual([]);
  });

  it("gathers two heads into the output after them with stubs, not arcs", () => {
    const heads = graph(
      [node("input", "input", [4]), node("a", "dense", [8], [4]), node("b", "dense", [2], [8]), node("c", "dense", [2], [8]), node("output", "output", [2], [2])],
      [["input", "a"], ["a", "b"], ["a", "c"], ["b", "output"], ["c", "output"]],
    );
    const layout = layoutGraph(heads);
    expect(layout.arcs).toEqual([]);
    expect(layout.stubs.map((stub) => [stub.from.node.id, stub.to.node.id])).toEqual([
      ["b", "output"],
      ["c", "output"],
    ]);
  });

  it("still draws a ResNet skip as one arc", () => {
    const block = graph(
      [node("input", "input", [4]), node("a", "dense", [4], [4]), node("b", "dense", [4], [4]), node("add", "add", [4], [4])],
      [["input", "a"], ["a", "b"], ["b", "add"], ["a", "add"]],
    );
    const layout = layoutGraph(block);
    expect(layout.arcs.map((arc) => [arc.source.id, arc.target.id])).toEqual([["a", "add"]]);
    expect(new Set(layout.columns.map((column) => column.x)).size).toBe(3);
  });

  it("keeps overlapping arcs at least a lane apart", () => {
    const [long, short] = layoutGraph({
      ...mlp,
      nodes: [node("input", "input", [8]), node("fc1", "dense", [8], [8]), node("fc2", "dense", [8], [8]), node("proj", "dense", [8], [8]), node("add", "add", [8], [8])],
      edges: [edge("input", "fc1"), edge("fc1", "fc2"), edge("input", "proj"), edge("fc2", "add"), edge("proj", "add")],
    }).arcs;
    expect(Math.abs(long.laneY - short.laneY)).toBeGreaterThanOrEqual(ARC_LANE_GAP);
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
