/**
 * Geometry for layers whose output is a stack of feature maps (channels x
 * height x width), such as convolutions and pooling. Each channel is drawn as
 * a thin slab; the slabs are offset diagonally so the stack reads as depth,
 * like the classic LeNet diagrams. Plain maths with no three.js.
 */

/** Most slabs drawn per stack; the panel header gives the real channel count. */
export const MAX_MAPS_SHOWN = 12;
/** World units per pixel of feature map, so a 28 x 28 map is drawn 168 units wide. */
export const MAP_SCALE = 6;
export const MIN_MAP_SIZE = 32;
export const MAX_MAP_SIZE = 170;
/** Diagonal offset between neighbouring slabs, and the most the whole stack may spread. */
export const MAP_STEP = 8;
export const MAX_MAP_DEPTH = 72;
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

/** The stack for a [channels, height, width] output, centred on (x, 0). */
export function mapStack(shape: number[], x: number): MapStack {
  const [channels, mapHeight, mapWidth] = shape;
  const shown = Math.max(1, Math.min(channels, MAX_MAPS_SHOWN));
  const width = clamp(mapWidth * MAP_SCALE, MIN_MAP_SIZE, MAX_MAP_SIZE);
  const height = clamp(mapHeight * MAP_SCALE, MIN_MAP_SIZE, MAX_MAP_SIZE);
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

/** Where on a slab the funnel's window sits, as fractions of its width and height. */
const FUNNEL_AT = { x: 0.62, y: 0.38 };

/**
 * A convolution or pooling step: a kernel-sized window on the previous stack's
 * front slab, and lines from its corners to one point on the next stack's
 * front slab. Returns the window's outline and the four lines, as segments
 * [x0, y0, x1, y1]; the first four segments are the window.
 */
export function funnel(from: MapStack, to: MapStack, kernel: number[]): [number, number, number, number][] {
  const source = frontSlab(from);
  const target = frontSlab(to);
  const [kernelHeight, kernelWidth] = kernel.length >= 2 ? kernel : [kernel[0] ?? 3, kernel[0] ?? 3];
  const windowWidth = Math.max(6, (kernelWidth / from.mapWidth) * source.width);
  const windowHeight = Math.max(6, (kernelHeight / from.mapHeight) * source.height);

  const left = source.left + source.width * FUNNEL_AT.x - windowWidth / 2;
  const bottom = source.bottom + source.height * FUNNEL_AT.y - windowHeight / 2;
  const right = left + windowWidth;
  const top = bottom + windowHeight;
  const tipX = target.left + target.width * FUNNEL_AT.x;
  const tipY = target.bottom + target.height * FUNNEL_AT.y;

  return [
    [left, bottom, right, bottom],
    [right, bottom, right, top],
    [right, top, left, top],
    [left, top, left, bottom],
    [left, bottom, tipX, tipY],
    [right, bottom, tipX, tipY],
    [right, top, tipX, tipY],
    [left, top, tipX, tipY],
  ];
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
