# UI notes: what award-winning sites do, and what Neurolume takes from them

Research, 30 Oct 2026: Awwwards (Sites of the Day, the data-visualisation
collection, Cerebrium's SOTD page) plus the published working methods of the
agencies that win most often (Locomotive, Studio Freight, AREA 17, Active
Theory). Awwwards listing pages give names, scores and tags rather than
screenshots, so the patterns below come from those tags, the jury score
breakdowns and the agencies' methods, not from pixel-by-pixel study.

## What the winners have in common

- **Typography is the design.** Recent SOTD font filters are dominated by
  grotesques (Aeonik, GT), condensed display faces and monospaces (Fragment
  Mono, Azeret Mono). Winners pair one big display moment with small, quiet
  text: 10:1 scale contrast or more, tight tracking on large type.
- **Restraint in colour.** One neutral ground and one owned accent. Cerebrium
  (SOTD 10 Sep 2026, AI infrastructure) uses just two colours around a WebGL
  scene. Colour is where the content is, not in the chrome.
- **The visual is the hero; chrome steps back.** WebGL sites (Three.js shows up
  on many SOTD tags) keep navigation as small, frameless type pinned to the
  edges, like a heads-up display, rather than boxed panels.
- **Usability is scored, not just looks.** Cerebrium: design 7.33, usability
  7.43, creativity 7.38, content 7.55. Its developer award scored animation
  (8.2) and responsiveness (8.2) highest, markup (6.6) and performance (7.0)
  lowest. Juries reward sites that stay clear and fast, not only striking.
- **Motion is short and purposeful.** Custom easing (expo-out, about
  `cubic-bezier(0.16, 1, 0.3, 1)`), things that enter rather than pop, never
  blocking input, and switched off for `prefers-reduced-motion`.
- **The 1% details.** Designed loading states, branded text selection, visible
  but on-brand focus rings, styled scrollbars and form controls, no browser
  defaults left showing.

## Where Neurolume stood (before this pass)

Already strong: a technical-schematic identity (Plex Sans/Mono, 2px corners,
hairlines, ruler ticks), high-contrast themes, colour only in the edges, no
continuous animation. Rough score against the Awwwards rubric: about 6.5/10.

Gaps:

1. **Every piece of chrome had the same weight.** Title, Settings, Levels and
   the inspector were all boxes with the same hairline border, so four boxes
   competed with the network for attention.
2. **The title had little presence.** The model name at 24px is the page's one
   display moment, and it was boxed in with its stats.
3. **Settings overflowed.** The colourmap list took five full rows, so the panel
   scrolled with a default browser scrollbar and cut off the Controls section.
4. **Things popped in.** Panels and the tooltip appeared instantly, and the page
   was blank while the graph loaded.
5. **Some browser defaults were left:** text selection colour, scrollbars.

## What changed

| Gap | Change |
| --- | --- |
| 1, 2 | Title and Levels lose their boxes and become HUD type on the canvas: a large display title (tight tracking) over a mono readout line, and a tree marked by a hairline rule. Boxes are kept for things you work in (Settings, inspector, tooltip). |
| 3 | Colourmaps are a row of five swatches (name shown for the chosen one), so Settings fits without scrolling on a laptop screen; thin themed scrollbars where scrolling remains. |
| 4 | Panels, the inspector and the tooltip enter with a short expo-out fade and slide (160–220ms, one-shot, nothing continuous). A "Tracing graph" line shows while the graph loads. All motion is off under `prefers-reduced-motion`. |
| 5 | Ink-coloured `::selection`, styled scrollbars. |

Kept on purpose (user decisions): no continuous animation, no smooth-scroll
library (scroll is zoom here), no custom cursor, no zoom transitions between
levels, the edge looks and zoom thresholds, the schematic type and corners.
