/**
 * The Training panel (live training), above the run strip, open unless closed
 * (remembered per model). From the top:
 *
 * - a summary of the run: is it improving, converged or overfitting, the gap
 *   between training and validation, the best validation point (insights.ts);
 * - predictions vs truth from `Session.predictions()`: a scatter with R² and
 *   mean error, or a confusion matrix for classes;
 * - one chart per metric or group: charts come from `watch(charts=...)`, then
 *   every other metric gets one, together with its own splits ("loss" with
 *   "loss/val", "loss/critic" with "loss/critic/val"; see `chartGroup`). Charts can be log-scaled, reordered, hidden,
 *   combined and pinned to the strip, with one smoothing for all, saved per
 *   model (localStorage); "Reset layout" goes back to the defaults. Hovering
 *   reads off the values;
 * - how the parameters learn, for the whole model (per network in a System):
 *   their size, their gradient's size, how far they move per step, and how
 *   their values are spread over time.
 */
import { escapeHtml } from "../render/network";
import type { LiveLayout, LivePredictions, LiveStats, MetricPoint, ParamStats } from "../schema";
import { DASHES, chartScales, confusionChart, distributionChart, lineChart, nearest, scatterChart, smooth, type ChartLine } from "./charts";
import { best, convergence, fit, gap } from "./insights";
import { formatMetric, metricNames, series } from "./series";

export interface ChartSpec {
  metrics: string[];
  log: boolean;
}

interface SavedLayout {
  charts?: ChartSpec[];
  hidden?: string[];
  pinned?: string[];
  smoothing?: number;
  open?: boolean;
}

/** What the panel shows: the run so far, or up to the step picked on the timeline. */
export interface TrainingData {
  points: MetricPoint[];
  stats: LiveStats[];
  predictions: LivePredictions | null;
  /** The run strip's headline metric: the one the summary judges. */
  headline: string | null;
}

/** Parameter charts: title, the stat, log scale, and what it means. */
const PARAMETER_CHARTS: [string, keyof ParamStats, boolean, string][] = [
  ["Weight norm", "weight_norm", false, "How large the weights are overall: √(sum of every parameter squared). The number of parameters is fixed; their values grow or shrink. Slow growth is normal; a jump, or growing without end, is not."],
  ["Gradient norm", "grad_norm", true, "The same measure for the gradient of the last backward(). Shrinking towards zero: little left to learn, or vanishing gradients."],
  ["Update per step", "update_ratio", true, "How far the parameters move per step, relative to their size. Around 1e-3 is typical; far above, the learning rate may be too high."],
];

/** Pinned readouts beside the headline, at most. */
export const MAX_PINNED = 4;
const CHART_WIDTH = 400;
const CHART_HEIGHT = 150;
const DEFAULT_SMOOTHING = 0.6;

const chartKey = (chart: ChartSpec) => chart.metrics.join(" + ");

/**
 * The charts to draw: the saved ones (or else those from code), keeping only
 * metrics that exist, then a chart for every metric not on one yet, grouped by
 * `chartGroup`, in the order metrics first appeared.
 */
export function deriveCharts(names: string[], fromCode: string[][], saved: ChartSpec[] | undefined): ChartSpec[] {
  const known = new Set(names);
  const charts = (saved ?? fromCode.map((metrics) => ({ metrics, log: false })))
    .map((chart) => ({ ...chart, metrics: chart.metrics.filter((m) => known.has(m)) }))
    .filter((chart) => chart.metrics.length > 0);
  const placed = new Set(charts.flatMap((chart) => chart.metrics));
  const groups = new Map<string, string[]>();
  for (const name of names) {
    if (placed.has(name)) continue;
    groups.set(chartGroup(name), [...(groups.get(chartGroup(name)) ?? []), name]);
  }
  return [...charts, ...[...groups.values()].map((metrics) => ({ metrics, log: false }))];
}

/**
 * Which chart a metric goes on by default: its name without a split at the
 * end, so a metric shares a chart with its own validation (or test) line,
 * but different networks' losses ("loss/actor", "loss/critic") don't, as
 * their scales can be far apart.
 */
export function chartGroup(name: string): string {
  return name.replace(/\/(train|training|val|valid|validation|test)$/, "");
}

export class Drawer {
  readonly element = document.createElement("section");
  isOpen: boolean;
  private layout: SavedLayout;
  private data: TrainingData = { points: [], stats: [], predictions: null, headline: null };
  private charts: ChartSpec[] = [];

  private get points(): MetricPoint[] {
    return this.data.points;
  }

  constructor(
    parent: HTMLElement,
    private readonly storageKey: string,
    private readonly defaults: () => LiveLayout,
    private readonly onChange: () => void,
  ) {
    this.layout = load(storageKey);
    this.isOpen = this.layout.open ?? true;
    this.element.className = "metrics-drawer surface";
    this.element.setAttribute("aria-label", "Training");
    this.element.hidden = !this.isOpen;
    parent.append(this.element);
    this.element.addEventListener("click", (event) => this.click(event));
    this.element.addEventListener("change", (event) => this.change(event));
    this.element.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      if (target.dataset.action !== "smoothing") return;
      this.layout.smoothing = Number(target.value);
      this.save();
    });
    this.element.addEventListener("pointermove", (event) => this.hover(event));
    this.element.addEventListener("pointerleave", () => this.element.querySelectorAll<SVGLineElement>(".chart-cursor").forEach((c) => c.setAttribute("visibility", "hidden")));
  }

  /** The metrics pinned beside the headline: saved, else from code, that exist (at most MAX_PINNED). */
  pinned(names: string[]): string[] {
    return (this.layout.pinned ?? this.defaults().pinned).filter((name) => names.includes(name)).slice(0, MAX_PINNED);
  }

  toggle(open = !this.isOpen): void {
    this.isOpen = open;
    this.element.hidden = !open;
    this.layout.open = open;
    this.store();
    if (open) this.render(this.data);
  }

  /** Redraw with this data (only while open; cheap to call on every batch). */
  render(data: TrainingData): void {
    this.data = data;
    if (!this.isOpen) return;
    const points = data.points;
    const names = metricNames(points);
    const hidden = new Set(this.layout.hidden ?? []);
    this.charts = deriveCharts(names, this.defaults().charts, this.layout.charts);
    const pinned = new Set(this.pinned(names));
    const smoothing = this.layout.smoothing ?? DEFAULT_SMOOTHING;
    const cards = this.charts
      .map((chart, index) => ({ chart, index }))
      .filter(({ chart }) => !hidden.has(chartKey(chart)))
      .map(({ chart, index }) => {
        const lines = chart.metrics.map((name) => ({ name, points: series(points, name) }));
        const others = names.filter((name) => !chart.metrics.includes(name));
        const legend = chart.metrics
          .map((name, i) => {
            const last = lines[i].points[lines[i].points.length - 1];
            return `<span class="legend-item">
              <svg width="18" height="6" aria-hidden="true"><line x1="0" x2="18" y1="3" y2="3"${DASHES[i % DASHES.length] ? ` stroke-dasharray="${DASHES[i % DASHES.length]}"` : ""}/></svg>
              ${escapeHtml(name)} <strong>${last ? formatMetric(last[1]) : "–"}</strong>
              <button data-action="pin" data-metric="${escapeHtml(name)}" aria-pressed="${pinned.has(name)}" title="${pinned.has(name) ? "Unpin from" : "Pin to"} the run strip">${pinned.has(name) ? "◆" : "◇"}</button>
            </span>`;
          })
          .join("");
        return `<article class="chart-card" data-chart="${index}">
          <header>
            <h4>${escapeHtml(chartKey(chart))}</h4>
            <div class="chart-tools">
              <button data-action="log" aria-pressed="${chart.log}" title="Log scale">log</button>
              <button data-action="up" title="Move earlier" ${index === 0 ? "disabled" : ""}>↑</button>
              <button data-action="down" title="Move later" ${index === this.charts.length - 1 ? "disabled" : ""}>↓</button>
              <button data-action="hide" title="Hide this chart">×</button>
            </div>
          </header>
          ${lineChart(lines, { width: CHART_WIDTH, height: CHART_HEIGHT, log: chart.log, smoothing })}
          <footer>
            <div class="chart-legend">${legend}</div>
            <p class="chart-readout" aria-live="polite"></p>
            ${others.length ? `<select data-action="add" aria-label="Add a metric to this chart"><option value="">+ add metric</option>${others.map((name) => `<option>${escapeHtml(name)}</option>`).join("")}</select>` : ""}
          </footer>
        </article>`;
      })
      .join("");
    const hiddenCharts = this.charts.filter((chart) => hidden.has(chartKey(chart)));
    const predictions = data.predictions ? predictionsCard(data.predictions) : "";
    const parameters = parameterCards(data.stats);
    this.element.innerHTML = `
      <header class="drawer-header">
        <h3>Training</h3>
        <label class="drawer-smoothing">Smoothing <input type="range" data-action="smoothing" min="0" max="0.98" step="0.02" value="${smoothing}"><output>${smoothing.toFixed(2)}</output></label>
        <button class="outlined" data-action="reset">Reset layout</button>
        <button class="icon-button" data-action="close" title="Close" aria-label="Close">×</button>
      </header>
      ${summary(data)}
      ${predictions}
      ${cards || `<p class="note">No metrics yet: they appear as soon as log() records one.</p>`}
      ${hiddenCharts.length ? `<p class="drawer-hidden">Hidden: ${hiddenCharts.map((chart) => `<button data-action="show" data-key="${escapeHtml(chartKey(chart))}">${escapeHtml(chartKey(chart))}</button>`).join("")}</p>` : ""}
      ${parameters ? `<h3 class="drawer-section">Parameters</h3>${parameters}` : ""}`;
  }

  private click(event: Event): void {
    const button = (event.target as HTMLElement).closest<HTMLElement>("button");
    if (!button) return;
    const index = Number(button.closest<HTMLElement>("[data-chart]")?.dataset.chart);
    const charts = this.charts.map((chart) => ({ ...chart, metrics: [...chart.metrics] }));
    switch (button.dataset.action) {
      case "close":
        return this.toggle(false);
      case "reset":
        this.layout = { open: this.isOpen };
        break;
      case "log":
        charts[index].log = !charts[index].log;
        this.layout.charts = charts;
        break;
      case "up":
      case "down": {
        const other = index + (button.dataset.action === "up" ? -1 : 1);
        [charts[index], charts[other]] = [charts[other], charts[index]];
        this.layout.charts = charts;
        break;
      }
      case "hide":
        this.layout.hidden = [...(this.layout.hidden ?? []), chartKey(charts[index])];
        break;
      case "show":
        this.layout.hidden = (this.layout.hidden ?? []).filter((key) => key !== button.dataset.key);
        break;
      case "pin": {
        const names = metricNames(this.points);
        const pinned = this.pinned(names);
        const metric = button.dataset.metric!;
        this.layout.pinned = pinned.includes(metric) ? pinned.filter((m) => m !== metric) : [...pinned, metric].slice(-MAX_PINNED);
        break;
      }
      default:
        return;
    }
    this.save();
  }

  private change(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select.dataset.action !== "add" || !select.value) return;
    const index = Number(select.closest<HTMLElement>("[data-chart]")?.dataset.chart);
    // The metric moves onto this chart (off any chart it had alone).
    const charts = this.charts
      .map((chart) => ({ ...chart, metrics: chart.metrics.filter((m) => m !== select.value) }))
      .map((chart, i) => (i === index ? { ...chart, metrics: [...chart.metrics, select.value] } : chart))
      .filter((chart) => chart.metrics.length > 0);
    this.layout.charts = charts;
    this.save();
  }

  /** The cursor line and values at the pointer, without redrawing the chart. */
  private hover(event: PointerEvent): void {
    const svg = (event.target as Element).closest?.("svg.chart");
    const card = svg?.closest<HTMLElement>("[data-chart]");
    if (!svg || !card) return;
    const chart = this.charts[Number(card.dataset.chart)];
    const lines = chart.metrics.map((name) => ({ name, points: series(this.points, name) })).filter((line) => line.points.length > 0);
    if (lines.length === 0) return;
    const scales = chartScales(lines, { width: CHART_WIDTH, height: CHART_HEIGHT, log: chart.log, smoothing: 0 });
    const px = ((event.clientX - svg.getBoundingClientRect().left) / svg.getBoundingClientRect().width) * CHART_WIDTH;
    const step = scales.stepAt(px);
    const smoothing = this.layout.smoothing ?? DEFAULT_SMOOTHING;
    const read = lines.map((line) => {
      const smoothed = smooth(line.points.map(([, v]) => v), smoothing).map((v, k): [number, number] => [line.points[k][0], v]);
      return [line.name, nearest(smoothed, step)] as const;
    });
    const at = read[0][1]?.[0] ?? step;
    const cursor = svg.querySelector(".chart-cursor")!;
    cursor.setAttribute("x1", String(scales.x(at)));
    cursor.setAttribute("x2", String(scales.x(at)));
    cursor.setAttribute("visibility", "visible");
    card.querySelector(".chart-readout")!.textContent = `step ${Math.round(at).toLocaleString("en-GB")} · ${read.map(([name, point]) => `${name} ${point ? formatMetric(point[1]) : "–"}`).join(" · ")}`;
  }

  private store(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.layout));
    } catch {
      // Not being able to remember the layout is fine.
    }
  }

  private save(): void {
    this.store();
    this.render(this.data);
    this.onChange();
  }
}

/** The run in a few words: the verdict on the headline metric, the train/validation gap, the best validation point. */
function summary({ points, headline }: TrainingData): string {
  if (!headline) return "";
  const name = headline.replace(/\/val$/, "");
  const train = series(points, name);
  const val = series(points, `${name}/val`);
  const { word, detail, level } = convergence(name, train, val);
  const split = gap(train, val);
  const top = best(val, name);
  const facts = [
    split !== null ? `<div><dt>Validation − training</dt><dd>${formatMetric(split)}</dd></div>` : "",
    top ? `<div><dt>Best validation</dt><dd>${formatMetric(top[1])} <small>step ${top[0].toLocaleString("en-GB")}</small></dd></div>` : "",
    train.length ? `<div><dt>Latest ${escapeHtml(name)}</dt><dd>${formatMetric(train[train.length - 1][1])}</dd></div>` : "",
  ].join("");
  return `<section class="drawer-summary" data-level="${level}">
    <div class="summary-verdict"><span>${escapeHtml(name)}</span><strong>${word}</strong><p>${escapeHtml(detail)}</p></div>
    ${facts ? `<dl>${facts}</dl>` : ""}
    ${val.length === 0 ? `<p class="note">Log a validation metric to see the gap and overfitting: <code>live.log(step, split="val", ${escapeHtml(name)}=...)</code>.</p>` : ""}
  </section>`;
}

function predictionsCard(predictions: LivePredictions): string {
  const step = `step ${predictions.step.toLocaleString("en-GB")}`;
  if (predictions.kind === "classification") {
    const total = predictions.matrix.flat().reduce((a, b) => a + b, 0);
    const right = predictions.matrix.reduce((sum, row, i) => sum + (row[i] ?? 0), 0);
    return `<article class="chart-card">
      <header><h4>Confusion matrix</h4></header>
      ${confusionChart(predictions.matrix, CHART_WIDTH, CHART_HEIGHT + 60)}
      <footer><p class="chart-readout">accuracy <strong>${total ? `${((100 * right) / total).toFixed(1)}%` : "–"}</strong> · ${total.toLocaleString("en-GB")} examples · ${step}</p>
      <p class="note">Rows are the true class, columns the predicted one; the diagonal is right.</p></footer>
    </article>`;
  }
  const { r2, mae } = fit(predictions.predicted, predictions.target);
  return `<article class="chart-card">
    <header><h4>Predicted (up) vs true (across)</h4></header>
    ${scatterChart(predictions.predicted, predictions.target, CHART_WIDTH, CHART_HEIGHT + 60)}
    <footer><p class="chart-readout">R² <strong>${Number.isFinite(r2) ? r2.toFixed(3) : "–"}</strong> · mean error <strong>${formatMetric(mae)}</strong> · ${predictions.target.length.toLocaleString("en-GB")} values · ${step}</p>
    <p class="note">On the diagonal, the prediction is exactly right. R² is 1 for a perfect model and 0 for one that always predicts the mean.</p></footer>
  </article>`;
}

/** How the parameters learn: a chart per stat with a line per network, and each network's value spread over time. */
function parameterCards(stats: LiveStats[]): string {
  if (stats.length < 2) return "";
  const networks = [...new Set(stats.flatMap((reading) => Object.keys(reading.networks)))];
  const legend = networks.length > 1;
  const lines = (key: keyof ParamStats): ChartLine[] =>
    networks.map((network) => ({
      name: network,
      points: stats.flatMap((reading): [number, number][] => {
        const value = reading.networks[network]?.[key];
        return typeof value === "number" ? [[reading.step, value]] : [];
      }),
    }));
  const card = (title: string, chart: string, note: string, names: string[] = []) => `<article class="chart-card">
    <header><h4>${escapeHtml(title)}</h4></header>
    ${chart}
    <footer>${names.length ? `<div class="chart-legend">${names.map((name, i) => `<span class="legend-item"><svg width="18" height="6" aria-hidden="true"><line x1="0" x2="18" y1="3" y2="3"${DASHES[i % DASHES.length] ? ` stroke-dasharray="${DASHES[i % DASHES.length]}"` : ""}/></svg>${escapeHtml(name)}</span>`).join("")}</div>` : ""}
    <p class="note">${note}</p></footer>
  </article>`;
  const trends = PARAMETER_CHARTS.filter(([, key]) => lines(key).some((line) => line.points.length > 1)).map(([title, key, log, note]) =>
    card(title, lineChart(lines(key), { width: CHART_WIDTH, height: CHART_HEIGHT, log, smoothing: 0 }), note, legend ? networks : []),
  );
  const spreads = networks.map((network) =>
    card(
      legend ? `Parameter values · ${network}` : "Parameter values",
      distributionChart(stats.flatMap((reading): [number, number[]][] => (reading.networks[network] ? [[reading.step, reading.networks[network].percentiles]] : [])), CHART_WIDTH, CHART_HEIGHT),
      "How the values are spread over time: the bands hold the middle 38%, 68%, 87% and all of a fixed sample of them; the line is the median.",
    ),
  );
  return [...trends, ...spreads].join("");
}

function load(key: string): SavedLayout {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}") as SavedLayout;
  } catch {
    return {};
  }
}
