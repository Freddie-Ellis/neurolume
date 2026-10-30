/**
 * Live training (neurolume.watch): connects to /ws and draws the run strip,
 * bottom centre: status, step, the headline metric large with its trend and a
 * sparkline, up to four pinned metrics, the Edges toggle and the Charts button
 * (the metrics drawer, drawer.ts). Click the headline's name to show another
 * metric; choices are remembered per model. Imported only for live graphs
 * (main.ts), so the architecture viewer never loads this. Redraws are batched
 * (RENDER_MS).
 *
 * Weights messages (PyTorch dense layers) rebrighten the edges already drawn,
 * in place, with more contrast than the static view (LIVE_LOOK): by |weight|
 * spread over the drawn edges' starting range, by change since the start, or by
 * gradient. Stats (whole-model parameter stats), metrics and predictions feed
 * the Training panel (drawer.ts). Weights messages that carry feature maps
 * (every few seconds, CNNs given real data) repaint the slabs.
 *
 * The timeline under the strip scrubs back through the readings (weights and
 * stats kept by the server): the edges and feature maps show that
 * step, its weights fetched from /api/run/weights. A saved run (an exported
 * page, `SavedRun` without the graph) is shown the same way, with no server.
 */
import type { StrengthLook } from "../layout/columns";
import { escapeHtml } from "../render/network";
import type { FeatureMaps, Graph, LiveHello, LiveLayout, LiveMetrics, LivePredictions, LiveStats, LiveStatus, LiveWeights, MetricPoint, SavedRun } from "../schema";
import { Drawer } from "./drawer";
import { formatMetric, metricNames, series, sparklinePath, trend } from "./series";

type Message = LiveHello | LiveMetrics | LiveWeights | LiveStats | LivePredictions | LiveStatus;
type EdgeMode = "weight" | "change" | "gradient";

/** At most this often (ms) the strip redraws, however fast points arrive. */
const RENDER_MS = 250;
/** Wait before reconnecting after the socket drops (training script restarted, laptop slept). */
const RECONNECT_MS = 1000;
const SPARK_WIDTH = 220;
const SPARK_HEIGHT = 32;
const PIN_SPARK_WIDTH = 64;
/** Readings kept, like the server's READINGS_KEPT. */
const READINGS_KEPT = 200;
/**
 * Live edges have far more contrast than the static view, or thousands of
 * faint lines average into the same haze at every step: a steep gamma leaves
 * most lines nearly dark and the boost makes the strong ones brighter than
 * static lines can be, so which paths are lit, and how many, visibly changes.
 * Chosen by comparing step 0 with the end of examples/live_training.py.
 */
const LIVE_LOOK = { floor: 0.01, gamma: 6, boost: 3 };

const EDGE_MODES: [EdgeMode, string, string][] = [
  ["weight", "Weight", "Brightness is each connection's |weight|, from dim (the weakest drawn weight at the start) to bright (the strongest)"],
  ["change", "Change", "Brightness is how far each connection's weight has moved since the start"],
  ["gradient", "Gradient", "Brightness is each connection's gradient: where learning is happening now"],
];

export interface LiveHost {
  /** Called once the strip exists, so the view can be fitted clear of it. */
  onStripShown: (strip: HTMLElement) => void;
  /** Show these values on the dense edges, per layer (`values[i]` for its `Graph.weights` pair i). */
  setWeights: (values: Record<string, ArrayLike<number>>, looks: Record<string, StrengthLook>) => void;
  /** Repaint feature-map slabs with these maps (the graph's own channels). */
  setMaps: (maps: Record<string, FeatureMaps>) => void;
}

/** A saved run as an exported page carries it (`window.__NEUROLUME_RUN__`). */
export type EmbeddedRun = Omit<SavedRun, "graph">;

interface Decoded {
  weights: Record<string, Float32Array>;
  gradients: Record<string, Float32Array>;
  maps: Record<string, FeatureMaps>;
}

export function startLive(app: HTMLElement, graph: Graph, host: LiveHost, saved?: EmbeddedRun): void {
  const model = graph.model.name;
  const headlineKey = `neurolume-headline:${model}`;
  const edgesKey = `neurolume-edges:${model}`;
  let points: MetricPoint[] = [];
  let stats: LiveStats[] = [];
  let predictions: LivePredictions | null = null;
  let state: LiveStatus["state"] | "offline" | "connecting" = "connecting";
  let suggested: string | null = null; // watch(headline=...)
  let layout: LiveLayout = { pinned: [], charts: [] }; // watch(pinned=..., charts=...)
  let chosen = readChoice(headlineKey);
  let menuOpen = false;
  let edgeMode: EdgeMode = (EDGE_MODES.find(([mode]) => mode === readChoice(edgesKey))?.[0] ?? "weight") as EdgeMode;

  // The weights the graph was made with: the baseline for "Change".
  const initial = Object.fromEntries(Object.entries(graph.weights ?? {}).map(([id, sample]) => [id, Float32Array.from(sample.pairs, (pair) => pair[2])]));
  const hasEdges = Object.keys(initial).length > 0;
  let latest: Decoded = { weights: {}, gradients: {}, maps: {} };
  // The timeline: the step being looked at (null = the latest) and its weights once loaded.
  let viewStep: number | null = null;
  let viewed: Decoded | null = null;
  const showWeights = () => {
    const { weights, gradients } = viewStep !== null && viewed ? viewed : latest;
    const shown =
      edgeMode === "weight"
        ? weights
        : edgeMode === "gradient"
          ? gradients
          : Object.fromEntries(Object.entries(weights).map(([id, values]) => [id, values.map((v, i) => v - (initial[id]?.[i] ?? 0))]));
    const looks = Object.fromEntries(Object.keys(shown).map((id) => [id, { ...LIVE_LOOK, fromStart: edgeMode === "weight" }]));
    host.setWeights(shown, looks);
    // Maps arrive less often than weights: the newest so far, or as of the step on view (the graph's own before any).
    host.setMaps({ ...graph.feature_maps, ...(viewStep !== null && viewed ? viewed : latest).maps });
  };

  const strip = document.createElement("section");
  strip.className = "run-strip";
  strip.setAttribute("aria-label", "Training run");
  const row = document.createElement("div"); // redrawn on every update
  row.className = "run-row";
  // The timeline stays put (redrawing it would drop a drag in progress); render() only updates it.
  const timeline = document.createElement("div");
  timeline.className = "run-timeline";
  timeline.hidden = true;
  timeline.innerHTML = `<span class="run-timeline-label">Timeline</span>
    <input type="range" min="0" max="0" step="1" value="0" aria-label="Step to show">
    <span class="run-timeline-step"></span>
    <button data-action="latest">Latest</button>`;
  const scrubber = timeline.querySelector("input")!;
  strip.append(row, timeline);
  app.append(strip);
  const drawer = new Drawer(app, `neurolume-layout:${model}`, () => layout, () => render());
  host.onStripShown(strip);

  const headline = (): string | null => {
    const names = metricNames(points);
    for (const name of [chosen, suggested, "loss"]) if (name && names.includes(name)) return name;
    return names[0] ?? null;
  };

  let pending = false;
  const render = () => {
    pending = false;
    const names = metricNames(points);
    const name = headline();
    const values = name ? series(points, name).map(([, value]) => value) : [];
    // Scrubbed back, the headline reads as of that step; the sparkline stays the whole run.
    const upTo = name && viewStep !== null ? series(points, name).filter(([step]) => step <= viewStep!) : null;
    const last = upTo ? upTo[upTo.length - 1]?.[1] : values[values.length - 1];
    const change = upTo ? trend(upTo.map(([, value]) => value)) : trend(values);
    const step = viewStep ?? points[points.length - 1]?.step;
    const status =
      viewStep !== null ? "History" : { running: "Live", finished: saved ? "Saved run" : "Finished", offline: "Offline · reconnecting", connecting: "Connecting" }[state];
    const pinned = drawer
      .pinned(names)
      .filter((metric) => metric !== name)
      .map((metric) => {
        const pinValues = series(points, metric).map(([, v]) => v);
        const value = pinValues[pinValues.length - 1];
        return `<div class="run-pin"><span>${escapeHtml(metric)}</span><strong>${value === undefined ? "–" : formatMetric(value)}</strong>
          <svg width="${PIN_SPARK_WIDTH}" height="14" viewBox="0 0 ${PIN_SPARK_WIDTH} 14" aria-hidden="true"><path d="${sparklinePath(pinValues, PIN_SPARK_WIDTH, 14)}"/></svg></div>`;
      })
      .join("");
    strip.dataset.state = viewStep !== null ? "history" : state;
    renderTimeline();
    row.innerHTML = `
      <div class="run-status">
        <span class="run-state">${status}</span>
        <span class="run-step">${step === undefined ? "no steps yet" : `step <strong>${step.toLocaleString("en-GB")}</strong>`}</span>
      </div>
      <div class="run-headline">
        <button class="run-metric" aria-haspopup="listbox" aria-expanded="${menuOpen}" ${name ? "" : "disabled"}>${escapeHtml(name ?? "waiting for log()")}</button>
        <span class="run-value">${last === undefined ? "–" : formatMetric(last)}</span>
        <span class="run-trend">${change === null ? "" : `${change < 0 ? "▼" : "▲"} ${percent(change)}`}</span>
      </div>
      <svg class="run-spark" width="${SPARK_WIDTH}" height="${SPARK_HEIGHT}" viewBox="0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}" aria-hidden="true">
        <path d="${sparklinePath(values, SPARK_WIDTH, SPARK_HEIGHT)}"/>
      </svg>
      ${pinned ? `<div class="run-pins">${pinned}</div>` : ""}
      ${
        hasEdges
          ? `<div class="run-edges" role="radiogroup" aria-label="Edges show">
        <span>Edges</span>
        <div class="segmented">${EDGE_MODES.map(([mode, text, title]) => `<button role="radio" data-edges="${mode}" aria-checked="${edgeMode === mode}" title="${title}">${text}</button>`).join("")}</div>
      </div>`
          : ""
      }
      <button class="run-charts" data-action="charts" aria-expanded="${drawer.isOpen}">Training</button>
      ${
        menuOpen
          ? `<div class="run-menu surface" role="listbox" aria-label="Headline metric">${names
              .map((option) => `<button role="option" data-metric="${escapeHtml(option)}" aria-selected="${option === name}">${escapeHtml(option)}</button>`)
              .join("")}</div>`
          : ""
      }`;
    drawer.render({ points, stats, predictions, headline: name });
    app.style.setProperty("--run-strip-height", `${strip.offsetHeight}px`); // the drawer sits above it
  };
  const renderTimeline = () => {
    timeline.hidden = stats.length < 2;
    const steps = stats.map((reading) => reading.step);
    const index = viewStep === null ? steps.length - 1 : Math.max(0, steps.filter((step) => step <= viewStep!).length - 1);
    scrubber.max = String(steps.length - 1);
    scrubber.value = String(index);
    const last = steps[steps.length - 1] ?? 0;
    timeline.querySelector(".run-timeline-step")!.textContent = `${(steps[index] ?? 0).toLocaleString("en-GB")} / ${last.toLocaleString("en-GB")}`;
    timeline.querySelector<HTMLButtonElement>("[data-action=latest]")!.disabled = viewStep === null;
  };
  const scheduleRender = () => {
    if (pending) return;
    pending = true;
    window.setTimeout(render, RENDER_MS);
  };

  // Timeline: weights for the step come from the saved run, or from the server one at a time (the newest wanted step wins).
  const snapshotAt = async (step: number): Promise<LiveWeights | null> => {
    if (saved) {
      // As the server does: the snapshot at or before the step, with the latest maps by then.
      const before = saved.snapshots.filter((snapshot) => snapshot.step <= step);
      const maps = before.filter((snapshot) => Object.keys(snapshot.maps).length > 0).pop()?.maps ?? {};
      return before.length > 0 ? { ...before[before.length - 1], maps } : null;
    }
    try {
      const response = await fetch(`/api/run/weights?step=${step}`);
      return response.ok ? ((await response.json()) as LiveWeights) : null;
    } catch {
      return null;
    }
  };
  let loading = false;
  let queued: number | null = null;
  const loadSnapshot = (step: number) => {
    if (loading) {
      queued = step;
      return;
    }
    loading = true;
    void snapshotAt(step).then((snapshot) => {
      loading = false;
      if (viewStep !== null && snapshot) {
        viewed = decode(snapshot);
        showWeights();
      }
      if (queued !== null) {
        const next = queued;
        queued = null;
        loadSnapshot(next);
      }
    });
  };
  const view = (step: number | null) => {
    viewStep = step;
    if (step === null) {
      viewed = null;
      showWeights();
    } else loadSnapshot(step);
    render();
  };
  scrubber.addEventListener("input", () => {
    const index = Number(scrubber.value);
    view(index >= stats.length - 1 ? null : stats[index].step); // the far end is the latest, and follows the run
  });

  strip.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("button");
    if (!target) return;
    if (target.dataset.action === "latest") return view(null);
    if (target.classList.contains("run-metric")) menuOpen = !menuOpen;
    if (target.dataset.action === "charts") drawer.toggle();
    const mode = EDGE_MODES.find(([m]) => m === target.dataset.edges)?.[0];
    if (mode) {
      edgeMode = mode;
      saveChoice(edgesKey, edgeMode);
      showWeights();
    }
    if (target.dataset.metric) {
      chosen = target.dataset.metric;
      menuOpen = false;
      saveChoice(headlineKey, chosen);
    }
    render();
  });
  document.addEventListener("pointerdown", (event) => {
    if (menuOpen && !strip.contains(event.target as Node)) {
      menuOpen = false;
      render();
    }
  });

  const receiveWeights = (message: LiveWeights) => {
    latest = { ...decode(message), maps: { ...latest.maps, ...message.maps } };
    if (viewStep === null) showWeights();
  };
  const receiveStats = (reading: LiveStats) => {
    stats.push(reading);
    if (stats.length > READINGS_KEPT) stats = stats.filter((_, i) => (stats.length - 1 - i) % 2 === 0); // every other, from the newest
  };
  const receiveHello = (message: LiveHello) => {
    // The whole history, also after a reconnect.
    points = message.points;
    stats = message.stats;
    state = message.state;
    suggested = message.headline;
    layout = message.layout;
    predictions = message.predictions;
    if (message.weights) receiveWeights(message.weights);
  };

  const connect = () => {
    const socket = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/ws`);
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data as string) as Message;
      if (message.type === "hello") receiveHello(message);
      else if (message.type === "metrics") points = points.concat(message.points);
      else if (message.type === "weights") receiveWeights(message);
      else if (message.type === "stats") receiveStats(message);
      else if (message.type === "predictions") predictions = message;
      else state = message.state;
      scheduleRender();
    });
    socket.addEventListener("close", () => {
      if (state === "finished") return; // the run is over; the server may now go away
      state = "offline";
      scheduleRender();
      window.setTimeout(connect, RECONNECT_MS);
    });
  };
  if (saved) {
    receiveHello({ ...saved.hello, state: "finished" }); // nothing is training it any more
    render();
  } else {
    render();
    connect();
  }
}

function decode(message: LiveWeights): Decoded {
  const floats = (layers: Record<string, string>) => Object.fromEntries(Object.entries(layers).map(([id, data]) => [id, decodeFloats(data)]));
  return { weights: floats(message.layers), gradients: floats(message.gradients), maps: message.maps };
}

/** Base64 little-endian float32 (how LiveWeights sends values) to numbers. */
function decodeFloats(data: string): Float32Array {
  const bytes = Uint8Array.from(atob(data), (char) => char.charCodeAt(0));
  return new Float32Array(bytes.buffer);
}

/** A trend as a short percentage: one decimal under 10%, whole numbers above. */
function percent(change: number): string {
  const size = Math.abs(change) * 100;
  return `${size < 10 ? size.toFixed(1) : Math.round(size)}%`;
}

function readChoice(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // storage can be unavailable (private windows)
  }
}

function saveChoice(key: string, name: string): void {
  try {
    localStorage.setItem(key, name);
  } catch {
    // Not being able to remember the choice is fine.
  }
}
