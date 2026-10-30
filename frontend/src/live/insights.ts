/**
 * Whole-run judgements for the Training panel: is the model still improving,
 * has it converged, is it overfitting (training keeps improving while
 * validation gets worse), and how well do its predictions match the truth.
 * Pure functions of the logged series, so they are tested; the rules of thumb
 * are stated in the `detail` text, so nothing is hidden.
 */
import { smooth } from "./charts";

type Series = [number, number][];

export interface Verdict {
  word: string;
  detail: string;
  level: "ok" | "warn" | "idle";
}

/** Points needed before judging, and the share of the run the trend is measured over. */
const MIN_POINTS = 20;
const RECENT = 0.2;
/** Relative change over the recent part of the run: above IMPROVING is still improving, under CONVERGED has converged. */
const IMPROVING = 0.05;
const CONVERGED = 0.01;
/** Validation this much worse than its best (while training still improves) is overfitting. */
const OVERFIT = 0.05;
const SMOOTHING = 0.9;

/** Metrics where bigger is better (accuracy, reward...); everything else (loss, error) should fall. */
export function higherIsBetter(name: string): boolean {
  return /acc|reward|return|score|r2|auc|f1|precision|recall|iou/i.test(name);
}

const smoothed = (series: Series): Series => smooth(series.map(([, v]) => v), SMOOTHING).map((v, i) => [series[i][0], v]);

/** The smoothed value at (or just before) `step`. */
function at(series: Series, step: number): number {
  let value = series[0][1];
  for (const [s, v] of series) if (s <= step) value = v;
  return value;
}

/** The best point of a series: its lowest value, or highest for metrics where bigger is better. */
export function best(series: Series, name: string): [number, number] | null {
  if (series.length === 0) return null;
  const up = higherIsBetter(name);
  return series.reduce((a, b) => ((up ? b[1] > a[1] : b[1] < a[1]) ? b : a));
}

/**
 * How the run is going, judged on `name` (validation if there is enough of
 * it, else training): improving, levelling off, converged, getting worse,
 * overfitting (validation worse than its best while training still improves).
 */
export function convergence(name: string, train: Series, val: Series): Verdict {
  const up = higherIsBetter(name);
  const judged = val.length >= MIN_POINTS / 2 ? val : train;
  if (judged.length < MIN_POINTS && judged !== val) return { word: "warming up", detail: `Needs ${MIN_POINTS} points of ${name} to judge.`, level: "idle" };
  const values = smoothed(judged);
  const last = values[values.length - 1];
  if (!Number.isFinite(last[1])) return { word: "diverged", detail: `${name} is no longer a finite number.`, level: "warn" };
  const better = (a: number, b: number) => (up ? a - b : b - a) / (Math.abs(b) || 1); // how much better a is than b

  if (val.length >= MIN_POINTS / 2 && train.length >= MIN_POINTS) {
    // The best raw validation point (as the summary shows it) against where validation is now (smoothed).
    const [bestStep, bestValue] = best(val, name)!;
    const t = smoothed(train);
    const nearEnd = bestStep >= val[Math.floor(val.length * (1 - RECENT / 2))][0];
    if (!nearEnd && better(bestValue, last[1]) > OVERFIT && better(t[t.length - 1][1], at(t, bestStep)) > 0) {
      return {
        word: "overfitting",
        detail: `Validation ${name} is ${percent(better(bestValue, last[1]))} worse than its best (step ${bestStep.toLocaleString("en-GB")}) while training ${name} still improves.`,
        level: "warn",
      };
    }
  }

  const from = last[0] - (last[0] - values[0][0]) * RECENT;
  const change = better(last[1], at(values, from)); // > 0: improved over the recent part of the run
  const which = judged === val ? `validation ${name}` : name;
  const recent = `over the last ${RECENT * 100}% of steps`;
  if (change > IMPROVING) return { word: "improving", detail: `${which} ${percent(change)} better ${recent}.`, level: "ok" };
  if (change < -IMPROVING) return { word: "getting worse", detail: `${which} ${percent(-change)} worse ${recent}.`, level: "warn" };
  if (Math.abs(change) < CONVERGED) return { word: "converged", detail: `${which} changed under ${CONVERGED * 100}% ${recent}.`, level: "ok" };
  return { word: "levelling off", detail: `${which} ${percent(Math.abs(change))} ${change >= 0 ? "better" : "worse"} ${recent}.`, level: "ok" };
}

/** Validation minus training at the latest validation point (both smoothed). */
export function gap(train: Series, val: Series): number | null {
  if (train.length === 0 || val.length === 0) return null;
  const v = smoothed(val);
  const [step, value] = v[v.length - 1];
  return value - at(smoothed(train), step);
}

/** R² (1 is perfect, 0 is no better than always predicting the mean) and mean absolute error. */
export function fit(predicted: number[], target: number[]): { r2: number; mae: number } {
  const mean = target.reduce((a, b) => a + b, 0) / (target.length || 1);
  let residual = 0;
  let total = 0;
  let absolute = 0;
  target.forEach((t, i) => {
    residual += (t - predicted[i]) ** 2;
    total += (t - mean) ** 2;
    absolute += Math.abs(t - predicted[i]);
  });
  return { r2: total > 0 ? 1 - residual / total : NaN, mae: absolute / (target.length || 1) };
}

function percent(share: number): string {
  const size = share * 100;
  return `${size < 10 ? size.toFixed(1) : Math.round(size)}%`;
}
