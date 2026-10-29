/** The panel on the right that shows everything known about one layer. */
import { escapeHtml, titleFor } from "../render/network";
import type { Graph, GraphNode } from "../schema";
import { formatActivation, formatCount, formatShape } from "./format";

const TYPE_NAMES: Partial<Record<GraphNode["type"], string>> = {
  input: "Input",
  output: "Output",
  dense: "Dense layer",
  conv1d: "Convolution",
  conv2d: "Convolution",
  pool: "Pooling",
  norm: "Normalisation",
  activation: "Activation",
  dropout: "Dropout",
  flatten: "Flatten",
  reshape: "Reshape",
  custom: "Custom layer",
};

export class Inspector {
  private readonly element = document.createElement("aside");

  constructor(
    parent: HTMLElement,
    private readonly graph: Graph,
    private readonly onClose: () => void,
  ) {
    this.element.className = "inspector surface";
    this.element.hidden = true;
    this.element.setAttribute("aria-label", "Layer details");
    parent.append(this.element);
  }

  show(node: GraphNode): void {
    // A System block is named by its label, and its description is its subtitle rather than a setting.
    const block = isBlock(this.graph, node);
    const description = node.params["description"];
    const subtitle = block
      ? typeof description === "string" ? description : ""
      : [node.label, formatActivation(node.activation)].filter(Boolean).join(" · ");
    const units = node.output_shape.reduce((total, size) => total * size, 1);

    const shapes = rows([
      ["Input", node.input_shape.length > 0 ? formatShape(node.input_shape) : "—"],
      ["Output", node.output_shape.length > 0 ? formatShape(node.output_shape) : "—"],
    ]);
    const config = Object.entries(node.params)
      .filter(([key]) => !(block && key === "description"))
      .map(([key, value]): [string, string] => [humanise(key), Array.isArray(value) ? value.join(" × ") : String(value)]);

    this.element.innerHTML = `
      <header class="inspector-header">
        <div>
          <p class="eyebrow">${block ? "Block" : escapeHtml(TYPE_NAMES[node.type] ?? node.type)}</p>
          <h2>${escapeHtml(block ? node.label : titleFor(node))}</h2>
          ${subtitle ? `<p class="subtitle">${escapeHtml(subtitle)}</p>` : ""}
        </div>
        <button class="icon-button" data-close title="Close (Esc)" aria-label="Close">${CLOSE_ICON}</button>
      </header>
      <div class="stats">
        <div><span class="stat-value">${formatCount(node.param_count)}</span><span class="stat-label">Parameters</span></div>
        <div><span class="stat-value">${node.output_shape.length > 0 ? formatCount(units) : "—"}</span><span class="stat-label">Output units</span></div>
      </div>
      <section><h3>Shapes</h3>${shapes}</section>
      ${config.length > 0 ? `<section><h3>Configuration</h3>${rows(config)}</section>` : ""}
      ${node.notes ? `<section><h3>Notes</h3><div class="notes"></div></section>` : ""}
      ${this.weightNote(node)}`;
    this.element.querySelector("[data-close]")!.addEventListener("click", () => this.hide());
    this.element.hidden = false;
    if (node.notes) void this.renderNotes(node.notes);
  }

  /** Markdown and KaTeX load on first use; skip the result if another node was shown meanwhile. */
  private async renderNotes(source: string): Promise<void> {
    const target = this.element.querySelector<HTMLElement>(".notes");
    const { renderMarkdown } = await import("./notes");
    if (target?.isConnected) target.innerHTML = renderMarkdown(source);
  }

  get isOpen(): boolean {
    return !this.element.hidden;
  }

  hide(): void {
    if (this.element.hidden) return;
    this.element.hidden = true;
    this.onClose();
  }

  private weightNote(node: GraphNode): string {
    const sample = this.graph.weights?.[node.id];
    const inFeatures = node.params["in_features"];
    const outFeatures = node.params["out_features"];
    if (!sample || typeof inFeatures !== "number" || typeof outFeatures !== "number") return "";
    const strategy = sample.mode === "topk" ? "strongest" : "randomly sampled";
    return `<p class="note">Edges show the ${formatCount(sample.k)} ${strategy} of ${formatCount(inFeatures * outFeatures)} connections.</p>`;
  }
}

/** A plain block in a System: a custom node outside every network. */
function isBlock(graph: Graph, node: GraphNode): boolean {
  return node.type === "custom" && node.group === null && graph.groups.length > 0;
}

function rows(entries: [string, string][]): string {
  const items = entries.map(([key, value]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd>`).join("");
  return `<dl>${items}</dl>`;
}

/** "in_features" -> "In features". */
function humanise(key: string): string {
  const words = key.replace(/_/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const CLOSE_ICON =
  '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
