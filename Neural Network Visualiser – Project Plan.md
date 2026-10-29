# Neurolume – Project Plan

Oct 27, 2026 · @Freddie Ellis

## 1. Overview and goals

Build a pip-installable Python library, **Neurolume** (`neurolume`), that takes a PyTorch or TensorFlow/Keras model and opens a polished, interactive WebGL visualisation of its architecture in the browser, aimed at presenting and teaching.

The visual target is a dense "neurons and glowing connections" look: layers as columns of nodes, thousands of semi-transparent edges coloured by layer (orange to purple gradient), each layer in its own framed panel on a dark blue background.

**Primary users**

- Lecturers and students explaining how networks are built and how data flows through them.
- Researchers and engineers presenting a model in talks, slides and papers.

**Core user experience**

```python
import neurolume

neurolume.show(model, example_input)           # opens the browser viewer
neurolume.export_html(model, example_input, "model.html")  # standalone file
```

**Success criteria for v1**

- One line of code shows any MLP or CNN built in PyTorch or Keras.
- An MLP with layers up to 512 units renders at 60 fps in Chrome on a laptop.
- The output looks good enough to put straight on a slide, with no editing.
- A standalone HTML export works offline with no Python running.

**Out of scope for v1:** training the model, editing the model, model formats other than PyTorch and Keras, mobile layouts.

**Existing asset:** the author already has a training logger written in QtPy. The viewer should be embeddable in that app via `QWebEngineView`, so there is one UI codebase.

## 2. Architecture

Everything hinges on one framework-agnostic JSON graph schema: adapters produce it, the frontend only ever consumes it. Adding a framework never touches the renderer, and adding a visual style never touches the adapters.

```text
 PyTorch model ──► torch adapter ──┐
                                   ├──► Graph JSON (schema v1) ──► FastAPI server ──WebSocket──► Browser viewer (WebGL)
 Keras model ───► keras adapter ───┘            │                                                    ▲
                                                └──► export_html(): JSON + built frontend inlined ───┘ (offline)

 QtPy training logger ──► QWebEngineView pointing at the same viewer
```

**Components**

1. **Adapters (Python).** Convert a live model plus an example input into the graph schema.
   - PyTorch: trace with `torch.fx` (or `torch.export`) for topology; register forward hooks and run the example input once to capture real tensor shapes. Fallback when tracing fails (dynamic control flow): walk `named_modules()` in order and assume a sequential graph, with a warning.
   - Keras: read `model.layers`, `layer.get_config()`, inbound nodes for connectivity, and output shapes.
   - Optional later: an ONNX adapter as a universal fallback, with op-grouping to hide low-level noise.
2. **Core (Python).** Schema dataclasses, validation, JSON serialisation, optional weight sampling (top-k or random sample of edge weights per dense layer).
3. **Server (Python).** FastAPI app serving the built frontend as static files, plus `/api/graph` and a `/ws` WebSocket. `show()` starts it on a free port in a background thread and opens the browser.
4. **Frontend (TypeScript).** Vite + three.js app. Fetches the graph JSON, computes layout, renders with WebGL, handles interaction (pan, zoom, click to inspect, expand and collapse blocks, presentation mode).
5. **Export.** `export_html()` inlines the built JS bundle and the graph JSON into one HTML file.
6. **Live channel (later phase).** The same WebSocket streams activations, weight stats and training metrics from a callback, so the QtPy logger and the viewer share one data path.

## 3. Graph schema (v1)

The schema is the contract between Python and the frontend; version it from day one and validate it on both sides (pydantic in Python, a generated TypeScript type in the frontend).

```json
{
  "schema_version": "1.0",
  "model": { "name": "MyMLP", "framework": "pytorch", "total_params": 535818 },
  "nodes": [
    {
      "id": "fc1",
      "type": "dense",
      "label": "Linear",
      "group": "encoder",
      "input_shape": [784],
      "output_shape": [512],
      "params": { "in_features": 784, "out_features": 512, "bias": true },
      "param_count": 401920,
      "activation": "relu"
    }
  ],
  "edges": [
    { "source": "input", "target": "fc1", "tensor_shape": [784] }
  ],
  "groups": [
    { "id": "encoder", "label": "Encoder", "parent": null, "collapsed": false }
  ],
  "weights": {
    "fc1": { "mode": "topk", "k": 2000, "pairs": [[12, 40, 0.83]] }
  }
}
```

**Rules**

- `type` is a normalised vocabulary, not the framework's class name: `input`, `output`, `dense`, `conv1d`, `conv2d`, `pool`, `norm`, `activation`, `dropout`, `flatten`, `reshape`, `embedding`, `attention`, `recurrent`, `add`, `concat`, `custom`. Each adapter maps its framework's layers onto this list; unknown layers become `custom` with the original class name in `label`.
- Shapes exclude the batch dimension.
- `groups` form a tree via `parent` and drive semantic zoom (a ResNet block or transformer layer is one group).
- `weights` is optional and sampled; never ship full weight matrices. `pairs` are `[from_index, to_index, value]`.
- Standalone activation modules (e.g. `nn.ReLU`) may be folded into the previous layer's `activation` field to keep the graph clean; make this a flag.

## 4. Tech stack and repo structure

| Area | Choice | Why |
| --- | --- | --- |
| Python packaging | `pyproject.toml`, hatch or setuptools, Python 3.10+ | Standard; frontend build is bundled into the wheel |
| Schema | pydantic v2 | Validation plus JSON Schema export for the TS types |
| Server | FastAPI + uvicorn, WebSockets | Small, async, easy static serving |
| Framework deps | `torch`, `tensorflow` as optional extras (`pip install neurolume[torch]`) | Users install only what they need |
| Frontend | TypeScript, Vite | Fast builds, single-file output for export |
| Rendering | three.js (`LineSegments`, `InstancedMesh`) | Handles tens of thousands of edges in one draw call |
| Layout | Custom column layout for v1; ELK.js for branching graphs later | Skip connections need a real layout engine |
| Tests | pytest; Vitest for frontend; Playwright for a smoke render | Covers adapters, schema, and "does it draw" |
| Qt integration | `QWebEngineView` from QtPy | Reuses the web viewer in the existing logger |

```text
neurolume/
├── pyproject.toml
├── README.md
├── python/neurolume/
│   ├── __init__.py          # show(), export_html()
│   ├── schema.py            # pydantic models, schema_version
│   ├── adapters/
│   │   ├── base.py          # detect framework, dispatch
│   │   ├── torch_adapter.py
│   │   └── keras_adapter.py
│   ├── weights.py           # top-k / random edge sampling
│   ├── server.py            # FastAPI app, /api/graph, /ws
│   ├── export.py            # standalone HTML builder
│   ├── qt.py                # optional QWebEngineView widget
│   └── static/              # built frontend (generated, not edited)
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.ts
│       ├── schema.ts        # generated from pydantic JSON Schema
│       ├── layout/          # column layout, later ELK
│       ├── render/          # three.js scene, nodes, edges, panels, glow
│       ├── ui/              # inspector panel, toolbar, presentation mode
│       └── theme.ts         # colours, gradients, fonts
├── examples/                # mlp.py, cnn.py, keras_mlp.py, resnet.py
└── tests/
```

## 5. Roadmap

Six phases, each ending in something that runs. Do not start a phase until the previous phase's acceptance criteria pass.

### Phase 0 – Skeleton

- [x] Create the repo layout from section 4, `pyproject.toml` with `torch` and `tf` extras, Vite project in `frontend/`.
- [x] Build script that runs `vite build` and copies output into `python/neurolume/static/`.
- [x] FastAPI server serving a hard-coded graph JSON; `neurolume.show()` opens the browser.

**Done when:** `pip install -e .` then `python -c "import neurolume; neurolume.show_demo()"` opens a page that draws three columns of dots.

### Phase 1 – MLP end to end (PyTorch)

- [x] `schema.py` with pydantic models; export JSON Schema and generate `frontend/src/schema.ts`.
- [x] Torch adapter for `nn.Linear`, activations, `nn.Dropout`, `nn.Flatten`, via `torch.fx` plus forward hooks for shapes.
- [x] Weight sampling for dense layers (top-k by absolute value, default k = 2000 per layer).
- [x] Renderer: one panel per layer, nodes as instanced circles, edges as one `LineSegments` buffer per layer with additive blending, gradient colours per layer.
- [x] Cap displayed neurons per layer (e.g. 64) with an ellipsis marker showing the true count.
- [x] Pan, zoom, hover tooltip, click a layer to open an inspector (shapes, params, activation).

**Done when:** a 784-512-256-10 MLP renders in the target style at 60 fps, and clicking each layer shows correct shapes and parameter counts.

_Status (28 Oct 2026):_ renders in the target style (checked by headless screenshot of `examples/mlp.py`); shapes and parameter counts are asserted in `tests/test_torch_adapter.py`. Still to confirm by hand: 60 fps in Chrome (frames are drawn on demand, so idle cost is zero) and clicking each layer in a real browser.

### Phase 2 – Keras adapter and CNNs

- [ ] Keras adapter covering Dense, Conv2D, MaxPooling2D, BatchNormalization, Flatten, Dropout.
- [ ] Torch adapter extended to `Conv2d`, pooling, `BatchNorm2d`.
- [ ] Conv layers rendered as stacked feature-map slabs (depth = channels, size = spatial dims), not as neuron columns.
- [ ] Tests asserting the same architecture built in PyTorch and Keras yields equivalent schema JSON.

**Done when:** a LeNet-style CNN in both frameworks produces matching graphs and renders correctly.

### Phase 3 – Branching graphs and semantic zoom

- [ ] Support `add` and `concat` nodes (skip connections).
- [ ] Switch to ELK.js layout when the graph is not a straight chain.
- [ ] Groups from module hierarchy (PyTorch) or nested models (Keras); collapse and expand on click.
- [ ] Start collapsed for models above a node threshold.

**Done when:** torchvision ResNet-18 opens as about 10 readable blocks and each expands to its layers.

### Phase 4 – Teaching and presentation features

- [ ] Presentation mode: full screen, hides UI, arrow keys step layer by layer with a camera fly-to.
- [ ] Forward-pass animation: pulses travel along edges; optionally driven by real activations from the example input.
- [ ] Shape labels on edges and an "explain this layer" side panel with short plain-English text per layer type.
- [ ] Export: PNG at 2x and 4x, and `export_html()` standalone file.

**Done when:** a lecture can be given from the viewer with keyboard only, and the exported HTML works offline from a USB stick.

### Phase 5 – Live training and Qt integration

- [ ] Callbacks: `neurolume.torch.TrainingHook` and a Keras callback that stream weight stats, activations and loss over the WebSocket.
- [ ] Edge colour and opacity update live as weights change.
- [ ] `neurolume.qt.NeurolumeWidget(QWebEngineView)` for embedding in the existing QtPy logger.

**Done when:** a training run shows weights changing in real time both in the browser and inside the QtPy app.

### Phase 6 (stretch) – Transformers

- [ ] Attention blocks as grouped heads with an attention-matrix view.
- [ ] Embedding and token-flow visualisation.

## 6. Visual design and rendering

The look comes from many faint additive lines, not from detail on any single element.

**Theme (default "Night")**

- Background: deep navy, around `#0b1a6b` fading to `#06104a`.
- Layer panels: rounded rectangles with a thin bright-blue border (`#3d7bff`, 1–2 px) and a subtle inner glow; layer name and shape in small text at the top left.
- Nodes: small white or pale-lavender circles with a soft glow, evenly spaced in a vertical column.
- Edges: per-layer colour from a gradient (orange `#ff8a3d` at the input side through pink to purple `#a24dff` and blue), opacity 0.03–0.15, `THREE.AdditiveBlending`, so dense regions glow.
- Provide a light theme for printed handouts and papers.

**Rendering rules**

- All edges of one layer go in one `BufferGeometry` drawn as `LineSegments`; never one object per edge.
- Nodes use `InstancedMesh` or points with a circle texture.
- Glow via an `UnrealBloomPass` post-processing pass, with a toggle to disable it on weak GPUs.
- Edge colour and opacity may encode weight sign and magnitude when weights are supplied; otherwise use the layer gradient.
- Show at most N neurons per column (default 64); represent the rest with a gap and a count label such as "512 units".
- Sample edges: for a dense layer with more than k connections, draw top-k by |weight| or a random sample of k.

**Per-layer representation**

| Layer type | Drawn as |
| --- | --- |
| Dense | Column of neurons with fan-out edges |
| Conv2D | Stack of thin feature-map slabs; depth = channels |
| Pooling | Smaller slab stack, connected by a funnel shape |
| Norm, Dropout, Activation | Thin labelled band on the connection, not a full panel |
| Add, Concat | Small merge node where branches join |
| Attention (later) | Block of head tiles with an expandable attention matrix |
| Group (collapsed) | One labelled panel with its param count |

**Interaction**

- Scroll to zoom, drag to pan, double-click a panel to focus.
- Hover a neuron to highlight its incoming and outgoing edges and dim everything else.
- Click a layer to open the inspector panel on the right.

## 7. Risks, open questions and notes for the coding assistant

**Risks**

| Risk | Mitigation |
| --- | --- |
| `torch.fx` tracing fails on models with dynamic control flow | Fallback to `named_modules()` plus hooks; warn the user; try `torch.export` second |
| Edge counts overwhelm the GPU (e.g. 4096 × 4096 layers) | Hard caps on neurons per column and edges per layer; sampling is always on |
| Keras and TF versions change APIs (Keras 3 vs tf.keras) | Target Keras 3 first; isolate version-specific code in the adapter |
| Frontend bundle not shipped in the wheel | CI step builds the frontend and checks `static/index.html` exists in the wheel |
| Large graphs unreadable on a slide | Semantic zoom and default-collapsed groups (Phase 3) |

**Open questions**

- Package name is `neurolume`. It looked free on PyPI on 27 Oct 2026; confirm at pypi.org/project/neurolume and reserve it with a placeholder 0.0.1 release.
- Licence (MIT suggested for a teaching tool).
- Should the viewer also accept a saved model file (ONNX, `.pt`, `.keras`) without Python code, like Netron?
- Is 3D (orbit camera) wanted, or is a 2D view with depth effects enough? Default to 2D for v1.

**Instructions for the coding assistant (Claude in VS Code)**

1. Read this whole plan first, then work one phase at a time, starting with Phase 0.
2. At the start of each phase, list the files you will create or change and wait for confirmation.
3. Keep the graph schema in section 3 as the single contract; any change to it bumps `schema_version` and updates both the pydantic models and `schema.ts`.
4. Write tests alongside each adapter; every new layer type needs a test model in `examples/` and a schema snapshot test.
5. Never put framework imports at module top level outside the adapters; `import neurolume` must work with neither torch nor tensorflow installed.
6. Keep the renderer driven purely by the JSON; no framework knowledge in `frontend/`.
7. After each phase, check the "Done when" criteria, report what passed, and update the checkboxes in this plan.
8. Prefer simple, readable code over clever abstractions; this project is also a teaching resource.
