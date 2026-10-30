/**
 * Line charts for the metrics drawer, as SVG strings: hairline axes, mono
 * ticks, the raw series faint and the smoothed one solid. Lines on one chart
 * differ by dash pattern rather than colour (the edges keep the colour).
 * Pure, so the maths is tested; the drawer adds hover and controls.
 */
import { formatMetric } from "./series";

export interface ChartLine {
  name: string;
  points: [number, number][];
}

export interface ChartOptions {
  width: number;
  height: number;
  log: boolean;
  smoothing: number;
}

/** Dash patterns for the lines of one chart, in order. */
export const DASHES = ["", "5 3", "1.5 2.5", "8 3 1.5 3"];
const PAD = { left: 44, right: 8, top: 8, bottom: 18 };

/**
 * Exponential moving average with the start corrected (as in Adam), so the
 * first points aren't pulled towards zero. `amount` 0 returns the values.
 */
export function smooth(values: number[], amount: number): number[] {
  if (amount <= 0) return values;
  let average = 0;
  return values.map((value, i) => {
    average = amount * average + (1 - amount) * value;
    return average / (1 - amount ** (i + 1));
  });
}

/** About `count` round tick values covering [low, high] (1, 2 or 5 times a power of ten apart). */
export function ticks(low: number, high: number, count = 3): number[] {
  if (!(high > low)) return [low];
  const raw = (high - low) / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  // The round step nearest the raw one by ratio, so the count stays close to `count` either way.
  const off = (s: number) => Math.abs(Math.log(s / raw));
  const step = [1, 2, 5, 10].map((m) => m * power).reduce((best, s) => (off(s) < off(best) ? s : best));
  const out: number[] = [];
  for (let v = Math.ceil(low / step) * step; v <= high + step * 1e-9; v += step) out.push(Number(v.toPrecision(12)));
  return out;
}

/** The plotted x and y ranges, and where a step and a value land in the plot area. */
export function chartScales(lines: ChartLine[], { width, height, log }: ChartOptions) {
  const valid = (v: number) => Number.isFinite(v) && (!log || v > 0);
  const steps = lines.flatMap((line) => line.points.map(([step]) => step));
  const values = lines.flatMap((line) => line.points.map(([, v]) => v).filter(valid)).map((v) => (log ? Math.log10(v) : v));
  const [x0, x1] = [Math.min(...steps), Math.max(...steps)];
  let [y0, y1] = [Math.min(...values), Math.max(...values)];
  if (y0 === y1) {
    const pad = Math.abs(y0) * 0.1 || 1; // a flat line sits mid-chart on its own scale (lr 0.01: 0.009 to 0.011)
    [y0, y1] = [y0 - pad, y1 + pad];
  }
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  return {
    x0,
    x1,
    y0,
    y1,
    valid,
    x: (step: number) => PAD.left + (x1 > x0 ? ((step - x0) / (x1 - x0)) * plotW : plotW / 2),
    y: (value: number) => PAD.top + plotH - (((log ? Math.log10(value) : value) - y0) / (y1 - y0)) * plotH,
    stepAt: (px: number) => x0 + ((px - PAD.left) / plotW) * (x1 - x0),
  };
}

export function lineChart(lines: ChartLine[], options: ChartOptions): string {
  const { width, height, log, smoothing } = options;
  const drawn = lines.filter((line) => line.points.length > 0);
  if (drawn.length === 0) return `<svg class="chart" width="${width}" height="${height}"></svg>`;
  const s = chartScales(drawn, options);
  const path = (points: [number, number][]) =>
    points
      .filter(([, v]) => s.valid(v))
      .map(([step, v], i) => `${i === 0 ? "M" : "L"}${s.x(step).toFixed(1)},${s.y(v).toFixed(1)}`)
      .join("");
  const yTicks = (log ? ticks(Math.floor(s.y0), Math.ceil(s.y1)).filter((t) => Number.isInteger(t)).map((t) => 10 ** t) : ticks(s.y0, s.y1)).filter(
    (t) => s.y(t) >= PAD.top - 0.5 && s.y(t) <= height - PAD.bottom + 0.5,
  );
  const xTicks = ticks(s.x0, s.x1, 4).filter((t) => t >= s.x0 && t <= s.x1);
  const series = drawn
    .map((line, i) => {
      const dash = DASHES[i % DASHES.length];
      const smoothed = smooth(line.points.map(([, v]) => v), smoothing).map((v, k): [number, number] => [line.points[k][0], v]);
      return `${smoothing > 0 ? `<path class="chart-raw" d="${path(line.points)}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>` : ""}<path class="chart-line" d="${path(smoothed)}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
    })
    .join("");
  return `<svg class="chart" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${yTicks.map((t) => `<line class="chart-grid" x1="${PAD.left}" x2="${width - PAD.right}" y1="${s.y(t).toFixed(1)}" y2="${s.y(t).toFixed(1)}"/><text class="chart-tick" x="${PAD.left - 6}" y="${(s.y(t) + 3).toFixed(1)}" text-anchor="end">${formatMetric(t)}</text>`).join("")}
    ${xTicks.map((t) => `<text class="chart-tick" x="${s.x(t).toFixed(1)}" y="${height - 4}" text-anchor="middle">${formatMetric(t)}</text>`).join("")}
    <line class="chart-axis" x1="${PAD.left}" x2="${width - PAD.right}" y1="${height - PAD.bottom}" y2="${height - PAD.bottom}"/>
    ${series}
    <line class="chart-cursor" x1="0" x2="0" y1="${PAD.top}" y2="${height - PAD.bottom}" visibility="hidden"/>
  </svg>`;
}

/** The point of `points` nearest to `step` (they are in step order), for the hover readout. */
export function nearest(points: [number, number][], step: number): [number, number] | null {
  if (points.length === 0) return null;
  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid][0] < step) lo = mid;
    else hi = mid;
  }
  return Math.abs(points[lo][0] - step) <= Math.abs(points[hi][0] - step) ? points[lo] : points[hi];
}

/** Axes shared by the charts below: horizontal grid lines with mono ticks on the left. */
function yAxis(y0: number, y1: number, y: (v: number) => number, width: number, height: number): string {
  return ticks(y0, y1)
    .filter((t) => y(t) >= PAD.top - 0.5 && y(t) <= height - PAD.bottom + 0.5)
    .map((t) => `<line class="chart-grid" x1="${PAD.left}" x2="${width - PAD.right}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}"/><text class="chart-tick" x="${PAD.left - 6}" y="${(y(t) + 3).toFixed(1)}" text-anchor="end">${formatMetric(t)}</text>`)
    .join("");
}

/**
 * How a set of values is spread, over time, as TensorBoard's distributions:
 * nested bands between matching percentiles (min-max, ±1.5σ, ±1σ, ±0.5σ for
 * a normal spread), darker towards the middle, and the median as a line.
 * `readings` are [step, the 9 percentiles of PERCENTILES].
 */
export function distributionChart(readings: [number, number[]][], width: number, height: number): string {
  const drawn = readings.filter(([, p]) => p.length === 9);
  if (drawn.length < 2) return `<svg class="chart" width="${width}" height="${height}"></svg>`;
  const [x0, x1] = [drawn[0][0], drawn[drawn.length - 1][0]];
  let [y0, y1] = [Math.min(...drawn.map(([, p]) => p[0])), Math.max(...drawn.map(([, p]) => p[8]))];
  if (y0 === y1) [y0, y1] = [y0 - 1, y1 + 1];
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const x = (step: number) => PAD.left + (x1 > x0 ? ((step - x0) / (x1 - x0)) * plotW : plotW / 2);
  const y = (v: number) => PAD.top + plotH - ((v - y0) / (y1 - y0)) * plotH;
  const band = (low: number, high: number) => {
    const top = drawn.map(([step, p]) => `${x(step).toFixed(1)},${y(p[high]).toFixed(1)}`);
    const bottom = drawn.map(([step, p]) => `${x(step).toFixed(1)},${y(p[low]).toFixed(1)}`).reverse();
    return `<path class="chart-band" d="M${top.join("L")}L${bottom.join("L")}Z"/>`;
  };
  const median = drawn.map(([step, p], i) => `${i === 0 ? "M" : "L"}${x(step).toFixed(1)},${y(p[4]).toFixed(1)}`).join("");
  const xTicks = ticks(x0, x1, 4).filter((t) => t >= x0 && t <= x1);
  return `<svg class="chart" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${yAxis(y0, y1, y, width, height)}
    ${xTicks.map((t) => `<text class="chart-tick" x="${x(t).toFixed(1)}" y="${height - 4}" text-anchor="middle">${formatMetric(t)}</text>`).join("")}
    <line class="chart-axis" x1="${PAD.left}" x2="${width - PAD.right}" y1="${height - PAD.bottom}" y2="${height - PAD.bottom}"/>
    ${[0, 1, 2, 3].map((i) => band(i, 8 - i)).join("")}
    <path class="chart-line" d="${median}"/>
  </svg>`;
}

/** Predicted (up) against true (across), on the same scale, with the diagonal where a perfect model's points would lie. */
export function scatterChart(predicted: number[], target: number[], width: number, height: number): string {
  if (target.length === 0) return `<svg class="chart" width="${width}" height="${height}"></svg>`;
  let [low, high] = [Math.min(...target, ...predicted), Math.max(...target, ...predicted)];
  if (low === high) [low, high] = [low - 1, high + 1];
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const x = (v: number) => PAD.left + ((v - low) / (high - low)) * plotW;
  const y = (v: number) => PAD.top + plotH - ((v - low) / (high - low)) * plotH;
  const dots = target.map((t, i) => `<circle cx="${x(t).toFixed(1)}" cy="${y(predicted[i]).toFixed(1)}" r="1.6"/>`).join("");
  const xTicks = ticks(low, high, 4).filter((t) => t >= low && t <= high);
  return `<svg class="chart chart-scatter" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${yAxis(low, high, y, width, height)}
    ${xTicks.map((t) => `<text class="chart-tick" x="${x(t).toFixed(1)}" y="${height - 4}" text-anchor="middle">${formatMetric(t)}</text>`).join("")}
    <line class="chart-axis" x1="${PAD.left}" x2="${width - PAD.right}" y1="${height - PAD.bottom}" y2="${height - PAD.bottom}"/>
    <line class="chart-diagonal" x1="${x(low)}" y1="${y(low)}" x2="${x(high)}" y2="${y(high)}"/>
    ${dots}
  </svg>`;
}

/** Confusion matrix: rows are the true class, columns the predicted one, shaded by each row's share. */
export function confusionChart(matrix: number[][], width: number, height: number): string {
  const classes = matrix.length;
  if (classes === 0) return `<svg class="chart" width="${width}" height="${height}"></svg>`;
  const size = Math.min((width - PAD.left - PAD.right) / classes, (height - PAD.top - PAD.bottom) / classes);
  const labelled = classes <= 12;
  const cells = matrix
    .flatMap((row, t) => {
      const total = row.reduce((a, b) => a + b, 0) || 1;
      return row.map((count, p) => {
        const [cx, cy] = [PAD.left + p * size, PAD.top + t * size];
        const share = 0.08 + 0.92 * (count / total);
        // Counts in the background colour on bright cells, in ink on dark ones.
        const text = labelled && count > 0 ? `<text class="chart-cell-text${share > 0.5 ? " is-on-light" : ""}" x="${(cx + size / 2).toFixed(1)}" y="${(cy + size / 2 + 3).toFixed(1)}" text-anchor="middle">${count}</text>` : "";
        return `<rect class="chart-cell${t === p ? " is-diagonal" : ""}" x="${cx.toFixed(1)}" y="${cy.toFixed(1)}" width="${(size - 1).toFixed(1)}" height="${(size - 1).toFixed(1)}" fill-opacity="${share.toFixed(2)}"/>${text}`;
      });
    })
    .join("");
  const labels = labelled
    ? matrix.map((_, i) => `<text class="chart-tick" x="${PAD.left - 6}" y="${(PAD.top + i * size + size / 2 + 3).toFixed(1)}" text-anchor="end">${i}</text>`).join("")
    : "";
  return `<svg class="chart" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${labels}${cells}</svg>`;
}
