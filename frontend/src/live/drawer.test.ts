import { describe, expect, it } from "vitest";
import { deriveCharts } from "./drawer";

describe("metrics drawer layout", () => {
  it("gives every metric a chart, with its own validation or test line", () => {
    expect(deriveCharts(["loss/train", "acc", "loss/val"], [], undefined)).toEqual([
      { metrics: ["loss/train", "loss/val"], log: false },
      { metrics: ["acc"], log: false },
    ]);
    // Networks' losses can be far apart in scale: each gets its own chart, with its own split.
    expect(deriveCharts(["loss/actor", "loss/critic", "loss/critic/val", "loss"], [], undefined)).toEqual([
      { metrics: ["loss/actor"], log: false },
      { metrics: ["loss/critic", "loss/critic/val"], log: false },
      { metrics: ["loss"], log: false },
    ]);
  });

  it("starts from charts set in code, then the rest", () => {
    expect(deriveCharts(["loss", "lr", "acc"], [["lr", "loss"]], undefined)).toEqual([
      { metrics: ["lr", "loss"], log: false },
      { metrics: ["acc"], log: false },
    ]);
  });

  it("prefers the saved layout, dropping metrics no longer logged and adding new ones", () => {
    const saved = [{ metrics: ["gone", "acc"], log: true }];
    expect(deriveCharts(["acc", "new"], [["new"]], saved)).toEqual([
      { metrics: ["acc"], log: true },
      { metrics: ["new"], log: false },
    ]);
  });
});
