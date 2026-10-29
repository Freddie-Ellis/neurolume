import { describe, expect, it } from "vitest";
import type { Graph, GraphNode } from "../schema";
import { layoutGraph } from "./columns";
import { MAX_MAPS_SHOWN, MAX_MAP_SIZE, MIN_MAP_SIZE, frontSlab, funnel, mapPorts, mapStack, stackExtent } from "./maps";

describe("mapStack", () => {
  it("draws one slab per channel, capped, centred on the column", () => {
    const stack = mapStack([6, 28, 28], 100);
    expect(stack.slabs).toHaveLength(6);
    const front = frontSlab(stack);
    const back = stack.slabs[0];
    expect((front.left + back.left + back.width) / 2).toBeCloseTo(100);
    expect(back.left).toBeGreaterThan(front.left); // back slabs sit up and to the right
    expect(mapStack([64, 8, 8], 0).slabs).toHaveLength(MAX_MAPS_SHOWN);
  });

  it("sizes slabs by the feature map, within limits", () => {
    expect(frontSlab(mapStack([1, 28, 28], 0)).width).toBe(168);
    expect(frontSlab(mapStack([1, 2, 2], 0)).width).toBe(MIN_MAP_SIZE);
    expect(frontSlab(mapStack([1, 224, 112], 0))).toMatchObject({ width: MAX_MAP_SIZE, height: MAX_MAP_SIZE });
  });

  it("puts edge ports inside the front slab", () => {
    const stack = mapStack([16, 5, 5], 0);
    const front = frontSlab(stack);
    for (const y of mapPorts(stack)) {
      expect(y).toBeGreaterThan(front.bottom);
      expect(y).toBeLessThan(front.bottom + front.height);
    }
    expect(stackExtent(stack)).toBeGreaterThan(front.height / 2);
  });
});

describe("funnel", () => {
  it("runs from a kernel-sized window to one point on the next stack", () => {
    const from = mapStack([1, 28, 28], 0);
    const to = mapStack([6, 24, 24], 300);
    const segments = funnel(from, to, [5, 5]);
    const [left, bottom, right] = segments[0];
    expect(right - left).toBeCloseTo((5 / 28) * 168);
    const tips = segments.slice(4).map(([, , x, y]) => `${x},${y}`);
    expect(new Set(tips).size).toBe(1);
    const target = frontSlab(to);
    const [, , tipX] = segments[4];
    expect(tipX).toBeGreaterThan(target.left);
    expect(bottom).toBeGreaterThan(frontSlab(from).bottom);
  });
});

describe("layoutGraph with feature maps", () => {
  const node = (id: string, type: GraphNode["type"], output_shape: number[]): GraphNode => ({
    id, type, label: id, group: null, input_shape: [], output_shape, params: {}, param_count: 0, activation: null, notes: null,
  });
  const cnn: Graph = {
    schema_version: "1.2",
    model: { name: "CNN", framework: "pytorch", total_params: 0 },
    nodes: [node("input", "input", [1, 28, 28]), node("conv", "conv2d", [6, 24, 24]), node("flat", "flatten", [3456]), node("fc", "dense", [10])],
    edges: [],
    groups: [],
    weights: null,
  };
  const { columns } = layoutGraph(cnn);

  it("gives [C, H, W] layers a stack and dense layers neurons", () => {
    expect(columns.map((column) => column.maps !== null)).toEqual([true, true, false]);
    expect(columns[2].slots).toHaveLength(10);
  });

  it("lets edges leave from the front slab's right edge", () => {
    const front = frontSlab(columns[1].maps!);
    expect(columns[1].exitX).toBeCloseTo(front.left + front.width);
    expect(columns[2].entryX).toBe(columns[2].x);
  });
});
