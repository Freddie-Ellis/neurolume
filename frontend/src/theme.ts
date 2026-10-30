/**
 * The two built-in colour schemes: a high-contrast dark theme for screens and
 * talks, and a light theme for slides, handouts and papers. Interface colours
 * (text, cards, buttons) live in style.css under the matching [data-theme].
 */
export type ThemeName = "dark" | "light";

export interface Theme {
  name: ThemeName;
  backgroundTop: string;
  backgroundBottom: string;
  panelFill: string;
  panelFillOpacity: number;
  panelBorder: string;
  panelBorderHover: string;
  neuron: string;
  /** Secondary marks such as the "⋮" dots in truncated columns. */
  muted: string;
  /** Edge colours from the input side to the output side. */
  edgeGradient: readonly string[];
  /**
   * Additive blending makes dense regions glow on a dark background, but would
   * wash out to white on a light one, so the light theme blends normally.
   */
  edgeBlending: "additive" | "normal";
  /**
   * Multiplies edge opacity. Normal blending reads fainter than additive glow,
   * so the light theme needs bolder edges to hold up.
   */
  edgeOpacity: number;
  /** Opacity kept by edges unrelated to the hovered layer, as a fraction of normal. */
  dimmedEdges: number;
  /** Bloom settings, or null when the theme has no glow. */
  bloom: { strength: number; radius: number; threshold: number } | null;
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    backgroundTop: "#060607",
    backgroundBottom: "#000000",
    panelFill: "#111113",
    panelFillOpacity: 0.7,
    panelBorder: "#55555f",
    panelBorderHover: "#f4f4f5",
    neuron: "#fafafa",
    muted: "#71717a",
    edgeGradient: ["#ffa94d", "#ff6b9a", "#c084fc", "#9f8cff"],
    edgeBlending: "additive",
    edgeOpacity: 1,
    dimmedEdges: 0.3,
    bloom: { strength: 0.35, radius: 0.3, threshold: 0.5 },
  },
  light: {
    name: "light",
    backgroundTop: "#f5f5f2",
    backgroundBottom: "#ebebe7",
    panelFill: "#ffffff",
    panelFillOpacity: 0.9,
    panelBorder: "#8f8f98",
    panelBorderHover: "#18181b",
    neuron: "#18181b",
    muted: "#71717a",
    edgeGradient: ["#e8590c", "#d6336c", "#7c3aed", "#5b21b6"],
    edgeBlending: "normal",
    edgeOpacity: 1.4,
    dimmedEdges: 0.35,
    bloom: null,
  },
};

const STORAGE_KEY = "neurolume-theme";

/** The viewer's saved choice, else the system preference. */
export function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return themes[saved];
  } catch {
    // Storage can be unavailable (private windows, file:// pages); fall through.
  }
  return themes[window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"];
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme.name);
  } catch {
    // Not being able to remember the choice is fine.
  }
}

/** A named edge gradient, from the input side to the output side. */
export interface Colormap {
  name: string;
  colors: readonly string[];
}

/**
 * Five colourmaps per theme. Dark ones are bright so they glow on black;
 * light ones are deep so they read on white. The first is each theme's default.
 */
export const colormaps: Record<ThemeName, readonly Colormap[]> = {
  dark: [
    { name: "Ember", colors: themes.dark.edgeGradient },
    { name: "Aurora", colors: ["#5eead4", "#38bdf8", "#818cf8", "#c084fc"] },
    { name: "Plasma", colors: ["#f0f921", "#fca636", "#e16462", "#b12a90"] },
    { name: "Viridis", colors: ["#fde725", "#5ec962", "#21918c", "#3b528b"] },
    { name: "Ice", colors: ["#f0f9ff", "#bae6fd", "#7dd3fc", "#a5b4fc"] },
  ],
  light: [
    { name: "Ember", colors: themes.light.edgeGradient },
    { name: "Ocean", colors: ["#0e7490", "#0369a1", "#4338ca", "#6d28d9"] },
    { name: "Magma", colors: ["#3b0f70", "#8c2981", "#de4968", "#f97316"] },
    { name: "Viridis", colors: ["#440154", "#31688e", "#21918c", "#35b779"] },
    { name: "Ink", colors: ["#18181b", "#3f3f46", "#52525b", "#27272a"] },
  ],
};

const colormapKey = (theme: ThemeName) => `neurolume-colormap-${theme}`;

/** The colourmap last chosen for this theme, else its default. */
export function initialColormap(theme: ThemeName): Colormap {
  try {
    const saved = localStorage.getItem(colormapKey(theme));
    const match = colormaps[theme].find((colormap) => colormap.name === saved);
    if (match) return match;
  } catch {
    // Fall back to the default below.
  }
  return colormaps[theme][0];
}

export function saveColormap(theme: ThemeName, colormap: Colormap): void {
  try {
    localStorage.setItem(colormapKey(theme), colormap.name);
  } catch {
    // Not being able to remember the choice is fine.
  }
}

/** A theme with its edges recoloured by a colourmap. */
export function withColormap(theme: Theme, colormap: Colormap): Theme {
  return { ...theme, edgeGradient: colormap.colors };
}

/** A CSS gradient for showing a colourmap as a small swatch. */
export function colormapCss(colormap: Colormap): string {
  return `linear-gradient(90deg, ${colormap.colors.join(", ")})`;
}
