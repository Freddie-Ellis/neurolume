import { describe, expect, it } from "vitest";
import { chartScales, confusionChart, distributionChart, lineChart, nearest, scatterChart, smooth, ticks } from "./charts";

describe("charts", () => {
  it("smooths without pulling the start towards zero", () => {
    expect(smooth([1, 2, 3], 0)).toEqual([1, 2, 3]);
    const smoothed = smooth([10, 10, 10], 0.9);
    smoothed.forEach((v) => expect(v).toBeCloseTo(10));
  });

  it("puts ticks on round numbers", () => {
    expect(ticks(0, 1)).toEqual([0, 0.5, 1]);
    expect(ticks(0.013, 0.087)).toEqual([0.02, 0.04, 0.06, 0.08]);
    expect(ticks(3, 3)).toEqual([3]);
  });

  it("maps steps and values into the plot, log scale included", () => {
    const lines = [{ name: "loss", points: [[0, 1], [100, 0.01]] as [number, number][] }];
    const s = chartScales(lines, { width: 300, height: 100, log: true, smoothing: 0 });
    expect(s.y(1)).toBeLessThan(s.y(0.1));
    expect(s.y(0.1) - s.y(1)).toBeCloseTo(s.y(0.01) - s.y(0.1)); // equal steps per decade
    expect(s.stepAt(s.x(50))).toBeCloseTo(50);
  });

  it("draws one solid line per metric, plus faint raw lines when smoothing", () => {
    const lines = [
      { name: "train", points: [[0, 1], [1, 0.5]] as [number, number][] },
      { name: "val", points: [[0, 1.2], [1, 0.7]] as [number, number][] },
    ];
    expect(lineChart(lines, { width: 300, height: 100, log: false, smoothing: 0 }).match(/chart-line/g)).toHaveLength(2);
    expect(lineChart(lines, { width: 300, height: 100, log: false, smoothing: 0.5 }).match(/chart-raw/g)).toHaveLength(2);
  });

  it("finds the nearest point for the hover readout", () => {
    const points: [number, number][] = [[0, 1], [10, 2], [20, 3]];
    expect(nearest(points, 12)).toEqual([10, 2]);
    expect(nearest(points, 16)).toEqual([20, 3]);
    expect(nearest([], 5)).toBeNull();
  });
});

describe("training panel charts", () => {
  it("draws four nested bands and a median line for a spread over time", () => {
    const svg = distributionChart([[0, [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3]], [10, [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4]]], 300, 120);
    expect(svg.match(/chart-band/g)).toHaveLength(4);
    expect(svg).toContain("chart-line");
  });

  it("puts predictions against truth on one scale with the diagonal", () => {
    const svg = scatterChart([1, 2, 3], [1, 2, 4], 300, 200);
    expect(svg.match(/<circle/g)).toHaveLength(3);
    expect(svg).toContain("chart-diagonal");
  });

  it("shades a confusion matrix by each row's share", () => {
    const svg = confusionChart([[3, 1], [0, 4]], 300, 200);
    expect(svg.match(/<rect/g)).toHaveLength(4);
    expect(svg.match(/is-diagonal/g)).toHaveLength(2);
  });
});
