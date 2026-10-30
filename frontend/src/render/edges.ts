/**
 * Edges, one LineSegments buffer per link:
 *
 * - neurons to neurons: organic curves, one per (sampled) connection;
 * - feature maps to feature maps (convolution, pooling): organic curves from
 *   input cells to the output cells whose kernel window reads them;
 * - feature maps to neurons (after Flatten): curves from the map cells the
 *   dense layer's strongest weights read.
 *
 * Edges that cross a merge band (add, concat) pinch through its node; edges
 * that cross a flatten band thread through their value's place in its strip.
 * Stubs converge a column's edges on a band an arc leaves from. Arcs (edges
 * that skip layers, such as a ResNet block's skip connection) are bundles of
 * strands that leave a layer's cells or a band's node, dip under the panels
 * and rise into the layer they join. See layout/columns.ts.
 *
 * The geometry is static, so it is only redrawn when the view changes.
 */
import * as THREE from "three";
import type { ArcEnd, ArcLayout, BandLayout, ColumnLayout, LinkLayout, StubLayout } from "../layout/columns";
import { linkSegments, slotFor } from "../layout/columns";
import { type CurveShape, sampleCurve } from "../layout/curves";
import { cellLinks, flattenedCell, frontSlab, sweepOf } from "../layout/maps";
import { strandCount } from "../layout/system";
import type { FeatureMaps, WeightSample } from "../schema";
import type { Theme } from "../theme";

const CURVE_SEGMENTS = 16;
/** Largest random bow given to an edge, in world units. */
const MAX_BEND = 90;
/** Largest ripple along an edge, in world units. */
const MAX_WAVE = 24;
/** Most edges from a stack into a dense layer, strongest first, like the dense-to-dense cap. */
const MAX_CELL_EDGES = 700;
/** Edges fade in over this share of their length where they cross a stack, so the maps show through. */
const FADE = 0.3;
/** Without weights, this many cells of the last map fan out to every neuron. */
const UNWEIGHTED_CELLS = 24;
/** How far apart edges stay where they pinch through a merge node. */
const MERGE_NECK = 6;
/**
 * After a merge node, edges stay bundled this far before they fan out again,
 * so the node reads as many lines in, one result out.
 */
const MERGE_HOLD = 40;
/** How much wider the bundle is at the end of MERGE_HOLD than at the node. */
const MERGE_FLARE = 3;
/** Share of the usual bend and ripple kept on calm stretches (just after a merge node). */
const CALM = 0.2;
/** How far edges to and from outside the view run, and the share of that over which they fade out. */
const LEAD_LENGTH = 900;
const LEAD_VANISH = 0.8;
/** Edges in a stub: a column's output converging on a band. */
const STUB_LINES = 48;
/** An arc's strands gather this far under a column before they head off along the lane. */
const ARC_NECK_DROP = 34;
/** Arcs are long and bright where they bunch up, so they count as this many times their strands for opacity. */
const ARC_DIMMING = 2.5;

export interface EdgeBundle {
  /** Ids of the two layers the edges join, so hovering either one lights them. */
  ends: [string, string];
  lines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  baseOpacity: number;
}

/**
 * One edge: where it starts and ends, and how bright it is (0 to 1). Edges on
 * feature maps start or end at their slab's depth, so slabs nearer the front
 * hide them where they pass behind; other edges lie at z 0. `flat` is the
 * edge's source value's place in flattened order (0 to 1), for flatten strips.
 */
interface Curve {
  x0: number;
  y0: number;
  z0: number;
  x1: number;
  y1: number;
  z1: number;
  strength: number;
  flat?: number;
}

type Line = { points: THREE.Vector3[]; strength: number };

/** `recorded` is the source layer's feature maps, if any, so edges leave from the slab showing their channel. */
export function buildEdges(link: LinkLayout, sample: WeightSample | undefined, theme: Theme, recorded?: FeatureMaps): EdgeBundle {
  const curves = link.from.maps && link.to.maps ? mapCurves(link) : link.from.maps ? cellCurves(link, sample, recorded) : neuronCurves(link, sample);
  const fade = { start: link.from.maps ? FADE : 0, end: link.to.maps ? FADE : 0 };
  const extent = Math.max(...link.from.slots.map(Math.abs), ...link.to.slots.map(Math.abs));
  const lines = curves.map((curve, i) => {
    const points: [number, number][] = [[curve.x0, curve.y0]];
    const calm = new Set<number>();
    for (const band of link.through) {
      const point = bandPoint(band, curve, i);
      points.push(point);
      if (band.kind === "merge") {
        // Node to hold point: the bundle opens out gently, like a trumpet. A full
        // ripple here bulged it; parallel lines looked like a rigid bar zoomed in.
        calm.add(points.length - 1);
        points.push([point[0] + MERGE_HOLD, point[1] * MERGE_FLARE]);
      }
    }
    points.push([curve.x1, curve.y1]);
    return { points: organicPath(points, curve.z0, curve.z1, extent, i + link.from.index * 7919, calm), strength: curve.strength };
  });
  return bundle(link.t, [link.from.node.id, link.to.node.id], lines, curves.length, theme, fade);
}

/** Where an edge crosses a band: through a merge node's neck, or its place in a flatten strip. */
function bandPoint(band: BandLayout, curve: Curve, i: number): [number, number] {
  if (band.kind === "flatten") return [band.x, band.stripHalfHeight * (1 - 2 * (curve.flat ?? 0.5))];
  return [band.x, (pseudoRandom(i * 1.7 + band.x) - 0.5) * MERGE_NECK];
}

/** A column's edges converging on the band its output leaves from. */
export function buildStub(stub: StubLayout, theme: Theme, recorded?: FeatureMaps): EdgeBundle {
  const count = stub.from.maps ? STUB_LINES : stub.from.slots.length;
  const extent = Math.max(...stub.from.slots.map(Math.abs));
  const lines = Array.from({ length: count }, (_, k) => {
    const [x0, y0, z0] = columnPoint(stub.from, k, count, recorded, "exit");
    const [x1, y1] = bandEnd(stub.to, k);
    return { points: organicPath([[x0, y0], [x1, y1]], z0, 0, extent, k + stub.from.index * 131), strength: 0.4 + 0.6 * pseudoRandom(k + 0.3) };
  });
  return bundle(stub.t, [stub.from.node.id, stub.to.node.id], lines, count, theme, { start: stub.from.maps ? FADE : 0, end: 0 });
}

/**
 * A skip connection: one strand per value it carries (capped, like the links
 * between system cards), leaving the cells or neurons of one layer, or the
 * node of a band, dipping to the arc's lane under the panels and rising into
 * the layer it joins. Strands from a column's cells gather into a neck just
 * under it first, so the arc leaves as one bundle. Each strand wanders a
 * little differently, so the bundle looks like the other edges rather than a
 * ruled line.
 */
export function buildArc(arc: ArcLayout, theme: Theme, recorded?: FeatureMaps): EdgeBundle {
  const count = strandCount(arc.tensorShape);
  const lines = Array.from({ length: count }, (_, k): Line => {
    const random = (n: number) => pseudoRandom(k * 13.7 + n + arc.x0 * 0.01 + arc.x1 * 0.003);
    const [x0, y0, z0] = arcEnd(arc.start, k, count, recorded, "start");
    const [x1, y1, z1] = arcEnd(arc.end, k, count, undefined, "end");
    // At a band's node, leave to the right along its output and arrive from the
    // lower left with its inputs, so in vs out reads the same as the other edges.
    const reach0 = "band" in arc.start ? MERGE_HOLD + 50 : 30 + 30 * random(1);
    const reach1 = "band" in arc.end ? 60 : 30 + 30 * random(2);
    const lane = arc.laneY + (random(3) - 0.5) * 22;
    const neck = (end: ArcEnd, z: number, n: number, side: "start" | "end") => {
      if ("band" in end) {
        const spread = (random(n) - 0.5) * MERGE_NECK;
        return [side === "start" ? new THREE.Vector3(x0 + MERGE_HOLD, y0 - 8 + spread, z) : new THREE.Vector3(x1 - 26, y1 - 22 + spread * 2, z)];
      }
      const [x, bottom] = columnBottom(end.column);
      return [new THREE.Vector3(x + (random(n) - 0.5) * 24, bottom - ARC_NECK_DROP + (random(n + 1) - 0.5) * 12, z)];
    };
    const path = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(x0, y0, z0),
        ...neck(arc.start, z0, 9, "start"),
        new THREE.Vector3(x0 + reach0 + (random(4) - 0.5) * 16, lane + (random(5) - 0.5) * 14, z0),
        new THREE.Vector3(x1 - reach1 + (random(6) - 0.5) * 16, lane + (random(7) - 0.5) * 14, z1),
        ...neck(arc.end, z1, 11, "end"),
        new THREE.Vector3(x1, y1, z1),
      ],
      false,
      "centripetal",
    );
    return { points: path.getPoints(CURVE_SEGMENTS * 3), strength: 0.35 + 0.65 * random(8) };
  });
  const fade = { start: "column" in arc.start && arc.start.column.maps ? FADE : 0, end: "column" in arc.end && arc.end.column.maps ? FADE : 0 };
  return bundle(arc.t, [arc.source.id, arc.target.id], lines, count * ARC_DIMMING, theme, fade);
}

/**
 * Edges to or from a layer outside this view (one level up), running off the
 * edge of the view and fading out, as if heading on to the rest of the
 * network. In: from off screen into the input layer's cells. Out: from what
 * feeds the output (a layer or an add), through `through` (the bands on the
 * way, ending with the output itself), then off screen.
 */
export function buildLead(end: ArcEnd, direction: "in" | "out", theme: Theme, recorded?: FeatureMaps, through: BandLayout[] = []): EdgeBundle {
  const node = "column" in end ? end.column.node : end.band.node;
  const extent = "column" in end ? Math.max(...end.column.slots.map(Math.abs)) : end.band.halfHeight;
  const lines = Array.from({ length: STUB_LINES }, (_, k): Line => {
    const random = (n: number) => pseudoRandom(k * 7.3 + n + node.id.length);
    const [x, y, z] = "column" in end ? columnPoint(end.column, k, STUB_LINES, recorded, direction === "in" ? "entry" : "exit") : [...bandEnd(end.band, k), 0];
    if (direction === "in") {
      const far: [number, number] = [x - LEAD_LENGTH, y * 0.4 + (random(1) - 0.5) * extent * 0.6];
      return { points: organicPath([far, [x, y]], 0, z, extent, k * 31 + 7), strength: 0.4 + 0.6 * random(2) };
    }
    // Out: pinch through the bands on the way (the output chip) as a bundle, then spread off screen.
    const waypoints = through.map((band): [number, number] => [band.x, (random(3) - 0.5) * MERGE_NECK * 2]);
    const last = through[through.length - 1]?.x ?? x;
    const far: [number, number] = [last + LEAD_LENGTH, (random(1) - 0.5) * extent * 0.8];
    // Short hops between bands curl into loops at full wobble: keep them calm.
    const calm = new Set(through.slice(0, -1).map((_, s) => s + 1));
    if ("band" in end) calm.add(0);
    return { points: organicPath([[x, y], ...waypoints, far], z, 0, extent, k * 31 + 11, calm), strength: 0.4 + 0.6 * random(2) };
  });
  const maps = "column" in end && end.column.maps ? FADE : 0;
  const fade = direction === "in" ? { start: 0, end: maps } : { start: maps, end: 0 };
  const target = through[through.length - 1]?.node ?? node;
  return bundle(direction === "in" ? 0 : 1, [node.id, target.id], lines, STUB_LINES, theme, fade, direction === "in" ? "start" : "end");
}

/** The middle of a column's bottom edge: under its front slab, or under its lowest neuron. */
function columnBottom(column: ColumnLayout): [number, number] {
  if (!column.maps) return [column.x, Math.min(...column.slots)];
  const front = frontSlab(column.maps);
  return [front.left + front.width / 2, front.bottom];
}

function arcEnd(end: ArcEnd, k: number, count: number, recorded: FeatureMaps | undefined, side: "start" | "end"): [number, number, number] {
  if ("column" in end) return columnPoint(end.column, k, count, recorded, side === "start" ? "exit" : "entry");
  return [...bandEnd(end.band, k), 0];
}

/**
 * The k-th of `count` points spread over a column: cells across a stack's
 * slabs (every channel, every part of the map), or its neurons.
 */
function columnPoint(column: ColumnLayout, k: number, count: number, recorded: FeatureMaps | undefined, side: "entry" | "exit"): [number, number, number] {
  const share = (k + 0.5) / count;
  if (column.maps) {
    const total = column.maps.channels * column.maps.mapHeight * column.maps.mapWidth;
    // A stride that is coprime-ish with the map size scatters the points instead of filling rows in order.
    const index = Math.floor((share * total * 7.31) % total);
    return flattenedCell(column.maps, index, recorded?.channels);
  }
  const slot = column.slots[Math.min(column.slots.length - 1, Math.floor(share * column.slots.length))];
  return [side === "entry" ? column.entryX : column.exitX, slot, 0];
}

/**
 * Where strands meet a band: its centre, under its node or chip, which covers
 * the ends at any zoom (the node is a fixed size on screen, so stopping short
 * of it would leave a gap when zoomed in).
 */
function bandEnd(band: BandLayout, k: number): [number, number] {
  return [band.x, (pseudoRandom(k * 2.3 + band.x) - 0.5) * MERGE_NECK];
}

/** Feature maps to feature maps: each output cell to the input cells its kernel reads, with a little variety in brightness. */
function mapCurves(link: LinkLayout): Curve[] {
  return cellLinks(link.from.maps!, link.to.maps!, sweepOf(link.to.node.params, link.from.maps!, link.to.maps!)).map(([[x0, y0, z0], [x1, y1, z1]], i) => ({
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    strength: 0.4 + 0.6 * pseudoRandom(i + 0.5),
  }));
}

/** Neuron to neuron: the sampled weights, merged onto the drawn neurons. */
function neuronCurves(link: LinkLayout, sample: WeightSample | undefined): Curve[] {
  const { pairs, strength } = linkSegments(link, sample);
  return pairs.map(([fromSlot, toSlot], i) => ({
    x0: link.from.exitX,
    y0: link.from.slots[fromSlot],
    z0: 0,
    x1: link.to.entryX,
    y1: link.to.slots[toSlot],
    z1: 0,
    strength: strength[i],
  }));
}

/**
 * Feature maps to neurons: each sampled weight reads one value of the
 * flattened stack, drawn from its cell on the slab of its channel. Weights that
 * land on the same value and neuron are merged, keeping the strongest.
 */
function cellCurves(link: LinkLayout, sample: WeightSample | undefined, recorded: FeatureMaps | undefined): Curve[] {
  const stack = link.from.maps!;
  const cells = stack.mapHeight * stack.mapWidth;
  const total = cells * stack.channels;
  const toShown = link.to.slots.length;
  const strongest = new Map<number, number>(); // flattened index * toShown + neuron slot -> |weight|
  if (sample && sample.pairs.length > 0) {
    for (const [fromIndex, toIndex, value] of sample.pairs) {
      const key = fromIndex * toShown + slotFor(toIndex, link.to.units, toShown);
      strongest.set(key, Math.max(strongest.get(key) ?? 0, Math.abs(value)));
    }
  } else {
    const every = Math.max(1, Math.floor(cells / UNWEIGHTED_CELLS));
    for (let cell = 0; cell < cells; cell += every) for (let slot = 0; slot < toShown; slot += 1) strongest.set(cell * toShown + slot, 1);
  }

  const maxValue = Math.max(...strongest.values()) || 1;
  const kept = [...strongest].sort((a, b) => b[1] - a[1]).slice(0, MAX_CELL_EDGES);
  return kept.map(([key, value]) => {
    const index = Math.floor(key / toShown);
    const [x0, y0, z0] = flattenedCell(stack, index, recorded?.channels);
    return { x0, y0, z0, x1: link.to.entryX, z1: 0, y1: link.to.slots[key % toShown], strength: 0.25 + 0.75 * (value / maxValue), flat: index / Math.max(total - 1, 1) };
  });
}

/**
 * An organic edge through a list of points: each stretch is a Bézier bowed,
 * stretched and rippled a little differently (seeded by `seed`), so bundles
 * look organic instead of ruled. `extent` is the half-height of the layers
 * it joins; small layers get gentler bends, so their edges stay in the panels.
 * Depth changes evenly from z0 to z1 along the whole edge.
 */
function organicPath(points: [number, number][], z0: number, z1: number, extent: number, seed: number, calmStretches = new Set<number>()): THREE.Vector3[] {
  const random = (k: number) => pseudoRandom(pseudoRandom(seed) * 1e4 + k);
  const stretches = points.length - 1;
  // Bends shrink on the shorter stretches between bands, so edges still meet their waypoint.
  const bendLimit = Math.min(MAX_BEND, extent * 0.4) / stretches;
  const waveLimit = Math.min(MAX_WAVE, 4 + extent * 0.12) / stretches;
  const flat: { x: number; y: number }[] = [];
  for (let s = 0; s < stretches; s += 1) {
    const [x0, y0] = points[s];
    const [x1, y1] = points[s + 1];
    const calm = calmStretches.has(s) ? CALM : 1;
    const shape: CurveShape = {
      bend: (random(1 + s * 7) - 0.5) * 2 * bendLimit * calm,
      handle: 0.25 + 0.5 * random(2 + s * 7),
      wave: { amplitude: (random(3 + s * 7) - 0.5) * 2 * waveLimit * calm, cycles: 1 + 2 * random(4 + s * 7), phase: random(5 + s * 7) * Math.PI * 2 },
    };
    const sampled = sampleCurve(x0, y0, x1, y1, Math.ceil(CURVE_SEGMENTS / stretches) + 2, shape);
    flat.push(...(s === 0 ? sampled : sampled.slice(1)));
  }
  return flat.map(({ x, y }, i) => new THREE.Vector3(x, y, z0 + ((z1 - z0) * i) / (flat.length - 1)));
}

/**
 * All of a link's lines in one buffer. RGBA: colour from the layer gradient,
 * alpha from strength. `fade` dims the lines to a quarter over that share of
 * their length at each end (where they cross a stack); `vanish` fades one end
 * out completely (where a lead leaves the view).
 */
function bundle(
  t: number,
  ends: [string, string],
  lines: Line[],
  count: number,
  theme: Theme,
  fade = { start: 0, end: 0 },
  vanish: "start" | "end" | null = null,
): EdgeBundle {
  const { r, g, b } = gradientColour(theme.edgeGradient, t);
  const positions: number[] = [];
  const colours: number[] = [];
  for (const { points, strength } of lines) {
    // Alpha at point s: full in the middle, ramping down to a quarter at a faded end.
    const last = points.length - 1;
    const ramp = (distance: number, share: number, floor = 0.25) => (share > 0 ? Math.min(1, floor + ((1 - floor) * distance) / (share * last)) : 1);
    const gone = (s: number) => (vanish === "start" ? ramp(s, LEAD_VANISH, 0) : vanish === "end" ? ramp(last - s, LEAD_VANISH, 0) : 1);
    const alpha = (s: number) => strength * Math.min(ramp(s, fade.start), ramp(last - s, fade.end), gone(s));
    for (let s = 0; s < points.length - 1; s += 1) {
      positions.push(points[s].x, points[s].y, points[s].z, points[s + 1].x, points[s + 1].y, points[s + 1].z);
      colours.push(r, g, b, alpha(s), r, g, b, alpha(s + 1));
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));

  // Fewer lines get more opacity each, so sparse and dense links look alike.
  const density = Math.min(0.45, Math.max(0.05, 2.8 / Math.sqrt(Math.max(count, 1))));
  const baseOpacity = Math.min(0.9, density * theme.edgeOpacity);
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: baseOpacity,
    blending: theme.edgeBlending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  const segments = new THREE.LineSegments(geometry, material);
  segments.renderOrder = 1;
  return { ends, lines: segments, baseOpacity };
}

export function setEdgeOpacity(bundle: EdgeBundle, opacity: number): void {
  bundle.lines.material.opacity = opacity;
}

/** Colour at position t (0 to 1) along a gradient. */
export function gradientColour(stops: readonly string[], t: number): THREE.Color {
  const scaled = Math.min(Math.max(t, 0), 1) * (stops.length - 1);
  const index = Math.min(Math.floor(scaled), stops.length - 2);
  return new THREE.Color(stops[index]).lerp(new THREE.Color(stops[index + 1]), scaled - index);
}

/** A repeatable number in [0, 1), so the network looks the same on every load. */
export function pseudoRandom(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
