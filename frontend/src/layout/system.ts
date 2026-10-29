/**
 * Overview layout for systems: graphs whose nodes are grouped into networks.
 *
 * Every top-level group becomes a card, and so does every node that belongs
 * to no group (model inputs and outputs, plain blocks, glue operations such as
 * torch.cat). Cards are placed left to right by their longest distance from a
 * source, like a circuit schematic. Plain maths, no three.js.
 */
import type { FeatureMaps, Graph, GraphGroup, GraphNode } from "../schema";
import { layoutGraph } from "./columns";

export const NETWORK_CARD = { width: 260, height: 180 };
export const PARTS_CARD = { width: 400, height: 280 };
export const NODE_CARD = { width: 170, height: 76 };
export const RANK_GAP = 150;
export const ROW_GAP = 56;
/** Most strands drawn for one link; wider tensors are capped (the chip shows the real size). */
export const MAX_LINK_STRANDS = 48;
/** Widest gap between strands where they meet a card. */
export const STRAND_SPACING = 5;
/** How much further out neighbours outside the current level are moved, so their links run off screen. */
export const OUTSIDE_SHIFT = 700;
/** Room left in the framed area beside the cards for links to and from outside. */
const OUTSIDE_ROOM = 160;
/** Single layers outside any network (a Keras "gap") are drawn as small panels, like a layer in the detailed view. */
export const LAYER_CARD = { width: 170, height: 180 };
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
  /** Networks inside this one (an autoencoder's encoder and decoder, a System's networks); 0 for plain networks. */
  partCount: number;
  /** A small drawing of what is inside, for the card's preview. */
  miniature: Miniature;
  rank: number;
  /** Centre of the card. */
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * A card's preview: a scaled-down drawing of what it holds. A network shows its
 * layers in their real order and spacing (x from 0 to 1): neuron columns,
 * feature-map stacks, merge nodes, and the links and skip arcs between them.
 * A network with parts shows its parts as boxes placed as in its own overview
 * (x and y from 0 to 1), each with its own miniature inside, so the drawing
 * always fits however deep it goes. A single layer shows one glyph.
 */
export interface Miniature {
  items: MiniItem[];
  /** Index pairs into `items`: straight links, and arcs drawn under the row. */
  links: [number, number][];
  arcs: [number, number][];
}

export type MiniItem =
  | { kind: "neurons"; x: number; units: number }
  | { kind: "maps"; x: number; size: number; channels: number }
  | { kind: "merge"; x: number; glyph: string }
  | { kind: "box"; x: number; y: number; width: number; height: number; label: string; inner: Miniature };

const EMPTY_MINIATURE: Miniature = { items: [], links: [], arcs: [] };

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
  return rootOf(graph, node.group);
}

/** The top-level group that contains a group (itself, if it is top-level). */
function rootOf(graph: Graph, groupId: string | null): GraphGroup | null {
  const byId = new Map(graph.groups.map((group) => [group.id, group]));
  let group = groupId ? byId.get(groupId) : undefined;
  while (group?.parent) group = byId.get(group.parent);
  return group ?? null;
}

/**
 * The nodes of one network as a standalone graph, so the detailed neuron view
 * can draw it. Groups nested inside it (an autoencoder's encoder and decoder)
 * become the new graph's top-level groups, so it opens as an overview of its own.
 *
 * What feeds the group from outside, and what it feeds, stays visible: each
 * outside neighbour (named as it is one level up, e.g. "Sensor bus" or
 * "layer1") becomes an input or output node carrying `params.context`, joined
 * to every layer it feeds or is fed by, so a ResNet block keeps its skip
 * connection. When the neighbour feeds the group's own input node, that node
 * is labelled instead. A group with no outside neighbours gets a plain input
 * and output if it has none.
 */
export function subgraph(graph: Graph, groupId: string): Graph {
  const group = graph.groups.find((candidate) => candidate.id === groupId);
  if (!group) throw new Error(`unknown group ${groupId}`);
  // Nodes keep their group, even the ones directly in this group (no longer
  // listed), so their names can still drop the group's prefix.
  const nodes = graph.nodes.filter((node) => topGroup(graph, node)?.id === groupId);
  const groups = graph.groups
    .filter((candidate) => candidate.id !== groupId && rootOf(graph, candidate.id)?.id === groupId)
    .map((child) => (child.parent === groupId ? { ...child, parent: null } : child));
  const ids = new Set(nodes.map((node) => node.id));
  const edges = graph.edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target));

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const inputMaps: Record<string, FeatureMaps> = {};
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const nameOf = (id: string) => outsideName(graph, byId.get(id)!);
  const inputs: GraphNode[] = [];
  const outputs: GraphNode[] = [];

  // Edges in from outside, one input per outside neighbour.
  const incoming = graph.edges.filter((edge) => !ids.has(edge.source) && ids.has(edge.target));
  for (const name of new Set(incoming.map((edge) => nameOf(edge.source)))) {
    const edgesIn = incoming.filter((edge) => nameOf(edge.source) === name);
    const feedsInputs = edgesIn.every((edge) => byId.get(edge.target)!.type === "input");
    if (feedsInputs) {
      for (const edge of edgesIn) labelContext(nodes, edge.target, `from ${name}`, name);
      continue;
    }
    const shape = edgesIn[0].tensor_shape;
    const input = terminal(`${groupId}::from:${name}`, "input", "Input", shape, { context: `from ${name}`, contextName: name, outside: true });
    for (const target of new Set(edgesIn.map((edge) => edge.target))) edges.push({ source: input.id, target, tensor_shape: shape, label: null });
    // The input shows what the layer before the group recorded, if anything.
    const recorded = graph.feature_maps?.[edgesIn[0].source];
    if (recorded) inputMaps[input.id] = recorded;
    inputs.push(input);
  }
  if (incoming.length === 0 && first && first.type !== "input") {
    const input = terminal(`${groupId}::input`, "input", "Input", first.input_shape);
    edges.unshift({ source: input.id, target: first.id, tensor_shape: first.input_shape, label: null });
    inputs.push(input);
  }

  // Edges out to outside, one output per outside neighbour.
  const outgoing = graph.edges.filter((edge) => ids.has(edge.source) && !ids.has(edge.target));
  for (const name of new Set(outgoing.map((edge) => nameOf(edge.target)))) {
    const edgesOut = outgoing.filter((edge) => nameOf(edge.target) === name);
    if (edgesOut.every((edge) => byId.get(edge.source)!.type === "output")) {
      for (const edge of edgesOut) labelContext(nodes, edge.source, `to ${name}`, name);
      continue;
    }
    const shape = edgesOut[0].tensor_shape;
    const output = terminal(`${groupId}::to:${name}`, "output", "Output", shape, { context: `to ${name}`, contextName: name, outside: true });
    for (const source of new Set(edgesOut.map((edge) => edge.source))) edges.push({ source, target: output.id, tensor_shape: shape, label: null });
    outputs.push(output);
  }
  if (outgoing.length === 0 && last && last.type !== "output") {
    const output = terminal(`${groupId}::output`, "output", "Output", last.output_shape);
    edges.push({ source: last.id, target: output.id, tensor_shape: last.output_shape, label: null });
    outputs.push(output);
  }
  nodes.unshift(...inputs);
  nodes.push(...outputs);

  const weights = Object.fromEntries(Object.entries(graph.weights ?? {}).filter(([id]) => ids.has(id)));
  const featureMaps = { ...inputMaps, ...Object.fromEntries(Object.entries(graph.feature_maps ?? {}).filter(([id]) => ids.has(id))) };
  return {
    schema_version: graph.schema_version,
    model: {
      name: group.label,
      framework: group.framework ?? graph.model.framework,
      total_params: nodes.reduce((total, node) => total + node.param_count, 0),
    },
    nodes,
    edges,
    groups,
    weights: Object.keys(weights).length > 0 ? weights : null,
    feature_maps: Object.keys(featureMaps).length > 0 ? featureMaps : null,
  };
}

/** True for the input and output nodes subgraph() adds to stand for a neighbour outside the group. */
export function isOutside(node: GraphNode): boolean {
  return node.params["outside"] === true;
}

/** How a node outside a group is called one level up: its network's name, a block's label, or a layer's name. */
function outsideName(graph: Graph, node: GraphNode): string {
  const named = node.params["contextName"];
  if (typeof named === "string") return named;
  const group = topGroup(graph, node);
  if (group) return group.label;
  if (node.type === "custom" || node.type === "input" || node.type === "output") return node.label;
  return node.id.split("/").pop() ?? node.id;
}

/** Note on a group's own input or output node where it connects outside, e.g. "from Camera". */
function labelContext(nodes: GraphNode[], id: string, context: string, name: string): void {
  const index = nodes.findIndex((node) => node.id === id);
  if (index >= 0) nodes[index] = { ...nodes[index], params: { ...nodes[index].params, context, contextName: name } };
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

  // 6. Neighbours outside this level aren't drawn, only their links, which run
  // off screen: move them well out, and leave them out of the bounds.
  for (const card of cards.filter((candidate) => isOutside(candidate.node))) {
    card.x += card.node.type === "input" ? -OUTSIDE_SHIFT : OUTSIDE_SHIFT;
  }
  // The framed area keeps some room for those links on each side that has them, so they visibly come in.
  const shown = cards.filter((card) => !isOutside(card.node));
  const framed = shown.length > 0 ? shown : cards;
  const room = (type: "input" | "output") => (cards.some((card) => isOutside(card.node) && card.node.type === type) ? OUTSIDE_ROOM : 0);
  return {
    cards,
    links,
    bounds: {
      left: Math.min(...framed.map((card) => card.x - card.width / 2)) - room("input"),
      right: Math.max(...framed.map((card) => card.x + card.width / 2)) + room("output"),
      top: Math.max(...framed.map((card) => card.y + card.height / 2)),
      bottom: Math.min(...framed.map((card) => card.y - card.height / 2)),
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
  // A System's last node may be a sink block (a prediction), which only has an input shape.
  const last = inner.nodes[inner.nodes.length - 1];
  const outputShape = last ? (last.output_shape.length > 0 ? last.output_shape : last.input_shape) : [];
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
      notes: null,
    },
    inputShape,
    outputShape,
    paramCount: inner.model.total_params,
    layerCount: layers.length,
    partCount: inner.groups.filter((child) => child.parent === null).length,
    miniature: isSystem(inner) ? partsMiniature(inner) : layersMiniature(inner),
    rank: 0,
    x: 0,
    y: 0,
    // Bigger with parts, so each part's box has room for its own drawing.
    ...(isSystem(inner) ? PARTS_CARD : NETWORK_CARD),
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
    partCount: 0,
    miniature: layerGlyph(node),
    rank: 0,
    x: 0,
    y: 0,
    ...(isLayer(node) ? LAYER_CARD : NODE_CARD),
  };
}

/** A real layer (a conv, a pool, a dense layer), as opposed to a block, an input or an output. */
export function isLayer(node: GraphNode): boolean {
  return node.type !== "custom" && node.type !== "input" && node.type !== "output";
}

function terminal(id: string, type: "input" | "output", label: string, shape: number[], params: Record<string, unknown> = {}): GraphNode {
  return { id, type, label, group: null, input_shape: shape, output_shape: shape, params, param_count: 0, activation: null, notes: null };
}

/** A network's layers as laid out in its own view, squeezed into 0..1 along x. */
function layersMiniature(graph: Graph): Miniature {
  const layout = layoutGraph(graph);
  // The first and last layer sit at the preview's edges.
  const xs = [...layout.columns.map((column) => column.x), ...layout.bands.filter((band) => band.kind === "merge").map((band) => band.x)];
  const [left, right] = [Math.min(...xs), Math.max(...xs)];
  const along = (x: number) => (right > left ? (x - left) / (right - left) : 0.5);
  const largest = Math.max(1, ...layout.columns.map((column) => (column.maps ? column.maps.slabs[0].width : 0)));
  const items: MiniItem[] = [];
  const indexOf = new Map<string, number>();
  for (const column of layout.columns) {
    indexOf.set(column.node.id, items.length);
    items.push(
      column.maps
        ? { kind: "maps", x: along(column.x), size: column.maps.slabs[0].width / largest, channels: column.maps.channels }
        : { kind: "neurons", x: along(column.x), units: column.units },
    );
  }
  for (const band of layout.bands.filter((candidate) => candidate.kind === "merge")) {
    indexOf.set(band.node.id, items.length);
    items.push({ kind: "merge", x: along(band.x), glyph: band.node.type === "add" ? "+" : "\u2225" });
  }
  const links: [number, number][] = [];
  for (const link of layout.links) {
    const stops = [link.from.node.id, ...link.through.filter((band) => band.kind === "merge").map((band) => band.node.id), link.to.node.id];
    for (let i = 1; i < stops.length; i += 1) links.push([indexOf.get(stops[i - 1])!, indexOf.get(stops[i])!]);
  }
  for (const stub of layout.stubs) if (indexOf.has(stub.to.node.id)) links.push([indexOf.get(stub.from.node.id)!, indexOf.get(stub.to.node.id)!]);
  const arcs = layout.arcs.flatMap((arc): [number, number][] => {
    const from = indexOf.get(arc.source.id);
    const to = indexOf.get(arc.target.id);
    return from !== undefined && to !== undefined ? [[from, to]] : [];
  });
  return { items, links, arcs };
}

/** A network with parts: its parts as boxes, placed as in its own overview. */
function partsMiniature(graph: Graph): Miniature {
  const layout = layoutSystem(graph);
  // Only the parts themselves: not the inputs, outputs or outside neighbours around them.
  const cards = layout.cards.filter((card) => card.node.type !== "input" && card.node.type !== "output");
  const left = Math.min(...cards.map((card) => card.x - card.width / 2));
  const right = Math.max(...cards.map((card) => card.x + card.width / 2));
  const top = Math.max(...cards.map((card) => card.y + card.height / 2));
  const bottom = Math.min(...cards.map((card) => card.y - card.height / 2));
  const width = Math.max(right - left, 1);
  const height = Math.max(top - bottom, 1);
  const items: MiniItem[] = cards.map((card) => ({
    kind: "box",
    x: (card.x - left) / width,
    y: (card.y - bottom) / height,
    width: card.width / width,
    height: card.height / height,
    label: card.group ? card.group.label : card.node.params["contextName"] ? String(card.node.params["contextName"]) : card.node.label,
    inner: card.miniature,
  }));
  const links = layout.links
    .filter((link) => cards.includes(link.from) && cards.includes(link.to))
    .map((link): [number, number] => [cards.indexOf(link.from), cards.indexOf(link.to)]);
  return { items, links, arcs: [] };
}

/** A single layer's glyph: a stack for feature maps, a column of dots for neurons, nothing for blocks. */
function layerGlyph(node: GraphNode): Miniature {
  if (!isLayer(node)) return EMPTY_MINIATURE;
  const shape = node.output_shape;
  if (shape.length === 3) return { items: [{ kind: "maps", x: 0.5, size: 1, channels: shape[0] }], links: [], arcs: [] };
  return { items: [{ kind: "neurons", x: 0.5, units: shape.reduce((total, size) => total * size, 1) }], links: [], arcs: [] };
}
