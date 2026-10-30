/**
 * Turns a Layout into three.js objects: a framed panel per column, all
 * neurons in one InstancedMesh, a stack of slabs for each feature-map column,
 * one LineSegments buffer of edges per link, and an arc per skip connection. Text is drawn as HTML
 * (CSS2DObject) so it stays crisp at any zoom.
 */
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { type BandLayout, type ColumnLayout, type Layout, isBand } from "../layout/columns";
import { SLAB_Z, SLAB_Z_STEP, decodeFeatureMaps, gridLines } from "../layout/maps";
import type { FeatureMaps, Graph, GraphNode } from "../schema";
import type { Theme } from "../theme";
import { formatActivation, formatCount, formatShape } from "../ui/format";
import { type EdgeBundle, buildArc, buildEdges, buildLead, buildStub, gradientColour } from "./edges";

const NEURON_RADIUS = 3.2;
const PANEL_RADIUS = 2;
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
  const edges = [
    ...layout.links.map((link) => buildEdges(link, graph.weights?.[link.to.node.id], theme, graph.feature_maps?.[link.from.node.id])),
    ...layout.stubs.map((stub) => buildStub(stub, theme, graph.feature_maps?.[stub.from.node.id])),
    ...layout.arcs.map((arc) => buildArc(arc, theme, graph.feature_maps?.[arc.source.id])),
    // Inputs and outputs that connect outside this view: edges running off screen.
    ...layout.columns
      .filter((column) => column.node.type === "input" && typeof column.node.params["context"] === "string")
      .map((column) => buildLead({ column }, "in", theme, graph.feature_maps?.[column.node.id])),
    ...layout.bands
      .filter((band) => band.node.type === "output" && typeof band.node.params["context"] === "string")
      .flatMap((band) => outLead(layout, graph, band, theme)),
  ];
  edges.forEach((bundle) => root.add(bundle.lines));
  const touching = (node: GraphNode) => edges.filter((bundle) => bundle.ends.includes(node.id));

  const pickables: Pickable[] = [];
  for (const column of layout.columns) {
    const labels = columnLabels(column);
    const pickable = buildPanel(column, labels, theme);
    pickable.links = touching(column.node);
    root.add(pickable.mesh, pickable.outline, ...labels);
    pickables.push(pickable);
  }
  for (const band of layout.bands) {
    const chip = bandLabel(band);
    const pickable = buildBand(band, chip, theme);
    pickable.links = touching(band.node);
    root.add(pickable.mesh, pickable.outline, chip);
    if (band.kind === "flatten") root.add(buildStrip(band, theme));
    pickables.push(pickable);
  }
  const neuronColumns = layout.columns.filter((column) => !column.maps);
  root.add(buildNeurons(neuronColumns, theme), buildEllipses(neuronColumns, theme));
  for (const column of layout.columns) {
    if (column.maps) root.add(buildSlabs(column, columnPosition(column, layout.columns.length), theme, graph.feature_maps?.[column.node.id]));
  }

  return { root, pickables, edges, theme };
}

/** Free the GPU memory and remove the HTML labels of a network that is being replaced. */
export function disposeNetwork(network: Network): void {
  network.root.removeFromParent();
  network.root.traverse((object) => {
    if (object instanceof CSS2DObject) object.element.remove();
    if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
      object.geometry.dispose();
      (object.material as THREE.MeshBasicMaterial).map?.dispose();
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

/** Where a column sits along the colour gradient, matching the edges that arrive at it. */
function columnPosition(column: ColumnLayout, columnCount: number): number {
  return columnCount > 2 ? Math.max(0, column.index - 1) / (columnCount - 2) : 0;
}

/**
 * One feature-map stack: opaque slabs, back to front, so each hides the one
 * behind it, outlined in the layer's colour and gridded into cells. Back
 * slabs fade, so the front one (where the edges start and end) reads first. When the graph recorded
 * the layer's real output, each slab shows its channel as a pixel image, from
 * the panel colour (no response) to the layer colour (strongest response);
 * the front slab shows the most active channel.
 */
function buildSlabs(column: ColumnLayout, t: number, theme: Theme, recorded: FeatureMaps | undefined): THREE.Group {
  const slabs = column.maps!.slabs;
  const colour = gradientColour(theme.edgeGradient, t);
  const fill = new THREE.Color(theme.panelFill); // untinted: the outlines carry the layer colour
  const grid = new THREE.Color(theme.panelBorder);
  const images = recorded ? decodeFeatureMaps(recorded) : [];
  const group = new THREE.Group();

  const positions: number[] = [];
  const colours: number[] = [];
  slabs.forEach(({ left, bottom, width, height }, i) => {
    const z = SLAB_Z + i * SLAB_Z_STEP;
    const image = images[slabs.length - 1 - i]; // the front slab (last) shows the first, most active channel
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height).translate(left + width / 2, bottom + height / 2, z),
      new THREE.MeshBasicMaterial(
        image ? { map: mapTexture(image, recorded!.width, recorded!.height, fill, colour) } : { color: fill },
      ),
    );
    group.add(plane);

    const alpha = slabs.length > 1 ? 0.35 + (0.65 * i) / (slabs.length - 1) : 1;
    const [right, top] = [left + width, bottom + height];
    const corners = [[left, bottom], [right, bottom], [right, top], [left, top]];
    corners.forEach(([x0, y0], k) => {
      const [x1, y1] = corners[(k + 1) % 4];
      positions.push(x0, y0, z + 0.01, x1, y1, z + 0.01);
      colours.push(colour.r, colour.g, colour.b, alpha, colour.r, colour.g, colour.b, alpha);
    });

    // Every slab's cell grid, so each map reads as cells the edges connect to,
    // even where only a strip of a back slab shows.
    const gridAlpha = 0.7 * alpha;
    for (const [x0, y0, x1, y1] of gridLines({ left, bottom, width, height }, column.maps!.mapHeight, column.maps!.mapWidth)) {
      positions.push(x0, y0, z + 0.015, x1, y1, z + 0.015);
      colours.push(grid.r, grid.g, grid.b, gridAlpha, grid.r, grid.g, grid.b, gridAlpha);
    }
  });

  const outlines = new THREE.BufferGeometry();
  outlines.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  outlines.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));
  const lines = new THREE.LineSegments(outlines, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true }));
  lines.renderOrder = 3;
  group.add(lines);
  return group;
}

/**
 * A feature map as a texture, shaded from `low` to `high`. Pixels stay square
 * (nearest filtering), so the map's real resolution shows: a 5 x 5 pooled map
 * looks like 25 cells. Colours are mixed in sRGB, as they are seen.
 */
function mapTexture(pixels: Uint8Array, width: number, height: number, low: THREE.Color, high: THREE.Color): THREE.DataTexture {
  const from = low.clone().convertLinearToSRGB();
  const to = high.clone().convertLinearToSRGB();
  const data = new Uint8Array(width * height * 4);
  for (let row = 0; row < height; row += 1) {
    const flipped = height - 1 - row; // textures start at the bottom row; the data starts at the top
    for (let column = 0; column < width; column += 1) {
      const v = pixels[row * width + column] / 255;
      const at = (flipped * width + column) * 4;
      data[at] = Math.round(255 * (from.r + (to.r - from.r) * v));
      data[at + 1] = Math.round(255 * (from.g + (to.g - from.g) * v));
      data[at + 2] = Math.round(255 * (from.b + (to.b - from.b) * v));
      data[at + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
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
  // A merge node is its own marker; a dashed line through it would blur which way the edges flow.
  outline.visible = band.kind !== "merge";
  return { node: band.node, mesh, outline, labels: [chip.element], links: [] };
}

/** The layer's name and a muted detail line, pinned to the top-left corner of its panel. */
function columnLabels(column: ColumnLayout): CSS2DObject[] {
  const { node, panel } = column;
  const size = node.output_shape.length > 1 ? formatShape(node.output_shape) : `${formatCount(column.units)} units`;
  // An input standing for a layer outside this view says where it comes from ("from stem").
  const context = typeof node.params["context"] === "string" ? node.params["context"] : "";
  const kind = node.type === "input" ? context : [node.label, formatActivation(node.activation)].filter(Boolean).join(" · ");
  const details = [kind, size].filter(Boolean).join(" · ");
  const header = label(
    "layer-header",
    `<span class="layer-name">${escapeHtml(titleFor(node))}</span><span class="layer-kind">${escapeHtml(details)}</span>`,
  );
  header.position.set(panel.left + 14, panel.top - 12, 5);
  header.center.set(0, 0);
  return [header];
}

/**
 * A band's label, drawn to show what the band does. Add and concat are merge
 * nodes (a summing junction, as in block diagrams) that edges pinch through
 * and arcs rise into; the others are chips with a small icon: a bell curve for
 * normalisation, a broken line for dropout, the activation's own shape. A
 * flatten strip's chip sits under the strip, so it doesn't cover it.
 */
function bandLabel(band: BandLayout): CSS2DObject {
  if (band.kind === "merge") {
    const glyph = band.node.type === "add" ? "+" : "∥"; // + or a double bar for concat
    const node = label("merge-node", `${glyph}<span class="merge-caption">${escapeHtml(band.node.type)}</span>`);
    node.position.set(band.x, 0, 5);
    return node;
  }
  const icon = bandIcon(band.node);
  const chip = label("band-chip", `${icon ? `<svg viewBox="0 0 14 10" aria-hidden="true"><path d="${icon}"/></svg>` : ""}${escapeHtml(bandText(band.node))}`);
  chip.position.set(band.x, band.kind === "flatten" ? -band.stripHalfHeight - 16 : 0, 5);
  return chip;
}

/** SVG path data (14 x 10 box) sketching what a band does, or null. */
function bandIcon(node: GraphNode): string | null {
  if (node.type === "norm") return "M1 9 C4 9 5 1 7 1 C9 1 10 9 13 9"; // a bell curve: values pulled to mean 0, spread 1
  if (node.type === "dropout") return "M1 5 H3.5 M6 5 H8 M10.5 5 H13"; // some connections switched off
  if (node.type === "flatten" || node.type === "reshape") return "M2 1 H5 V9 H2 Z M8 1 H12 M8 5 H12 M8 9 H12"; // a block laid out as rows
  if (node.type === "output") return "M1 5 H12 M9 2 L12 5 L9 8";
  if (node.type === "activation") {
    const name = (node.activation ?? "").toLowerCase();
    if (name.includes("relu") || name.includes("elu")) return "M1 8 H7 L13 2"; // zero, then the input itself
    if (name.includes("sigmoid") || name.includes("tanh") || name.includes("softmax")) return "M1 8 C6 8 8 2 13 2"; // squashed into a range
    return "M1 8 C5 8 9 6 13 2";
  }
  return null;
}

/**
 * A flatten band's strip: a tall, thin column of cells, the feature-map stack
 * unrolled into one long vector. Edges into the dense layer pass through it at
 * their value's place (channel by channel, row by row).
 */
function buildStrip(band: BandLayout, theme: Theme): THREE.LineSegments {
  const half = band.stripHalfHeight;
  const width = 10;
  const [left, right] = [band.x - width / 2, band.x + width / 2];
  const cells = 24;
  const points: THREE.Vector3[] = [
    new THREE.Vector3(left, half, 2), new THREE.Vector3(right, half, 2),
    new THREE.Vector3(right, half, 2), new THREE.Vector3(right, -half, 2),
    new THREE.Vector3(right, -half, 2), new THREE.Vector3(left, -half, 2),
    new THREE.Vector3(left, -half, 2), new THREE.Vector3(left, half, 2),
  ];
  for (let i = 1; i < cells; i += 1) {
    const y = half - (2 * half * i) / cells;
    points.push(new THREE.Vector3(left, y, 2), new THREE.Vector3(right, y, 2));
  }
  const strip = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: theme.panelBorderHover, transparent: true, opacity: 0.8 }),
  );
  strip.renderOrder = 3;
  return strip;
}

/**
 * The edges leaving the view through an output: they start at what feeds it,
 * the nearest layer or add/concat before it, and pass the plain bands on the
 * way (a ReLU after the add), so there is no gap before the output chip.
 */
function outLead(layout: Layout, graph: Graph, output: BandLayout, theme: Theme): EdgeBundle[] {
  const through = [output];
  for (let i = graph.nodes.indexOf(output.node) - 1; i >= 0; i -= 1) {
    const node = graph.nodes[i];
    const column = layout.columns.find((candidate) => candidate.node === node);
    if (column) return [buildLead({ column }, "out", theme, graph.feature_maps?.[node.id], through)];
    const band = layout.bands.find((candidate) => candidate.node === node);
    if (band?.kind === "merge") return [buildLead({ band }, "out", theme, undefined, through)];
    if (band) through.unshift(band);
  }
  return [buildLead({ band: output }, "out", theme)];
}

function bandText(node: GraphNode): string {
  if (node.type === "output") return typeof node.params["context"] === "string" ? `Output ${node.params["context"]}` : "Output";
  if (node.type === "dropout" && typeof node.params["p"] === "number") return `Dropout ${node.params["p"]}`;
  if (node.type === "activation") return formatActivation(node.activation) || node.label;
  if (node.type === "norm" && node.label.startsWith("BatchNorm")) return "BatchNorm"; // Keras: BatchNormalization
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
  if (node.type === "output") return typeof node.params["context"] === "string" ? `Output ${node.params["context"]}` : "Output";
  return layerNames.get(node) ?? localId(node);
}

/**
 * The id without its network prefix: systems prefix ids with the network
 * ("encoder/fc1") and grouped PyTorch modules with the module that holds them
 * ("encoder_1" in group "encoder", "layer2_0_conv1" in group "layer2.0").
 */
function localId(node: GraphNode): string {
  const local = node.id.split("/").pop() ?? node.id;
  const prefix = `${(node.group?.split("/").pop() ?? "").replace(/\./g, "_")}_`;
  return node.group && local.startsWith(prefix) ? local.slice(prefix.length) : local;
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
