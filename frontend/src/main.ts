import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import * as THREE from "three";
import "./style.css";
import { layoutGraph } from "./layout/columns";
import { isSystem, layoutSystem, subgraph } from "./layout/system";
import { type Network, buildNetwork, disposeNetwork, escapeHtml } from "./render/network";
import { buildSystem } from "./render/system";
import { type Bounds, Viewer } from "./render/viewer";
import { SCHEMA_VERSION, type Graph } from "./schema";
import {
  type Theme,
  colormapCss,
  colormaps,
  initialColormap,
  initialTheme,
  saveColormap,
  saveTheme,
  themes,
  withColormap,
} from "./theme";
import { formatCount, formatFramework } from "./ui/format";
import { Inspector } from "./ui/inspector";
import { type Interaction, attachInteraction, pickAt } from "./ui/interaction";

declare global {
  interface Window {
    /** Set by standalone HTML exports so the viewer works without a server. */
    __NEUROLUME_GRAPH__?: Graph;
  }
}

const ICONS = {
  back: '<path d="M10 3L5 8l5 5"/>',
  settings: '<path d="M2 5h7M13 5h1M2 11h1M7 11h7"/><circle cx="11" cy="5" r="2"/><circle cx="5" cy="11" r="2"/>',
};

/** The mouse and keyboard reference shown in the settings panel: action, then input. */
const CONTROLS: [string, string][] = [
  ["Zoom", "Scroll"],
  ["Pan", "Drag"],
  ["Layer or block details", "Click"],
  ["Open a network", "Click / zoom in"],
  ["Back to the overview", "Zoom out / Esc"],
  ["Fit to screen", "Double-click / F"],
  ["Light or dark", "T"],
];

function icon(name: keyof typeof ICONS): string {
  return `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

async function loadGraph(): Promise<Graph> {
  if (window.__NEUROLUME_GRAPH__) return window.__NEUROLUME_GRAPH__;
  const response = await fetch("/api/graph");
  if (!response.ok) throw new Error(`Graph request failed: ${response.status}`);
  return (await response.json()) as Graph;
}

/** Zooming out below this fraction of a network's fit zoom goes back to the overview. */
const ZOOM_OUT_TO_PARENT = 0.5;
/** Zooming into a network card until it fills this fraction of the screen opens it. */
const ZOOM_IN_FILL = 0.6;
/** After opening a network from the overview, scroll zooming is ignored this long. */
const ZOOM_PAUSE_MS = 300;
/** Going back up a level glides out from the card you were in to the whole overview this long. */
const ZOOM_OUT_MS = 550;

/** One screen: either the system overview or the detailed view of one network. */
interface View {
  kind: "system" | "network";
  graph: Graph;
  bounds: Bounds;
  /** Where Esc and the Back button go, or null at the top level. */
  parent: View | null;
  /** The card in the parent this view was opened from, so going back can start on it. */
  origin: string | null;
  /** Where a card sits in this view (overviews only), by group id. */
  cardBounds?: (groupId: string) => Bounds | null;
  build: (theme: Theme) => Network;
}

function networkView(graph: Graph, parent: View | null, origin: string | null = null): View {
  const layout = layoutGraph(graph);
  return { kind: "network", graph, bounds: layout.bounds, parent, origin, build: (theme) => buildNetwork(layout, graph, theme) };
}

/** An overview. Opening a card shows its network, or another overview when the network has parts of its own. */
function systemView(graph: Graph, open: (view: View) => void, parent: View | null = null, origin: string | null = null): View {
  const layout = layoutSystem(graph);
  const view: View = {
    kind: "system",
    graph,
    bounds: layout.bounds,
    parent,
    origin,
    cardBounds: (groupId) => {
      const card = layout.cards.find((candidate) => candidate.group?.id === groupId);
      return card ? { left: card.x - card.width / 2, right: card.x + card.width / 2, top: card.y + card.height / 2, bottom: card.y - card.height / 2 } : null;
    },
    build: (theme) =>
      buildSystem(layout, theme, (groupId) => {
        const part = subgraph(graph, groupId);
        open(isSystem(part) ? systemView(part, open, view, groupId) : networkView(part, view, groupId));
      }),
  };
  return view;
}

/**
 * Shows one View at a time. Three.js colours are baked into materials, so
 * switching theme simply rebuilds the current view; it is cheap.
 */
class Stage {
  private view: View | null = null;
  private network: Network | null = null;
  private interaction: Interaction | null = null;
  /** The zoom at which the current view fits the screen. */
  private fitZoom = 1;

  constructor(
    private readonly viewer: Viewer,
    private readonly inspector: Inspector,
    private readonly tooltip: HTMLElement,
    private readonly onViewChange: (view: View) => void,
    private theme: Theme,
  ) {
    // Scrolling moves between levels: zoom well out of a network to return to the
    // overview, or zoom into a network card until it fills the screen to open it.
    viewer.onUserZoom = (zoom, clientX, clientY) => {
      if (this.view?.parent && zoom < this.fitZoom * ZOOM_OUT_TO_PARENT) this.back();
      else if (zoom > this.fitZoom) this.openCardUnder(clientX, clientY, zoom);
    };
  }

  private openCardUnder(clientX: number, clientY: number, zoom: number): void {
    if (!this.network) return;
    const card = pickAt(this.viewer, this.network, clientX, clientY);
    if (!card?.activate) return;
    const box = new THREE.Box3().setFromObject(card.mesh);
    const { width, height } = this.viewer.size();
    const fills = (box.max.x - box.min.x) * zoom >= width * ZOOM_IN_FILL || (box.max.y - box.min.y) * zoom >= height * ZOOM_IN_FILL;
    if (fills) card.activate();
  }

  /**
   * Show a view. `from` is the card it was reached from when going back up:
   * the view then starts framed on that card and glides out to fit, so you
   * see where you were instead of jumping.
   */
  show(view: View, from: string | null = null): void {
    const goingIn = this.view !== null && view.parent !== null && from === null;
    this.view = view;
    this.onViewChange(view); // first, so the title card has its final size before fitting
    this.remount();
    const card = from ? view.cardBounds?.(from) : null;
    if (card) {
      this.viewer.fitTo(card, 1.6);
      this.fitZoom = this.viewer.flyTo(view.bounds, ZOOM_OUT_MS);
      // A scroll that is still going would otherwise zoom back into the card mid-glide.
      this.viewer.pauseZoom(ZOOM_OUT_MS + ZOOM_PAUSE_MS);
      return;
    }
    this.fit();
    // Only when going in: leftover scrolling would otherwise zoom straight into the network.
    if (goingIn) this.viewer.pauseZoom(ZOOM_PAUSE_MS);
  }

  /** Go up to the parent view. Returns false at the top level. */
  back(): boolean {
    if (!this.view?.parent) return false;
    this.show(this.view.parent, this.view.origin);
    return true;
  }

  /** Jump up to an ancestor of the current view, gliding out from the card on the way there. */
  goUpTo(target: View): void {
    let child = this.view;
    while (child && child.parent !== target) child = child.parent;
    if (child) this.show(target, child.origin);
  }

  fit(): void {
    if (!this.view) return;
    this.viewer.fitTo(this.view.bounds);
    this.fitZoom = this.viewer.camera.zoom;
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    this.viewer.applyTheme(theme);
    this.remount();
  }

  clearSelection(): void {
    this.interaction?.clearSelection();
  }

  private remount(): void {
    this.inspector.hide();
    this.interaction?.detach();
    if (this.network) disposeNetwork(this.network);
    if (!this.view) return;
    document.documentElement.dataset.theme = this.theme.name;
    this.network = this.view.build(this.theme);
    this.viewer.scene.add(this.network.root);
    this.interaction = attachInteraction(this.viewer, this.network, this.inspector, this.tooltip, () => this.fit());
    this.viewer.requestRender();
  }
}

/**
 * Where you are: every level from the top down to this one, indented like a
 * tree. Earlier levels are buttons that go back up to them. Hidden at the top.
 */
function renderDepthTree(tree: HTMLElement, view: View, stage: Stage): void {
  const path: View[] = [];
  for (let level: View | null = view; level; level = level.parent) path.unshift(level);
  tree.hidden = path.length < 2;
  tree.innerHTML = `<p class="eyebrow">Depth</p>`;
  path.forEach((level, depth) => {
    const row = document.createElement(level === view ? "span" : "button");
    row.className = "depth-row";
    row.style.paddingLeft = `${8 + depth * 14}px`;
    row.innerHTML = `${depth > 0 ? '<span class="depth-branch"></span>' : ""}${escapeHtml(level.graph.model.name)}`;
    if (level === view) row.setAttribute("aria-current", "true");
    else row.addEventListener("click", () => stage.goUpTo(level));
    tree.append(row);
  });
}

function renderTitleCard(card: HTMLElement, view: View): void {
  const { model, nodes, groups } = view.graph;
  const stats =
    view.kind === "system"
      ? [`<span><strong>${groups.filter((group) => group.parent === null).length}</strong> networks</span>`]
      : [`<span><strong>${nodes.filter((node) => node.type !== "input" && node.type !== "output").length}</strong> layers</span>`];
  const context = view.parent ? ` · in ${escapeHtml(view.parent.graph.model.name)}` : "";
  card.innerHTML = `
    <p class="eyebrow">${escapeHtml(formatFramework(model.framework))}${context}</p>
    <h1>${escapeHtml(model.name)}</h1>
    <p class="title-meta">
      <span><strong>${formatCount(model.total_params)}</strong> parameters</span>
      ${stats.join("")}
    </p>`;
}

function buildControls(app: HTMLElement, stage: Stage, initial: Theme): HTMLButtonElement {
  let base = themes[initial.name];
  let colormap = initialColormap(base.name);
  const controls = document.createElement("nav");
  controls.className = "controls surface";
  controls.setAttribute("aria-label", "View controls");
  controls.innerHTML = `
    <button data-action="back" title="Back to the overview (Esc)" hidden>${icon("back")}<span>Overview</span></button>
    <div class="settings">
      <button data-action="settings" aria-haspopup="dialog" aria-expanded="false">${icon("settings")}<span>Settings</span></button>
      <div class="settings-panel surface" role="dialog" aria-label="Settings" hidden></div>
    </div>`;
  const backButton = controls.querySelector<HTMLButtonElement>('[data-action="back"]')!;
  const settingsButton = controls.querySelector<HTMLButtonElement>('[data-action="settings"]')!;
  const panel = controls.querySelector<HTMLElement>(".settings-panel")!;

  const render = () => {
    const option = (selected: boolean, data: string, content: string) =>
      `<button role="radio" ${data} aria-checked="${selected}">${content}</button>`;
    panel.innerHTML = `
      <section>
        <h3>Theme</h3>
        <div class="segmented" role="radiogroup" aria-label="Theme">
          ${option(base.name === "dark", 'data-theme-name="dark"', "Dark")}
          ${option(base.name === "light", 'data-theme-name="light"', "Light")}
        </div>
      </section>
      <section>
        <h3>Edge colours</h3>
        <div class="colormap-list" role="radiogroup" aria-label="Edge colours">
          ${colormaps[base.name]
            .map((candidate) =>
              option(
                candidate.name === colormap.name,
                `data-colormap="${escapeHtml(candidate.name)}"`,
                `<span class="swatch" style="background: ${colormapCss(candidate)}"></span>${escapeHtml(candidate.name)}`,
              ),
            )
            .join("")}
        </div>
      </section>
      <section>
        <h3>Controls</h3>
        <dl class="shortcuts">${CONTROLS.map(([action, input]) => `<dt>${action}</dt><dd>${input}</dd>`).join("")}</dl>
      </section>`;
  };
  const setOpen = (open: boolean) => {
    panel.hidden = !open;
    settingsButton.setAttribute("aria-expanded", String(open));
  };

  const setTheme = (name: Theme["name"]) => {
    if (name === base.name) return;
    base = themes[name];
    colormap = initialColormap(base.name); // each theme remembers its own colourmap
    saveTheme(base);
    stage.setTheme(withColormap(base, colormap));
    render();
  };

  settingsButton.addEventListener("click", () => setOpen(panel.hidden));
  panel.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("button");
    if (target?.dataset.themeName === "dark" || target?.dataset.themeName === "light") setTheme(target.dataset.themeName);
    const chosen = colormaps[base.name].find((candidate) => candidate.name === target?.dataset.colormap);
    if (!chosen) return;
    colormap = chosen;
    saveColormap(base.name, colormap);
    stage.setTheme(withColormap(base, colormap));
    render();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!panel.hidden && !controls.contains(event.target as Node)) setOpen(false);
  });

  backButton.addEventListener("click", () => stage.back());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      // Close the panel only; don't also leave the network or close the inspector.
      setOpen(false);
      event.stopImmediatePropagation();
    }
    if (event.key === "f") stage.fit();
    if (event.key === "t") setTheme(base.name === "dark" ? "light" : "dark");
  });
  render();
  app.append(controls);
  return backButton;
}

async function main(): Promise<void> {
  const app = document.querySelector<HTMLElement>("#app");
  if (!app) throw new Error("Neurolume mount element was not found");

  const graph = await loadGraph();
  if (graph.schema_version.split(".")[0] !== SCHEMA_VERSION.split(".")[0]) {
    console.warn(`Graph uses schema ${graph.schema_version}; this viewer expects ${SCHEMA_VERSION}`);
  }
  document.title = `${graph.model.name} – Neurolume`;

  const startTheme = initialTheme();
  const theme = withColormap(startTheme, initialColormap(startTheme.name));
  const viewer = new Viewer(app, theme);
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip surface";
  tooltip.hidden = true;
  app.append(tooltip);

  const titleCard = document.createElement("header");
  titleCard.className = "title-card surface";

  const depthTree = document.createElement("nav");
  depthTree.className = "depth-tree surface";
  depthTree.setAttribute("aria-label", "Levels");
  depthTree.hidden = true;

  let stage: Stage | null = null;
  let backButton: HTMLButtonElement | null = null;
  const inspector = new Inspector(app, graph, () => stage?.clearSelection());
  stage = new Stage(
    viewer,
    inspector,
    tooltip,
    (view) => {
      renderTitleCard(titleCard, view);
      if (stage) renderDepthTree(depthTree, view, stage);
      if (backButton) backButton.hidden = view.parent === null;
    },
    theme,
  );
  app.append(titleCard, depthTree);
  // Fitting leaves room for the title card, so it never covers the first panel's header.
  viewer.fitInsetTop = () => titleCard.getBoundingClientRect().bottom - app.getBoundingClientRect().top;
  viewer.fitInsetBottom = () => (depthTree.hidden ? 0 : app.getBoundingClientRect().bottom - depthTree.getBoundingClientRect().top);
  backButton = buildControls(app, stage, theme);

  const open = (view: View) => stage?.show(view);
  stage.show(isSystem(graph) ? systemView(graph, open) : networkView(graph, null));

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    // Esc closes the inspector first, then steps back out of a network.
    if (inspector.isOpen) inspector.hide();
    else stage?.back();
  });
}

main().catch((error: unknown) => {
  document.body.innerHTML = `<pre class="error">Neurolume could not start:\n${escapeHtml(String(error))}</pre>`;
  console.error(error);
});
