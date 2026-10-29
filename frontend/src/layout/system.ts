/**
 * Overview layout for systems: graphs whose nodes are grouped into networks.
 *
 * Every top-level group becomes a card, and so does every node that belongs
 * to no group (model inputs and outputs, plain blocks, glue operations such as
 * torch.cat). Cards are placed left to right by their longest distance from a
 * source, like a circuit schematic. Plain maths, no three.js.
 */
import type { Graph, GraphGroup, GraphNode } from "../schema";
import { layoutGraph } from "./columns";

export const NETWORK_CARD = { width: 260, height: 180 };
export const NODE_CARD = { width: 170, height: 76 };
export const RANK_GAP = 150;
export const ROW_GAP = 56;
/** Most strands drawn for one link; wider tensors are capped (the chip shows the real size). */
export const MAX_LINK_STRANDS = 48;
/** Widest gap between strands where they meet a card. */
export const STRAND_SPACING = 5;
/** Strands use at most this fraction of a card's height. */
const STRAND_SPREAD = 0.6;

export interface Card {
  id: string;
  kind: "network" | "node";
  /** The network's group, for network cards. */
  group: GraphGroup | null;
  /** The node itself, for single-node cards; a summary node for network cards. */
  node: GraphNode;
  inputShape: number[];
  outputShape: number[];
  paramCount: number;
  layerCount: number;
  /** Units per neuron column, for the mini preview drawn inside network cards. */
  preview: number[];
  rank: number;
  /** Centre of the card. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CardLink {
  from: Card;
  to: Card;
  label: string | null;
  shape: number[];
}

export interface SystemLayout {
  cards: Card[];
  links: CardLink[];
  bounds: { left: number; right: number; top: number; bottom: number };
}

/** A graph is shown as a system when it has top-level groups. */
export function isSystem(graph: Graph): boolean {
  return graph.groups.some((group) => group.parent === null);
}

/** The top-level group a node belongs to, following group parents upwards. */
function topGroup(graph: Graph, node: GraphNode): GraphGroup | null {
  const byId = new Map(graph.groups.map((group) => [group.id, group]));
  let group = node.group ? byId.get(node.group) : undefined;
  while (group?.parent) group = byId.get(group.parent);
  return group ?? null;
}

/**
 * The nodes of one network as a standalone graph, so the detailed neuron view
 * can draw it. Adds an input and output column if the group has none.
 */
export function subgraph(graph: Graph, groupId: string): Graph {
  const group = graph.groups.find((candidate) => candidate.id === groupId);
  if (!group) throw new Error(`unknown group ${groupId}`);
  const nodes = graph.nodes.filter((node) => topGroup(graph, node)?.id === groupId);
  const ids = new Set(nodes.map((node) => node.id));
  const edges = graph.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target));

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (first && first.type !== "input") {
    const input = terminal(`${groupId}::input`, "input", "Input", first.input_shape);
    edges.unshift({ source: input.id, target: first.id, tensor_shape: first.input_shape, label: null });
    nodes.unshift(input);
  }
  if (last && last.type !== "output") {
    const output = terminal(`${groupId}::output`, "output", "Output", last.output_shape);
    edges.push({ source: last.id, target: output.id, tensor_shape: last.output_shape, label: null });
    nodes.push(output);
  }

  const weights = Object.fromEntries(Object.entries(graph.weights ?? {}).filter(([id]) => ids.has(id)));
  return {
    schema_version: graph.schema_version,
    model: {
      name: group.label,
      framework: group.framework ?? graph.model.framework,
      total_params: nodes.reduce((total, node) => total + node.param_count, 0),
    },
    nodes,
    edges,
    groups: [],
    weights: Object.keys(weights).length > 0 ? weights : null,
  };
}

export function layoutSystem(graph: Graph): SystemLayout {
  // 1. One card per top-level group and per ungrouped node, in order of first appearance.
  const cards: Card[] = [];
  const cardOf = new Map<string, Card>(); // node id -> card
  for (const node of graph.nodes) {
    const group = topGroup(graph, node);
    const cardId = group ? `group:${group.id}` : `node:${node.id}`;
    let card = cards.find((candidate) => candidate.id === cardId);
    if (!card) {
      card = group ? networkCard(graph, group, cardId) : nodeCard(node, cardId);
      cards.push(card);
    }
    cardOf.set(node.id, card);
  }

  // 2. Links between different cards, one per pair.
  const links: CardLink[] = [];
  for (const edge of graph.edges) {
    const from = cardOf.get(edge.source);
    const to = cardOf.get(edge.target);
    if (!from || !to || from === to || links.some((link) => link.from === from && link.to === to)) continue;
    links.push({ from, to, label: edge.label, shape: edge.tensor_shape });
  }

  // 3. Rank = longest path from a source (Kahn's algorithm). Cards in a cycle keep rank 0.
  const incoming = new Map(cards.map((card) => [card, 0]));
  for (const link of links) incoming.set(link.to, incoming.get(link.to)! + 1);
  const queue = cards.filter((card) => incoming.get(card) === 0);
  while (queue.length > 0) {
    const card = queue.shift()!;
    for (const link of links.filter((candidate) => candidate.from === card)) {
      link.to.rank = Math.max(link.to.rank, card.rank + 1);
      incoming.set(link.to, incoming.get(link.to)! - 1);
      if (incoming.get(link.to) === 0) queue.push(link.to);
    }
  }

  // 4. Order each rank by the average position of its inputs, to reduce crossings.
  const rankCount = Math.max(...cards.map((card) => card.rank)) + 1;
  const ranks: Card[][] = Array.from({ length: rankCount }, () => []);
  for (const card of cards) ranks[card.rank].push(card);
  const order = new Map<Card, number>();
  ranks.forEach((rank, r) => {
    if (r > 0) {
      const weight = (card: Card) => {
        const sources = links.filter((link) => link.to === card).map((link) => order.get(link.from) ?? 0);
        return sources.length > 0 ? sources.reduce((a, b) => a + b, 0) / sources.length : Infinity;
      };
      rank.sort((a, b) => weight(a) - weight(b));
    }
    rank.forEach((card, i) => order.set(card, i - (rank.length - 1) / 2));
  });

  // 5. Place ranks left to right, cards in a rank stacked and centred vertically.
  let left = 0;
  for (const rank of ranks) {
    const width = Math.max(...rank.map((card) => card.width));
    const height = rank.reduce((total, card) => total + card.height, 0) + ROW_GAP * (rank.length - 1);
    let top = height / 2;
    for (const card of rank) {
      card.x = left + width / 2;
      card.y = top - card.height / 2;
      top -= card.height + ROW_GAP;
    }
    left += width + RANK_GAP;
  }

  return {
    cards,
    links,
    bounds: {
      left: Math.min(...cards.map((card) => card.x - card.width / 2)),
      right: Math.max(...cards.map((card) => card.x + card.width / 2)),
      top: Math.max(...cards.map((card) => card.y + card.height / 2)),
      bottom: Math.min(...cards.map((card) => card.y - card.height / 2)),
    },
  };
}

/**
 * How many strands a link draws: one per value in the tensor it carries, so a
 * 32-unit latent is 32 lines. Returns 0 when the shape is unknown.
 */
export function strandCount(shape: number[]): number {
  if (shape.length === 0) return 0;
  return Math.min(shape.reduce((total, size) => total * size, 1), MAX_LINK_STRANDS);
}

/** Heights where `count` strands meet a card's edge, top to bottom, centred on the card. */
export function strandSlots(count: number, card: Card): number[] {
  const span = Math.min((count - 1) * STRAND_SPACING, card.height * STRAND_SPREAD);
  const step = count > 1 ? span / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => card.y + span / 2 - i * step);
}

function networkCard(graph: Graph, group: GraphGroup, id: string): Card {
  const inner = subgraph(graph, group.id);
  const layers = inner.nodes.filter((node) => node.type !== "input" && node.type !== "output");
  const inputShape = inner.nodes[0]?.output_shape ?? [];
  const outputShape = inner.nodes[inner.nodes.length - 1]?.output_shape ?? [];
  return {
    id,
    kind: "network",
    group,
    node: {
      id: group.label,
      type: "custom",
      label: "Network",
      group: null,
      input_shape: inputShape,
      output_shape: outputShape,
      params: {},
      param_count: inner.model.total_params,
      activation: null,
    },
    inputShape,
    outputShape,
    paramCount: inner.model.total_params,
    layerCount: layers.length,
    preview: layoutGraph(inner).columns.map((column) => column.units),
    rank: 0,
    x: 0,
    y: 0,
    ...NETWORK_CARD,
  };
}

function nodeCard(node: GraphNode, id: string): Card {
  return {
    id,
    kind: "node",
    group: null,
    node,
    inputShape: node.input_shape,
    outputShape: node.output_shape,
    paramCount: node.param_count,
    layerCount: 0,
    preview: [],
    rank: 0,
    x: 0,
    y: 0,
    ...NODE_CARD,
  };
}

function terminal(id: string, type: "input" | "output", label: string, shape: number[]): GraphNode {
  return { id, type, label, group: null, input_shape: shape, output_shape: shape, params: {}, param_count: 0, activation: null };
}
