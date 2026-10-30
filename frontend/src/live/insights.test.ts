import { describe, expect, it } from "vitest";
import { best, convergence, fit, gap, higherIsBetter } from "./insights";

/** `count` points of `f(step)`, steps 0, 10, 20... */
const curve = (count: number, f: (i: number) => number): [number, number][] => Array.from({ length: count }, (_, i) => [i * 10, f(i)]);

describe("convergence", () => {
  it("waits for enough points", () => {
    expect(convergence("loss", curve(5, () => 1), []).word).toBe("warming up");
  });

  it("tells improving, levelling off and converged apart by the recent change", () => {
    expect(convergence("loss", curve(200, (i) => 1 / (1 + i)), []).word).toBe("improving");
    expect(convergence("loss", curve(200, (i) => 0.5 + Math.exp(-i / 40)), []).word).toBe("levelling off");
    expect(convergence("loss", curve(200, (i) => 0.5 + Math.exp(-i / 10)), []).word).toBe("converged");
    expect(convergence("loss", curve(200, (i) => 1 + i / 50), []).word).toBe("getting worse");
  });

  it("knows accuracy and reward should go up", () => {
    expect(higherIsBetter("accuracy") && higherIsBetter("reward") && !higherIsBetter("loss")).toBe(true);
    expect(convergence("accuracy", curve(200, (i) => 1 - 1 / (1 + i)), []).word).not.toBe("getting worse");
    expect(convergence("reward", curve(200, (i) => i), []).word).toBe("improving");
  });

  it("calls validation getting worse while training improves overfitting", () => {
    const train = curve(200, (i) => 1 / (1 + i));
    const val = curve(200, (i) => 0.3 + ((i - 60) / 100) ** 2);
    const verdict = convergence("loss", train, val);
    expect(verdict.word).toBe("overfitting");
    expect(verdict.level).toBe("warn");
  });
});

describe("gap, best and fit", () => {
  it("measures validation against training", () => {
    expect(gap(curve(50, () => 1), curve(50, () => 1.2))).toBeCloseTo(0.2);
    expect(gap(curve(5, () => 1), [])).toBeNull();
  });

  it("finds the best point either way up", () => {
    expect(best([[0, 3], [10, 1], [20, 2]], "loss")).toEqual([10, 1]);
    expect(best([[0, 0.5], [10, 0.9], [20, 0.8]], "accuracy")).toEqual([10, 0.9]);
  });

  it("scores predictions with R² and mean error", () => {
    expect(fit([1, 2, 3], [1, 2, 3])).toEqual({ r2: 1, mae: 0 });
    const meanOnly = fit([2, 2, 2], [1, 2, 3]);
    expect(meanOnly.r2).toBeCloseTo(0);
    expect(meanOnly.mae).toBeCloseTo(2 / 3);
  });
});
