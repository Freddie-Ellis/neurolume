# frontend — notes for Claude

TypeScript + Vite + three.js (r170). The viewer is driven purely by the graph
JSON from `/api/graph` (or `window.__NEUROLUME_GRAPH__` in an `export_html()` file;
`vite build --mode export` in `vite.config.ts` makes that single-bundle build: no lazy chunks, fonts inlined).
After any change: `npx tsc`, `npx vitest run`, then `scripts/build_frontend.ps1`
from the repo root. The user refreshes the browser; no Python restart needed.

## Files (`src/`)

| File | What it does |
| --- | --- |
| `main.ts` | Entry. `View` (system overview or one network; `origin` = the group it shows, `cardBounds()` for overviews), `childView()`, `Stage` (shows a view, rebuilds on theme change, back/fit, zoom-in/zoom-out navigation, `openPath()`), title card, depth tree (bottom left: the whole model, any level clickable), controls (Overview when nested, Settings panel with theme, edge colourmap, Detail sliders (`LIMIT_CONTROLS`), an Export button (downloads `/api/export`; hidden inside an exported file) and the `CONTROLS` reference), keyboard (f, t, Esc) |
| `schema.ts` | **Generated** from pydantic — never edit by hand |
| `limits.ts` | `limits`: the drawing caps (neurons per column, edges per dense layer in `linkSegments` — capped by what Python sends, `weight_k` —, maps per stack, map edges, map→dense edges, strands per link) the user sets in Settings → Detail, saved in localStorage; layout/render code reads them at build time, and views re-lay out on every build (`networkView`/`systemView`), so a change applies on rebuild |
| `theme.ts` | `themes` (dark/light), `colormaps` (5 per theme), localStorage helpers, `withColormap()` |
| `layout/columns.ts` | Single-network layout: which nodes are columns vs bands, neuron slots (cap 64, ellipsis gap), tall equal-height panels, `linkSegments()` (weights → visible pairs). Branching: one row in node order, except that neighbouring neuron columns of equal rank (longest path, bands don't count) with no bands between are parallel branches (two heads on one trunk): they share a slot (`slotOf`), same x, splitting the panel height (`part()`), and the panels grow so each part fits. Columns in neighbouring slots are linked when a chain of real edges through bands only joins them (`route`; a graph with no edges counts as a chain); every other edge (not `covered` by a link) is an `ArcLayout` from `layoutArcs()` under the panels, shortest arcs in the lanes nearest the panels (`ARC_LANE_GAP`); its `start`/`end` is a column or a band. Bands have a `kind`: `merge` (add/concat), `flatten` (only after a stack; has `stripHalfHeight`) or `plain`. `LinkLayout.through` lists the merge/flatten bands a link passes. `StubLayout`: parallel branches (shared slot) converge straight on a band they feed after the slot (two heads into the output; `outLead` then leaves from that band); any other column not linked onward converges on the first merge band it feeds, else the last band an arc leaves from (e.g. ResNet `conv2 → bn2`). Columns are spaced by their real footprint: `reach` = half a stack's footprint + `STACK_MARGIN`, neighbours at least `COLUMN_SPACING` apart and far enough for both reaches plus `BAND_ROOM` per band between them; panels meet halfway between centres; bands spread over the clear gap between stacks. Bands after the last column are `TRAILING_BAND_STEP` apart |
| `layout/maps.ts` | Feature-map stacks for `[C, H, W]` layers: `mapStack()` slabs (≤12; size = `MAX_MAP_SIZE` × √(size / largest map in the network), so small maps stay readable), `mapPorts()`, `cellLinks()` (input cell → output cell, ≤3×3 samples of each kernel window via `sweepOf()` kernel/stride/padding, every n-th output cell so a link stays ≤`MAX_MAP_EDGES` = 480), `gridLines()` (drawn on every slab), `flattenedCell()` (value → its cell on its channel's slab, using the recorded channel order), `decodeFeatureMaps()`. With `graph.feature_maps`, `render/network.ts` paints each slab with its channel (nearest-filtered `DataTexture`, panel colour → layer colour; front slab = most active channel). An image input only becomes a stack when the next layer is also maps, so MLPs keep an input neuron column |
| `layout/curves.ts` | `sampleCurve()`: Bézier with random `bend`/`handle` and a pinned `wave` ripple; `curveSegments()`/`segmentsFor()` pick the segment count from the length (`CURVE_STEP`, 16–256) so long links stay smooth |
| `layout/system.ts` | `isSystem()`, `layoutSystem()` (cards, cycles broken by a DFS in card order marking `CardLink.back`, ranks by longest path over forward links; a forward link skipping ranks gets a `LANE_HEIGHT` lane in each, ordered and placed like a card, and its `CardLink.via` holds each lane's two ends; barycenter ordering; links on one side of a card split its height (`outShare`/`inShare`, ordered by where they head; `strandSlots(count, card, share)`); block cards widen to fit their description, up to `MAX_NODE_WIDTH`), `subgraph()` (one group as a standalone graph, adds synthetic input/output; its nested groups become top-level, so an autoencoder inside a System or a ResNet stage opens as its own overview; layers fed from outside the group are fed by the synthetic input, so a block keeps its skip edge, and the input borrows the feeding layer's feature maps; nodes keep their `group` so names can drop its prefix). Cards count `partCount` (child networks) for nested groups, `strandCount()`/`strandSlots()` for links. `subgraph()` keeps what is outside: one input/output per outside neighbour, named as one level up (`outsideName`), with `params.context` ("from Sensor bus"), `contextName` and `outside: true` (`isOutside()`); if the neighbour feeds the group's own input/output node, that node is labelled instead. Cards carry a `Miniature`: `layersMiniature()` (the real layout scaled: neuron columns, stacks, merge nodes, links, arcs), `partsMiniature()` (parts as boxes from the inner overview, no inputs/outputs) or `layerGlyph()` for loose layer cards |
| `render/viewer.ts` | three.js renderer, ortho camera (1 world unit = 1 CSS px at zoom 1), pan/zoom (`minZoom`), bloom, render-on-demand, `onUserZoom`, `pauseZoom()`, `screenRect()`/`frameIn()`, fit insets (title card, depth tree) |
| `render/network.ts` | Detailed view: panels, bands, neurons, labels, `titleFor()`/`nameLayers()`, `setHighlight()`, `disposeNetwork()` |
| `render/edges.ts` | Edge `LineSegments` per link (RGBA: colour from gradient, alpha from weight strength); stack→stack and stack→dense links are organic curves like dense ones, spread over **all** slabs of a stack (a conv reads every input channel and writes every output channel). Each edge end sits at its slab's depth (`slabZ()`, `SLAB_Z`/`SLAB_Z_STEP` shared with the slab meshes), so nearer slabs hide it and it reads as going into the stack; lines on the front slab visibly reach their cells, and faded to a quarter where they cross a stack (`FADE`) so the maps show through; stack→dense keeps the strongest `MAX_CELL_EDGES` = 700. Drawing them behind the slabs was tried and rejected: the lines looked like they went behind, not into, the maps. Neuron edges leave at `exitX` and arrive at `entryX` |
| `render/system.ts` | Overview: cards with mini previews (stacks have solid, panel-coloured slabs in front of the strands, `SLAB_FILL_Z`, so they hide what is behind like the detailed view's slabs; header has `card-header`; at "medium" detail, < 0.8× zoom, only card names and previews show), loose layer cards titled by `titleFor()`, links as bundles of strands (one per tensor value, cap 48; ribbon + arrowhead only when the shape is unknown) routed through their lanes (`linkCurve`, joined Béziers; each strand ripples along a lane, `LANE_WAVE`, so skipped columns don't turn the bundle into ruled lines), drawn behind card panels (`renderOrder` -1) unless they run into a layer card's ports; link chips halfway across the gap after the source; card headers clipped to the card's on-screen width (`--zoom`, set by the viewer, ellipsis); network cards get `activate`; blocks open the inspector, with a "Notes" hint when they have notes |
| `ui/interaction.ts` | Hover/tooltip/click/dblclick; `pickAt()`; listeners use an AbortController (`detach()`) |
| `ui/inspector.ts` | Right-hand layer details panel; System blocks get a Block header and a Notes section |
| `ui/notes.ts` | Markdown → sanitised HTML (marked + marked-katex-extension + DOMPurify), **dynamically imported** by the inspector so KaTeX isn't in the main bundle |
| `ui/format.ts` | Number/shape/activation/framework formatting |
| `style.css` | Tokens per `[data-theme]` (`--radius` 2px, `--mono`), labels, cards, segmented toolbar, inspector, colourmap menu, `.notes` |

## Code map (read this before opening the big files)

How a graph becomes pixels: `main.ts` `loadGraph()` → `Stage.show(view)` →
`view.build(theme)` → `buildSystem(layoutSystem(g))` for overviews or
`buildNetwork(layoutGraph(g))` for one network → `attachInteraction()`.
`layout/*` is pure (numbers only, unit-tested); `render/*` turns layouts into
three.js objects and HTML labels. Grep for the names below; they are in file order.

**`main.ts`**: `View` / `networkView` / `systemView` / `childView` (one screen
each) · `Stage` (`show`, `back`, `openPath`, `fit`, `setTheme`, `remount`;
zoom navigation in its constructor's `onUserZoom`) · `pathOf` ·
`renderDepthTree` · `renderTitleCard` · `buildControls` (Settings panel, keys
f/t) · `main()` (wires everything; Esc handler).

**`layout/columns.ts`**: constants (spacing, `BAND_ROOM`, `STACK_MARGIN`) ·
types `ColumnLayout`, `BandLayout` (`kind`), `LinkLayout` (`through`),
`StubLayout`, `ArcLayout` · `layoutGraph()`, in steps: columns vs bands →
`reach`/centres → neuron slots → bands spread in the gaps (`runs`) → panels
(`gutter()`) → links (`flows`) → `layoutArcs()` → stubs → bounds ·
`linkSegments()` (weights → drawn neuron pairs).

**`layout/maps.ts`**: `mapStack` / `frontSlab` / `slabZ` / `mapPorts` (stack
geometry) · `sweepOf` (kernel/stride/padding, adaptive pools) · `cellLinks`
(conv edges) · `gridLines` · `flattenedCell` (flatten index → cell) ·
`decodeFeatureMaps`.

**`layout/system.ts`**: card sizes · `Card`, `Miniature`/`MiniItem`,
`CardLink` · `subgraph()` (a group as its own graph, outside neighbours as
context terminals) · `layoutSystem()` (cards → links → ranks → order → place →
outside cards shifted out) · `strandCount`/`strandSlots` · `networkCard` /
`nodeCard` · `layersMiniature` / `partsMiniature` / `layerGlyph`.

**`render/network.ts`** (one network): `buildNetwork()` (edges first, then
panels, slabs, neurons, bands, labels; returns `Network` = root + `pickables`
+ `edges`) · `buildSlabs` / `mapTexture` · `buildPanel` · `buildBand` /
`bandLabel` / `bandIcon` / `buildStrip` (flatten) · `outLead` · `titleFor` /
`nameLayers` / `localId` (display names) · helpers `label`, `roundedRect`,
`escapeHtml`.

**`render/edges.ts`** (all edge lines): look constants at the top (`FADE`,
`MERGE_*`, `ARC_*`, `LEAD_*`) · `buildEdges` (between columns, through
merge/flatten bands) · `buildStub` · `buildArc` (skip connections) ·
`buildLead` (edges off screen) · curve sources `mapCurves` / `neuronCurves` /
`cellCurves` · `organicPath` (the wobbly path through waypoints) · `bundle`
(one `LineSegments`, RGBA alpha, fades) · `gradientColour`, `pseudoRandom`.

**`render/system.ts`** (overview): `buildSystem()` · `buildCard` /
`cardLabels` / `kindText` · previews: `addPreview` → `drawMiniature` →
`drawNeurons` / `drawStack` (solid slabs, depth per slab) / `drawMerge` /
`drawBox` (recurses), `strands` (curved preview links) · links between cards:
`buildLink` (path from `linkCurve`: back links loop under the cards, `BACK_LINK_*`, strands loosened by `BACK_LINK_LOOSEN`) → `buildStrands` (into layer cards: `ports`; into dense layers: fan
out) or `buildRibbon` (unknown shape) · `outsideAlpha`.

**`render/viewer.ts`**: `Viewer` (renderer, ortho camera, bloom,
render-on-demand via `requestRender`, `fitTo`/`fitTarget`, `screenRect` /
`frameIn`, `pauseZoom`, pan/zoom in `attachPanZoom`, label detail levels in
`renderIfNeeded`).

**`ui/interaction.ts`**: `pickAt` (raycast pickables) · `attachInteraction`
(hover highlight + tooltip, click → inspector or `activate`, double-click fit).

### Where to change what

| To change… | Edit |
| --- | --- |
| How edges look (wobble, fades, merge neck, arcs) | constants at the top of `render/edges.ts`, then `organicPath` / `buildArc` |
| Spacing between layers or bands, panel edges | `layoutGraph` constants and the `gutter()` step in `layout/columns.ts` |
| Which nodes are bands vs columns, band kinds | `BAND_TYPES`, `MERGE_TYPES` and the `kind` line in `layoutGraph` |
| A band's chip text or icon | `bandText` / `bandIcon` in `render/network.ts` |
| Layer names shown | `titleFor` / `localId` in `render/network.ts` |
| Card sizes, ranking, what a card previews | `layout/system.ts` (`*_CARD`, `layoutSystem`, `*Miniature`) |
| How a preview is drawn | `drawMiniature` and friends in `render/system.ts` |
| Links between cards | `buildLink` / `buildStrands` in `render/system.ts` |
| What opening/going back does, zoom thresholds | `Stage` and the `ZOOM_*` constants in `main.ts` |
| Label hiding when zoomed out | `LOW/MEDIUM_DETAIL_ZOOM` in `render/viewer.ts`, `.labels[data-detail]` rules in `style.css` |
| Colours, fonts | `theme.ts`, tokens at the top of `style.css` |

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
- Skip connections are arcs (`buildArc` in `render/edges.ts`): one strand per value carried (`strandCount`, cap 48, like system links), leaving a column's cells (scattered via `flattenedCell`) or a band's node, gathering into a neck under a column (`ARC_NECK_DROP`), dipping to the lane (Catmull-Rom with per-strand jitter, a third of `ARC_LANE_GAP`) and rising into the target. From a neuron column, strands first step sideways (`ARC_SIDESTEP`, right when leaving, from the left when arriving) so they don't cross its neurons; from a column with a parallel branch below it (panel bottom above 0) they run down the gap beside its panel. Opacity counts strands × `ARC_DIMMING`. The user rejected the first version (7 parallel strands ending at band bottoms) as uniform and "linking into nothing". Arcs and stubs are part of `network.edges`, so hovering either end layer lights them. `EdgeBundle.ends` holds the two node ids.
- Outside neighbours (one level up) are shown as **edges running off screen**, fading out, as if heading on to the rest of the system. The user rejected faded dashed cards for them. In overviews, `layoutSystem` moves outside cards `OUTSIDE_SHIFT` out and leaves them out of the bounds, except `OUTSIDE_ROOM` so the strands visibly come in. The renderer skips their cards, fades their strands (`OUTSIDE_FADE`) and puts a "from Sensor bus" / "to Alarm" chip `OUTSIDE_CHIP` from the shown card. In layer views, `buildLead` in `render/edges.ts` runs edges into an input with `params.context` and out of an output band with it (`LEAD_LENGTH`, vanishing via `bundle(..., vanish)`).
- Bands sit **between** panels (user asked): when bands lie between two columns, the gap between their panels widens to hold them (`gutter()` in `layoutGraph`); trailing bands start after the last panel.
- Loose single layers in an overview (`isLayer`: Keras `gap`, `pool`) are `LAYER_CARD` panels with their stack or neurons drawn large, not small blocks. Cards whose network has parts are `PARTS_CARD`-sized, and each part box draws its own miniature inside (`MiniItem.box.inner`, to `PREVIEW_DEPTH`), so any depth scales to fit. Preview links are curved strands (`strands()`), not straight lines.
- Merge nodes: arcs and stubs end at the node's centre (covered by the HTML node at any zoom; ending short left a gap when zoomed in). After the node, edges stay bundled for `MERGE_HOLD`, opening out gently (`MERGE_FLARE`, ripple cut to `CALM`; a full ripple bulged, and straight parallel lines looked like a rigid bar when zoomed in) before fanning out, and a ▶ on the node's right marks the output, so in vs out is readable (user feedback). Arcs follow the same rule: one leaving a band runs right along its output for `MERGE_HOLD` before dipping; one arriving comes in from the lower left with the inputs (both rising from below read as ambiguous). Merge bands have no dashed line.
- **Drawing a card's contents inside it** (one zoomable world, level of detail: a card past 40% of the screen built its network in place) was tried and rejected by the user: the links between cards stopped at the card edge while the network inside started at its own input, which read as disconnected. Levels are separate views again.
- Zoom out stops at `MIN_ZOOM_OF_FIT` (0.45) × the view's fit zoom (`viewer.minZoom`, set in `Stage.fit`), just under `ZOOM_OUT_TO_PARENT` so zooming out of a nested view still goes back up (user asked).
- No zoom animations between levels: a glide out from the card you left was tried and rejected ("horrible"). Instead `back()` opens the parent with the card you were in placed exactly where the level you left was on screen (`viewer.screenRect` → `viewer.frameIn` with `View.cardBounds`), so continued scrolling pulls back from it naturally. Zooming *in* to open a card only triggers while actually zooming in (`lastZoom`), so landing on the card doesn't reopen it.
- Overview links into a dense layer card fan out to all its neurons (`DENSE_STRANDS`, every neuron reached); stacks in previews take links on every slab on both sides (entering the front and leaving the back read as front-to-back flow). A link with an unknown shape stays one ribbon even to/from outside (it fades; no arrowhead off screen).
- The depth tree (bottom left, "Levels") always lists the **whole** model (top level plus every group, by `parent`); clicking a row opens that level (`Stage.openPath`, built with `childView`). The current level has a bar, the levels above it are brighter. A short tree is cleared with `fitInsetBottom`; a tall one (taller than a quarter of the screen) with `fitInsetLeft`, so the view fits beside it.
- In overviews, links into and out of a single-layer card run through it: strands converge on its neurons or stack (`ports`, from the preview's anchors) instead of stopping at the card edge.
- A lead out of a layer view starts at what feeds the output (the nearest layer or add before it, passing plain bands on the way; `outLead` in `render/network.ts`), so there is no gap between an add and its output chip.
- Overviews nest: opening a card whose network has parts gives another `systemView` (parent = the overview it came from), any depth; Esc/Overview go up one level.
- Navigation: click or zoom into a network card (fills `ZOOM_IN_FILL`) opens it; zooming below `ZOOM_OUT_TO_PARENT` × fit zoom, Esc, or Overview goes back. After going *in*, scroll zoom is ignored for `ZOOM_PAUSE_MS`, then eases back in over `ZOOM_EASE_IN_MS` even if the scroll continues (`pauseZoom`). A "wait until the scroll gesture ends" version was tried and rejected: it never released while the user kept scrolling.

- **HUD chrome** (Oct 2026 pass, notes in `docs/ui-notes.md`): the title (44px display type over a mono readout line) and the Levels tree are frameless type on the canvas with the label shadow, not boxes; boxes are kept for things you work in (Settings, inspector, tooltip). Colourmaps are a row of five swatches, the chosen one named in the heading; the Controls reference is a folded `<details>`, so Settings fits without scrolling. Panels enter with one-shot expo-out keyframes (`--ease-out`, 120–300ms), all off under `prefers-reduced-motion`; nothing loops. A "Loading graph…" line shows until the graph arrives.
- No Fit button and no hint line at the bottom: the user moved theme,
  colourmap and the controls reference into the Settings panel. Fit is still
  `f` / double-click empty space.
- **Visual style: technical schematic** (chosen by the user to look less
  "AI-generated"). IBM Plex Sans for text, Plex Mono (`var(--mono)`) for
  numbers, shapes and small uppercase labels; 2px corners everywhere (scene:
  `PANEL_RADIUS`/`CARD_RADIUS` = 2); solid surfaces with hairline borders, no
  backdrop blur, no soft shadows; neutral ink accent, so the edge colourmap is
  the only colour. Avoid reintroducing pills, big radii, glass or purple accents.
  Instrument frame (pure CSS, no JS, no per-frame cost): `#app::before` draws the edge
  rulers and corner brackets (token `--tick`; no grid, it showed through the panels); titles are ruled blocks, Settings/inspector sections are numbered
  with CSS counters (`section > h3::before`, so never notes headings), the active
  segmented option and an open Settings button are inverted, sliders are a hairline
  track with a square thumb, shortcuts are keycaps. Scene neutrals in `theme.ts`
  (background, panel fill/border) were only made blacker/crisper; edge opacity,
  dimming and bloom were left as tuned.

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
