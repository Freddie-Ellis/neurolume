/**
 * Edges between two columns: one LineSegments buffer of organic curves per
 * link, or a funnel between two feature-map stacks. The geometry is static,
 * so it is only redrawn when the view changes.
 */
import * as THREE from "three";
import type { LinkLayout } from "../layout/columns";
import { linkSegments } from "../layout/columns";
import { sampleCurve } from "../layout/curves";
import { funnel } from "../layout/maps";
import type { WeightSample } from "../schema";
import type { Theme } from "../theme";

const CURVE_SEGMENTS = 16;
/** Largest random bow given to an edge, in world units. */
const MAX_BEND = 90;
/** Largest ripple along an edge, in world units. */
const MAX_WAVE = 24;

export interface EdgeBundle {
  link: LinkLayout;
  lines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  baseOpacity: number;
}

export function buildEdges(link: LinkLayout, sample: WeightSample | undefined, theme: Theme): EdgeBundle {
  if (link.from.maps && link.to.maps) return buildFunnel(link, theme);
  const { pairs, strength } = linkSegments(link, sample);
  const vertexCount = pairs.length * CURVE_SEGMENTS * 2;
  const positions = new Float32Array(vertexCount * 3);
  // RGBA: the colour comes from the layer gradient, the alpha from the weight's strength.
  const colours = new Float32Array(vertexCount * 4);
  const { r, g, b } = gradientColour(theme.edgeGradient, link.t);
  // Small layers get gentler bends, so their edges stay inside the panels.
  const extent = Math.max(...link.from.slots.map(Math.abs), ...link.to.slots.map(Math.abs));
  const bendLimit = Math.min(MAX_BEND, extent * 0.4);
  const waveLimit = Math.min(MAX_WAVE, 4 + extent * 0.12);

  let vertex = 0;
  pairs.forEach(([fromSlot, toSlot], i) => {
    // Every edge bows, stretches and ripples a little differently, so bundles look organic.
    const seed = pseudoRandom(i + link.from.index * 7919);
    const random = (k: number) => pseudoRandom(seed * 1e4 + k);
    const shape = {
      bend: (random(1) - 0.5) * 2 * bendLimit,
      handle: 0.25 + 0.5 * random(2),
      wave: { amplitude: (random(3) - 0.5) * 2 * waveLimit, cycles: 1 + 2 * random(4), phase: random(5) * Math.PI * 2 },
    };
    const points = sampleCurve(link.from.exitX, link.from.slots[fromSlot], link.to.entryX, link.to.slots[toSlot], CURVE_SEGMENTS, shape);
    for (let s = 0; s < CURVE_SEGMENTS; s += 1) {
      for (const point of [points[s], points[s + 1]]) {
        positions.set([point.x, point.y, 0], vertex * 3);
        colours.set([r, g, b, strength[i]], vertex * 4);
        vertex += 1;
      }
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colours, 4));

  // Fewer lines get more opacity each, so sparse and dense layers look alike.
  const density = Math.min(0.45, Math.max(0.05, 2.8 / Math.sqrt(Math.max(pairs.length, 1))));
  const baseOpacity = Math.min(0.9, density * theme.edgeOpacity);
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: baseOpacity,
    blending: theme.edgeBlending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.renderOrder = 1;
  return { link, lines, baseOpacity };
}

/**
 * Convolution and pooling: a kernel window on one stack, narrowing to a point
 * on the next, drawn as outlines over a faint filled cone so it reads as one shape.
 */
function buildFunnel(link: LinkLayout, theme: Theme): EdgeBundle {
  const kernel = link.to.node.params["kernel_size"];
  const segments = funnel(link.from.maps!, link.to.maps!, Array.isArray(kernel) ? (kernel as number[]) : [3, 3]);
  const colour = gradientColour(theme.edgeGradient, link.t);
  const { r, g, b } = colour;
  const positions = segments.flatMap(([x0, y0, x1, y1]) => [x0, y0, 1.5, x1, y1, 1.5]);
  const colours = segments.flatMap(() => [r, g, b, 1, r, g, b, 1]);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));
  const baseOpacity = Math.min(1, 0.7 * theme.edgeOpacity);
  const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: baseOpacity, depthWrite: false });
  const lines = new THREE.LineSegments(geometry, material);
  lines.renderOrder = 4; // over the slabs it starts and ends on

  // The cone: the convex hull of the window's corners and the tip.
  const points = convexHull(segments.slice(0, 4).map(([x, y]) => [x, y] as [number, number]).concat([[segments[4][2], segments[4][3]]]));
  const cone = new THREE.Mesh(
    new THREE.ShapeGeometry(new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)))).translate(0, 0, 1.4),
    new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: 0.12, depthWrite: false }),
  );
  cone.renderOrder = 4;
  lines.add(cone);
  return { link, lines, baseOpacity };
}

/** Convex hull of a few points (Andrew's monotone chain), anticlockwise. */
function convexHull(points: [number, number][]): [number, number][] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: [number, number][]) => {
    const hull: [number, number][] = [];
    for (const point of list) {
      while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], point) <= 0) hull.pop();
      hull.push(point);
    }
    hull.pop();
    return hull;
  };
  return [...half(sorted), ...half([...sorted].reverse())];
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
