import { describe, expect, it } from "vitest";
import type { MetricPoint } from "../schema";
import { formatMetric, metricNames, series, sparklinePath, trend } from "./series";

const points: MetricPoint[] = [
  { step: 0, values: { loss: 1 } },
  { step: 1, values: { loss: 0.5, reward: null } },
  { step: 2, values: { reward: 3 } },
];

describe("live series", () => {
  it("lists metrics in first-seen order and skips missing or null values", () => {
    expect(metricNames(points)).toEqual(["loss", "reward"]);
    expect(series(points, "loss")).toEqual([[0, 1], [1, 0.5]]);
    expect(series(points, "reward")).toEqual([[2, 3]]);
  });

  it("compares the newest window with the one before it", () => {
    expect(trend([1])).toBeNull();
    expect(trend([2, 1])).toBe(-0.5);
    expect(trend(Array.from({ length: 20 }, (_, i) => (i < 18 ? 10 : 5)))).toBeCloseTo(-0.5);
  });

  it("draws a sparkline across the whole box, highest value at the top", () => {
    const path = sparklinePath([0, 1, 2], 100, 20);
    expect(path.startsWith("M0.0,20.0")).toBe(true);
    expect(path.endsWith("L100.0,0.0")).toBe(true);
    expect(sparklinePath([1], 100, 20)).toBe("");
    expect(sparklinePath(Array.from({ length: 1000 }, (_, i) => i), 100, 20).split("L")).toHaveLength(50);
  });

  it("formats values compactly", () => {
    expect(formatMetric(0.031234)).toBe("0.03123");
    expect(formatMetric(12.5)).toBe("12.5");
    expect(formatMetric(0.00001234)).toBe("1.23e-5");
  });
});
