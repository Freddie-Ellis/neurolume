/**
 * Column layout for chain-shaped graphs (Phase 1).
 *
 * Layers that hold neurons (input, dense, ...) become columns. Small layers
 * that only transform the signal (activation, dropout, flatten, ...) become
 * thin "bands" drawn on the connection between two columns. Everything here
 * is plain maths with no three.js, so it is easy to unit test.
 */
import type { Graph, GraphNode, NodeType, WeightSample } from "../schema";

export const MAX_NEURONS_SHOWN = 64;
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
  /** y position of each neuron that is drawn. */
  slots: number[];
  /** y position of the "⋮" marker when some neurons are hidden, else null. */
  ellipsisY: number | null;
  panel: { left: number; right: number; top: number; bottom: number };
}

export interface BandLayout {
  node: GraphNode;
  x: number;
  /** Half the band's height, matched to the neuron area of the panels. */
  halfHeight: number;
}

export interface LinkLayout {
  from: ColumnLayout;
  to: ColumnLayout;
  /** Position along the network from 0 (input side) to 1, used for colour. */
  t: number;
}

export interface Layout {
  columns: ColumnLayout[];
  bands: BandLayout[];
  links: LinkLayout[];
  bounds: { left: number; right: number; top: number; bottom: number };
}

export function isBand(node: GraphNode): boolean {
  return BAND_TYPES.has(node.type);
}

const product = (shape: number[]) => shape.reduce((total, size) => total * size, 1);

/** Number of units a layer holds: the size of its output, without the batch dimension. */
export function unitCount(node: GraphNode): number {
  if (node.output_shape.length > 0) return product(node.output_shape);
  const outFeatures = node.params["out_features"];
  return typeof outFeatures === "number" ? outFeatures : 1;
}

/** y positions of the drawn neurons, centred on 0, with a gap when truncated. */
export function neuronSlots(
  units: number,
  maxShown = MAX_NEURONS_SHOWN,
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
  return units > MAX_NEURONS_SHOWN ? MAX_NEURONS_SHOWN - 1 + ELLIPSIS_GAP : Math.max(units - 1, 1);
}

/** Which drawn neuron stands for unit `index` of a layer with `units` units. */
export function slotFor(index: number, units: number, shown: number): number {
  return Math.min(shown - 1, Math.floor((index * shown) / Math.max(units, 1)));
}

export function layoutGraph(graph: Graph): Layout {
  const columns: ColumnLayout[] = [];
  const pendingBands: GraphNode[][] = [[]]; // bands after column i live in pendingBands[i + 1]
  const placeholder = { left: 0, right: 0, top: 0, bottom: 0 };

  for (const node of graph.nodes) {
    if (isBand(node)) {
      pendingBands[pendingBands.length - 1].push(node);
      continue;
    }
    const units = unitCount(node);
    const { slots, ellipsisY } = neuronSlots(units);
    columns.push({ node, index: columns.length, x: columns.length * COLUMN_SPACING, units, slots, ellipsisY, panel: placeholder });
    pendingBands.push([]);
  }

  // Every panel gets the height of the tallest column (and at least
  // MIN_NEURON_EXTENT), so the panels line up as one row of equal, tall frames.
  // Smaller layers then spread their neurons out to fill more of that height.
  const naturalExtent = Math.max(...columns.flatMap((column) => column.slots.map(Math.abs)));
  const neuronExtent = Math.max(MIN_NEURON_EXTENT, naturalExtent);
  for (const column of columns) {
    const fill = (neuronExtent * 2 * 0.85) / spacingSteps(column.units);
    const spacing = Math.min(MAX_NEURON_SPACING, Math.max(NEURON_SPACING, fill));
    Object.assign(column, neuronSlots(column.units, MAX_NEURONS_SHOWN, spacing));
  }
  for (const column of columns) {
    column.panel = {
      left: column.x - COLUMN_SPACING / 2 + PANEL_GAP / 2,
      right: column.x + COLUMN_SPACING / 2 - PANEL_GAP / 2,
      top: neuronExtent + PANEL_PADDING + PANEL_HEADER,
      bottom: -(neuronExtent + PANEL_PADDING),
    };
  }

  // Spread each run of bands evenly across the gap that follows its column.
  const bands: BandLayout[] = [];
  const halfHeight = neuronExtent + PANEL_PADDING / 2;
  pendingBands.forEach((run, slot) => {
    const start = (slot - 1) * COLUMN_SPACING;
    const isTrailing = slot === columns.length;
    run.forEach((node, i) => {
      const fraction = isTrailing ? (i + 1) / (run.length + 1) / 1.5 : (i + 1) / (run.length + 1);
      bands.push({ node, x: start + fraction * COLUMN_SPACING, halfHeight });
    });
  });

  const links = columns.slice(1).map((to, i) => ({
    from: columns[i],
    to,
    t: columns.length > 2 ? i / (columns.length - 2) : 0,
  }));

  const xs = [...columns.flatMap((c) => [c.panel.left, c.panel.right]), ...bands.map((b) => b.x)];
  return {
    columns,
    bands,
    links,
    bounds: {
      left: Math.min(...xs, 0),
      right: Math.max(...xs, 0),
      top: Math.max(...columns.map((c) => c.panel.top), 0),
      bottom: Math.min(...columns.map((c) => c.panel.bottom), 0),
    },
  };
}

export interface LinkSegments {
  /** Pairs of [fromSlot, toSlot] indices into the two columns' slot arrays. */
  pairs: [number, number][];
  /** Brightness of each pair, 0 to 1. */
  strength: number[];
}

/**
 * Work out which neuron pairs to connect. With sampled weights we draw the
 * sampled connections, merged onto the visible neurons and scaled by |weight|;
 * without weights every visible neuron connects to every other one.
 */
export function linkSegments(link: LinkLayout, sample: WeightSample | undefined): LinkSegments {
  const fromShown = link.from.slots.length;
  const toShown = link.to.slots.length;

  if (!sample || sample.pairs.length === 0) {
    const pairs: [number, number][] = [];
    for (let a = 0; a < fromShown; a += 1) for (let b = 0; b < toShown; b += 1) pairs.push([a, b]);
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
  for (const [key, value] of strongest) {
    pairs.push([Math.floor(key / toShown), key % toShown]);
    strength.push(0.25 + 0.75 * (value / maxValue));
  }
  return { pairs, strength };
}
