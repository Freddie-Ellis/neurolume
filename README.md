# Neurolume

Neurolume turns PyTorch and Keras models into interactive architecture
visualisations. It is being implemented in phases described in
[Neural Network Visualiser – Project Plan.md](./Neural%20Network%20Visualiser%20%E2%80%93%20Project%20Plan.md).

## Phase 0 demo

Create an environment and install the package in editable mode:

```powershell
python -m pip install -e ".[dev]"
python -c "import neurolume; neurolume.show_demo()"
```

The demo serves a hard-coded graph and opens the viewer in the default browser.
The frontend source is in `frontend/`; run `npm install` and `npm run build`
there to replace the built-in fallback page with the Vite bundle.

Framework dependencies remain optional:

```powershell
python -m pip install -e ".[torch]"
python -m pip install -e ".[tensorflow]"
```

Neurolume publishes inline type hints for its Python API. Type checkers such
as Pylance, Pyright, and mypy recognize them when the package is installed.
