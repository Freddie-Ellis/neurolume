import { describe, expect, it } from "vitest";
import { limits } from "../limits";
import type { Graph, GraphNode } from "../schema";
import { layoutGraph } from "./columns";
import {
  MAX_MAP_SIZE,
  MIN_MAP_SIZE,
  cellCentre,
  cellLinks,
  decodeFeatureMaps,
  flattenedCell,
  frontSlab,
  gridLines,
  mapPorts,
  mapStack,
  stackExtent,
  slabZ,
  sweepOf,
} from "./maps";

describe("mapStack", () => {
  it("draws one slab per channel, capped, centred on the column", () => {
    const stack = mapStack([6, 28, 28], 100);
    expect(stack.slabs).toHaveLength(6);
    const front = frontSlab(stack);
    const back = stack.slabs[0];
    expect((front.left + back.left + back.width) / 2).toBeCloseTo(100);
    expect(back.left).toBeGreaterThan(front.left); // back slabs sit up and to the right
    expect(mapStack([64, 8, 8], 0).slabs).toHaveLength(limits.maps);
  });

  it("sizes slabs against the network's largest map, by square root, within limits", () => {
    expect(frontSlab(mapStack([1, 28, 28], 0, 28)).width).toBe(MAX_MAP_SIZE);
    expect(frontSlab(mapStack([1, 7, 7], 0, 28)).width).toBeCloseTo(MAX_MAP_SIZE / 2);
    expect(frontSlab(mapStack([1, 1, 1], 0, 224)).width).toBe(MIN_MAP_SIZE);
    const wide = frontSlab(mapStack([1, 56, 224], 0, 224));
    expect(wide.width).toBe(MAX_MAP_SIZE);
    expect(wide.height).toBeCloseTo(MAX_MAP_SIZE / 2);
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

describe("cellLinks", () => {
  const input = mapStack([1, 8, 8], 0, 8);
  const conv = mapStack([6, 8, 8], 300, 8);
  const pool = mapStack([6, 4, 4], 600, 8);

  it("links each output cell to a sample of its kernel window, skipping padding", () => {
    const segments = cellLinks(input, conv, sweepOf({ kernel_size: [5, 5], stride: [1, 1], padding: "same" }));
    const [x, y] = cellCentre(frontSlab(conv), 8, 8, 0, 0);
    // The top-left cell's 5 x 5 window starts two cells off the edge: of its 3 x 3 samples, only 2 x 2 are inside.
    const first = segments.filter(([, end]) => end[0] === x && end[1] === y);
    expect(first).toHaveLength(4);
    expect(first[0][0].slice(0, 2)).toEqual(cellCentre(frontSlab(input), 8, 8, 0, 0));
  });

  it("spreads the lines over the slabs, nearer slabs in front", () => {
    const links = cellLinks(input, conv, sweepOf({ kernel_size: [5, 5], padding: "same" }));
    const depths = new Set(links.map(([, end]) => end[2]));
    expect(depths.size).toBe(6); // one per output slab
    expect(slabZ(conv, 0)).toBeGreaterThan(slabZ(conv, 5));
  });

  it("follows the stride: a 2 x 2 pool's windows tile the input without overlapping", () => {
    const segments = cellLinks(conv, pool, sweepOf({ kernel_size: [2, 2], stride: [2, 2], padding: "valid" }));
    expect(segments).toHaveLength(4 * 4 * 4);
    const starts = new Set(segments.map(([start]) => start.join()));
    expect(starts.size).toBe(8 * 8);
  });

  it("works out an adaptive pool's window from the map sizes", () => {
    const features = mapStack([512, 7, 7], 0, 7);
    const pooled = mapStack([512, 1, 1], 300, 7);
    expect(sweepOf({ mode: "avg", output_size: [1, 1] }, features, pooled)).toEqual({ kernel: [7, 7], stride: [7, 7], padding: [0, 0] });
    expect(cellLinks(features, pooled, sweepOf({ output_size: [1, 1] }, features, pooled))).toHaveLength(9); // 3 x 3 samples of the 7 x 7 window
  });

  it("keeps big maps under the cap", () => {
    const big = mapStack([4, 112, 112], 0, 112);
    const bigger = mapStack([4, 112, 112], 300, 112);
    expect(cellLinks(big, bigger, sweepOf({ kernel_size: [3, 3] })).length).toBeLessThanOrEqual(limits.mapEdges);
  });
});

describe("grids and flattened cells", () => {
  it("draws the inner grid lines of a map", () => {
    expect(gridLines({ left: 0, bottom: 0, width: 50, height: 50 }, 5, 5)).toHaveLength(8);
    expect(gridLines({ left: 0, bottom: 0, width: 100, height: 100 }, 64, 64).length).toBeLessThanOrEqual(64);
  });

  it("puts each flattened value at its cell, on its channel's slab", () => {
    const stack = mapStack([16, 5, 5], 0, 28);
    const front = frontSlab(stack);
    const second = stack.slabs[stack.slabs.length - 2];
    expect(flattenedCell(stack, 0).slice(0, 2)).toEqual(cellCentre(front, 5, 5, 0, 0));
    expect(flattenedCell(stack, 7).slice(0, 2)).toEqual(cellCentre(front, 5, 5, 1, 2));
    expect(flattenedCell(stack, 25 + 7).slice(0, 2)).toEqual(cellCentre(second, 5, 5, 1, 2)); // channel 1, same cell
    // Recorded maps put the most active channel in front: here channel 3.
    expect(flattenedCell(stack, 3 * 25, [3, 0, 1]).slice(0, 2)).toEqual(cellCentre(front, 5, 5, 0, 0));
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
    feature_maps: null,
    live: false,
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

  it("threads the edges into the dense layer through a flatten strip", () => {
    const layout = layoutGraph(cnn);
    const flatten = layout.bands.find((band) => band.node.id === "flat")!;
    expect(flatten.kind).toBe("flatten");
    expect(flatten.stripHalfHeight).toBeGreaterThan(0);
    expect(layout.links[1].through).toEqual([flatten]);
    // An MLP's flatten follows a column of input neurons, not a stack: it stays a plain chip.
    const mlp = layoutGraph({ ...cnn, nodes: [node("input", "input", [1, 28, 28]), node("flat", "flatten", [784]), node("fc", "dense", [10])] });
    expect(mlp.bands[0].kind).toBe("plain");
  });
});

describe("decodeFeatureMaps", () => {
  it("splits the base64 bytes into one image per channel", () => {
    const bytes = [0, 1, 2, 3, 250, 251, 252, 253];
    const images = decodeFeatureMaps({ channels: [0, 1], height: 2, width: 2, data: btoa(String.fromCharCode(...bytes)) });
    expect(images.map((image) => Array.from(image))).toEqual([[0, 1, 2, 3], [250, 251, 252, 253]]);
  });
});

describe("spacing around feature-map stacks", () => {
  const node = (id: string, type: GraphNode["type"], output_shape: number[]): GraphNode => ({
    id, type, label: id, group: null, input_shape: [], output_shape, params: {}, param_count: 0, activation: null, notes: null,
  });
  it("keeps bands in the clear gap between stacks, never on top of one", () => {
    // A block's convs with a norm and an add after the last one: the bands used to land inside its stack.
    const graph: Graph = {
      schema_version: "1.3",
      model: { name: "Block", framework: "pytorch", total_params: 0 },
      nodes: [node("in", "input", [64, 56, 56]), node("conv", "conv2d", [128, 28, 28]), node("bn", "norm", [128, 28, 28]), node("add", "add", [128, 28, 28]), node("out", "output", [128, 28, 28])],
      edges: [],
      groups: [],
      weights: null,
      feature_maps: null,
      live: false,
    };
    const layout = layoutGraph(graph);
    for (const column of layout.columns) {
      const right = column.maps!.slabs[0].left + column.maps!.slabs[0].width;
      const left = frontSlab(column.maps!).left;
      for (const band of layout.bands) expect(band.x < left || band.x > right).toBe(true);
      // Bands sit in the gap between panels, not inside one.
      for (const band of layout.bands) expect(band.x < column.panel.left || band.x > column.panel.right).toBe(true);
    }
  });
});
