import { describe, expect, it } from "vitest";
import type { Graph, GraphNode } from "../schema";
import { MAX_LINK_STRANDS, isSystem, layoutSystem, strandCount, strandSlots, subgraph } from "./system";

function node(id: string, type: GraphNode["type"], group: string | null, output_shape: number[], input_shape: number[] = []): GraphNode {
  return { id, type, label: id, group, input_shape, output_shape, params: {}, param_count: 10, activation: null };
}

const edge = (source: string, target: string, label: string | null = null) => ({ source, target, tensor_shape: [4], label });

// sensor -> encoder -> { decoder, classifier }
const system: Graph = {
  schema_version: "1.1",
  model: { name: "System", framework: "pytorch", total_params: 0 },
  nodes: [
    node("sensor", "custom", null, [8]),
    node("enc/in", "input", "enc", [8]),
    node("enc/fc", "dense", "enc", [4], [8]),
    node("enc/out", "output", "enc", [4], [4]),
    node("dec/fc", "dense", "dec", [8], [4]),
    node("cls/fc", "dense", "cls", [3], [4]),
  ],
  edges: [edge("sensor", "enc/in"), edge("enc/in", "enc/fc"), edge("enc/fc", "enc/out"), edge("enc/out", "dec/fc", "latent"), edge("enc/out", "cls/fc")],
  groups: [
    { id: "enc", label: "Encoder", parent: null, collapsed: false, framework: "pytorch" },
    { id: "dec", label: "Decoder", parent: null, collapsed: false, framework: "pytorch" },
    { id: "cls", label: "Classifier", parent: null, collapsed: false, framework: null },
  ],
  weights: null,
};

describe("isSystem", () => {
  it("is true only when there are top-level groups", () => {
    expect(isSystem(system)).toBe(true);
    expect(isSystem({ ...system, groups: [] })).toBe(false);
  });
});

describe("layoutSystem", () => {
  const layout = layoutSystem(system);
  const card = (id: string) => layout.cards.find((candidate) => candidate.id === id)!;

  it("makes one card per network and per ungrouped node", () => {
    expect(layout.cards.map((c) => c.id)).toEqual(["node:sensor", "group:enc", "group:dec", "group:cls"]);
    expect(card("group:enc").kind).toBe("network");
    expect(card("node:sensor").kind).toBe("node");
  });

  it("links cards once per pair and keeps labels", () => {
    expect(layout.links.map((l) => [l.from.id, l.to.id, l.label])).toEqual([
      ["node:sensor", "group:enc", null],
      ["group:enc", "group:dec", "latent"],
      ["group:enc", "group:cls", null],
    ]);
  });

  it("ranks cards left to right and stacks branches", () => {
    expect(layout.cards.map((c) => c.rank)).toEqual([0, 1, 2, 2]);
    expect(card("group:enc").x).toBeGreaterThan(card("node:sensor").x);
    expect(card("group:dec").x).toBe(card("group:cls").x);
    expect(card("group:dec").y).not.toBe(card("group:cls").y);
  });

  it("summarises each network", () => {
    const encoder = card("group:enc");
    expect(encoder.paramCount).toBe(30);
    expect(encoder.layerCount).toBe(1);
    expect(encoder.preview).toEqual([8, 4]);
  });
});

describe("subgraph", () => {
  it("adds input and output columns to a group that has none", () => {
    const decoder = subgraph(system, "dec");
    expect(decoder.nodes.map((n) => n.type)).toEqual(["input", "dense", "output"]);
    expect(decoder.nodes[0].output_shape).toEqual([4]);
    expect(decoder.model.name).toBe("Decoder");
  });

  it("keeps a group's own input and output", () => {
    expect(subgraph(system, "enc").nodes.map((n) => n.id)).toEqual(["enc/in", "enc/fc", "enc/out"]);
  });
});

describe("strands", () => {
  it("draws one strand per value the link carries, capped", () => {
    expect(strandCount([32])).toBe(32);
    expect(strandCount([2, 3])).toBe(6);
    expect(strandCount([784])).toBe(MAX_LINK_STRANDS);
    expect(strandCount([])).toBe(0);
  });

  it("spreads strands around the card centre and keeps them inside it", () => {
    const card = layoutSystem(system).cards[0];
    const slots = strandSlots(MAX_LINK_STRANDS, card);
    expect(slots).toHaveLength(MAX_LINK_STRANDS);
    expect((slots[0] + slots[slots.length - 1]) / 2).toBeCloseTo(card.y);
    expect(slots[0] - slots[slots.length - 1]).toBeLessThan(card.height);
    expect(strandSlots(1, card)).toEqual([card.y]);
  });
});
