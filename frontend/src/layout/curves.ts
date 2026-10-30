/** Geometry for the flowing edges between two columns. */

export interface CurvePoint {
  x: number;
  y: number;
  /** How far along the gap between the two columns this point is, 0 to 1. */
  along: number;
}

export interface CurveShape {
  /** How far the handles reach, as a fraction of the horizontal gap. */
  handle?: number;
  /** Vertical offset added to both handles, which bows the curve up or down. */
  bend?: number;
  /** A ripple along the edge, faded out at both ends so it stays on its neurons. */
  wave?: { amplitude: number; cycles: number; phase: number };
}

/** About how long each sampled piece of a long curve is, in world units, so long curves stay smooth. */
export const CURVE_STEP = 8;

/** Segments to sample a curve of about `length` units with (clamped, so a huge layout can't blow up the vertex count). */
export function segmentsFor(length: number): number {
  return Math.min(256, Math.max(16, Math.ceil(length / CURVE_STEP)));
}

/** Segments for `sampleCurve` with these ends and shape, from its control polygon (an upper bound on its length). */
export function curveSegments(x0: number, y0: number, x1: number, y1: number, { handle = 0.55, bend = 0 }: CurveShape = {}): number {
  const reach = (x1 - x0) * handle;
  return segmentsFor(2 * Math.hypot(reach, bend) + Math.hypot(x1 - x0 - 2 * reach, y1 - y0));
}

/**
 * Sample a cubic Bézier from (x0, y0) to (x1, y1). With the default shape the
 * handles point horizontally, so the edge leaves and enters its neuron flat and
 * bends in the middle; giving every edge a slightly different `handle` and
 * `bend` makes a bundle of edges look organic instead of ruled. Returns
 * `segments + 1` points.
 */
export function sampleCurve(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  segments: number,
  { handle = 0.55, bend = 0, wave }: CurveShape = {},
): CurvePoint[] {
  const reach = (x1 - x0) * handle;
  const points: CurvePoint[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const d = t * t * t;
    const x = a * x0 + b * (x0 + reach) + c * (x1 - reach) + d * x1;
    const along = x1 === x0 ? t : (x - x0) / (x1 - x0);
    let y = a * y0 + b * (y0 + bend) + c * (y1 + bend) + d * y1;
    if (wave) {
      y += wave.amplitude * Math.sin(Math.PI * along * wave.cycles + wave.phase) * Math.sin(Math.PI * along);
    }
    points.push({ x, y, along });
  }
  return points;
}
