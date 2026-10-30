/**
 * Geometry for layers whose output is a stack of feature maps (channels x
 * height x width), such as convolutions and pooling. Each channel is drawn as
 * a thin slab; the slabs are offset diagonally so the stack reads as depth,
 * like the classic LeNet diagrams. Plain maths with no three.js.
 */
import type { FeatureMaps } from "../schema";
import { limits } from "../limits";

/**
 * Slab size for the network's largest feature map, which nearly fills a panel.
 * Smaller maps scale with the square root of their size, so a 5 x 5 map next
 * to a 28 x 28 one is still big enough to read (the header gives exact sizes).
 */
export const MAX_MAP_SIZE = 190;
export const MIN_MAP_SIZE = 48;
/** Diagonal offset between neighbouring slabs, and the most the whole stack may spread. */
export const MAP_STEP = 8;
export const MAX_MAP_DEPTH = 64;
/** Depth of the back slab; each slab nearer the front sits this much closer to the camera. */
export const SLAB_Z = 0.5;
export const SLAB_Z_STEP = 0.02;
/** Edges touching a slab sit just in front of it, so only the slabs nearer the front can hide them. */
const EDGE_LIFT = 0.012;
/** Edges into or out of a stack meet its front slab at this many points. */
export const MAP_PORTS = 12;

export interface Rect {
  left: number;
  bottom: number;
  width: number;
  height: number;
}

export interface MapStack {
  channels: number;
  /** Feature-map size in pixels. */
  mapHeight: number;
  mapWidth: number;
  /** Slabs drawn, back to front. The front slab is the last one, at the bottom left. */
  slabs: Rect[];
}

/** True for shapes drawn as feature maps: [channels, height, width]. */
export function isMapShape(shape: number[]): boolean {
  return shape.length === 3;
}

/**
 * The stack for a [channels, height, width] output, centred on (x, 0).
 * `largest` is the biggest height or width of any feature map in the network.
 */
export function mapStack(shape: number[], x: number, largest = Math.max(shape[1], shape[2])): MapStack {
  const [channels, mapHeight, mapWidth] = shape;
  const shown = Math.max(1, Math.min(channels, limits.maps));
  const side = (size: number) => clamp(MAX_MAP_SIZE * Math.sqrt(size / Math.max(largest, 1)), MIN_MAP_SIZE, MAX_MAP_SIZE);
  const width = side(mapWidth);
  const height = side(mapHeight);
  const step = shown > 1 ? Math.min(MAP_STEP, MAX_MAP_DEPTH / (shown - 1)) : 0;
  const depth = step * (shown - 1);

  // The footprint (front slab plus the diagonal spread) is centred on (x, 0).
  const frontLeft = x - (width + depth) / 2;
  const frontBottom = -(height + depth) / 2;
  const slabs = Array.from({ length: shown }, (_, i) => {
    const behind = shown - 1 - i; // 0 for the front slab
    return { left: frontLeft + behind * step, bottom: frontBottom + behind * step, width, height };
  });
  return { channels, mapHeight, mapWidth, slabs };
}

export function frontSlab(stack: MapStack): Rect {
  return stack.slabs[stack.slabs.length - 1];
}

/** Depth of a slab, counted from the front (0 = front slab). */
export function slabZ(stack: MapStack, fromFront: number): number {
  return SLAB_Z + (stack.slabs.length - 1 - fromFront) * SLAB_Z_STEP;
}

/** Centre of cell (row, column) on a slab counted from the front, at the depth an edge ending there gets. */
function cellOnSlab(stack: MapStack, fromFront: number, row: number, column: number): Point3 {
  const slab = stack.slabs[stack.slabs.length - 1 - fromFront];
  return [...cellCentre(slab, stack.mapHeight, stack.mapWidth, row, column), slabZ(stack, fromFront) + EDGE_LIFT];
}

/** Half the height of the whole stack, for sizing the panels around it. */
export function stackExtent(stack: MapStack): number {
  const front = frontSlab(stack);
  const back = stack.slabs[0];
  return (back.bottom + back.height - front.bottom) / 2;
}

/** y positions where edges meet the front slab, top to bottom, inset from its corners. */
export function mapPorts(stack: MapStack): number[] {
  const front = frontSlab(stack);
  const count = Math.min(MAP_PORTS, Math.max(stack.mapHeight, 2));
  const inset = front.height * 0.1;
  const span = front.height - inset * 2;
  return Array.from({ length: count }, (_, i) => front.bottom + front.height - inset - (span * i) / (count - 1));
}

/** One straight line, [x0, y0, x1, y1]. */
export type Segment = [number, number, number, number];
/** A point with depth, [x, y, z]. */
export type Point3 = [number, number, number];

/** How a convolution or pooling layer walks over its input, per spatial dimension. */
export interface Sweep {
  kernel: [number, number];
  stride: [number, number];
  /** Zeros added before the first row and column. */
  padding: [number, number];
}

/**
 * Read kernel, stride and padding from a conv or pool node's params (as both
 * adapters write them). Adaptive pooling has no kernel; it divides its input
 * into one window per output cell, which `from` and `to` (the input and output
 * stacks) let us work out.
 */
export function sweepOf(params: Record<string, unknown>, from?: MapStack, to?: MapStack): Sweep {
  const pair = (value: unknown, fallback: number): [number, number] =>
    Array.isArray(value) ? [Number(value[0]), Number(value[1] ?? value[0])] : typeof value === "number" ? [value, value] : [fallback, fallback];
  if (params["kernel_size"] === undefined && from && to) {
    const ratio = (input: number, output: number) => input / Math.max(output, 1);
    const [rows, columns] = [ratio(from.mapHeight, to.mapHeight), ratio(from.mapWidth, to.mapWidth)];
    return { kernel: [Math.ceil(rows), Math.ceil(columns)], stride: [Math.floor(rows), Math.floor(columns)], padding: [0, 0] };
  }
  const kernel = pair(params["kernel_size"], 1);
  const stride = pair(params["stride"], 1);
  const padding = params["padding"];
  const pad: [number, number] =
    padding === "same" ? [Math.floor((kernel[0] - 1) / 2), Math.floor((kernel[1] - 1) / 2)] : padding === "valid" || padding === undefined ? [0, 0] : pair(padding, 0);
  return { kernel, stride, padding: pad };
}

/** Input cells drawn per kernel dimension; a 5 x 5 window shows its corners, edge midpoints and centre. */
const WINDOW_SAMPLES = 3;

/**
 * Lines from input cells to the output cells that read them, like the edges
 * between dense layers. Each drawn output cell connects to (a sample of) the
 * cells in its kernel window. A convolution reads every input channel and
 * writes every output channel, so the lines are spread over all the slabs:
 * those on a back slab are hidden where nearer slabs cover them, and read as
 * going into the stack. Overlapping
 * 5 x 5 convolution windows fan out widely while pooling's 2 x 2 windows stay
 * apart. Big maps only connect every n-th output cell, keeping the total
 * under limits.mapEdges.
 */
export function cellLinks(from: MapStack, to: MapStack, sweep: Sweep): [Point3, Point3][] {
  const rows = windowSamples(sweep.kernel[0]);
  const columns = windowSamples(sweep.kernel[1]);
  const cellsWanted = Math.max(1, Math.floor(limits.mapEdges / (rows.length * columns.length)));
  const every = Math.max(1, Math.ceil(Math.sqrt((to.mapHeight * to.mapWidth) / cellsWanted)));
  // Centre the drawn cells, so a big map's sample doesn't hug its top-left corner.
  const firstRow = Math.floor(((to.mapHeight - 1) % every) / 2);
  const firstColumn = Math.floor(((to.mapWidth - 1) % every) / 2);

  const links: [Point3, Point3][] = [];
  let drawnCells = 0;
  for (let row = firstRow; row < to.mapHeight; row += every) {
    for (let column = firstColumn; column < to.mapWidth; column += every) {
      // Neighbouring output cells end on different output slabs; their inputs cycle through the input slabs.
      const end = cellOnSlab(to, drawnCells % to.slabs.length, row, column);
      for (const dy of rows) {
        for (const dx of columns) {
          const inRow = row * sweep.stride[0] - sweep.padding[0] + dy;
          const inColumn = column * sweep.stride[1] - sweep.padding[1] + dx;
          if (inRow < 0 || inRow >= from.mapHeight || inColumn < 0 || inColumn >= from.mapWidth) continue; // padding
          links.push([cellOnSlab(from, (drawnCells + links.length) % from.slabs.length, inRow, inColumn), end]);
        }
      }
      drawnCells += 1;
    }
  }
  return links;
}

/** Offsets inside a kernel window to draw: all of a small one, the ends and middle of a big one. */
function windowSamples(size: number): number[] {
  if (size <= WINDOW_SAMPLES) return Array.from({ length: size }, (_, i) => i);
  return Array.from({ length: WINDOW_SAMPLES }, (_, i) => Math.round((i * (size - 1)) / (WINDOW_SAMPLES - 1)));
}

/** Centre of cell (row, column) of a map drawn on `slab`, rows from the top. */
export function cellCentre(slab: Rect, mapHeight: number, mapWidth: number, row: number, column: number): [number, number] {
  return [slab.left + ((column + 0.5) / mapWidth) * slab.width, slab.bottom + slab.height - ((row + 0.5) / mapHeight) * slab.height];
}

/** Largest map that gets every grid line; bigger ones get every n-th, so the grid stays a grid. */
const MAX_GRID_LINES = 32;

/** The cell grid of a map drawn on `slab`: its inner lines, as segments. */
export function gridLines(slab: Rect, mapHeight: number, mapWidth: number): Segment[] {
  const segments: Segment[] = [];
  const top = slab.bottom + slab.height;
  const right = slab.left + slab.width;
  const rowStep = Math.ceil(mapHeight / MAX_GRID_LINES);
  const columnStep = Math.ceil(mapWidth / MAX_GRID_LINES);
  for (let row = rowStep; row < mapHeight; row += rowStep) {
    const y = top - (row / mapHeight) * slab.height;
    segments.push([slab.left, y, right, y]);
  }
  for (let column = columnStep; column < mapWidth; column += columnStep) {
    const x = slab.left + (column / mapWidth) * slab.width;
    segments.push([x, slab.bottom, x, top]);
  }
  return segments;
}

/**
 * Where a flattened input of a dense layer sits on the last stack. Flattening
 * a [channels, height, width] stack numbers its values channel by channel, row
 * by row, so value `index` is one cell of one channel. `drawn` lists the
 * channel each slab shows, front first (the recorded order when the graph has
 * feature maps); a channel without a slab of its own goes on a slab spread
 * by channel number, so edges leave from the whole stack.
 */
export function flattenedCell(stack: MapStack, index: number, drawn?: readonly number[]): Point3 {
  const cells = stack.mapHeight * stack.mapWidth;
  const within = index % cells;
  const channel = Math.floor(index / cells);
  const shown = stack.slabs.length;
  const position = drawn?.indexOf(channel) ?? -1;
  const fromFront = position >= 0 && position < shown ? position : drawn ? Math.min(shown - 1, Math.floor((channel * shown) / Math.max(stack.channels, 1))) : channel % shown;
  return cellOnSlab(stack, fromFront, Math.floor(within / stack.mapWidth), within % stack.mapWidth);
}

/** The pixels of each recorded channel (0-255, rows from the top), decoded from the graph's base64. */
export function decodeFeatureMaps(maps: FeatureMaps): Uint8Array[] {
  const bytes = Uint8Array.from(atob(maps.data), (character) => character.charCodeAt(0));
  const size = maps.height * maps.width;
  return maps.channels.map((_, i) => bytes.subarray(i * size, (i + 1) * size));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
