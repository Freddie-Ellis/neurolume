import { describe, expect, it } from "vitest";
import { sampleCurve } from "./curves";

describe("sampleCurve", () => {
  const points = sampleCurve(0, 0, 100, 50, 10);

  it("starts and ends on the two neurons", () => {
    expect(points).toHaveLength(11);
    expect(points[0]).toEqual({ x: 0, y: 0, along: 0 });
    expect(points[10]).toEqual({ x: 100, y: 50, along: 1 });
  });

  it("passes through the midpoint and only ever moves forward", () => {
    expect(points[5].x).toBeCloseTo(50);
    expect(points[5].y).toBeCloseTo(25);
    for (let i = 1; i < points.length; i += 1) expect(points[i].along).toBeGreaterThan(points[i - 1].along);
  });

  it("leaves the first neuron horizontally", () => {
    expect(Math.abs(points[1].y - points[0].y)).toBeLessThan(Math.abs(points[5].y - points[4].y));
  });

  it("bows by the bend but still meets both neurons", () => {
    const bowed = sampleCurve(0, 0, 100, 0, 10, { bend: 20 });
    expect(bowed[0].y).toBe(0);
    expect(bowed[10].y).toBe(0);
    expect(bowed[5].y).toBeCloseTo(15); // 3/4 of the bend at the midpoint
  });

  it("ripples with a wave that is pinned at both ends", () => {
    const wavy = sampleCurve(0, 0, 100, 0, 20, { wave: { amplitude: 10, cycles: 2, phase: 0.5 } });
    expect(wavy[0].y).toBeCloseTo(0);
    expect(wavy[20].y).toBeCloseTo(0);
    expect(Math.max(...wavy.map((p) => Math.abs(p.y)))).toBeGreaterThan(3);
  });
});
