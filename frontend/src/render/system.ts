/**
 * Draws a SystemLayout: a card per network or block, a mini neuron preview
 * inside each network card, and labelled bundles of strands between cards. It returns the
 * same Network shape as the detailed view, so hover, tooltips and the
 * inspector work unchanged; network cards, and blocks with notes, open on
 * click via `activate`.
 */
import * as THREE from "three";
import { sampleCurve } from "../layout/curves";
import { type Card, type CardLink, type SystemLayout, strandCount, strandSlots } from "../layout/system";
import type { GraphNode } from "../schema";
import type { Theme } from "../theme";
import { formatCount, formatFramework, formatParams, formatShape } from "../ui/format";
import { gradientColour, pseudoRandom } from "./edges";
import { type Network, type Pickable, escapeHtml, label, roundedRect, titleFor } from "./network";

const CARD_RADIUS = 10;
const LINK_WIDTH = 2.4;
const ARROW_LENGTH = 10;
const ARROW_WIDTH = 9;
/** Space inside a network card for the preview, below the header and above the footer. */
const PREVIEW_INSET = { left: 28, right: 28, top: 64, bottom: 40 };
const PREVIEW_MAX_DOTS = 9;
const PREVIEW_DOT = 2.6;
const STRAND_SEGMENTS = 24;
/** Largest random bow given to a strand between cards, in world units. */
const STRAND_BEND = 14;

export interface OpenHandlers {
  network: (groupId: string) => void;
  note: (node: GraphNode) => void;
}

export function buildSystem(layout: SystemLayout, theme: Theme, open: OpenHandlers): Network {
  const root = new THREE.Group();
  const pickables: Pickable[] = [];
  const previewLines: number[] = [];
  const previewColours: number[] = [];
  const dots: [number, number][] = [];

  for (const card of layout.cards) {
    const pickable = buildCard(card, theme);
    if (card.group) {
      const groupId = card.group.id;
      pickable.activate = () => open.network(groupId);
      addPreview(card, theme, previewLines, previewColours, dots);
    } else if (card.node.notes) {
      const node = card.node;
      pickable.activate = () => open.note(node);
    }
    root.add(pickable.mesh, pickable.outline, ...cardLabels(card, pickable));
    pickables.push(pickable);
  }
  const rankCount = Math.max(...layout.cards.map((card) => card.rank)) + 1;
  for (const link of layout.links) root.add(...buildLink(link, theme, rankCount));
  root.add(buildPreviewLines(previewLines, previewColours, theme), buildDots(dots, theme));

  return { root, pickables, edges: [], theme };
}

function buildCard(card: Card, theme: Theme): Pickable {
  const shape = roundedRect(card.x - card.width / 2, card.y - card.height / 2, card.width, card.height, CARD_RADIUS);
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape, 8),
    new THREE.MeshBasicMaterial({ color: theme.panelFill, transparent: true, opacity: theme.panelFillOpacity, depthWrite: false }),
  );
  const outline = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(shape.getPoints(8)),
    new THREE.LineBasicMaterial({ color: theme.panelBorder }),
  );
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
    details = `${framework} · ${card.layerCount} layers · ${formatParams(card.paramCount)} params`;
    footer = `${shapeText(card.inputShape)} → ${shapeText(card.outputShape)}`;
  } else {
    const description = card.node.params["description"];
    details = typeof description === "string" ? escapeHtml(description) : kindText(card);
    // Show what the card produces, or what it takes in if it is a sink (an output, a loss).
    footer = shapeText(card.outputShape.length > 0 ? card.outputShape : card.inputShape);
    if (card.node.notes) footer = `<span>${footer}</span><span class="note-hint">Notes</span>`;
  }

  const terminal = card.node.type === "input" || card.node.type === "output";
  const name = card.group ? card.group.label : terminal ? titleFor(card.node) : card.node.label;
  const header = label("layer-header", `<span class="layer-name">${escapeHtml(name)}</span><span class="layer-kind">${details}</span>`);
  header.position.set(left, top, 5);
  header.center.set(0, 0);
  const foot = label("card-footer", footer);
  foot.position.set(left, bottom, 5);
  foot.center.set(0, 1);
  foot.element.style.width = `${card.width - 28}px`;
  pickable.labels.push(header.element, foot.element);
  return [header, foot];
}

function kindText(card: Card): string {
  if (card.node.type === "input") return "Model input";
  if (card.node.type === "output") return "Model output";
  if (card.node.type === "custom") return "Block";
  return escapeHtml(card.node.label);
}

function shapeText(shape: number[]): string {
  if (shape.length === 0) return "—";
  return shape.length === 1 ? formatCount(shape[0]) : formatShape(shape);
}

/** Small columns of dots joined by faint lines, one column per layer of the network. */
function addPreview(card: Card, theme: Theme, lines: number[], colours: number[], dots: [number, number][]): void {
  const columns = card.preview;
  if (columns.length === 0) return;
  const left = card.x - card.width / 2 + PREVIEW_INSET.left;
  const right = card.x + card.width / 2 - PREVIEW_INSET.right;
  const top = card.y + card.height / 2 - PREVIEW_INSET.top;
  const bottom = card.y - card.height / 2 + PREVIEW_INSET.bottom;
  const height = top - bottom;
  const middle = (top + bottom) / 2;

  const positions = columns.map((units, i) => {
    const x = columns.length === 1 ? (left + right) / 2 : left + ((right - left) * i) / (columns.length - 1);
    const count = Math.min(units, PREVIEW_MAX_DOTS);
    const spacing = count > 1 ? Math.min(height / (count - 1), 12) : 0;
    return Array.from({ length: count }, (_, k) => [x, middle + ((count - 1) / 2 - k) * spacing] as [number, number]);
  });

  positions.forEach((column, i) => {
    dots.push(...column);
    if (i === 0) return;
    const colour = gradientColour(theme.edgeGradient, (i - 1) / Math.max(columns.length - 2, 1));
    for (const [x0, y0] of positions[i - 1]) {
      for (const [x1, y1] of column) {
        lines.push(x0, y0, 0, x1, y1, 0);
        colours.push(colour.r, colour.g, colour.b, colour.r, colour.g, colour.b);
      }
    }
  });
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

function buildDots(dots: [number, number][], theme: Theme): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(
    new THREE.CircleGeometry(PREVIEW_DOT, 16),
    new THREE.MeshBasicMaterial({ color: theme.neuron }),
    dots.length,
  );
  const matrix = new THREE.Matrix4();
  dots.forEach(([x, y], i) => mesh.setMatrixAt(i, matrix.makeTranslation(x, y, 2)));
  mesh.renderOrder = 3;
  return mesh;
}

/**
 * A link between two cards: one strand per value the tensor carries (capped),
 * running from the right edge of one card to the left edge of the next. A link
 * whose shape is unknown falls back to a single ribbon with an arrowhead.
 */
function buildLink(link: CardLink, theme: Theme, rankCount: number): THREE.Object3D[] {
  const x0 = link.from.x + link.from.width / 2;
  const x1 = link.to.x - link.to.width / 2;
  const count = strandCount(link.shape);
  const objects = count > 0 ? [buildStrands(link, count, theme, rankCount)] : buildRibbon(link, theme);

  const caption = link.label ?? (link.shape.length > 0 ? shapeText(link.shape) : null);
  if (!caption) return objects;
  const middle = sampleCurve(x0, link.from.y, x1, link.to.y, 2, { handle: 0.5 })[1];
  const chip = label("link-chip", escapeHtml(caption));
  chip.position.set(middle.x, middle.y, 5);
  return [...objects, chip];
}

/** Strand i leaves slot i of the source card and enters slot i of the target, like a cable. */
function buildStrands(link: CardLink, count: number, theme: Theme, rankCount: number): THREE.LineSegments {
  const x0 = link.from.x + link.from.width / 2;
  const x1 = link.to.x - link.to.width / 2;
  const starts = strandSlots(count, link.from);
  const ends = strandSlots(count, link.to);
  // The gradient runs across the whole system, so a strand takes the colours of the ranks it joins.
  const t0 = link.from.rank / Math.max(rankCount - 1, 1);
  const t1 = link.to.rank / Math.max(rankCount - 1, 1);

  const positions: number[] = [];
  const colours: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const seed = pseudoRandom(i + link.from.rank * 7919 + link.to.y);
    const shape = { handle: 0.35 + 0.3 * pseudoRandom(seed * 1e4 + 1), bend: (pseudoRandom(seed * 1e4 + 2) - 0.5) * 2 * STRAND_BEND };
    const points = sampleCurve(x0, starts[i], x1, ends[i], STRAND_SEGMENTS, shape);
    for (let s = 0; s < STRAND_SEGMENTS; s += 1) {
      for (const point of [points[s], points[s + 1]]) {
        const colour = gradientColour(theme.edgeGradient, t0 + (t1 - t0) * point.along);
        positions.push(point.x, point.y, 0);
        colours.push(colour.r, colour.g, colour.b);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 3));
  // Fewer strands get more opacity each, so a 4-value link is as visible as a 48-value one.
  const density = Math.min(0.8, Math.max(0.2, 3 / Math.sqrt(count)));
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: Math.min(0.9, density * theme.edgeOpacity),
    blending: theme.edgeBlending === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    depthWrite: false,
  });
  const strands = new THREE.LineSegments(geometry, material);
  strands.renderOrder = 1;
  return strands;
}

/** A curved ribbon from the right edge of one card to an arrowhead on the left edge of the next. */
function buildRibbon(link: CardLink, theme: Theme): THREE.Object3D[] {
  const x0 = link.from.x + link.from.width / 2;
  const y0 = link.from.y;
  const tipX = link.to.x - link.to.width / 2;
  const y1 = link.to.y;
  const points = sampleCurve(x0, y0, tipX - ARROW_LENGTH, y1, 32, { handle: 0.5 });
  const material = new THREE.MeshBasicMaterial({ color: theme.panelBorderHover, transparent: true, opacity: 0.75 });

  const ribbon = new THREE.Mesh(ribbonGeometry(points, LINK_WIDTH), material);
  const arrow = new THREE.Mesh(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(tipX, y1, 1),
      new THREE.Vector3(tipX - ARROW_LENGTH, y1 + ARROW_WIDTH / 2, 1),
      new THREE.Vector3(tipX - ARROW_LENGTH, y1 - ARROW_WIDTH / 2, 1),
    ]),
    material,
  );
  ribbon.renderOrder = arrow.renderOrder = 2;
  return [ribbon, arrow];
}

/** Two triangles per segment, offset either side of the curve by half the width. */
function ribbonGeometry(points: { x: number; y: number }[], width: number): THREE.BufferGeometry {
  const positions: number[] = [];
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
    if (i > 0) {
      const a = (i - 1) * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}
