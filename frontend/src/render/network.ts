/**
 * Turns a Layout into three.js objects: a framed panel per column, all
 * neurons in one InstancedMesh, and one LineSegments buffer of edges per link.
 * Text is drawn as HTML (CSS2DObject) so it stays crisp at any zoom.
 */
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { type BandLayout, type ColumnLayout, type Layout, isBand } from "../layout/columns";
import type { Graph, GraphNode } from "../schema";
import type { Theme } from "../theme";
import { formatActivation, formatCount, formatShape } from "../ui/format";
import { type EdgeBundle, buildEdges } from "./edges";

const NEURON_RADIUS = 3.2;
const PANEL_RADIUS = 6;
const BAND_HIT_WIDTH = 24;

/** Anything the mouse can hover or click: a column panel or a band. */
export interface Pickable {
  node: GraphNode;
  mesh: THREE.Mesh;
  outline: THREE.Line;
  /** HTML labels that brighten with the layer when it is hovered or selected. */
  labels: HTMLElement[];
  /** Links drawn into or out of this layer, highlighted on hover. */
  links: EdgeBundle[];
  /** If set, clicking runs this instead of opening the inspector (e.g. opening a network card). */
  activate?: () => void;
}

export interface Network {
  root: THREE.Group;
  pickables: Pickable[];
  edges: EdgeBundle[];
  theme: Theme;
}

export function buildNetwork(layout: Layout, graph: Graph, theme: Theme): Network {
  const root = new THREE.Group();
  nameLayers(graph);
  const edges = layout.links.map((link) => buildEdges(link, graph.weights?.[link.to.node.id], theme));
  edges.forEach((bundle) => root.add(bundle.lines));

  const pickables: Pickable[] = [];
  for (const column of layout.columns) {
    const labels = columnLabels(column);
    const pickable = buildPanel(column, labels, theme);
    pickable.links = edges.filter((bundle) => bundle.link.from === column || bundle.link.to === column);
    root.add(pickable.mesh, pickable.outline, ...labels);
    pickables.push(pickable);
  }
  for (const band of layout.bands) {
    const chip = bandLabel(band);
    const pickable = buildBand(band, chip, theme);
    root.add(pickable.mesh, pickable.outline, chip);
    pickables.push(pickable);
  }
  root.add(buildNeurons(layout.columns, theme), buildEllipses(layout.columns, theme));

  return { root, pickables, edges, theme };
}

/** Free the GPU memory and remove the HTML labels of a network that is being replaced. */
export function disposeNetwork(network: Network): void {
  network.root.removeFromParent();
  network.root.traverse((object) => {
    if (object instanceof CSS2DObject) object.element.remove();
    if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
      object.geometry.dispose();
      (object.material as THREE.Material).dispose();
    }
  });
}

/** Brighten or restore a layer's outline and labels. */
export function setHighlight(theme: Theme, pickable: Pickable, active: boolean): void {
  (pickable.outline.material as THREE.LineBasicMaterial).color.set(active ? theme.panelBorderHover : theme.panelBorder);
  for (const element of pickable.labels) element.classList.toggle("is-active", active);
}

function buildNeurons(columns: ColumnLayout[], theme: Theme): THREE.InstancedMesh {
  const count = columns.reduce((total, column) => total + column.slots.length, 0);
  const material = new THREE.MeshBasicMaterial({ color: theme.neuron });
  const neurons = new THREE.InstancedMesh(new THREE.CircleGeometry(NEURON_RADIUS, 24), material, count);
  const matrix = new THREE.Matrix4();
  let index = 0;
  for (const column of columns) {
    for (const y of column.slots) neurons.setMatrixAt(index++, matrix.makeTranslation(column.x, y, 2));
  }
  neurons.renderOrder = 3;
  return neurons;
}

/** Three small dots in the gap of every column that hides some neurons. */
function buildEllipses(columns: ColumnLayout[], theme: Theme): THREE.InstancedMesh {
  const truncated = columns.filter((column) => column.ellipsisY !== null);
  const dots = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1.6, 12),
    new THREE.MeshBasicMaterial({ color: theme.muted }),
    truncated.length * 3,
  );
  const matrix = new THREE.Matrix4();
  truncated.forEach((column, i) => {
    for (let d = 0; d < 3; d += 1) {
      dots.setMatrixAt(i * 3 + d, matrix.makeTranslation(column.x, column.ellipsisY! + (d - 1) * 6, 2));
    }
  });
  dots.renderOrder = 3;
  return dots;
}

function buildPanel(column: ColumnLayout, labels: CSS2DObject[], theme: Theme): Pickable {
  const { left, right, top, bottom } = column.panel;
  const shape = roundedRect(left, bottom, right - left, top - bottom, PANEL_RADIUS);
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape, 8),
    new THREE.MeshBasicMaterial({
      color: theme.panelFill,
      transparent: true,
      opacity: theme.panelFillOpacity,
      depthWrite: false,
    }),
  );
  const outline = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(shape.getPoints(8)),
    new THREE.LineBasicMaterial({ color: theme.panelBorder }),
  );
  outline.renderOrder = 2;
  return { node: column.node, mesh, outline, labels: labels.map((label) => label.element), links: [] };
}

/** A band is a dashed guide line across the edges, plus an invisible, wider hit area. */
function buildBand(band: BandLayout, chip: CSS2DObject, theme: Theme): Pickable {
  const { x, halfHeight } = band;
  // z = 1 puts the hit area in front of the panels it overlaps, so bands win the raycast.
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(BAND_HIT_WIDTH, halfHeight * 2).translate(x, 0, 1),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  const outline = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, halfHeight, 1), new THREE.Vector3(x, -halfHeight, 1)]),
    new THREE.LineDashedMaterial({ color: theme.panelBorder, dashSize: 4, gapSize: 4 }),
  );
  outline.computeLineDistances();
  outline.renderOrder = 2;
  return { node: band.node, mesh, outline, labels: [chip.element], links: [] };
}

/** The layer's name and a muted detail line, pinned to the top-left corner of its panel. */
function columnLabels(column: ColumnLayout): CSS2DObject[] {
  const { node, panel } = column;
  const size = node.output_shape.length > 1 ? formatShape(node.output_shape) : `${formatCount(column.units)} units`;
  const kind = node.type === "input" ? "" : [node.label, formatActivation(node.activation)].filter(Boolean).join(" · ");
  const details = [kind, size].filter(Boolean).join(" · ");
  const header = label(
    "layer-header",
    `<span class="layer-name">${escapeHtml(titleFor(node))}</span><span class="layer-kind">${escapeHtml(details)}</span>`,
  );
  header.position.set(panel.left + 14, panel.top - 12, 5);
  header.center.set(0, 0);
  return [header];
}

function bandLabel(band: BandLayout): CSS2DObject {
  // Sits on the connection itself, so it never competes with column headers.
  const chip = label("band-chip", escapeHtml(bandText(band.node)));
  chip.position.set(band.x, 0, 5);
  return chip;
}

function bandText(node: GraphNode): string {
  if (node.type === "output") return "Output";
  if (node.type === "dropout" && typeof node.params["p"] === "number") return `Dropout ${node.params["p"]}`;
  if (node.type === "activation") return formatActivation(node.activation) || node.label;
  return node.label;
}

/** Names for numbered layers, worked out per drawn graph by nameLayers(). */
const layerNames = new WeakMap<GraphNode, string>();

/**
 * Name numbered nn.Sequential children in drawing order. Their ids are indices
 * into the Sequential ("0", "2"), which skip numbers once activations are folded
 * into the layer before them, so we count the drawn layers instead: Layer 1, 2, ...
 */
export function nameLayers(graph: Graph): void {
  let ordinal = 0;
  for (const node of graph.nodes) {
    if (node.type === "input" || node.type === "output" || !/^\d+$/.test(localId(node))) continue;
    layerNames.set(node, isBand(node) ? node.label : `Layer ${++ordinal}`);
  }
}

/** A short, human name for a layer: "Input", "fc1", or "Layer 1" for numbered Sequential children. */
export function titleFor(node: GraphNode): string {
  if (node.type === "input") return "Input";
  if (node.type === "output") return "Output";
  return layerNames.get(node) ?? localId(node);
}

/**
 * The id without its network prefix: systems prefix ids with the network
 * ("encoder/fc1") and grouped PyTorch modules with the child module ("encoder_1").
 */
function localId(node: GraphNode): string {
  const local = node.id.split("/").pop() ?? node.id;
  return node.group && local.startsWith(`${node.group}_`) ? local.slice(node.group.length + 1) : local;
}

export function label(className: string, html: string): CSS2DObject {
  const element = document.createElement("div");
  element.className = className;
  element.innerHTML = html;
  return new CSS2DObject(element);
}

export function roundedRect(x: number, y: number, width: number, height: number, radius: number): THREE.Shape {
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
