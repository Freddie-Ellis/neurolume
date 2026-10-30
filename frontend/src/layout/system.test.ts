import { describe, expect, it } from "vitest";
import type { Graph, GraphNode } from "../schema";
import { LANE_HEIGHT, MAX_LINK_STRANDS, MAX_NODE_WIDTH, NODE_CARD, ROW_GAP, isOutside, isSystem, layoutSystem, strandCount, strandSlots, subgraph } from "./system";

function node(id: string, type: GraphNode["type"], group: string | null, output_shape: number[], input_shape: number[] = []): GraphNode {
  return { id, type, label: id, group, input_shape, output_shape, params: {}, param_count: 10, activation: null, notes: null };
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
  feature_maps: null,
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
    expect(encoder.miniature.items).toEqual([
      { kind: "neurons", x: 0, units: 8 },
      { kind: "neurons", x: 1, units: 4 },
    ]);
    expect(encoder.miniature.links).toEqual([[0, 1]]);
  });
});

describe("layoutSystem with feedback loops", () => {
  const blocks = (ids: string[], edges: [string, string][]): Graph => ({
    ...system,
    nodes: ids.map((id) => node(id, "custom", null, [4])),
    edges: edges.map(([source, target]) => edge(source, target)),
    groups: [],
  });
  const ranks = (graph: Graph) => layoutSystem(graph).cards.map((c) => c.rank);

  it("breaks a cycle at the link back to the first card, and still draws it", () => {
    const layout = layoutSystem(blocks(["a", "b", "c"], [["a", "b"], ["b", "c"], ["c", "a"]]));
    expect(layout.cards.map((c) => c.rank)).toEqual([0, 1, 2]);
    expect(layout.links.map((l) => [l.from.id, l.to.id, l.back])).toEqual([
      ["node:a", "node:b", false],
      ["node:b", "node:c", false],
      ["node:c", "node:a", true],
    ]);
  });

  it("ranks cards downstream of a cycle", () => {
    expect(ranks(blocks(["a", "b", "d"], [["a", "b"], ["b", "a"], ["b", "d"]]))).toEqual([0, 1, 2]);
  });
});

describe("links that skip ranks", () => {
  const blocks = (ids: string[], edges: [string, string][]): Graph => ({
    ...system,
    nodes: ids.map((id) => node(id, "custom", null, [4])),
    edges: edges.map(([source, target]) => edge(source, target)),
    groups: [],
  });
  const layout = layoutSystem(blocks(["a", "b", "c"], [["a", "b"], ["b", "c"], ["a", "c"]]));
  const [a, b] = layout.cards;
  const skip = layout.links.find((link) => link.from.id === "node:a" && link.to.id === "node:c")!;

  it("pass the rank between through a lane beside its cards", () => {
    expect(skip.via).toHaveLength(2); // the lane's two ends in b's rank
    for (const point of skip.via) {
      expect(point.x).toBeGreaterThanOrEqual(b.x - b.width / 2);
      expect(point.x).toBeLessThanOrEqual(b.x + b.width / 2);
      expect(Math.abs(point.y - b.y)).toBeGreaterThan(b.height / 2);
    }
    expect(layout.links.filter((link) => link !== skip).every((link) => link.via.length === 0)).toBe(true);
  });

  it("keep a lane ROW_GAP from the card in its rank", () => {
    expect(Math.abs(skip.via[0].y - b.y)).toBeCloseTo(b.height / 2 + ROW_GAP + LANE_HEIGHT / 2);
  });

  it("split the side of a card with the other links there, ordered by where they head", () => {
    const direct = layout.links.find((link) => link.from === a && link.to === b)!;
    const [upper, lower] = skip.via[0].y > b.y ? [skip, direct] : [direct, skip];
    expect(upper.outShare).toEqual([0, 0.5]);
    expect(lower.outShare).toEqual([0.5, 1]);
    expect(strandSlots(1, a, upper.outShare)[0]).toBeGreaterThan(strandSlots(1, a, lower.outShare)[0]);
  });

  it("leave layouts whose links all go to the next rank as they were", () => {
    const chain = layoutSystem(blocks(["a", "b", "c"], [["a", "b"], ["b", "c"]]));
    expect(chain.cards.map((card) => [card.x, card.y])).toEqual([
      [NODE_CARD.width / 2, 0],
      [NODE_CARD.width * 1.5 + 150, 0],
      [NODE_CARD.width * 2.5 + 300, 0],
    ]);
    expect(chain.links.every((link) => link.via.length === 0 && link.outShare[1] - link.outShare[0] === 1)).toBe(true);
  });

  it("widen block cards to fit their description, up to a maximum", () => {
    const described = (text: string) => {
      const graph = blocks(["a"], []);
      graph.nodes[0].params = { description: text };
      return layoutSystem(graph).cards[0].width;
    };
    expect(described("short")).toBe(NODE_CARD.width);
    expect(described("x".repeat(30))).toBeGreaterThan(NODE_CARD.width);
    expect(described("x".repeat(60))).toBe(MAX_NODE_WIDTH);
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

  it("opens a network with parts of its own as another overview", () => {
    // An autoencoder added to a System: ae holds ae/encoder and ae/decoder.
    const nested: Graph = {
      ...system,
      nodes: [
        node("ae/input", "input", "ae", [8]),
        node("ae/enc", "dense", "ae/encoder", [4], [8]),
        node("ae/dec", "dense", "ae/decoder", [8], [4]),
        node("ae/output", "output", "ae", [8], [8]),
      ],
      edges: [edge("ae/input", "ae/enc"), edge("ae/enc", "ae/dec"), edge("ae/dec", "ae/output")],
      groups: [
        { id: "ae", label: "Autoencoder", parent: null, collapsed: false, framework: "pytorch" },
        { id: "ae/encoder", label: "encoder", parent: "ae", collapsed: false, framework: null },
        { id: "ae/decoder", label: "decoder", parent: "ae", collapsed: false, framework: null },
      ],
    };
    const autoencoder = subgraph(nested, "ae");
    expect(isSystem(autoencoder)).toBe(true);
    expect(layoutSystem(autoencoder).cards.map((c) => c.id)).toEqual(["node:ae/input", "group:ae/encoder", "group:ae/decoder", "node:ae/output"]);
    // One level further down is a plain network.
    expect(isSystem(subgraph(autoencoder, "ae/encoder"))).toBe(false);
  });

  it("keeps a block's skip connection, from its new input to its add", () => {
    // A ResNet block: the add reads both the block's last conv and the layer before the block.
    const maps = { channels: [0], height: 1, width: 1, data: "AA==" };
    const resnet: Graph = {
      ...system,
      nodes: [node("pool", "pool", null, [4, 2, 2]), node("block_conv", "conv2d", "block", [4, 2, 2], [4, 2, 2]), node("block_add", "add", "block", [4, 2, 2], [4, 2, 2])],
      edges: [edge("pool", "block_conv"), edge("block_conv", "block_add"), edge("pool", "block_add")],
      groups: [{ id: "block", label: "block", parent: null, collapsed: false, framework: "pytorch" }],
      feature_maps: { pool: maps },
    };
    const block = subgraph(resnet, "block");
    const input = block.nodes[0];
    expect(block.edges.map((e) => [e.source, e.target])).toContainEqual([input.id, "block_add"]);
    expect(block.feature_maps?.[input.id]).toEqual(maps); // the input shows what the pool recorded
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

describe("what an opened card shows of its surroundings", () => {
  // The fault-detector case: an outside block feeds a block inside a system that was added as one part.
  const nested: Graph = {
    ...system,
    nodes: [
      node("bus", "custom", null, [8]),
      { ...node("det/sensor", "custom", "det", [8]), label: "Sensor" },
      node("det/enc/in", "input", "det/enc", [8]),
      node("det/enc/fc", "dense", "det/enc", [4], [8]),
      node("det/enc/out", "output", "det/enc", [4], [4]),
      { ...node("alarm", "custom", null, [], [4]), label: "Alarm" },
    ],
    edges: [edge("bus", "det/sensor"), edge("det/sensor", "det/enc/in"), edge("det/enc/in", "det/enc/fc"), edge("det/enc/fc", "det/enc/out"), edge("det/enc/out", "alarm")],
    groups: [
      { id: "det", label: "Fault detector", parent: null, collapsed: false, framework: "pytorch" },
      { id: "det/enc", label: "Encoder", parent: "det", collapsed: false, framework: "pytorch" },
    ],
  };
  nested.nodes[0].label = "Sensor bus";
  const detector = subgraph(nested, "det");

  it("keeps what feeds the group, as an outside node named as it is one level up", () => {
    const from = detector.nodes.find((n) => n.params["contextName"] === "Sensor bus")!;
    expect(isOutside(from)).toBe(true);
    expect(detector.edges.map((e) => [e.source, e.target])).toContainEqual([from.id, "det/sensor"]);
    // The alarm is fed by the encoder's own output node, so that node says where it goes.
    const to = detector.nodes.find((n) => n.params["contextName"] === "Alarm")!;
    expect(to.id).toBe("det/enc/out");
    expect(to.params["context"]).toBe("to Alarm");
  });

  it("labels the group's own input instead, when that is what the outside feeds", () => {
    const encoder = subgraph(detector, "det/enc");
    const input = encoder.nodes.find((n) => n.id === "det/enc/in")!;
    expect(input.params["context"]).toBe("from Sensor");
    expect(encoder.nodes.filter((n) => n.type === "input")).toHaveLength(1);
  });

  it("previews a card with parts as its parts, without the inputs and neighbours", () => {
    const card = layoutSystem(nested).cards.find((c) => c.id === "group:det")!;
    expect(card.miniature.items.map((item) => (item.kind === "box" ? item.label : item.kind))).toEqual(["Sensor", "Encoder"]);
    // Each part carries its own miniature, so the preview can draw what is inside it too.
    const encoder = card.miniature.items[1];
    expect(encoder.kind === "box" && encoder.inner.items.map((item) => item.kind)).toEqual(["neurons", "neurons"]);
  });

  it("moves outside neighbours off the framed area, so their links run off screen", () => {
    const layout = layoutSystem(detector);
    const from = layout.cards.find((c) => isOutside(c.node))!;
    expect(from.x + from.width / 2).toBeLessThan(layout.bounds.left);
    expect(layout.links.some((link) => link.from === from)).toBe(true);
  });
});
