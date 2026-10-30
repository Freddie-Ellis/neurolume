/** Pure helpers for live metrics: which metrics exist, one metric's series, its trend and sparkline. */
import type { MetricPoint } from "../schema";

/** Every metric name logged so far, in the order each first appeared. */
export function metricNames(points: MetricPoint[]): string[] {
  const names = new Set<string>();
  for (const point of points) for (const name of Object.keys(point.values)) names.add(name);
  return [...names];
}

/** [step, value] for one metric, skipping steps where it was missing or not finite. */
export function series(points: MetricPoint[], name: string): [number, number][] {
  const out: [number, number][] = [];
  for (const { step, values } of points) {
    const value = values[name];
    if (typeof value === "number" && Number.isFinite(value)) out.push([step, value]);
  }
  return out;
}

/**
 * How much the metric moved recently, as a fraction: the mean of the newest
 * tenth of the series (at most 50 points) against the tenth before it. Null
 * until there are two windows to compare, or when the older one is 0.
 */
export function trend(values: number[]): number | null {
  const k = Math.min(50, Math.max(1, Math.floor(values.length / 10)));
  if (values.length < 2 * k) return null;
  const mean = (from: number) => values.slice(from, from + k).reduce((sum, v) => sum + v, 0) / k;
  const recent = mean(values.length - k);
  const before = mean(values.length - 2 * k);
  return before === 0 ? null : (recent - before) / Math.abs(before);
}

/**
 * An SVG path for a sparkline of `values` in a width x height box (y down),
 * averaged into at most `width / 2` buckets so long runs stay light. Empty for
 * fewer than two values.
 */
export function sparklinePath(values: number[], width: number, height: number): string {
  if (values.length < 2) return "";
  const buckets = Math.min(values.length, Math.floor(width / 2));
  const means = Array.from({ length: buckets }, (_, b) => {
    const from = Math.floor((b * values.length) / buckets);
    const to = Math.max(from + 1, Math.floor(((b + 1) * values.length) / buckets));
    return values.slice(from, to).reduce((sum, v) => sum + v, 0) / (to - from);
  });
  const low = Math.min(...means);
  const span = Math.max(...means) - low || 1;
  return means
    .map((v, i) => {
      const x = (i / (means.length - 1)) * width;
      const y = height - ((v - low) / span) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join("");
}

/** A metric value for the run strip: up to 4 significant figures, exponent form when very small or large. */
export function formatMetric(value: number): string {
  const size = Math.abs(value);
  if (size !== 0 && (size < 1e-3 || size >= 1e6)) return value.toExponential(2);
  return Number(value.toPrecision(4)).toString();
}
