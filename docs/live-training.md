# Live training: design plan

Status: built, 30 Oct 2026 (L1–L7; notes per milestone in the project plan).
**Changed after use (30 Oct 2026):** per-layer health (L3: health lines,
inspector Training section, card health, dead units) was removed; the user
wants the run as a whole, as TensorBoard shows it but readable. The drawer is
now the Training panel (summary with a convergence/overfitting verdict and the
train/val gap, predictions vs truth, metric charts, whole-model parameter
charts with a distribution view), with `log(split=)` and `predictions()`. The
sections below describe the original plan.
Phase 5 of the project plan, after the Qt widget. The open questions at the
end were settled with defaults, noted there; say if you want them otherwise.

## 1. What this is for

TensorBoard shows training as a wall of separate charts, each about one number,
none about the network. Neurolume already draws the network. Live training
should make **the network itself the dashboard**: you watch the model you
designed learn, and the few numbers you need sit beside it, calm and readable.

Principles:

1. **Architecture-only users see nothing new.** `show()`, `export_html()` and
   `NeurolumeWidget(model)` behave exactly as now. No live code loads in the
   browser unless a run is connected. No extra dependencies.
2. **One call to start, nothing to configure.** Sensible defaults pick what to
   record. Options exist but you never need them to get a good view.
3. **Calm, not busy.** Render on demand only (the Intel iGPU rule): a few
   redraws a second at most, nothing that loops. Change is shown by values
   updating, not by motion.
4. **One data path.** Browser tab and Qt widget get the same stream from the same
   server, so the logger and the browser always agree.
5. **Explain, don't just plot.** Where a number means something (gradients
   vanishing, a layer not learning), say so in words on the layer itself.

## 2. What you see

The live UI only appears once a run is connected. It reuses the HUD style from
the Oct 2026 UI pass (`docs/ui-notes.md`): frameless type on the canvas, mono
readouts, hairlines, the edge colourmap as the only colour.

**On the network (the main event)**

- **Edges carry the current weights.** Brightness follows |weight| as now, but
  live: the same lines brighten and fade as training moves them. A setting
  switches the encoding to *change since start* (which connections the model
  is actually rewriting) or *gradient size* (where learning is happening now).
- **Each layer panel gets a one-line health readout** under its header, e.g.
  `learning · Δ 1.2e-3`, `slow`, `stalled`, `exploding`, with a small coloured
  tick. Computed from the update-to-weight ratio and gradient norm; thresholds
  are documented in the inspector, not hidden.
- **Feature maps refresh** with the latest sampled activations (CNNs), at the
  same throttled rate.
- **Overviews:** each network card gets the same health tick, and links between
  cards can show activation size, so a System (your SAC loop: actor, critic,
  losses) reads as one live machine.

**The run strip (bottom centre, HUD type)**

```
 ● LIVE   step 12,400 · epoch 7        loss 0.0312 ▼ 4%   ╱╲╱‾‾╲__╱‾╲___  ║ ⏸
```

A large mono headline figure (loss unless you choose another) with its trend, a
sparkline of the whole run, step and epoch, a pause toggle (pauses the *view*,
not your training). Click it to open the metrics drawer.

**Choosing what you see**

Every metric you `log()` is available; you pick which ones are on screen:

- **Headline:** click the big figure to swap it for any logged metric (reward
  for RL, accuracy for a classifier).
- **Pinned readouts:** up to four more metrics sit beside the headline in the
  run strip, each with its own sparkline. Pin or unpin from the drawer (a pin
  next to each chart), reorder by dragging.
- **Drawer charts:** show, hide and reorder charts; put two metrics on one chart
  (train vs validation loss); choose smoothing and a log scale per chart.
- **Layer health and edges:** choose which stat the health line shows (update
  ratio, gradient norm, dead units) and what edges encode (|w|, change since
  start, gradient).

Choices are remembered per model name in localStorage, so the same project
opens with the same layout next time, in the browser and in the Qt widget
alike. "Reset layout" in Settings puts the defaults back. Nothing to configure
up front: with no choices made you get loss as the headline and every logged
metric in the drawer.

**The metrics drawer (on demand)**

A panel that slides up from the run strip: one quiet chart per metric (loss,
accuracy, reward, learning rate, anything you log), a shared step axis,
smoothing slider, hover for exact values. Drawn in the schematic style with
hairline axes and mono ticks, by our own small SVG code (no chart library), so
it matches the rest and stays light.

**The inspector, live section**

Click a layer while training: a weight histogram over time (a small "ridge"
of recent snapshots), gradient norm and update ratio sparklines, % dead units
for ReLU layers, and the plain-language health verdict with why.

**Timeline (signature moment)**

The server keeps snapshots, so after (or during) a run you can **scrub back**
through training with a timeline under the run strip and watch the network's
weights at step 0, 500, 5,000... This is the thing TensorBoard can't show: how
the architecture you drew filled in. Scrubbing is user-driven, frame by frame;
an optional play button would step at a few frames a second (see open questions).

## 3. Python API

```python
import neurolume

live = neurolume.watch(model, sample)     # opens the viewer, returns at once
for step, (x, y) in enumerate(loader):
    loss = train_step(model, x, y)
    live.log(step, loss=loss.item(), acc=acc)   # cheap; call every step
live.finish()
```

- `watch()` takes the same arguments as `show()` (models, Systems, options) and
  starts the same server. It records weights automatically by attaching torch
  hooks; `log()` adds scalar metrics. Gradient stats need a hook after
  `backward()`, which `watch()` installs (`register_full_backward_hook` / param
  `.register_hook`), so the user calls nothing extra.
- Throttled by default: weights and stats are sampled at most every
  `every_seconds=0.5`, so `log()` every step costs almost nothing. Sampling
  copies only the drawn connections (the top-k pairs picked at start), not whole
  matrices.
- Works as a context manager (`with neurolume.watch(...) as live:`).
- **Keras:** `model.fit(..., callbacks=[neurolume.keras.Live(sample)])`.
- **Systems:** `watch(system)` tracks every network in it; `live.log()` metrics
  are run-wide, or per network with `live.log(step, network="critic", loss=...)`.
- **Qt:** `widget.watch(model, sample)` returns the same session object, shown
  in the widget.
- **Layout defaults from code** (optional, for a project you run often):
  `watch(model, sample, headline="reward", pinned=["episode_len", "entropy"],
  charts=[["loss/train", "loss/val"], "lr"])`. A metric named `a/b` groups
  under `a` in the drawer. Choices made in the viewer override these.
- **Saving:** runs are kept in memory and can be saved with
  `live.save("run.nlrun")` and reopened with `neurolume.open_run(path)`
  (or `export_html(run)`, a standalone file with the timeline).

Training speed budget: under 2% overhead at the default rate. Stats are
computed on the device the model is on; only small results are copied to CPU.

## 4. Data path

```
training loop ──► Session (python/neurolume/live.py, training thread)
                    │  log(): append to queue (no I/O)
                    │  hooks: every_seconds, sample drawn pairs + stats
                    ▼
                  Run history (server thread): metrics, snapshots (ring buffer)
                    ▼
            Tornado WebSocket /ws  ──►  browser tab / Qt widget
```

- **Tornado WebSocketHandler at `/ws`**, on the server that already exists
  (Tornado was chosen with this in mind). The training thread never blocks:
  it only puts items on a queue; the server's event loop sends.
- **Coalescing:** metrics are sent in batches (every point kept, downsampled for
  long runs); weights and stats are *latest wins*, so a slow client never builds
  a backlog.
- **Late joiners** (refreshing the page, opening the Qt widget mid-run) get
  `hello` with the history so far, then the live stream.
- **Messages** are pydantic models in `schema.py`, generated into `schema.ts`
  like the graph (rule 1: bump `SCHEMA_VERSION` to 1.4). Bulk numbers travel as
  base64 float32, like feature maps already do:
  - `hello`: run id, graph, history summary
  - `metrics`: `{step, values: {loss: 0.03, ...}}[]`
  - `weights`: `{step, layer: values for the frozen drawn pairs}`
  - `stats`: `{step, layer: {grad_norm, weight_norm, update_ratio, dead, histogram}}`
  - `maps`: feature-map activations (same encoding as `FeatureMaps`)
  - `status`: running / paused / finished
- **Frozen edge set:** the drawn connections are chosen once, from the initial
  weights, so live updates change colour and opacity in place instead of
  rebuilding geometry. A "re-pick strongest" action rebuilds once on request.

## 5. Frontend

- A new `frontend/src/live/` folder, **dynamically imported** only when the
  page connects to a run (same trick as notes/KaTeX), so the architecture
  viewer's bundle doesn't grow.
  - `stream.ts`: WebSocket client, reconnects, keeps the run history.
  - `apply.ts`: writes new values into existing edge colour buffers
    (`EdgeBundle.lines.geometry` colour attribute, `needsUpdate`), health ticks
    and feature-map textures, then one `requestRender()`.
  - `strip.ts`, `drawer.ts`, `charts.ts`: run strip, metrics drawer, small SVG
    charts (sparkline, line chart with smoothing, histogram ridge).
- Redraw at most 4 times a second, only for the view on screen, and not at all
  while the tab is hidden or the view is paused.
- Settings gets a "Live" section only during a run: edge encoding (|w|, Δ since
  start, gradient), update rate, health thresholds.

## 6. How it differs from TensorBoard

| TensorBoard | Neurolume live |
| --- | --- |
| Grid of charts, one per scalar | The network is the view; charts on demand |
| Histograms in a separate tab, by tensor name | Health on each layer, where it lives in the architecture |
| You interpret the numbers | Plain-language verdicts (`stalled`, `exploding`) with reasons |
| Separate tool, separate process, log files | Same viewer as `show()`, in the browser or your Qt logger |
| Dense, busy styling | HUD style, render on demand, one colour scale |
| No way to see the model fill in | Timeline scrubbing through weight snapshots |

## 7. Milestones

Each ends with something visible, and each keeps `show()` unchanged (checked by
the existing tests plus a "no live code in the bundle unless connected" test).

| | Milestone | Done when |
| --- | --- | --- |
| L1 | **Pipe + run strip.** `/ws`, `watch()`, `log()`, message schema, run strip with headline sparkline; click to choose the headline metric | A toy training loop shows step and loss updating live in the browser and the Qt widget, and the headline can be switched to another metric |
| L2 | **Live weights.** Torch hooks, frozen edge set, in-place edge updates, edge encoding setting | Training an MLP visibly changes edge brightness, at ≤ 4 redraws/s, < 2% slower training |
| L3 | **Layer health.** Grad/update stats, health line on panels and cards, inspector live section | A deliberately broken model (huge LR, dead ReLUs) gets flagged on the right layers |
| L4 | **Metrics drawer + layout.** Charts for every logged metric, smoothing, hover; pin to the strip, show/hide/reorder, combine metrics on one chart, remembered per model; `headline=` / `pinned=` / `charts=` defaults from code | Loss/accuracy/reward readable at a glance on a 10k-step run; a custom layout survives a reload |
| L5 | **Keras.** `neurolume.keras.Live` callback | The Keras MLP example trains live with the same UI |
| L6 | **History.** Timeline scrubbing, `save()` / `open_run()`, runs in `export_html` | Scrub a finished run back to step 0; reopen it next day from a file |
| L7 | **Activations** (CNN feature maps live), Systems per-network metrics | The ResNet example's maps refresh while training; the SAC System shows per-network losses |

L1–L3 are the core; L4–L7 can be reordered by what your RL work needs first.

## 8. Open questions for you

1. **Playback:** the timeline can be scrub-only (no animation at all), or have
   a play button that steps a few frames a second while you watch. The second
   is the stronger "signature moment" but is animation; OK, or scrub only?
2. **Your RL loop:** which numbers matter most (reward, episode length, Q-values,
   entropy, alpha)? You can choose them in the viewer anyway; this only sets
   the defaults the first time a run opens.
3. **Saving runs:** keep runs in memory only (save when asked), or always write
   to a `runs/` folder so a crash doesn't lose the history?
4. **Comparing runs** (two runs side by side, or overlaid in the drawer):
   wanted in this phase, or later?
5. **Scale:** biggest model you'd watch live? It sets the snapshot budget
   (default: 200 snapshots in memory, older ones thinned out).

Settled for now (30 Oct 2026): (1) scrub only, no play button, as nothing
else animates; (2) defaults unchanged (`loss` first), set your own with
`watch(headline=, pinned=)`; (3) in memory, `live.save(path)` when asked;
(4) comparing runs left for later; (5) 200 readings, 50 in an exported page.
