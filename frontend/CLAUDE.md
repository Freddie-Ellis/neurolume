# frontend — notes for Claude

TypeScript + Vite + three.js (r170). The viewer is driven purely by the graph
JSON from `/api/graph` (or `window.__NEUROLUME_GRAPH__` for future HTML exports).
After any change: `npx tsc`, `npx vitest run`, then `scripts/build_frontend.ps1`
from the repo root. The user refreshes the browser; no Python restart needed.

## Files (`src/`)

| File | What it does |
| --- | --- |
| `main.ts` | Entry. `View` (system overview or one network), `Stage` (shows a view, rebuilds on theme change, back/fit, zoom-in/zoom-out navigation), title card, controls (Overview when nested, Settings panel with theme, edge colourmap and the `CONTROLS` reference), keyboard (f, t, Esc) |
| `schema.ts` | **Generated** from pydantic — never edit by hand |
| `theme.ts` | `themes` (dark/light), `colormaps` (5 per theme), localStorage helpers, `withColormap()` |
| `layout/columns.ts` | Single-network layout: which nodes are columns vs bands, neuron slots (cap 64, ellipsis gap), tall equal-height panels, `linkSegments()` (weights → visible pairs) |
| `layout/maps.ts` | Feature-map stacks for `[C, H, W]` layers: `mapStack()` slabs (≤12; size = `MAX_MAP_SIZE` × √(size / largest map in the network), so small maps stay readable), `mapPorts()`, `funnel()` (kernel window → point, drawn as outlines over a faint filled cone), `decodeFeatureMaps()`. With `graph.feature_maps`, `render/network.ts` paints each slab with its channel (nearest-filtered `DataTexture`, panel colour → layer colour; front slab = most active channel). An image input only becomes a stack when the next layer is also maps, so MLPs keep an input neuron column |
| `layout/curves.ts` | `sampleCurve()`: Bézier with random `bend`/`handle` and a pinned `wave` ripple |
| `layout/system.ts` | `isSystem()`, `layoutSystem()` (cards, ranks by longest path, barycenter ordering), `subgraph()` (one group as a standalone graph, adds synthetic input/output), `strandCount()`/`strandSlots()` for links |
| `render/viewer.ts` | three.js renderer, ortho camera (1 world unit = 1 CSS px at zoom 1), pan/zoom, bloom, render-on-demand, `onUserZoom`, `pauseZoom()`, `fitInsetTop` (fit keeps the title card clear) |
| `render/network.ts` | Detailed view: panels, bands, neurons, labels, `titleFor()`/`nameLayers()`, `setHighlight()`, `disposeNetwork()` |
| `render/edges.ts` | Edge `LineSegments` per link (RGBA: colour from gradient, alpha from weight strength); stack→stack links are funnels. Edges leave at `exitX` and arrive at `entryX` |
| `render/system.ts` | Overview: cards with mini previews, links as bundles of strands (one per tensor value, cap 48; ribbon + arrowhead only when the shape is unknown), link chips; network cards get `activate`; blocks open the inspector, with a "Notes" hint when they have notes |
| `ui/interaction.ts` | Hover/tooltip/click/dblclick; `pickAt()`; listeners use an AbortController (`detach()`) |
| `ui/inspector.ts` | Right-hand layer details panel; System blocks get a Block header and a Notes section |
| `ui/notes.ts` | Markdown → sanitised HTML (marked + marked-katex-extension + DOMPurify), **dynamically imported** by the inspector so KaTeX isn't in the main bundle |
| `ui/format.ts` | Number/shape/activation/framework formatting |
| `style.css` | Tokens per `[data-theme]` (`--radius` 2px, `--mono`), labels, cards, segmented toolbar, inspector, colourmap menu, `.notes` |

## Key design decisions (don't undo without asking)

- **Render on demand only.** No per-frame animation; a continuous "flow"
  animation was removed because it maxed out the user's Intel iGPU.
- **Theme switch = rebuild.** Colours are baked into materials; `Stage.setTheme`
  disposes and rebuilds the current view. Bloom only in dark theme, always on.
- Light theme uses `NormalBlending` for edges (additive vanishes on white);
  `edgeOpacity`/`dimmedEdges` per theme were tuned with the user.
- Labels are HTML via `CSS2DRenderer`. Its container has `z-index: 0` so label
  z-indexes don't beat the floating cards (`.surface` is `z-index: 1`).
- Interaction is reused for the overview: `buildSystem()` returns the same
  `Network` shape; a `Pickable.activate` replaces the inspector click.
- Navigation: click or zoom into a network card (fills `ZOOM_IN_FILL`) opens
  it; zooming below `ZOOM_OUT_TO_PARENT` × fit zoom, Esc, or Overview goes back.
  After going *in*, scroll zoom is ignored for `ZOOM_PAUSE_MS`, then eases back
  in over `ZOOM_EASE_IN_MS` even if the scroll continues (`pauseZoom`). A
  "wait until the scroll gesture ends" version was tried and rejected: it never
  released while the user kept scrolling.

- No Fit button and no hint line at the bottom: the user moved theme,
  colourmap and the controls reference into the Settings panel. Fit is still
  `f` / double-click empty space.
- **Visual style: technical schematic** (chosen by the user to look less
  "AI-generated"). IBM Plex Sans for text, Plex Mono (`var(--mono)`) for
  numbers, shapes and small uppercase labels; 2px corners everywhere (scene:
  `PANEL_RADIUS`/`CARD_RADIUS` = 2); solid surfaces with hairline borders, no
  backdrop blur, no soft shadows; neutral ink accent, so the edge colourmap is
  the only colour. Avoid reintroducing pills, big radii, glass or purple accents.

## Gotchas

- three.js mixes colours in linear space: even a 5% tint of a bright colour
  into a dark fill comes out visibly brown. Slab fills are untinted for that reason.

- CSS2D labels keep their pixel size while the scene zooms, so anything that
  must sit at a card edge (e.g. the "Notes" hint) needs its own label anchored
  there (`center.set(1, 1)` = bottom-right), not flex layout inside one label.

- Block notes are shown **only in the inspector**. A zoomable note page was
  tried and rejected by the user; don't add zoom-in navigation for blocks.

- Neuron ids in systems are prefixed (`encoder/0`); always display names via
  `titleFor()`, which strips prefixes and numbers Sequential children in drawing order.
- `.controls button { display: flex }` overrides `hidden`; there is an explicit
  `[hidden] { display: none }` rule — keep it when adding buttons.
- `tsconfig` uses `skipLibCheck` (vitest types need Node types otherwise).
- Keep tests pure (layout, curves, names); three.js objects are checked by
  screenshot (see root `CLAUDE.md`).
