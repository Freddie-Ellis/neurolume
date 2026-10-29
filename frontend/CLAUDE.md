# frontend — notes for Claude

TypeScript + Vite + three.js (r170). The viewer is driven purely by the graph
JSON from `/api/graph` (or `window.__NEUROLUME_GRAPH__` for future HTML exports).
After any change: `npx tsc`, `npx vitest run`, then `scripts/build_frontend.ps1`
from the repo root. The user refreshes the browser; no Python restart needed.

## Files (`src/`)

| File | What it does |
| --- | --- |
| `main.ts` | Entry. `View` (system overview or one network; `origin` = the parent card it was opened from, `cardBounds()` for overviews), `Stage` (shows a view, rebuilds on theme change, back/fit, zoom-in/zoom-out navigation; going back starts framed on the origin card and glides out with `viewer.flyTo` over `ZOOM_OUT_MS`, zoom paused meanwhile; `goUpTo()`), title card, depth tree (bottom left: every level down to this one, earlier levels clickable; fit keeps it clear via `fitInsetBottom`), controls (Overview when nested, Settings panel with theme, edge colourmap and the `CONTROLS` reference), keyboard (f, t, Esc) |
| `schema.ts` | **Generated** from pydantic — never edit by hand |
| `theme.ts` | `themes` (dark/light), `colormaps` (5 per theme), localStorage helpers, `withColormap()` |
| `layout/columns.ts` | Single-network layout: which nodes are columns vs bands, neuron slots (cap 64, ellipsis gap), tall equal-height panels, `linkSegments()` (weights → visible pairs). Branching: one row in node order; neighbouring columns are linked only if every step between them (through bands) is a real edge (`flows`; a graph with no edges counts as a chain); every other edge is an `ArcLayout` from `layoutArcs()` under the panels, shortest arcs in the lanes nearest the panels (`ARC_LANE_GAP`); its `start`/`end` is a column or a band. Bands have a `kind`: `merge` (add/concat), `flatten` (only after a stack; has `stripHalfHeight`) or `plain`. `LinkLayout.through` lists the merge/flatten bands a link passes. `StubLayout`: a column not linked onward converges on the first merge band it feeds, else the last band an arc leaves from (e.g. ResNet `conv2 → bn2`). Columns are spaced by their real footprint: `reach` = half a stack's footprint + `STACK_MARGIN`, neighbours at least `COLUMN_SPACING` apart and far enough for both reaches plus `BAND_ROOM` per band between them; panels meet halfway between centres; bands spread over the clear gap between stacks. Bands after the last column are `TRAILING_BAND_STEP` apart |
| `layout/maps.ts` | Feature-map stacks for `[C, H, W]` layers: `mapStack()` slabs (≤12; size = `MAX_MAP_SIZE` × √(size / largest map in the network), so small maps stay readable), `mapPorts()`, `cellLinks()` (input cell → output cell, ≤3×3 samples of each kernel window via `sweepOf()` kernel/stride/padding, every n-th output cell so a link stays ≤`MAX_MAP_EDGES` = 480), `gridLines()` (drawn on every slab), `flattenedCell()` (value → its cell on its channel's slab, using the recorded channel order), `decodeFeatureMaps()`. With `graph.feature_maps`, `render/network.ts` paints each slab with its channel (nearest-filtered `DataTexture`, panel colour → layer colour; front slab = most active channel). An image input only becomes a stack when the next layer is also maps, so MLPs keep an input neuron column |
| `layout/curves.ts` | `sampleCurve()`: Bézier with random `bend`/`handle` and a pinned `wave` ripple |
| `layout/system.ts` | `isSystem()`, `layoutSystem()` (cards, ranks by longest path, barycenter ordering), `subgraph()` (one group as a standalone graph, adds synthetic input/output; its nested groups become top-level, so an autoencoder inside a System or a ResNet stage opens as its own overview; layers fed from outside the group are fed by the synthetic input, so a block keeps its skip edge, and the input borrows the feeding layer's feature maps; nodes keep their `group` so names can drop its prefix). Cards count `partCount` (child networks) for nested groups, `strandCount()`/`strandSlots()` for links. `subgraph()` keeps what is outside: one input/output per outside neighbour, named as one level up (`outsideName`), with `params.context` ("from Sensor bus"), `contextName` and `outside: true` (`isOutside()`); if the neighbour feeds the group's own input/output node, that node is labelled instead. Cards carry a `Miniature`: `layersMiniature()` (the real layout scaled: neuron columns, stacks, merge nodes, links, arcs), `partsMiniature()` (parts as boxes from the inner overview, no inputs/outputs) or `layerGlyph()` for loose layer cards |
| `render/viewer.ts` | three.js renderer, ortho camera (1 world unit = 1 CSS px at zoom 1), pan/zoom, bloom, render-on-demand, `onUserZoom`, `pauseZoom()`, `fitInsetTop` (fit keeps the title card clear) |
| `render/network.ts` | Detailed view: panels, bands, neurons, labels, `titleFor()`/`nameLayers()`, `setHighlight()`, `disposeNetwork()` |
| `render/edges.ts` | Edge `LineSegments` per link (RGBA: colour from gradient, alpha from weight strength); stack→stack and stack→dense links are organic curves like dense ones, spread over **all** slabs of a stack (a conv reads every input channel and writes every output channel). Each edge end sits at its slab's depth (`slabZ()`, `SLAB_Z`/`SLAB_Z_STEP` shared with the slab meshes), so nearer slabs hide it and it reads as going into the stack; lines on the front slab visibly reach their cells, and faded to a quarter where they cross a stack (`FADE`) so the maps show through; stack→dense keeps the strongest `MAX_CELL_EDGES` = 700. Drawing them behind the slabs was tried and rejected: the lines looked like they went behind, not into, the maps. Neuron edges leave at `exitX` and arrive at `entryX` |
| `render/system.ts` | Overview: cards with mini previews (header has `card-header`; at "medium" detail, < 0.8× zoom, only card names and previews show), loose layer cards titled by `titleFor()`, links as bundles of strands (one per tensor value, cap 48; ribbon + arrowhead only when the shape is unknown), link chips; network cards get `activate`; blocks open the inspector, with a "Notes" hint when they have notes |
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
- Bands show what they do (user asked): add/concat are `.merge-node` circles (⊕ / ∥, caption above) that edges pinch through (`MERGE_NECK`) and arcs rise into (`MERGE_RADIUS`); a flatten after a stack is a strip of cells (`buildStrip`) that each edge into the dense layer threads through at its flattened index (`Curve.flat`); other chips get a small SVG icon (`bandIcon`: bell curve for norm, broken line for dropout, activation shape, arrow for output).
- Skip connections are arcs (`buildArc` in `render/edges.ts`): one strand per value carried (`strandCount`, cap 48, like system links), leaving a column's cells (scattered via `flattenedCell`) or a band's node, gathering into a neck under a column (`ARC_NECK_DROP`), dipping to the lane (Catmull-Rom with per-strand jitter) and rising into the target. Opacity counts strands × `ARC_DIMMING`. The user rejected the first version (7 parallel strands ending at band bottoms) as uniform and "linking into nothing". Arcs and stubs are part of `network.edges`, so hovering either end layer lights them. `EdgeBundle.ends` holds the two node ids.
- Outside neighbours (one level up) are shown as **edges running off screen**, fading out, as if heading on to the rest of the system. The user rejected faded dashed cards for them. In overviews, `layoutSystem` moves outside cards `OUTSIDE_SHIFT` out and leaves them out of the bounds, except `OUTSIDE_ROOM` so the strands visibly come in. The renderer skips their cards, fades their strands (`OUTSIDE_FADE`) and puts a "from Sensor bus" / "to Alarm" chip `OUTSIDE_CHIP` from the shown card. In layer views, `buildLead` in `render/edges.ts` runs edges into an input with `params.context` and out of an output band with it (`LEAD_LENGTH`, vanishing via `bundle(..., vanish)`).
- Bands sit **between** panels (user asked): when bands lie between two columns, the gap between their panels widens to hold them (`gutter()` in `layoutGraph`); trailing bands start after the last panel.
- Loose single layers in an overview (`isLayer`: Keras `gap`, `pool`) are `LAYER_CARD` panels with their stack or neurons drawn large, not small blocks. Cards whose network has parts are `PARTS_CARD`-sized, and each part box draws its own miniature inside (`MiniItem.box.inner`, to `PREVIEW_DEPTH`), so any depth scales to fit. Preview links are curved strands (`strands()`), not straight lines.
- Merge nodes: arcs and stubs end at the node's centre (covered by the HTML node at any zoom; ending short left a gap when zoomed in). After the node, edges stay bundled for `MERGE_HOLD`, opening out gently (`MERGE_FLARE`, ripple cut to `CALM`; a full ripple bulged, and straight parallel lines looked like a rigid bar when zoomed in) before fanning out, and a ▶ on the node's right marks the output, so in vs out is readable (user feedback). Arcs follow the same rule: one leaving a band runs right along its output for `MERGE_HOLD` before dipping; one arriving comes in from the lower left with the inputs (both rising from below read as ambiguous). Merge bands have no dashed line.
- A zoom-out limit (0.45 × fit zoom) was tried and rejected by the user ("horrible"); don't add one back.
- Overviews nest: opening a card whose network has parts gives another `systemView` (parent = the overview it came from), any depth; Esc/Overview go up one level.
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
