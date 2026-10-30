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
