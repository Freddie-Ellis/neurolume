/**
 * Draws a SystemLayout: a card per network or block, a miniature of what is
 * inside each card (see Miniature in layout/system.ts), and labelled bundles
 * of strands between cards. Cards for neighbours outside the current level
 * (what feeds it, what it feeds) are drawn faded with a dashed border. It returns the
 * same Network shape as the detailed view, so hover, tooltips and the
 * inspector work unchanged; network cards open on click via `activate`.
 * Clicking a block opens the inspector, which also shows its notes.
 */
import * as THREE from "three";
import { type CurvePoint, type CurveShape, curveSegments, sampleCurve, segmentsFor } from "../layout/curves";
import { type Card, type CardLink, LANE_HEIGHT, type MiniItem, type Miniature, type SystemLayout, isLayer, isOutside, strandCount, strandSlots } from "../layout/system";
import type { Theme } from "../theme";
import { formatCount, formatFramework, formatParams, formatShape } from "../ui/format";
import { gradientColour, pseudoRandom } from "./edges";
import { type Network, type Pickable, escapeHtml, label, roundedRect, titleFor } from "./network";

const CARD_RADIUS = 2;
const LINK_WIDTH = 2.4;
const ARROW_LENGTH = 10;
const ARROW_WIDTH = 9;
/** Space inside a network card for the preview, below the header and above the footer. */
const PREVIEW_INSET = { left: 28, right: 28, top: 64, bottom: 40 };
/** Neurons drawn in a preview column, at most: enough that a 10-class output shows every class. */
const PREVIEW_MAX_DOTS = 12;
/** Preview slabs sit in front of the strands (z 0), each nearer one this much further forward. */
const SLAB_FILL_Z = 1;
const SLAB_FILL_STEP = 0.02;
/** Most strands drawn for one link in a preview. */
const PREVIEW_STRANDS = 40;
/** How many levels of parts a preview draws inside each other before boxes stay empty. */
const PREVIEW_DEPTH = 2;
const PREVIEW_DOT = 2.6;
/** Largest random bow given to a strand between cards, in world units. */
const STRAND_BEND = 14;
/** Largest ripple given to a strand along a lane past a column it skips, so the bundle stays organic there. */
const LANE_WAVE = 12;
/** Share of a link to or from outside this level over which it fades out. */
const OUTSIDE_FADE = 0.7;
/** How far from the shown card the chip naming an outside neighbour sits. */
const OUTSIDE_CHIP = 80;
/** About how many strands a link into a dense layer card draws, fanning out to its neurons. */
const DENSE_STRANDS = 60;
/** How far out a back link leaves its card and enters the target, and how far above the frame's bottom it loops. */
const BACK_LINK_REACH = 220;
const BACK_LINK_MARGIN = 20;
/** How much more a back link's strands spread (bow and ripple) than a forward link's, so the long loop isn't a tight ruled band. */
const BACK_LINK_LOOSEN = 3;

export function buildSystem(layout: SystemLayout, theme: Theme, open: (groupId: string) => void): Network {
  const root = new THREE.Group();
  const pickables: Pickable[] = [];
  const previewLines: number[] = [];
  const previewColours: number[] = [];
  const dots: Dot[] = [];
  const fills: number[] = [];
  // Where links join a single-layer card: its neurons or its stack, so the strands run through the layer.
  const ports = new Map<Card, Anchors>();

  for (const card of layout.cards) {
    if (isOutside(card.node)) continue; // only its links are drawn, running off screen
    const pickable = buildCard(card, theme);
    if (card.group) {
      const groupId = card.group.id;
      pickable.activate = () => open(groupId);
    }
    const preview = addPreview(card, theme, previewLines, previewColours, dots, fills);
    if (card.kind === "node" && isLayer(card.node) && preview.anchors.length === 1) ports.set(card, preview.anchors[0]);
    root.add(pickable.mesh, pickable.outline, ...cardLabels(card, pickable), ...preview.labels);
    pickables.push(pickable);
  }
  const rankCount = Math.max(...layout.cards.map((card) => card.rank)) + 1;
  // Back links loop just inside the bottom of the frame, which layoutSystem left room for.
  const floor = layout.bounds.bottom + BACK_LINK_MARGIN;
  for (const link of layout.links) root.add(...buildLink(link, theme, rankCount, ports, floor));
  root.add(buildPreviewLines(previewLines, previewColours, theme), buildDots(dots, theme), buildSlabFills(fills, theme));

  return { root, pickables, edges: [], theme };
}

function buildCard(card: Card, theme: Theme): Pickable {
  const shape = roundedRect(card.x - card.width / 2, card.y - card.height / 2, card.width, card.height, CARD_RADIUS);
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape, 8),
    new THREE.MeshBasicMaterial({ color: theme.panelFill, transparent: true, opacity: theme.panelFillOpacity, depthWrite: false }),
  );
  const outside = isOutside(card.node);
  const outline = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(shape.getPoints(8)),
    outside ? new THREE.LineDashedMaterial({ color: theme.panelBorder, dashSize: 5, gapSize: 4 }) : new THREE.LineBasicMaterial({ color: theme.panelBorder }),
  );
  if (outside) {
    outline.computeLineDistances();
    (mesh.material as THREE.MeshBasicMaterial).opacity *= 0.4;
  }
  outline.renderOrder = 2;
  return { node: card.node, mesh, outline, labels: [], links: [] };
}

function cardLabels(card: Card, pickable: Pickable): THREE.Object3D[] {
  const left = card.x - card.width / 2 + 14;
  const top = card.y + card.height / 2 - 12;
  const bottom = card.y - card.height / 2 + 12;

  let details: string;
  let footer: string;
  if (card.group) {
    const framework = card.group.framework ? formatFramework(card.group.framework) : "Network";
    const size = card.partCount > 0 ? `${card.partCount} parts` : `${card.layerCount} layers`;
    details = `${framework} · ${size} · ${formatParams(card.paramCount)} params`;
    footer = `${shapeText(card.inputShape)} → ${shapeText(card.outputShape)}`;
  } else {
    const description = card.node.params["description"];
    details = typeof description === "string" ? escapeHtml(description) : kindText(card);
    // Show what the card produces, or what it takes in if it is a sink (an output, a loss).
    footer = shapeText(card.outputShape.length > 0 ? card.outputShape : card.inputShape);
  }

  const terminal = card.node.type === "input" || card.node.type === "output";
  // Blocks show their label; layers outside any network (Keras "gap") show their name, like panels do;
  // a neighbour from outside this level shows its name there ("Sensor bus").
  const outsideName = isOutside(card.node) ? String(card.node.params["contextName"]) : null;
  const name = card.group ? card.group.label : outsideName ?? (terminal || card.node.type !== "custom" ? titleFor(card.node) : card.node.label);
  const header = label("layer-header card-header", `<span class="layer-name">${escapeHtml(name)}</span><span class="layer-kind">${details}</span>`);
  header.position.set(left, top, 5);
  header.center.set(0, 0);
  // Labels keep their pixel size while cards scale, so clip the header to the card's width on screen (the viewer sets --zoom).
  header.element.style.maxWidth = `calc(${card.width - 28}px * var(--zoom, 1))`;
  const foot = label("card-footer", footer);
  foot.position.set(left, bottom, 5);
  foot.center.set(0, 1);
  pickable.labels.push(header.element, foot.element);
  if (!card.node.notes) return [header, foot];

  // Labels keep their pixel size while the card scales with zoom, so the hint
  // is pinned to the card's bottom-right corner rather than laid out in the footer.
  const hint = label("card-footer note-hint", "Notes");
  hint.position.set(card.x + card.width / 2 - 14, bottom, 5);
  hint.center.set(1, 1);
  pickable.labels.push(hint.element);
  return [header, foot, hint];
}

function kindText(card: Card): string {
  const context = card.node.params["context"];
  if (isOutside(card.node)) return card.node.type === "input" ? "Outside · feeds in" : "Outside · receives the output";
  if (card.node.type === "input") return typeof context === "string" ? `Model input · ${escapeHtml(context)}` : "Model input";
  if (card.node.type === "output") return typeof context === "string" ? `Model output · ${escapeHtml(context)}` : "Model output";
  if (card.node.type === "custom") return "Block";
  return escapeHtml(card.node.label);
}

function shapeText(shape: number[]): string {
  if (shape.length === 0) return "—";
  return shape.length === 1 ? formatCount(shape[0]) : formatShape(shape);
}

/** Where the preview goes in a card: under the header of a network card or a layer card. */
function previewArea(card: Card): Area {
  return {
    left: card.x - card.width / 2 + PREVIEW_INSET.left,
    right: card.x + card.width / 2 - PREVIEW_INSET.right,
    top: card.y + card.height / 2 - PREVIEW_INSET.top,
    bottom: card.y - card.height / 2 + PREVIEW_INSET.bottom,
  };
}

/**
 * Draw a card's miniature (see Miniature in layout/system.ts) under its header:
 * a network's layers, a network's parts (each with its own miniature inside),
 * or a single layer's stack or neurons, drawn large so the card reads as that
 * layer. Returns the small labels of part boxes, and where links can join each item.
 */
function addPreview(
  card: Card,
  theme: Theme,
  lines: number[],
  colours: number[],
  dots: Dot[],
  fills: number[],
): { labels: THREE.Object3D[]; anchors: Anchors[] } {
  if (card.miniature.items.length === 0) return { labels: [], anchors: [] };
  const segment: Segment = (x0, y0, x1, y1, t, z = 0) => {
    const colour = gradientColour(theme.edgeGradient, t);
    lines.push(x0, y0, z, x1, y1, z);
    colours.push(colour.r, colour.g, colour.b, colour.r, colour.g, colour.b);
  };
  const labels: THREE.Object3D[] = [];
  const anchors = drawMiniature(card.miniature, previewArea(card), { segment, dots, labels, fills }, 0);
  return { labels, anchors };
}

interface Area {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
/** x, y, and for a point on a preview slab its depth, so strands there sit just in front of that slab (else 0). */
type Point = [number, number, number?];
/** A preview neuron: x, y and its scale (smaller inside nested boxes). */
type Dot = [number, number, number];
/** A line of the preview, coloured at `t` along the gradient; `z` above 0 puts it in front of the strands (slab outlines). */
type Segment = (x0: number, y0: number, x1: number, y1: number, t: number, z?: number) => void;
interface Pen {
  segment: Segment;
  dots: Dot[];
  labels: THREE.Object3D[];
  /** Triangles of the stacks' solid slabs (x, y, z per corner). */
  fills: number[];
}
/** Where links attach to an item: points on its left and right, and the middle of its bottom for arcs. */
interface Anchors {
  left: Point[];
  right: Point[];
  bottom: Point;
}

function drawMiniature({ items, links, arcs }: Miniature, area: Area, pen: Pen, depth: number): Anchors[] {
  const width = area.right - area.left;
  const height = area.top - area.bottom;
  const middle = (area.top + area.bottom) / 2;
  const px = (x: number) => area.left + x * width;
  // One item alone (a layer card) is drawn as large as the area allows.
  const alone = items.length === 1;

  const anchors = items.map((item): Anchors => {
    if (item.kind === "neurons") {
      const [from, to] = item.share ?? [0, 1];
      return drawNeurons(item.units, px(item.x), area.top - height * ((from + to) / 2), height * (to - from), depth, pen.dots);
    }
    if (item.kind === "maps") return drawStack(item, px(item.x), middle, alone ? Math.min(height * 0.8, width * 0.6) : Math.min(height * 0.7, 30), pen);
    if (item.kind === "merge") return drawMerge(item, px(item.x), middle, pen.segment);
    return drawBox(item, area, pen, depth);
  });

  links.forEach(([from, to], n) => strands(anchors[from].right, anchors[to].left, (items[from].x + items[to].x) / 2, n, pen.segment));
  for (const [from, to] of arcs) {
    const [x0, y0] = anchors[from].bottom;
    const [x1, y1] = anchors[to].bottom;
    const dip = Math.min(y0, y1) - Math.min(8, height * 0.15);
    const points = sampleCurve(x0, y0, x1, y1, 10, { handle: 0, bend: (dip - (y0 + y1) / 2) * 1.33 });
    for (let k = 1; k < points.length; k += 1) pen.segment(points[k - 1].x, points[k - 1].y, points[k].x, points[k].y, items[to].x);
  }
  return anchors;
}

/**
 * Curved strands between two items' anchor points, like the edges of the
 * detailed view: a sample of all pairs (about PREVIEW_STRANDS, and every point touched), each with its
 * own bow, so a dense link reads as a woven bundle rather than ruled lines.
 */
function strands(from: Point[], to: Point[], t: number, seed: number, segment: Segment): void {
  const pairs = from.flatMap((start, a) => to.map((end, b) => ({ start, end, a, b })));
  const keep = PREVIEW_STRANDS / pairs.length;
  const span = Math.max(...[...from, ...to].map(([, y]) => y)) - Math.min(...[...from, ...to].map(([, y]) => y));
  pairs.forEach(({ start: [x0, y0, z0 = 0], end: [x1, y1, z1 = 0], a, b }, i) => {
    const random = (n: number) => pseudoRandom(i * 3.7 + seed * 101 + n);
    // A random sample, plus a diagonal of pairs so every point on both sides gets a strand.
    const diagonal = a === Math.floor((b * from.length) / to.length) || b === Math.floor((a * to.length) / from.length);
    if (!diagonal && random(0) >= keep) return;
    const points = sampleCurve(x0, y0, x1, y1, 8, { handle: 0.3 + 0.4 * random(1), bend: (random(2) - 0.5) * (span * 0.25 + 3) });
    // Depth runs from one end's slab to the other's, so only slabs in front of a strand's own slab hide it.
    const z = (k: number) => z0 + ((z1 - z0) * (k - 0.5)) / (points.length - 1);
    for (let k = 1; k < points.length; k += 1) segment(points[k - 1].x, points[k - 1].y, points[k].x, points[k].y, t, z(k));
  });
}

/** A column of neurons, as many as fit (at most PREVIEW_MAX_DOTS); smaller inside nested boxes. */
function drawNeurons(units: number, x: number, middle: number, height: number, depth: number, dots: Dot[]): Anchors {
  const scale = depth > 0 ? 0.6 : 1;
  const count = Math.max(1, Math.min(units, PREVIEW_MAX_DOTS, Math.floor(height / (PREVIEW_DOT * 2.5 * scale)) + 1));
  const spacing = count > 1 ? Math.min(height / (count - 1), 12) : 0;
  const column = Array.from({ length: count }, (_, k): Point => [x, middle + ((count - 1) / 2 - k) * spacing]);
  dots.push(...column.map(([cx, cy]): Dot => [cx, cy, scale]));
  return { left: column, right: column, bottom: column[column.length - 1] };
}

/**
 * A few offset squares for a feature-map stack, sized like its maps (`largest`
 * is the side of the biggest). The squares are solid, nearer ones in front, so
 * like the slabs of the detailed view they hide the strands and slabs behind them.
 */
function drawStack(item: Extract<MiniItem, { kind: "maps" }>, x: number, middle: number, largest: number, { segment, fills }: Pen): Anchors {
  const side = largest * (0.45 + 0.55 * item.size);
  const shown = Math.min(item.channels, 4);
  const step = Math.max(1.5, side * 0.1);
  const back = (shown - 1) * step;
  // Centre the whole stack (front square plus the ones behind) on x.
  const x0 = x - back / 2;
  const y0 = middle - back / 2;
  for (let k = shown - 1; k >= 0; k -= 1) {
    const [left, bottom] = [x0 - side / 2 + k * step, y0 - side / 2 + k * step];
    const [right, top] = [left + side, bottom + side];
    const z = SLAB_FILL_Z + (shown - 1 - k) * SLAB_FILL_STEP; // the front square (k = 0) nearest
    fills.push(left, bottom, z, right, bottom, z, right, top, z, left, bottom, z, right, top, z, left, top, z);
    const outline = z + SLAB_FILL_STEP / 2;
    segment(left, bottom, right, bottom, item.x, outline);
    segment(right, bottom, right, top, item.x, outline);
    segment(right, top, left, top, item.x, outline);
    segment(left, top, left, bottom, item.x, outline);
  }
  // Links reach every slab on both sides, as in the detailed view: every map is
  // read and written. (Entering the front and leaving the back read as data
  // flowing from front slab to back slab, which it doesn't.) Each point sits
  // just in front of its slab, so the slabs nearer the front hide its strands
  // and the slabs behind don't.
  const slabs = Array.from({ length: shown }, (_, k) => ({ offset: k * step, z: SLAB_FILL_Z + (shown - 1 - k) * SLAB_FILL_STEP + SLAB_FILL_STEP * 0.75 }));
  const rows = [-0.25, 0.05, 0.3].map((share) => share * side);
  return {
    left: slabs.flatMap(({ offset, z }) => rows.map((dy): Point => [x0 - side / 2 + offset, y0 + dy + offset, z])),
    right: slabs.flatMap(({ offset, z }) => rows.map((dy): Point => [x0 + side / 2 + offset, y0 + dy + offset, z])),
    bottom: [x0, y0 - side / 2],
  };
}

/** An add or concat node: a small circle with + or ∥. */
function drawMerge(item: Extract<MiniItem, { kind: "merge" }>, x: number, middle: number, segment: Segment): Anchors {
  const r = 5;
  for (let k = 0; k < 12; k += 1) {
    const [a, b] = [(k / 12) * Math.PI * 2, ((k + 1) / 12) * Math.PI * 2];
    segment(x + r * Math.cos(a), middle + r * Math.sin(a), x + r * Math.cos(b), middle + r * Math.sin(b), item.x);
  }
  if (item.glyph === "+") {
    segment(x - 2.5, middle, x + 2.5, middle, item.x);
    segment(x, middle - 2.5, x, middle + 2.5, item.x);
  } else {
    segment(x - 1.2, middle - 2.5, x - 1.2, middle + 2.5, item.x);
    segment(x + 1.2, middle - 2.5, x + 1.2, middle + 2.5, item.x);
  }
  return { left: [[x - r, middle]], right: [[x + r, middle]], bottom: [x, middle - r] };
}

/**
 * A part of a network with parts: a box where it sits in its own overview,
 * its name in the top corner and its own miniature inside. Miniatures are
 * scaled to fit, so any depth fits; boxes too small to read (or past
 * PREVIEW_DEPTH) stay plain outlines.
 */
function drawBox(item: Extract<MiniItem, { kind: "box" }>, area: Area, pen: Pen, depth: number): Anchors {
  const width = area.right - area.left;
  const height = area.top - area.bottom;
  const w = Math.max(item.width * width, 8);
  const h = Math.max(item.height * height, 8);
  const cx = area.left + item.x * width;
  const cy = area.bottom + item.y * height;
  const [left, right, bottom, top] = [cx - w / 2, cx + w / 2, cy - h / 2, cy + h / 2];
  pen.segment(left, bottom, right, bottom, item.x);
  pen.segment(right, bottom, right, top, item.x);
  pen.segment(right, top, left, top, item.x);
  pen.segment(left, top, left, bottom, item.x);

  const roomy = w >= 40 && h >= 34 && depth < PREVIEW_DEPTH;
  if (w >= 24) {
    const name = label("preview-part", escapeHtml(item.label));
    name.element.style.maxWidth = `${Math.max(w - 6, 12)}px`;
    // In the top-left corner when the box holds a drawing, else in the middle.
    if (roomy) {
      name.position.set(left + 3, top - 2, 5);
      name.center.set(0, 0);
    } else name.position.set(cx, cy, 5);
    pen.labels.push(name);
  }
  if (roomy && item.inner.items.length > 0) {
    drawMiniature(item.inner, { left: left + 6, right: right - 6, top: top - 14, bottom: bottom + 5 }, pen, depth + 1);
  }
  const rows = [-0.2, 0, 0.2].map((share) => cy + share * h);
  return { left: rows.map((y): Point => [left, y]), right: rows.map((y): Point => [right, y]), bottom: [cx, bottom] };
}

function buildPreviewLines(lines: number[], colours: number[], theme: Theme): THREE.LineSegments {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 3));
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: theme.edgeBlending === "additive" ? 0.35 : 0.45,
    blending: theme.edgeBlending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  const segments = new THREE.LineSegments(geometry, material);
  segments.renderOrder = 1;
  return segments;
}

/** The stacks' solid slabs, in the panel colour like the detailed view's (opaque, so they hide what is behind). */
function buildSlabFills(fills: number[], theme: Theme): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(fills, 3));
  return new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: theme.panelFill }));
}

function buildDots(dots: Dot[], theme: Theme): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(
    new THREE.CircleGeometry(PREVIEW_DOT, 16),
    new THREE.MeshBasicMaterial({ color: theme.neuron }),
    dots.length,
  );
  const matrix = new THREE.Matrix4();
  dots.forEach(([x, y, scale], i) => mesh.setMatrixAt(i, matrix.makeScale(scale, scale, 1).setPosition(x, y, 2)));
  mesh.renderOrder = 3;
  return mesh;
}

/**
 * A link between two cards: one strand per value the tensor carries (capped),
 * running from the right edge of one card to the left edge of the next. A link
 * whose shape is unknown falls back to a single ribbon with an arrowhead.
 */
function buildLink(link: CardLink, theme: Theme, rankCount: number, ports: Map<Card, Anchors>, floor: number): THREE.Object3D[] {
  const x0 = link.from.x + link.from.width / 2;
  const x1 = link.to.x - link.to.width / 2;
  const count = strandCount(link.shape);
  const objects = count > 0 ? [buildStrands(link, count, theme, rankCount, ports, floor)] : buildRibbon(link, theme, floor);

  // A link to or from outside this level names where it goes, near the card that is shown.
  const outside = isOutside(link.from.node) ? link.from.node : isOutside(link.to.node) ? link.to.node : null;
  const caption = outside ? String(outside.params["context"]) : link.label ?? (link.shape.length > 0 ? shapeText(link.shape) : null);
  if (!caption) return objects;
  // A fixed distance from the shown card, since the other end is far off screen.
  // Otherwise halfway across the gap after the source (before any lane), which is always empty.
  const span = Math.max(x1 - x0, 1);
  const gap = ((link.via[0]?.x ?? x1) - x0) / 2 / span;
  const along = outside === link.from.node ? 1 - OUTSIDE_CHIP / span : outside === link.to.node ? OUTSIDE_CHIP / span : link.back ? 0.5 : gap;
  const points = linkCurve(link, x0, strandSlots(1, link.from, link.outShare)[0], x1, strandSlots(1, link.to, link.inShare)[0], { handle: 0.5 }, floor);
  const point = points.reduce((best, candidate) => (Math.abs(candidate.along - along) < Math.abs(best.along - along) ? candidate : best));
  const chip = label("link-chip", escapeHtml(caption));
  chip.position.set(point.x, point.y, 5);
  return [...objects, chip];
}

/**
 * Strand i leaves slot i of the source card and enters slot i of the target,
 * like a cable. At a single-layer card (`ports`) strands instead converge on
 * its neurons or stack and leave from them, so they run through the layer.
 */
function buildStrands(link: CardLink, count: number, theme: Theme, rankCount: number, ports: Map<Card, Anchors>, floor: number): THREE.LineSegments {
  const x0 = link.from.x + link.from.width / 2;
  const x1 = link.to.x - link.to.width / 2;
  const starts = strandSlots(count, link.from, link.outShare);
  const ends = strandSlots(count, link.to, link.inShare);
  const out = ports.get(link.from)?.right;
  const into = ports.get(link.to)?.left;
  // Strand i takes the port at its share of the way down, so strands keep their order (dealing them
  // out in turn wrapped the last one from the top neuron to the bottom, across the bundle).
  const port = (ports: Point[], i: number) => ports[Math.floor((i * ports.length) / count)];
  const start = (i: number): Point => (out ? port(out, i) : [x0, starts[i]]);
  const end = (i: number): Point => (into ? port(into, i) : [x1, ends[i]]);
  // Into a dense layer, every value reaches every neuron: fan each one out to
  // a sample of them (every neuron reached), not one wire per value.
  // Each pair also keeps its strand's place across a lane (-0.5 to 0.5), so the bundle keeps its order there.
  const lane = (i: number) => (count > 1 ? 0.5 - i / (count - 1) : 0);
  const pairs: [Point, Point, number][] = [];
  if (into && link.to.node.type === "dense") {
    const keep = DENSE_STRANDS / (count * into.length);
    for (let i = 0; i < count; i += 1) {
      for (let j = 0; j < into.length; j += 1) {
        const diagonal = j === Math.floor((i * into.length) / count) || i === Math.floor((j * count) / into.length);
        if (diagonal || pseudoRandom(i * 31.7 + j * 7.1) < keep) pairs.push([start(i), into[j], lane(i)]);
      }
    }
  } else for (let i = 0; i < count; i += 1) pairs.push([start(i), end(i), lane(i)]);
  // The gradient runs across the whole system, so a strand takes the colours of the ranks it joins.
  const t0 = link.from.rank / Math.max(rankCount - 1, 1);
  const t1 = link.to.rank / Math.max(rankCount - 1, 1);

  const alpha = (along: number) => outsideAlpha(link, along);

  const positions: number[] = [];
  const colours: number[] = [];
  pairs.forEach(([[sx, sy, sz = 0], [ex, ey, ez = 0], place], i) => {
    const seed = pseudoRandom(i + link.from.rank * 7919 + link.to.y);
    const random = (k: number) => pseudoRandom(seed * 1e4 + k);
    const shape: CurveShape = {
      handle: 0.35 + 0.3 * random(1),
      bend: (random(2) - 0.5) * 2 * STRAND_BEND,
      wave: { amplitude: (random(3) - 0.5) * 2 * LANE_WAVE, cycles: 1 + 2 * random(4), phase: random(5) * Math.PI * 2 },
    };
    const points = linkCurve(link, sx, sy, ex, ey, shape, floor, place);
    const last = points.length - 1;
    for (let s = 0; s < last; s += 1) {
      for (const [k, point] of [[s, points[s]], [s + 1, points[s + 1]]] as const) {
        const colour = gradientColour(theme.edgeGradient, t0 + (t1 - t0) * point.along);
        // At a layer card's stack, a strand sits at its slab's depth (see drawStack).
        positions.push(point.x, point.y, sz + ((ez - sz) * k) / last);
        colours.push(colour.r, colour.g, colour.b, alpha(point.along));
      }
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));
  // Fewer strands get more opacity each, so a 4-value link is as visible as a 48-value one.
  const density = Math.min(0.8, Math.max(0.2, 3 / Math.sqrt(pairs.length)));
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: Math.min(0.9, density * theme.edgeOpacity),
    blending: theme.edgeBlending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  const strands = new THREE.LineSegments(geometry, material);
  // Behind the card panels, so a link that does pass a card reads as not belonging to it;
  // in front where it runs into a layer card's neurons or stack.
  strands.renderOrder = out || into ? 1 : -1;
  return strands;
}

/**
 * A link's path. Forward links curve left to right; a back link (closing a
 * cycle) leaves its card to the right, loops down to `floor` under the cards
 * and comes back into the target from the left.
 */
function linkCurve(link: CardLink, sx: number, sy: number, ex: number, ey: number, shape: CurveShape, floor: number, lane = 0): CurvePoint[] {
  if (!link.back) {
    // Through the lanes kept in the ranks it skips (`lane`, -0.5 to 0.5, is the
    // strand's place across one): one Bézier per stretch, flat at every joint,
    // and rippling (`shape.wave`) along each lane, so strands there weave rather than run ruled.
    const stops: [number, number][] = [[sx, sy], ...link.via.map(({ x, y }): [number, number] => [x, y + lane * LANE_HEIGHT]), [ex, ey]];
    const points: CurvePoint[] = [];
    for (let s = 1; s < stops.length; s += 1) {
      const [[x0, y0], [x1, y1]] = [stops[s - 1], stops[s]];
      const stretch = s % 2 === 0 ? { ...shape, bend: 0 } : { ...shape, wave: undefined };
      const sampled = sampleCurve(x0, y0, x1, y1, curveSegments(x0, y0, x1, y1, stretch), stretch);
      points.push(...(s === 1 ? sampled : sampled.slice(1)));
    }
    for (const point of points) point.along = ex === sx ? 0 : (point.x - sx) / (ex - sx);
    return points;
  }
  // Both handles at height c put the curve's midpoint at 0.125 (sy + ey) + 0.75 c, which is `floor`.
  // Each strand bows, reaches (from its `handle`) and ripples differently, so the loop reads as a loose bundle.
  const c = (floor - 0.125 * (sy + ey)) / 0.75 + (shape.bend ?? 0) * BACK_LINK_LOOSEN;
  const reach = BACK_LINK_REACH * (0.5 + (shape.handle ?? 0.5));
  const wave = shape.wave;
  const segments = segmentsFor(Math.hypot(reach, c - sy) + Math.abs(ex - sx - 2 * reach) + Math.hypot(reach, c - ey));
  const points: CurvePoint[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const [a, b, d, e] = [(1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t, t ** 3];
    const ripple = wave ? wave.amplitude * BACK_LINK_LOOSEN * Math.sin(Math.PI * t * wave.cycles + wave.phase) * Math.sin(Math.PI * t) : 0;
    points.push({ x: a * sx + b * (sx + reach) + d * (ex - reach) + e * ex, y: a * sy + (b + d) * c + e * ey + ripple, along: t });
  }
  return points;
}

/** A link to or from a neighbour outside this level fades out towards it, off screen; others are opaque. */
function outsideAlpha(link: CardLink, along: number): number {
  if (isOutside(link.from.node)) return Math.min(1, along / OUTSIDE_FADE);
  if (isOutside(link.to.node)) return Math.min(1, (1 - along) / OUTSIDE_FADE);
  return 1;
}

/** A curved ribbon from the right edge of one card to an arrowhead on the left edge of the next. */
function buildRibbon(link: CardLink, theme: Theme, floor: number): THREE.Object3D[] {
  const x0 = link.from.x + link.from.width / 2;
  const y0 = strandSlots(1, link.from, link.outShare)[0];
  const tipX = link.to.x - link.to.width / 2;
  const y1 = strandSlots(1, link.to, link.inShare)[0];
  // To or from outside this level, it fades out towards that end, and the arrowhead goes off screen with it.
  const toOutside = isOutside(link.to.node);
  const points = linkCurve(link, x0, y0, toOutside ? tipX : tipX - ARROW_LENGTH, y1, { handle: 0.5 }, floor);
  const material = new THREE.MeshBasicMaterial({ color: theme.panelBorderHover, transparent: true, opacity: 0.75, vertexColors: true });

  const ribbon = new THREE.Mesh(ribbonGeometry(points, LINK_WIDTH, (along) => outsideAlpha(link, along)), material);
  if (toOutside) {
    ribbon.renderOrder = -1;
    return [ribbon];
  }
  const arrow = new THREE.Mesh(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(tipX, y1, 1),
      new THREE.Vector3(tipX - ARROW_LENGTH, y1 + ARROW_WIDTH / 2, 1),
      new THREE.Vector3(tipX - ARROW_LENGTH, y1 - ARROW_WIDTH / 2, 1),
    ]),
    new THREE.MeshBasicMaterial({ color: theme.panelBorderHover, transparent: true, opacity: 0.75 }),
  );
  ribbon.renderOrder = arrow.renderOrder = -1;
  return [ribbon, arrow];
}

/** Two triangles per segment, offset either side of the curve by half the width; RGBA vertex colours carry `alpha`. */
function ribbonGeometry(points: { x: number; y: number; along: number }[], width: number, alpha: (along: number) => number): THREE.BufferGeometry {
  const positions: number[] = [];
  const colours: number[] = [];
  const indices: number[] = [];
  points.forEach((point, i) => {
    const previous = points[Math.max(i - 1, 0)];
    const next = points[Math.min(i + 1, points.length - 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = (-dy / length) * (width / 2);
    const ny = (dx / length) * (width / 2);
    positions.push(point.x + nx, point.y + ny, 1, point.x - nx, point.y - ny, 1);
    colours.push(1, 1, 1, alpha(point.along), 1, 1, 1, alpha(point.along));
    if (i > 0) {
      const a = (i - 1) * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));
  geometry.setIndex(indices);
  return geometry;
}
