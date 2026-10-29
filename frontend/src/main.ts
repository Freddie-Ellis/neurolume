import "@fontsource-variable/inter";
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
  chevron: '<path d="M4 6l4 4 4-4"/>',
  fit: '<path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/>',
  theme: '<circle cx="8" cy="8" r="6"/><path d="M8 2a6 6 0 0 0 0 12z" fill="currentColor"/>',
};

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
const ZOOM_PAUSE_MS = 50;

/** One screen: either the system overview or the detailed view of one network. */
interface View {
  kind: "system" | "network";
  graph: Graph;
  bounds: Bounds;
  /** Where Esc and the Back button go, or null at the top level. */
  parent: View | null;
  build: (theme: Theme) => Network;
}

function networkView(graph: Graph, parent: View | null): View {
  const layout = layoutGraph(graph);
  return { kind: "network", graph, bounds: layout.bounds, parent, build: (theme) => buildNetwork(layout, graph, theme) };
}

function systemView(graph: Graph, open: (view: View) => void): View {
  const layout = layoutSystem(graph);
  const view: View = {
    kind: "system",
    graph,
    bounds: layout.bounds,
    parent: null,
    build: (theme) => buildSystem(layout, theme, (groupId) => open(networkView(subgraph(graph, groupId), view))),
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

  show(view: View): void {
    const goingIn = this.view !== null && view.parent !== null;
    this.view = view;
    this.remount();
    this.fit();
    // Only when going in: leftover scrolling would otherwise zoom straight into the network.
    if (goingIn) this.viewer.pauseZoom(ZOOM_PAUSE_MS);
    this.onViewChange(view);
  }

  /** Go up to the parent view. Returns false at the top level. */
  back(): boolean {
    if (!this.view?.parent) return false;
    this.show(this.view.parent);
    return true;
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

function renderTitleCard(card: HTMLElement, view: View, system: Graph): void {
  const { model, nodes, groups } = view.graph;
  const stats =
    view.kind === "system"
      ? [`<span><strong>${groups.filter((group) => group.parent === null).length}</strong> networks</span>`]
      : [`<span><strong>${nodes.filter((node) => node.type !== "input" && node.type !== "output").length}</strong> layers</span>`];
  const context = view.parent ? ` · in ${escapeHtml(system.model.name)}` : "";
  card.innerHTML = `
    <p class="eyebrow">${escapeHtml(formatFramework(model.framework))}${context}</p>
    <h1>${escapeHtml(model.name)}</h1>
    <p class="title-meta">
      <span><strong>${formatCount(model.total_params)}</strong> parameters</span>
      ${stats.join("")}
    </p>`;
}

function hintFor(view: View): string {
  if (view.kind === "system") return "Click or zoom into a network to open it · Drag to pan · Double-click empty space to fit";
  const back = view.parent ? "Zoom out or press Esc to go back · " : "";
  return `${back}Drag to pan · Scroll to zoom · Click a layer for details · Double-click empty space to fit`;
}

function buildControls(app: HTMLElement, stage: Stage, initial: Theme): HTMLButtonElement {
  let base = themes[initial.name];
  let colormap = initialColormap(base.name);
  const controls = document.createElement("nav");
  controls.className = "controls surface";
  controls.setAttribute("aria-label", "View controls");
  controls.innerHTML = `
    <button data-action="back" title="Back to the overview (Esc)" hidden>${icon("back")}<span>Overview</span></button>
    <button data-action="fit" title="Fit to screen (F, or double-click empty space)">${icon("fit")}<span>Fit</span></button>
    <div class="colormap-picker">
      <button data-action="colormap" title="Edge colours" aria-haspopup="listbox" aria-expanded="false">
        <span class="swatch"></span><span class="colormap-name"></span>${icon("chevron")}
      </button>
      <div class="colormap-menu surface" role="listbox" aria-label="Edge colours" hidden></div>
    </div>
    <button data-action="theme" title="Switch light and dark (T)">${icon("theme")}<span></span></button>`;
  const backButton = controls.querySelector<HTMLButtonElement>('[data-action="back"]')!;
  const themeButton = controls.querySelector<HTMLButtonElement>('[data-action="theme"]')!;
  const colormapButton = controls.querySelector<HTMLButtonElement>('[data-action="colormap"]')!;
  const menu = controls.querySelector<HTMLElement>(".colormap-menu")!;

  const apply = () => stage.setTheme(withColormap(base, colormap));
  const render = () => {
    themeButton.querySelector("span")!.textContent = base.name === "dark" ? "Light" : "Dark";
    colormapButton.querySelector<HTMLElement>(".swatch")!.style.background = colormapCss(colormap);
    colormapButton.querySelector(".colormap-name")!.textContent = colormap.name;
    menu.innerHTML = colormaps[base.name]
      .map(
        (option) => `
        <button role="option" data-colormap="${escapeHtml(option.name)}" aria-selected="${option.name === colormap.name}">
          <span class="swatch" style="background: ${colormapCss(option)}"></span>${escapeHtml(option.name)}
        </button>`,
      )
      .join("");
  };
  const setMenuOpen = (open: boolean) => {
    menu.hidden = !open;
    colormapButton.setAttribute("aria-expanded", String(open));
  };

  const toggleTheme = () => {
    base = base.name === "dark" ? themes.light : themes.dark;
    colormap = initialColormap(base.name); // each theme remembers its own colourmap
    saveTheme(base);
    apply();
    render();
  };

  colormapButton.addEventListener("click", () => setMenuOpen(menu.hidden));
  menu.addEventListener("click", (event) => {
    const option = (event.target as HTMLElement).closest<HTMLElement>("[data-colormap]");
    const chosen = colormaps[base.name].find((candidate) => candidate.name === option?.dataset.colormap);
    if (!chosen) return;
    colormap = chosen;
    saveColormap(base.name, colormap);
    apply();
    render();
    setMenuOpen(false);
  });
  document.addEventListener("pointerdown", (event) => {
    if (!menu.hidden && !controls.contains(event.target as Node)) setMenuOpen(false);
  });

  backButton.addEventListener("click", () => stage.back());
  controls.querySelector('[data-action="fit"]')!.addEventListener("click", () => stage.fit());
  themeButton.addEventListener("click", toggleTheme);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      // Close the menu only; don't also leave the network or close the inspector.
      setMenuOpen(false);
      event.stopImmediatePropagation();
    }
    if (event.key === "f") stage.fit();
    if (event.key === "t") toggleTheme();
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
  const hint = document.createElement("p");
  hint.className = "hint";

  let stage: Stage | null = null;
  let backButton: HTMLButtonElement | null = null;
  const inspector = new Inspector(app, graph, () => stage?.clearSelection());
  stage = new Stage(
    viewer,
    inspector,
    tooltip,
    (view) => {
      renderTitleCard(titleCard, view, graph);
      hint.textContent = hintFor(view);
      if (backButton) backButton.hidden = view.parent === null;
    },
    theme,
  );
  app.append(titleCard, hint);
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
