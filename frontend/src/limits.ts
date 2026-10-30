/**
 * How much of a big model is drawn: the caps the user can change in Settings
 * (Detail). Layout and render code read `limits` when they build, so a change
 * applies on the next rebuild. Saved in localStorage.
 */

const DEFAULTS = {
  /** Neurons drawn per column; bigger layers show an ellipsis gap. */
  neurons: 64,
  /** Edges drawn between two neuron columns (a dense layer's weights), strongest first.
   * Python sends at most `weight_k` (default 20000, this slider's max) per layer. */
  weights: 4000,
  /** Feature-map slabs drawn per stack. */
  maps: 12,
  /** Edges drawn between two stacks (a convolution). */
  mapEdges: 480,
  /** Edges drawn from a stack into a dense layer (the strongest ones). */
  cellEdges: 700,
  /** Strands per link in an overview and per skip connection. */
  strands: 48,
};

export type LimitName = keyof typeof DEFAULTS;

/** Settings sliders: name, label, min, max, step. */
export const LIMIT_CONTROLS: [LimitName, string, number, number, number][] = [
  ["neurons", "Neurons per column", 8, 256, 8],
  ["weights", "Edges per dense layer", 100, 20000, 100],
  ["maps", "Feature maps per stack", 1, 32, 1],
  ["mapEdges", "Edges between feature maps", 60, 2000, 20],
  ["cellEdges", "Edges from maps to neurons", 100, 3000, 100],
  ["strands", "Strands per link", 4, 128, 4],
];

const STORAGE_KEY = "neurolume-limits";

export const limits: Record<LimitName, number> = { ...DEFAULTS, ...saved() };

function saved(): Partial<Record<LimitName, number>> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {}; // no storage (tests, private windows) or a broken value
  }
}

/** Set one limit (or all back to the defaults with no arguments) and remember it. */
export function setLimit(name?: LimitName, value?: number): void {
  if (name && value !== undefined) limits[name] = value;
  else Object.assign(limits, DEFAULTS);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limits));
  } catch {
    // Not being able to remember the choice is fine.
  }
}
