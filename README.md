# Neurolume

Neurolume turns PyTorch and Keras models into interactive architecture
visualisations. It is being implemented in phases described in
[Neural Network Visualiser – Project Plan.md](./Neural%20Network%20Visualiser%20%E2%80%93%20Project%20Plan.md).

## Quick start

Install the package in editable mode with PyTorch support:

```powershell
python -m pip install -e ".[dev,torch]"
python examples/mlp.py
```

Or from your own code:

```python
import torch
import neurolume

neurolume.show(model, (1, 28, 28))
```

The second argument, `sample`, tells Neurolume what goes into the model so it
can measure each layer. PyTorch models don't record their input size, so they
need one; Keras models that start with `keras.Input` don't. It can be:

- the **shape** of one input, without the batch dimension, like `keras.Input`:
  `(1, 28, 28)`. Enough to draw the architecture.
- **real data**, such as a batch of images. This also paints each convolution's
  feature maps with what it outputs for that input.

Neurolume works out the order of the layers, and how they connect, by running
`sample` through the model's `forward`. So a PyTorch model needs a `forward`
method (or must be an `nn.Sequential`). A module that only holds layers as
attributes, with no `forward`, can't be traced; the order you assign
attributes in `__init__` isn't used.

`show()` starts a local server on a free port and opens the viewer. It blocks
until Ctrl+C when run as a script, and returns a `Viewer` immediately in a REPL
or notebook (call `viewer.stop()` to shut it down). `neurolume.to_graph(model,
sample)` returns the graph JSON model without opening anything.

To try the demo network, a small PyTorch classifier defined in
`python/neurolume/demo.py` (8 inputs, four hidden layers of 12, 4 classes):

```powershell
python -c "import neurolume; neurolume.show_demo()"
```

Without torch installed, the demo still opens, using the same network from a
ready-made graph.

Framework dependencies remain optional:

```powershell
python -m pip install -e ".[torch]"
python -m pip install -e ".[tensorflow]"
```

## Exporting a standalone file

```python
neurolume.export_html(model, (1, 28, 28), "model.html")
```

Writes the viewer and the graph into one HTML file (about 3 MB) that opens
from disk, offline, with no Python running. It takes the same `sample` and
options as `show`, and also accepts a `System`.

## Watching a model train

```python
live = neurolume.watch(model, (1, 28, 28))   # instead of show()
for step, (x, y) in enumerate(loader):
    loss = train_step(x, y)
    live.log(step, loss=loss, accuracy=acc)  # tensors are fine; cheap every step
live.finish()                                # the viewer stays up until Ctrl+C
```

The same viewer with a run strip at the bottom (step, the headline metric with
its trend and a sparkline, pinned metrics) and the Training panel above it:

- **Summary:** whether the run is `improving`, `levelling off`, `converged`,
  `getting worse` or `overfitting` (validation worse than its best while
  training still improves), the validation − training gap and the best
  validation point. Log validation with `live.log(step, split="val", loss=...)`.
- **Predictions vs truth:** `live.predictions(step, predicted, target)`, e.g. on
  a validation batch: a predicted-vs-true scatter with R² and mean error, or a
  confusion matrix when the targets are integer class labels.
- **Metrics:** a chart per metric, `loss` and `loss/val` together (smoothing,
  log scale, hover; reorder, hide, combine and pin, remembered per model).
- **Parameters:** for the whole model (per network in a System), read by
  `log()` every `every_seconds=0.5`: the weight norm (how large the values are
  overall, √ of the sum of squares; the count is fixed), the gradient norm, how
  far they move per step, and how their values are spread over time.

The dense edges also show the weights as they train (Edges: weight, change
since the start, or gradient). Call `log()` after `backward()` so it sees the
gradients. Layout defaults from code: `watch(model, x, headline="reward",
pinned=["entropy"], charts=[["loss/train", "loss/val"], "lr"])`. Click the metric's name to show another
one (remembered per model), or pick the default with `watch(..., headline="reward")`.
Also `with neurolume.watch(...) as live:`, and `widget.watch(model, sample)` in
the Qt widget. Plain `show()` is unchanged. See `examples/live_training.py`.

- **History:** the timeline under the strip scrubs back through the run (edges,
  and feature maps as they were). `live.save("run.nlrun")` keeps it;
  `neurolume.open_run("run.nlrun")` shows it again, and
  `neurolume.export_html(live, path="run.html")` (or Settings > Export during a
  run) makes a standalone page with the timeline.
- **Keras:** `model.fit(x, y, callbacks=[neurolume.keras.Live(x[:64], validation=(x_val, y_val))])`;
  see `examples/keras_live.py`. Validation metrics show as `loss/val` on the
  loss chart, and `validation=` adds predictions vs truth each epoch.
- **CNNs:** given real data, the feature-map slabs repaint as the model learns
  (PyTorch).
- **Systems:** `watch(system)` reads every network; `live.log(step,
  network="critic", loss=...)` logs `loss/critic`; the parameter charts get a
  line per network.

## Embedding in a Qt app

```python
from neurolume.qt import NeurolumeWidget  # import before creating the QApplication

widget = NeurolumeWidget(model, (1, 28, 28))
layout.addWidget(widget)
widget.set_model(other_model, sample)  # show something else
```

A `QWebEngineView` running the same viewer as `show()`, for dropping into an
existing Qt or QtPy app. Needs `qtpy` and a binding with QtWebEngine
(`pip install qtpy PySide6`). The Settings > Export button asks where to save.
See `examples/qt_widget.py`.

For live training, `session = widget.watch(model, sample)` shows the run in the
widget and returns the session to `log()` to. Train on a background thread so
the window stays responsive (`log()` is safe from any thread); see
`examples/qt_live.py`, a small logger with Start/Stop beside the live viewer.

## Systems of networks

Larger models are often several networks wired together. Link them, plus any
plain blocks such as data sources or losses, into one schematic:

```python
system = neurolume.System("Sensor autoencoder")
sensor = system.block("sensor", label="Sensor", output_shape=[32])
encoder = system.add("encoder", encoder_model, torch.randn(1, 32))
decoder = system.add("decoder", decoder_model, torch.randn(1, 16))
system.connect(sensor, encoder)
system.connect(encoder, decoder, label="latent")
neurolume.show(system)
```

The viewer opens on an overview with one card per network and labelled arrows
between them. Click a network to see its layers; press `Esc` or the Overview
button to go back. See `examples/system.py`.

A single PyTorch module that keeps its parts in attributes (`self.encoder`,
`self.decoder`) is split into networks automatically; see
`examples/autoencoder.py`. Pass `group_submodules=False` to `show` to keep it as
one network.

## Viewer controls

| Action | Control |
| --- | --- |
| Pan | Drag |
| Zoom | Scroll wheel |
| Open a network (system overview) | Click its card |
| Back to the overview | `Esc` or the Overview button |
| Inspect a layer | Click its panel or band |
| Focus a layer | Double-click it |
| Fit to screen | `F`, the Fit button, or double-click empty space |
| Switch light and dark | `T` or the Light/Dark button |
| Close inspector | `Esc` |

## Development

The frontend lives in `frontend/` (TypeScript, Vite, three.js). Rebuild it into
`python/neurolume/static/` with:

```powershell
./scripts/build_frontend.ps1
```

For live reloading, run `neurolume.show(model, x, port=8000)` in one terminal
and `npm run dev` in `frontend/`; Vite proxies `/api` to the Python server.

The graph schema in `python/neurolume/schema.py` is the contract between
Python and the frontend. After changing it, bump `SCHEMA_VERSION` and run:

```powershell
python scripts/generate_schema_ts.py
```

Tests:

```powershell
python -m pytest          # Python: schema, adapters, weight sampling
cd frontend; npm test     # TypeScript: layout
```

Neurolume publishes inline type hints for its Python API. Type checkers such
as Pylance, Pyright, and mypy recognize them when the package is installed.
