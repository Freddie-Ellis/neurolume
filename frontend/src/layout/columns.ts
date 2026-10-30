/**
 * Column layout for a network, drawn left to right in the order it runs.
 *
 * Layers that hold neurons (input, dense, ...) become columns. Layers whose
 * output is a stack of feature maps (convolution, pooling, image inputs) are
 * columns too, drawn as slabs (see maps.ts). Small layers that only transform
 * the signal (activation, dropout, flatten, add, ...) become thin "bands"
 * drawn on the connection between two columns.
 *
 * Networks that branch (a ResNet block's skip connection, a downsample path)
 * stay in one row: neighbouring columns are linked only when the signal really
 * flows from one to the next, and every other edge becomes an arc drawn under
 * the panels, from the layer it leaves to the layer it joins. Add and concat
 * bands are merge points: edges passing them pinch through their node, and
 * arcs rise into it. A column whose output only leaves by an arc gets a "stub"
 * of edges converging on the band the arc starts from, so no edge ends in
 * empty space. Arcs that overlap get separate lanes. Everything here is plain
 * maths with no three.js, so it is easy to unit test.
 */
import type { Graph, GraphNode, NodeType, WeightSample } from "../schema";
import { limits } from "../limits";
import { type MapStack, frontSlab, isMapShape, mapPorts, mapStack, stackExtent } from "./maps";

/** Tightest spacing between neurons, used by big layers. */
export const NEURON_SPACING = 12;
/** Widest spacing, so a 4-unit layer spreads out but still reads as one column. */
export const MAX_NEURON_SPACING = 28;
/**
 * Smallest half-height of the neuron area. Without it, a network of small
 * layers lays out as a long, thin strip that fits the screen badly.
 */
export const MIN_NEURON_EXTENT = 210;
export const COLUMN_SPACING = 300;
/** Panels tile the canvas side by side, separated by this gap. */
export const PANEL_GAP = 12;
export const PANEL_PADDING = 32;
/** Room at the top of every panel for its HTML header label. */
export const PANEL_HEADER = 56;
const ELLIPSIS_GAP = 3; // in neuron spacings
/** Bands after the last column (a block's final norm, add and output) sit this far apart, so their chips don't overlap. */
const TRAILING_BAND_STEP = 125;
/** Room each band needs along the row, so chips and merge nodes don't overlap or touch a stack. */
const BAND_ROOM = 100;
/** Clear space between a feature-map stack and the bands or stack beside it. */
const STACK_MARGIN = 30;

const BAND_TYPES: ReadonlySet<NodeType> = new Set([
  "activation",
  "dropout",
  "flatten",
  "reshape",
  "norm",
  "add",
  "concat",
  "output",
]);

export interface ColumnLayout {
  node: GraphNode;
  index: number;
  x: number;
  /** True number of units in the layer. */
  units: number;
  /** y position of each neuron that is drawn, or where edges meet a feature-map stack. */
  slots: number[];
  /** y position of the "⋮" marker when some neurons are hidden, else null. */
  ellipsisY: number | null;
  /** The feature-map stack, for [channels, height, width] outputs; null for neuron columns. */
  maps: MapStack | null;
  /** x where edges arrive and leave: the column itself, or the front slab's left and right edges. */
  entryX: number;
  exitX: number;
  panel: { left: number; right: number; top: number; bottom: number };
}

/**
 * How a band changes the edges that cross it: "merge" (add, concat) pinches
 * them through one node; "flatten" (after a feature-map stack) threads each one
 * through its place in a strip of cells, the stack unrolled into one column.
 */
export type BandKind = "merge" | "flatten" | "plain";

export interface BandLayout {
  node: GraphNode;
  x: number;
  /** Half the band's height, matched to the neuron area of the panels. */
  halfHeight: number;
  kind: BandKind;
  /** Half the height of a flatten band's strip of cells (0 for other kinds). */
  stripHalfHeight: number;
}

export interface LinkLayout {
  from: ColumnLayout;
  to: ColumnLayout;
  /** Position along the network from 0 (input side) to 1, used for colour. */
  t: number;
  /** Merge and flatten bands between the two columns, left to right; the edges pass through them. */
  through: BandLayout[];
}

/** Edges from a column that converge on a band, when the column's output only leaves by an arc from there. */
export interface StubLayout {
  from: ColumnLayout;
  to: BandLayout;
  t: number;
}

/** Where an arc starts or ends: a column's cells or neurons, or a band's node. */
export type ArcEnd = { column: ColumnLayout } | { band: BandLayout };

/** An edge that skips over other layers, drawn as an arc under the panels. */
export interface ArcLayout {
  source: GraphNode;
  target: GraphNode;
  start: ArcEnd;
  end: ArcEnd;
  /** x of the layers the arc leaves and joins, for picking lanes. */
  x0: number;
  x1: number;
  /** Lowest point of the arc. */
  laneY: number;
  /** Position along the network from 0 to 1, for colour, like LinkLayout.t. */
  t: number;
  tensorShape: number[];
}

/** Room under the panels for each lane of arcs. */
export const ARC_LANE_GAP = 40;
/** A flatten strip spans this share of the neuron area's height. */
const FLATTEN_STRIP_SHARE = 0.75;
const MERGE_TYPES: ReadonlySet<NodeType> = new Set(["add", "concat"]);

export interface Layout {
  columns: ColumnLayout[];
  bands: BandLayout[];
  links: LinkLayout[];
  stubs: StubLayout[];
  arcs: ArcLayout[];
  bounds: { left: number; right: number; top: number; bottom: number };
}

export function isBand(node: GraphNode): boolean {
  return BAND_TYPES.has(node.type);
}

const product = (shape: number[]) => shape.reduce((total, size) => total * size, 1);

/**
 * Whether a layer is drawn as a stack of feature maps. An image input is only
 * drawn that way when a convolution or pooling layer reads it; feeding an MLP,
 * it stays a column of input neurons.
 */
function drawsMaps(node: GraphNode, next: GraphNode | undefined): boolean {
  if (!isMapShape(node.output_shape)) return false;
  return node.type !== "input" || (next !== undefined && isMapShape(next.output_shape));
}

/** Number of units a layer holds: the size of its output, without the batch dimension. */
export function unitCount(node: GraphNode): number {
  if (node.output_shape.length > 0) return product(node.output_shape);
  const outFeatures = node.params["out_features"];
  return typeof outFeatures === "number" ? outFeatures : 1;
}

/** y positions of the drawn neurons, centred on 0, with a gap when truncated. */
export function neuronSlots(
  units: number,
  maxShown = limits.neurons,
  spacing = NEURON_SPACING,
): { slots: number[]; ellipsisY: number | null } {
  if (units <= maxShown) {
    const offset = ((units - 1) * spacing) / 2;
    return { slots: Array.from({ length: units }, (_, i) => offset - i * spacing), ellipsisY: null };
  }
  const half = Math.floor(maxShown / 2);
  const span = (maxShown - 1 + ELLIPSIS_GAP) * spacing;
  const slots: number[] = [];
  for (let i = 0; i < maxShown; i += 1) {
    const step = i < half ? i : i + ELLIPSIS_GAP;
    slots.push(span / 2 - step * spacing); // top to bottom
  }
  return { slots, ellipsisY: (slots[half - 1] + slots[half]) / 2 };
}

/** Number of neuron spacings a column spans from its top neuron to its bottom one. */
function spacingSteps(units: number): number {
  return units > limits.neurons ? limits.neurons - 1 + ELLIPSIS_GAP : Math.max(units - 1, 1);
}

/** Which drawn neuron stands for unit `index` of a layer with `units` units. */
export function slotFor(index: number, units: number, shown: number): number {
  return Math.min(shown - 1, Math.floor((index * shown) / Math.max(units, 1)));
}

export function layoutGraph(graph: Graph): Layout {
  const columnNodes = graph.nodes.filter((node) => !isBand(node));
  // Stacks are sized against the network's largest feature map.
  const largestMap = Math.max(1, ...graph.nodes.filter((node) => isMapShape(node.output_shape)).flatMap((node) => node.output_shape.slice(1)));
  const columns: ColumnLayout[] = [];
  const pendingBands: GraphNode[][] = [[]]; // bands after column i live in pendingBands[i + 1]
  for (const node of graph.nodes) {
    if (isBand(node)) pendingBands[pendingBands.length - 1].push(node);
    else pendingBands.push([]);
  }
  const placeholder = { left: 0, right: 0, top: 0, bottom: 0 };

  // Rank = longest path from the input, counting columns only (bands pass the
  // signal on). Nodes are in the order they run, so one pass is enough.
  const depth = new Map<string, number>();
  for (const node of graph.nodes) {
    const sources = graph.edges.filter((edge) => edge.target === node.id).map((edge) => depth.get(edge.source) ?? 0);
    depth.set(node.id, Math.max(0, ...sources) + (isBand(node) || sources.length === 0 ? 0 : 1));
  }
  // Neighbouring columns of equal rank are parallel branches (two heads on one
  // trunk): they share a slot, one above the other. Only neuron columns with no
  // bands between them; a graph without edges is a chain.
  const slotOf: number[] = [];
  columnNodes.forEach((node, i) => {
    const previous = columnNodes[i - 1];
    const parallel =
      previous !== undefined &&
      graph.edges.length > 0 &&
      depth.get(node.id) === depth.get(previous.id) &&
      pendingBands[i].length === 0 &&
      !drawsMaps(node, columnNodes[i + 1]) &&
      !drawsMaps(previous, node);
    slotOf.push(i === 0 ? 0 : slotOf[i - 1] + (parallel ? 0 : 1));
  });
  const members = (i: number) => columnNodes.flatMap((_, j) => (slotOf[j] === slotOf[i] ? [j] : []));
  const slotCount = (slotOf[slotOf.length - 1] ?? -1) + 1;

  // How far each column reaches either side of its centre: half a stack's
  // footprint (front slab plus the spread of the slabs behind it), plus a
  // margin; neuron columns are a line. Neighbours sit far enough apart for
  // both reaches and the bands between them, and at least COLUMN_SPACING.
  const reach = columnNodes.map((node, i) => {
    if (!drawsMaps(node, columnNodes[i + 1])) return 0;
    const probe = mapStack(node.output_shape, 0, largestMap);
    return -frontSlab(probe).left + STACK_MARGIN;
  });
  const centres = [0];
  for (let i = 1; i < columnNodes.length; i += 1) {
    if (slotOf[i] === slotOf[i - 1]) {
      centres.push(centres[i - 1]);
      continue;
    }
    const needed = reach[i - 1] + reach[i] + pendingBands[i].length * BAND_ROOM;
    centres.push(centres[i - 1] + Math.max(COLUMN_SPACING, needed));
  }

  for (const node of columnNodes) {
    const units = unitCount(node);
    const index = columns.length;
    const x = centres[index];
    if (drawsMaps(node, columnNodes[index + 1])) {
      const maps = mapStack(node.output_shape, x, largestMap);
      const front = frontSlab(maps);
      const ports = mapPorts(maps);
      columns.push({ node, index, x, units, slots: ports, ellipsisY: null, maps, entryX: front.left, exitX: front.left + front.width, panel: placeholder });
    } else {
      const { slots, ellipsisY } = neuronSlots(units);
      columns.push({ node, index, x, units, slots, ellipsisY, maps: null, entryX: x, exitX: x, panel: placeholder });
    }
  }

  // Every panel gets the height of the tallest column (and at least
  // MIN_NEURON_EXTENT), so the panels line up as one row of equal, tall frames.
  // Smaller layers then spread their neurons out to fill more of that height.
  // Columns sharing a slot split the height, each part with its own header and
  // padding, so the panels grow until every part holds its column.
  const partRoom = PANEL_HEADER / 2 + PANEL_PADDING;
  const naturalExtent = Math.max(
    ...columns.map((column, i) => {
      const n = members(i).length;
      const natural = column.maps ? stackExtent(column.maps) : Math.max(...column.slots.map(Math.abs));
      return n * (natural + partRoom) + ((n - 1) * PANEL_GAP) / 2 - partRoom;
    }),
  );
  const neuronExtent = Math.max(MIN_NEURON_EXTENT, naturalExtent);
  const panelTop = neuronExtent + PANEL_PADDING + PANEL_HEADER;
  /** Column i's part of its slot, top first: its panel's top and bottom, and the middle and half-height of its neuron area. */
  const part = (i: number) => {
    const slot = members(i);
    const height = (panelTop + neuronExtent + PANEL_PADDING - (slot.length - 1) * PANEL_GAP) / slot.length;
    const top = panelTop - slot.indexOf(i) * (height + PANEL_GAP);
    const extent = (height - PANEL_HEADER) / 2 - PANEL_PADDING;
    return { top, bottom: top - height, middle: top - PANEL_HEADER - PANEL_PADDING - extent, extent };
  };
  columns.forEach((column, i) => {
    if (column.maps) return; // stacks keep their own size
    const { middle, extent } = part(i);
    const fill = (extent * 2 * 0.85) / spacingSteps(column.units);
    const spacing = Math.min(MAX_NEURON_SPACING, Math.max(NEURON_SPACING, fill));
    const { slots, ellipsisY } = neuronSlots(column.units, limits.neurons, spacing);
    Object.assign(column, { slots: slots.map((y) => y + middle), ellipsisY: ellipsisY === null ? null : ellipsisY + middle });
  });
  // Spread each run of bands evenly across the clear gap after its column:
  // from the edge of its stack (or its neurons) to the edge of the next one.
  // Bands after the last column start past the end of its panel.
  const bands: BandLayout[] = [];
  const runs: BandLayout[][] = [];
  const halfHeight = neuronExtent + PANEL_PADDING / 2;
  /** Where a panel ends on the open side of the first or last column. */
  const outerEdge = (i: number, side: -1 | 1) => columns[i].x + side * Math.max(COLUMN_SPACING / 2, reach[i]);
  pendingBands.forEach((run, slot) => {
    const before = columns[slot - 1];
    const after = columns[slot];
    const start = before ? (after ? before.x + reach[slot - 1] : outerEdge(slot - 1, 1)) : 0;
    runs[slot] = run.map((node, i) => {
      const x = after ? start + ((i + 1) / (run.length + 1)) * (after.x - reach[slot] - start) : start + TRAILING_BAND_STEP / 2 + i * TRAILING_BAND_STEP;
      const kind: BandKind = MERGE_TYPES.has(node.type) ? "merge" : node.type === "flatten" && before?.maps ? "flatten" : "plain";
      return { node, x, halfHeight, kind, stripHalfHeight: kind === "flatten" ? neuronExtent * FLATTEN_STRIP_SHARE : 0 };
    });
    bands.push(...runs[slot]);
  });

  // Panels tile the row. Between two columns with bands, the gap between their
  // panels widens to hold the bands, so a flatten or an add sits between the
  // layers rather than inside one; otherwise panels meet halfway.
  const gutter = (i: number): [number, number] => {
    // Between column i and column i + 1: where the left panel ends and the right one starts.
    const run = runs[i + 1];
    if (run.length > 0) return [run[0].x - BAND_ROOM / 2, run[run.length - 1].x + BAND_ROOM / 2];
    const middle = (columns[i].x + columns[i + 1].x) / 2;
    return [middle - PANEL_GAP / 2, middle + PANEL_GAP / 2];
  };
  columns.forEach((column, i) => {
    const slot = members(i);
    const [first, last] = [slot[0], slot[slot.length - 1]];
    const { top, bottom } = part(i);
    column.panel = {
      left: columns[first - 1] ? gutter(first - 1)[1] : outerEdge(first, -1) + PANEL_GAP / 2,
      right: columns[last + 1] ? gutter(last)[0] : outerEdge(last, 1) - PANEL_GAP / 2,
      top,
      bottom,
    };
  });

  const order = new Map(graph.nodes.map((node, i) => [node.id, i]));
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const edgeKeys = new Set(graph.edges.map((edge) => `${edge.source}>${edge.target}`));
  const bandOf = new Map(bands.map((band) => [band.node.id, band]));
  // The bands on a chain of real edges from one column to another that passes
  // only bands, or null if there is none. A graph without edges is a chain.
  const route = (from: GraphNode, to: GraphNode): GraphNode[] | null => {
    if (graph.edges.length === 0) return graph.nodes.slice(order.get(from.id)! + 1, order.get(to.id)!);
    for (const edge of graph.edges.filter((candidate) => candidate.source === from.id)) {
      if (edge.target === to.id) return [];
      const next = byId.get(edge.target);
      const rest = next && isBand(next) ? route(next, to) : null;
      if (next && rest) return [next, ...rest];
    }
    return null;
  };
  const between = (from: GraphNode, to: GraphNode | undefined) =>
    graph.nodes.slice(order.get(from.id)! + 1, to ? order.get(to.id)! : undefined).flatMap((node) => bandOf.get(node.id) ?? []);
  const tOf = (i: number) => (slotCount > 2 ? slotOf[i] / (slotCount - 2) : 0);
  // Columns in neighbouring slots are linked where the signal flows from one to the other.
  const covered = new Set<string>(); // edges drawn by links, so they don't become arcs too
  const links: LinkLayout[] = [];
  columns.forEach((from, i) => {
    for (const to of columns.filter((_, j) => slotOf[j] === slotOf[i] + 1)) {
      const path = route(from.node, to.node);
      if (!path) continue;
      const chain = [from.node, ...path, to.node];
      for (let k = 1; k < chain.length; k += 1) covered.add(`${chain[k - 1].id}>${chain[k].id}`);
      links.push({ from, to, t: tOf(i), through: path.flatMap((node) => bandOf.get(node.id) ?? []).filter((band) => band.kind !== "plain") });
    }
  });

  // Parallel branches feeding a band right after them (two heads into one
  // output) converge on it directly, rather than by arcs dipping under the panels.
  const stubs: StubLayout[] = [];
  columns.forEach((column, i) => {
    if (!slotOf.some((slot, j) => j !== i && slot === slotOf[i])) return;
    const next = columns.find((_, j) => slotOf[j] > slotOf[i]);
    for (const band of between(column.node, next?.node)) {
      const key = `${column.node.id}>${band.node.id}`;
      if (!edgeKeys.has(key) || covered.has(key)) continue;
      covered.add(key);
      stubs.push({ from: column, to: band, t: tOf(i) });
    }
  });

  const panelBottom = Math.min(...columns.map((c) => c.panel.bottom), 0);
  const arcs = layoutArcs(graph, order, columns, bands, panelBottom, covered);

  // A column not linked to the next one may still feed bands after it (a
  // block's last norm and its add). Its edges converge on the first merge band
  // there, or else on the last band an arc leaves from.
  const arcSources = new Set(arcs.map((arc) => arc.source.id));
  columns.forEach((column, i) => {
    if (links.some((link) => link.from === column) || stubs.some((stub) => stub.from === column)) return;
    const fed: BandLayout[] = [];
    let previous = column.node;
    for (const band of between(column.node, columns[i + 1]?.node)) {
      if (!edgeKeys.has(`${previous.id}>${band.node.id}`)) break;
      fed.push(band);
      previous = band.node;
    }
    const target = fed.find((band) => band.kind === "merge") ?? [...fed].reverse().find((band) => arcSources.has(band.node.id));
    if (target) stubs.push({ from: column, to: target, t: tOf(Math.max(0, i - 1)) });
  });

  const xs = [...columns.flatMap((c) => [c.panel.left, c.panel.right]), ...bands.map((b) => b.x)];
  return {
    columns,
    bands,
    links,
    stubs,
    arcs,
    bounds: {
      left: Math.min(...xs, 0),
      right: Math.max(...xs, 0),
      top: Math.max(...columns.map((c) => c.panel.top), 0),
      bottom: Math.min(panelBottom, ...arcs.map((arc) => arc.laneY - ARC_LANE_GAP / 2)),
    },
  };
}

/**
 * Edges that don't go to the very next layer, as arcs under the panels.
 * Shorter arcs get the lanes nearest the panels, so arcs nest instead of crossing.
 */
function layoutArcs(graph: Graph, order: Map<string, number>, columns: ColumnLayout[], bands: BandLayout[], panelBottom: number, covered: Set<string>): ArcLayout[] {
  const anchors = new Map<string, { end: ArcEnd; x: number }>();
  for (const column of columns) anchors.set(column.node.id, { end: { column }, x: column.x });
  for (const band of bands) anchors.set(band.node.id, { end: { band }, x: band.x });

  const skips = graph.edges.filter((edge) => {
    const from = order.get(edge.source);
    const to = order.get(edge.target);
    if (covered.has(`${edge.source}>${edge.target}`)) return false;
    return from !== undefined && to !== undefined && to !== from + 1 && anchors.has(edge.source) && anchors.has(edge.target);
  });
  const left = Math.min(...columns.map((column) => column.x));
  const right = Math.max(...columns.map((column) => column.x));
  const byNode = new Map(graph.nodes.map((node) => [node.id, node]));

  const arcs = skips.map((edge) => {
    const start = anchors.get(edge.source)!;
    const end = anchors.get(edge.target)!;
    const t = right > left ? (end.x - left) / (right - left) : 0;
    return {
      source: byNode.get(edge.source)!,
      target: byNode.get(edge.target)!,
      start: start.end,
      end: end.end,
      x0: start.x,
      x1: end.x,
      laneY: 0,
      t,
      tensorShape: edge.tensor_shape,
    };
  });

  const lanes: [number, number][][] = []; // the x spans already taken in each lane
  for (const arc of [...arcs].sort((a, b) => Math.abs(a.x1 - a.x0) - Math.abs(b.x1 - b.x0))) {
    const [from, to] = [Math.min(arc.x0, arc.x1), Math.max(arc.x0, arc.x1)];
    let lane = lanes.findIndex((spans) => spans.every(([a, b]) => to < a || from > b));
    if (lane === -1) lane = lanes.push([]) - 1;
    lanes[lane].push([from, to]);
    arc.laneY = panelBottom - ARC_LANE_GAP * (lane + 1);
  }
  return arcs;
}

export interface LinkSegments {
  /** Pairs of [fromSlot, toSlot] indices into the two columns' slot arrays. */
  pairs: [number, number][];
  /** Brightness of each pair, 0 to 1. */
  strength: number[];
  /**
   * For live training: the drawn pair each sampled weight (`sample.pairs[i]`)
   * feeds, or -1 if it isn't drawn, so `liveStrengths` can redo `strength`
   * from new values without rebuilding the edges. Absent without weights.
   */
  lineOf?: Int32Array;
}

/**
 * Work out which neuron pairs to connect. With sampled weights we draw the
 * sampled connections, merged onto the visible neurons and scaled by |weight|;
 * without weights every visible neuron connects to every other one. Either way
 * at most `limits.weights` are kept: the strongest, or every n-th pair.
 */
export function linkSegments(link: LinkLayout, sample: WeightSample | undefined): LinkSegments {
  const fromShown = link.from.slots.length;
  const toShown = link.to.slots.length;

  if (!sample || sample.pairs.length === 0) {
    const pairs: [number, number][] = [];
    const every = Math.max(1, Math.floor((fromShown * toShown) / limits.weights));
    for (let k = 0; k < fromShown * toShown; k += every) pairs.push([Math.floor(k / toShown), k % toShown]);
    return { pairs, strength: pairs.map(() => 1) };
  }

  const fromUnits = link.to.node.input_shape.length > 0 ? product(link.to.node.input_shape) : link.from.units;
  const strongest = new Map<number, number>();
  for (const [fromIndex, toIndex, value] of sample.pairs) {
    const key = slotFor(fromIndex, fromUnits, fromShown) * toShown + slotFor(toIndex, link.to.units, toShown);
    strongest.set(key, Math.max(strongest.get(key) ?? 0, Math.abs(value)));
  }
  const maxValue = Math.max(...strongest.values()) || 1;
  const pairs: [number, number][] = [];
  const strength: number[] = [];
  const lineOfKey = new Map<number, number>();
  for (const [key, value] of [...strongest].sort((a, b) => b[1] - a[1]).slice(0, limits.weights)) {
    lineOfKey.set(key, pairs.length);
    pairs.push([Math.floor(key / toShown), key % toShown]);
    strength.push(0.25 + 0.75 * (value / maxValue));
  }
  const lineOf = Int32Array.from(sample.pairs, ([fromIndex, toIndex]) => lineOfKey.get(slotFor(fromIndex, fromUnits, fromShown) * toShown + slotFor(toIndex, link.to.units, toShown)) ?? -1);
  return { pairs, strength, lineOf };
}

/**
 * Brightness per drawn pair from new weight values (live training). Each pair
 * takes its strongest |value|; by default, like `linkSegments`, scaled against
 * the strongest overall to 0.25 to 1. `values[i]` is `sample.pairs[i]`'s.
 *
 * A live run passes a `look` with more contrast: a fixed `scale` (the layer's
 * strongest starting weight), so a layer whose weights all grow brightens
 * instead of being rescaled back, a lower `floor` and a `gamma` > 1, so
 * middling weights sit darker and the strong ones stand out as they move.
 */
export function liveStrengths(lineOf: Int32Array, lines: number, values: ArrayLike<number>, look: StrengthLook = {}): Float32Array {
  const { floor = 0.25, gamma = 1 } = look;
  const strongest = new Float32Array(lines);
  for (let i = 0; i < lineOf.length; i += 1) {
    const line = lineOf[i];
    if (line >= 0) strongest[line] = Math.max(strongest[line], Math.abs(values[i]));
  }
  let max = 0;
  for (const value of strongest) max = Math.max(max, value);
  const scale = look.scale || max || 1;
  const low = look.low ?? 0;
  const span = scale - low || 1;
  const boost = look.boost ?? 1;
  return strongest.map((value) => boost * (floor + (1 - floor) * Math.min(1, Math.max(0, value - low) / span) ** gamma));
}

/** How `liveStrengths` maps values to brightness: see there. */
export interface StrengthLook {
  scale?: number;
  /** Values at or below this are as dim as the floor (default 0); with `scale`, the range brightness spreads over. */
  low?: number;
  /** Multiplies every strength: with a steep gamma, few lines lit but each brighter than the static view allows. */
  boost?: number;
  /** Live edges: use the drawn lines' starting range as `low` and `scale` (see `setLiveWeights` in render/edges.ts). */
  fromStart?: boolean;
  floor?: number;
  gamma?: number;
}
