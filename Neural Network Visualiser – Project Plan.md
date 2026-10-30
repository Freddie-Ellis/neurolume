# Neurolume – Project Plan

Oct 27, 2026 · @Freddie Ellis · revised Oct 29, 2026

## 1. Overview and goals

Build a pip-installable Python library, **Neurolume** (`neurolume`), that takes a PyTorch or TensorFlow/Keras model and opens a polished, interactive WebGL visualisation of its architecture in the browser, aimed at presenting and teaching.

The visual target is a dense "neurons and glowing connections" look: layers as tall framed panels holding columns of nodes, with thousands of semi-transparent, organically curved edges coloured by a gradient across the network. It ships in a high-contrast dark theme (with glow) and a light theme, each with a choice of colourmaps.

Real systems are rarely one network, so Neurolume also draws **systems**: several networks (and plain blocks such as "Sensor" or "Loss") linked into one schematic. You see an overview of cards and open any network to see its layers.

**Primary users**

- Lecturers and students explaining how networks are built and how data flows through them.
- Researchers and engineers presenting a model or a whole pipeline in talks, slides and papers.

**Core user experience**

```python
import neurolume

neurolume.show(model, (1, 28, 28))             # opens the browser viewer; sample = input shape or real data

system = neurolume.System("Pipeline")          # several networks in one schematic
system.add("encoder", encoder, x)
system.add("decoder", decoder, z)
system.connect("encoder", "decoder", label="latent")
neurolume.show(system)

neurolume.export_html(model, sample, "model.html")  # standalone file (Phase 4)
```

**Success criteria for v1**

- One line of code shows any MLP or CNN built in PyTorch or Keras.
- An MLP with layers up to 512 units renders at 60 fps in Chrome on a laptop, and costs nothing when idle.
- The output looks good enough to put straight on a slide, with no editing.
- A standalone HTML export works offline with no Python running.

**Out of scope for v1:** training the model, editing the model, model formats other than PyTorch and Keras, mobile layouts.

**Existing asset:** the author already has a training logger written in QtPy. The viewer should be embeddable in that app via `QWebEngineView`, so there is one UI codebase.

## 2. Architecture

Everything hinges on one framework-agnostic JSON graph schema: adapters produce it, the frontend only ever consumes it. Adding a framework never touches the renderer, and adding a visual style never touches the adapters.

```text
 PyTorch model ──► torch adapter ──┐
 Keras model ───► keras adapter ───┼──► Graph JSON (schema) ──► FastAPI server ──► Browser viewer (WebGL)
 System builder ─► one group per ──┘            │                  (/api/graph; /ws later)     ▲
                   network, merged              └──► export_html(): JSON + built frontend ─────┘ (offline)

 QtPy training logger ──► QWebEngineView pointing at the same viewer
```

**Components**

1. **Adapters (Python).** Convert a live model plus a `sample` (the shape of one input, or real data) into the graph schema. Real data also yields feature maps.
   - PyTorch (done): trace with `torch.fx` and `ShapeProp` for topology and real tensor shapes. Fallback when tracing fails (dynamic control flow): run the input once with forward hooks on leaf modules and assume a sequential graph, with a warning. A model whose top-level children are themselves networks (e.g. `self.encoder`, `self.decoder`) is split into one group per child automatically.
   - Keras: read `model.layers`, `layer.get_config()`, inbound nodes for connectivity, and output shapes.
   - Optional later: an ONNX adapter as a universal fallback, with op-grouping to hide low-level noise.
2. **Core (Python).** Schema models (pydantic), validation, JSON serialisation, weight sampling (top-k or random sample of edge weights per dense layer).
3. **System builder (Python, done).** `System.add(name, model, x)`, `System.block(name, ...)` and `System.connect(a, b, label=)` merge several graphs into one, with node ids prefixed by network name and one top-level group per network.
4. **Server (Python).** FastAPI app serving the built frontend as static files plus `/api/graph`. `show()` starts it on a free port in a background thread, opens the browser, and blocks in scripts (returns a `Viewer` in notebooks). A `/ws` WebSocket is added in Phase 5.
5. **Frontend (TypeScript).** Vite + three.js app. Fetches the graph JSON, computes layout, renders with WebGL on demand, handles interaction (pan, zoom, inspect, open and close networks, theme and colourmap).
6. **Export.** `export_html()` inlines the built JS bundle and the graph JSON into one HTML file.
7. **Live channel (later phase).** A WebSocket streams activations, weight stats and training metrics from a callback, so the QtPy logger and the viewer share one data path.

## 3. Graph schema (v1.1)

The schema is the contract between Python and the frontend; it is versioned and validated on both sides (pydantic in Python, a TypeScript type generated by `scripts/generate_schema_ts.py`).

```json
{
  "schema_version": "1.1",
  "model": { "name": "Pipeline", "framework": "pytorch", "total_params": 535818 },
  "nodes": [
    {
      "id": "encoder/fc1",
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
    { "source": "encoder/output", "target": "decoder/input", "tensor_shape": [32], "label": "latent" }
  ],
  "groups": [
    { "id": "encoder", "label": "Encoder", "parent": null, "collapsed": false, "framework": "pytorch" }
  ],
  "weights": {
    "encoder/fc1": { "mode": "topk", "k": 2000, "pairs": [[12, 40, 0.83]] }
  }
}
```

**Rules**

- `type` is a normalised vocabulary, not the framework's class name: `input`, `output`, `dense`, `conv1d`, `conv2d`, `pool`, `norm`, `activation`, `dropout`, `flatten`, `reshape`, `embedding`, `attention`, `recurrent`, `add`, `concat`, `custom`. Each adapter maps its framework's layers onto this list; unknown layers and system blocks become `custom` with a readable name in `label`.
- Shapes exclude the batch dimension, and image-like tensors are channels-first, `[channels, height, width]`, whatever the framework (the Keras adapter converts from channels-last).
- Layer parameters use one vocabulary across frameworks: conv `in_channels`, `out_channels`, `kernel_size`, `stride`, `padding` (`"valid"`, `"same"` or per-side amounts), `bias`; pool `mode`, `kernel_size`, `stride`, `padding`; norm `num_features`, `eps`; dropout `p`; dense `in_features`, `out_features`, `bias`. `param_count` counts learned parameters only (not BatchNorm running statistics).
- `groups` form a tree via `parent`. A top-level group is one network: whenever the graph has top-level groups, the viewer opens on the system overview. Opening a group whose own children are groups (a ResNet stage, an autoencoder inside a System) shows another overview, one level down.
- Edges may carry a `label`, shown on links between networks.
- `weights` is optional and sampled; never ship full weight matrices. `pairs` are `[from_index, to_index, value]`.
- Standalone activation modules (e.g. `nn.ReLU`) are folded into the previous layer's `activation` field by default (`fold_activations_into_layers=False` keeps them).

**Changes:** 1.0 → 1.1 added `GraphEdge.label` and `GraphGroup.framework` for systems; 1.2 added `GraphNode.notes` (Markdown for System blocks); 1.3 added `Graph.feature_maps`: small images of each image-like layer's real output for a real-data sample, painted onto its slabs.

## 4. Tech stack and repo structure

| Area | Choice | Why |
| --- | --- | --- |
| Python packaging | `pyproject.toml`, setuptools, Python 3.10+ | Standard; frontend build is bundled into the wheel |
| Schema | pydantic v2 | Validation plus JSON Schema export for the TS types |
| Server | Tornado (WebSockets in Phase 5) | One dependency with none of its own (as in SnakeViz); replaced FastAPI + uvicorn, which pulled in 9 packages |
| Framework deps | `torch`, `tensorflow` as optional extras (`pip install neurolume[torch]`) | Users install only what they need |
| Frontend | TypeScript, Vite | Fast builds, single-file output for export |
| Rendering | three.js r170 (`LineSegments`, `InstancedMesh`, CSS2D labels) | Tens of thousands of edges in one draw call; crisp HTML text |
| Layout | Own column layout (one row in run order, skip edges as arcs) and ranked card layout (overviews) | Covers chains, skips and simple branches; ELK.js only if wide parallel graphs need it |
| Tests | pytest; Vitest for pure frontend logic; headless Edge screenshots for "does it draw" | Covers adapters, schema, layout and appearance |
| Qt integration | `QWebEngineView` from QtPy | Reuses the web viewer in the existing logger |

**ELK.js** (Eclipse Layout Kernel) is a graph-layout library: given boxes and connections it assigns ranks, orders nodes to reduce crossings and routes edges. Phase 3 found it unnecessary for ResNet-style models (one row plus arcs reads better there); it remains the option for wide parallel graphs.

```text
neurolume/
├── pyproject.toml
├── README.md
├── CLAUDE.md                # notes for the coding assistant (also in each main folder)
├── python/neurolume/
│   ├── __init__.py          # show(), show_demo(), to_graph(), System
│   ├── schema.py            # pydantic models, SCHEMA_VERSION
│   ├── adapters/
│   │   ├── base.py          # detect framework, dispatch, fold activations
│   │   ├── torch_adapter.py
│   │   └── keras_adapter.py
│   ├── system.py            # System builder: networks + blocks + links
│   ├── demo.py              # demo torch model (show_demo)
│   ├── weights.py           # top-k / random edge sampling
│   ├── server.py            # FastAPI app, /api/graph, show(); /ws later
│   ├── export.py            # standalone HTML builder (Phase 4)
│   ├── qt.py                # optional QWebEngineView widget (Phase 5)
│   └── static/              # built frontend (generated, not edited)
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.ts          # views (overview / network), navigation, toolbar
│       ├── schema.ts        # generated from pydantic JSON Schema
│       ├── layout/          # columns.ts, maps.ts, curves.ts, system.ts (later ELK)
│       ├── render/          # viewer, network, edges, system overview
│       ├── ui/              # interaction, inspector, formatting
│       └── theme.ts         # dark/light themes, colourmaps
├── scripts/                 # build_frontend.ps1, generate_schema_ts.py
├── examples/                # mlp.py, cnn.py, keras_*.py, demo.py, system.py, autoencoder.py, nested_system.py, branches.py, resnet.py
└── tests/
```

## 5. Roadmap

Phases end in something that runs. Do not start a phase until the previous phase's acceptance criteria pass.

### Phase 0 – Skeleton ✅

- [x] Create the repo layout from section 4, `pyproject.toml` with `torch` and `tensorflow` extras, Vite project in `frontend/`.
- [x] Build script that runs `vite build`, copies output into `python/neurolume/static/` and verifies every referenced asset exists.
- [x] FastAPI server serving a graph; `neurolume.show()` opens the browser.

**Done when:** `pip install -e .` then `python -c "import neurolume; neurolume.show_demo()"` opens a page that draws three columns of dots.

### Phase 1 – MLP end to end (PyTorch)

- [x] `schema.py` with pydantic models; export JSON Schema and generate `frontend/src/schema.ts`.
- [x] Torch adapter for `nn.Linear`, activations, `nn.Dropout`, `nn.Flatten`, via `torch.fx` plus shape propagation, with a forward-hook fallback.
- [x] Weight sampling for dense layers (top-k by absolute value, default k = 2000 per layer).
- [x] Renderer: one tall framed panel per layer, nodes as instanced circles, edges as one `LineSegments` buffer per layer with curved, slightly random Bézier paths and per-theme blending.
- [x] Cap displayed neurons per layer (64) with an ellipsis gap and the true count.
- [x] Pan, zoom, fit, hover tooltip, click a layer to open an inspector (shapes, params, activation).
- [x] Demo uses a real torch network (with a ready-made graph fallback when torch is missing).

**Done when:** a 784-512-256-10 MLP renders in the target style at 60 fps, and clicking each layer shows correct shapes and parameter counts.

_Status (29 Oct 2026):_ renders in the target style; shapes and parameter counts are asserted in `tests/test_torch_adapter.py`; clicking layers has been used by hand in the browser. Still to measure: 60 fps while panning a 512-unit MLP in Chrome (frames are drawn on demand, so idle cost is zero).

### Phase 1.5 – Systems of networks ✅ (added Oct 2026)

Not in the original plan; added because large models are usually several networks working together.

- [x] Schema 1.1: edge `label`, group `framework`.
- [x] `System` builder with networks, plain blocks and labelled links.
- [x] Auto-split a torch model into networks by its top-level child modules.
- [x] Overview of cards (mini preview, param count, framework) ranked left to right, with ribbon links and label chips.
- [x] Navigation: click a card or zoom into it to open the network; zoom out, Esc or the Overview button to return. Scroll zoom pauses for 1 s after opening, then eases back in.
- [x] Correct per-network layer names (prefixes stripped, Sequential children numbered in drawing order).

**Done when:** `examples/system.py` and `examples/autoencoder.py` open as an overview, and every network opens and returns cleanly. _Passes (checked by screenshots and by hand)._

### Phase 2 – Keras adapter and CNNs ✅

- [x] Keras adapter covering Dense, Conv2D, MaxPooling2D, BatchNormalization, Flatten, Dropout (Keras 3 first).
- [x] Torch adapter extended to `Conv2d`, pooling, `BatchNorm2d`.
- [x] Conv layers rendered as stacked feature-map slabs (depth = channels, size = spatial dims), not as neuron columns.
- [x] Tests asserting the same architecture built in PyTorch and Keras yields equivalent schema JSON.
- [x] `System.add()` accepts Keras models, so one system can mix frameworks.

**Done when:** a LeNet-style CNN in both frameworks produces matching graphs and renders correctly.

_Status (29 Oct 2026):_ passes. `examples/cnn.py` (PyTorch) and `examples/keras_cnn.py` (Keras) give identical node types, shapes, parameter counts, activations and parameters (`tests/test_keras_adapter.py`), and both render the same feature-map stacks (checked by screenshot). Keras was tested on its PyTorch backend, since TensorFlow has no Python 3.14 wheels yet; the adapter only uses the Keras API, so other backends should behave the same but are untested.

### Phase 3 – Branching graphs and semantic zoom ✅

- [x] Support `add` and `concat` nodes (skip connections). They stay thin bands; any edge that doesn't go to the very next layer is drawn as an arc under the panels into the layer it joins, with nesting lanes when arcs overlap.
- [x] ~~Add ELK.js~~ **Revised:** not added. Layers stay in one row in the order they run, neighbouring columns are linked only where the signal really flows between them, and every other edge is an arc. That covers ResNet skips, downsample paths and two-way concats without a layout engine. Reconsider ELK for wide parallel graphs (4-branch Inception, U-Net) or heavily branching systems.
- [x] Nested groups from the module hierarchy (PyTorch, from fx's `nn_module_stack`, so a residual `+` belongs to its block) and from nested models (Keras). **Revised:** instead of expanding in place, a group opens as its own view (click or zoom in), and Esc, zoom out or Overview goes back up one level. This reuses the system navigation and works at any depth, including Systems inside Systems.
- [x] Start collapsed above a node threshold: a group is split into its parts only when it holds more than 8 layers (`NESTED_SPLIT_THRESHOLD`); loose layers before the first part and after the last become a "stem" and a "head". Overviews also hide card details below 0.8× zoom (semantic zoom).

**Done when:** torchvision ResNet-18 opens as about 10 readable blocks and each expands to its layers.

_Status (29 Oct 2026):_ passes. `examples/resnet.py` opens as Input → stem → layer1–4 → head → Output; each stage opens to its two blocks and each block to its layers, with the skip connection (and layer2–4's downsample path) drawn as arcs (checked by screenshot; group tree asserted in `tests/test_torch_adapter.py`). Keras nested models (`examples/keras_resnet.py`) behave the same, feature maps included. Known gaps: a Keras block built with `keras.Input((None, None, C))` has unknown sizes; flat Keras applications (e.g. `keras.applications.ResNet50`) are not grouped, since their blocks are only name prefixes.

### Phase 4 – Export ✅

**Revised:** the teaching features (presentation mode, a forward-pass animation, an "explain this layer" panel) and PNG export were dropped. The viewer as it is already works for presenting, so this phase is only about getting it out of Python.

- [x] `export_html()`: one standalone file (the frontend already reads `window.__NEUROLUME_GRAPH__` for this).

**Done when:** the exported HTML opens from disk with no Python or network.

_Status (30 Oct 2026):_ passes. `vite build --mode export` makes one JS bundle (KaTeX folded in) and one CSS file with fonts as data URIs; `export.py` inlines both plus the graph. A network and a System export were opened from `file://` in headless Edge and render fully. Files are about 3 MB, mostly fonts.

### Phase 5 – Live training and Qt integration

- [ ] `/ws` WebSocket on the server.
- [ ] Callbacks: `neurolume.torch.TrainingHook` and a Keras callback that stream weight stats, activations and loss over the WebSocket.
- [ ] Edge colour and opacity update live as weights change (redraw on each update, not per frame).
- [ ] `neurolume.qt.NeurolumeWidget(QWebEngineView)` for embedding in the existing QtPy logger.

**Done when:** a training run shows weights changing in real time both in the browser and inside the QtPy app.

### Phase 6 (stretch) – Transformers

Design sketch: [`docs/transformer-sketch.html`](docs/transformer-sketch.html) (open in a browser). The user liked it: one lane per token through the overview; inside a block, attention heads as a stack of slabs with the front one showing its matrix, a per-token feed-forward whose lanes widen and narrow without crossing, and skip arcs into adds as in ResNet; clicking a head shows its attention matrix and the same row as arcs over the sentence.

- [ ] Attention blocks as grouped heads with an attention-matrix view.
- [ ] Embedding and token-flow visualisation.

## 6. Visual design and rendering

The look comes from many faint lines, not from detail on any single element.

**Themes** (toggle with the Light/Dark button or `t`; choice is remembered)

- **Dark:** near-black background, panels with a thin light border and faint fill, pale neurons, additive edges, and an `UnrealBloomPass` glow that is always on.
- **Light:** white background for handouts and papers, dark neurons and borders, normal-blended edges (additive vanishes on white), no bloom. Edge strength was tuned with the user to sit between faint and heavy.
- **Colourmaps:** five per theme, picked from a dropdown with a swatch (dark: Ember, Aurora, Plasma, Viridis, Ice; light: Ember, Ocean, Magma, Viridis, Ink). The colourmap sets the edge gradient across the network.
- Saturated blue backgrounds (the original "Night" theme) were tried and dropped.

**Rendering rules**

- Render on demand only: draw a frame when something changes, never in a continuous loop.
- All edges of one layer go in one `BufferGeometry` drawn as `LineSegments`; never one object per edge. Edges are sampled Bézier curves with a random bend so dense layers look organic rather than ruled.
- Nodes use `InstancedMesh`.
- Edge alpha encodes weight magnitude when weights are supplied; overall opacity scales down with edge count so dense layers don't white out.
- Show at most 64 neurons per column; represent the rest with a gap and a count label such as "512 units".
- Sample edges: for a dense layer with more than k connections, draw top-k by |weight| or a random sample of k.
- Labels are HTML (CSS2D) and must sit below floating UI such as the inspector.

**Per-layer representation**

| Layer type | Drawn as |
| --- | --- |
| Dense | Tall panel with a column of neurons and fan-out edges |
| Conv2D | Stack of thin feature-map slabs; depth = channels (Phase 2) |
| Pooling | Smaller slab stack, connected by a funnel shape (Phase 2) |
| Norm, Dropout, Activation | Thin labelled band on the connection, not a full panel |
| Add, Concat | Thin labelled band where branches join; edges that skip layers arrive as arcs under the panels |
| Attention (later) | Block of head tiles with an expandable attention matrix |
| Network (system overview) | Card with a mini preview, name, param count and framework |
| Block (system overview) | Small plain labelled card |
| Group (nested part, e.g. a ResNet stage or block) | A card in an overview, with its part or layer count and params; opens to its contents |

**Interaction**

- Scroll to zoom (towards the cursor), drag to pan, `f` or double-click empty space to fit.
- Hover a neuron or layer to highlight its edges and dim everything else.
- Click a layer to open the inspector panel on the right.
- System overview: click or zoom into a card to open it; zoom out past half the fit zoom, press Esc or click Overview to go back.

## 7. Risks, open questions and notes for the coding assistant

**Risks**

| Risk | Mitigation |
| --- | --- |
| `torch.fx` tracing fails on models with dynamic control flow | Fallback to forward hooks on leaf modules; warn the user; try `torch.export` second |
| Edge counts overwhelm the GPU (e.g. 4096 × 4096 layers) | Hard caps on neurons per column and edges per layer; sampling is always on |
| Animation keeps weak GPUs busy | Render on demand only; any animation must be triggered and finite |
| Keras and TF versions change APIs (Keras 3 vs tf.keras) | Target Keras 3 first; isolate version-specific code in the adapter |
| Frontend bundle not shipped in the wheel, or half-copied | Build script verifies every referenced asset; add a CI check that `static/index.html` is in the wheel |
| Large graphs unreadable on a slide | Overviews that open level by level, stem/head grouping, detail hidden when zoomed out (done in Phase 3) |

**Open questions**

- Package name is `neurolume`. It looked free on PyPI on 27 Oct 2026; confirm at pypi.org/project/neurolume and reserve it with a placeholder 0.0.1 release.
- Licence (MIT suggested for a teaching tool).
- Should the viewer also accept a saved model file (ONNX, `.pt`, `.keras`) without Python code, like Netron?
- Is 3D (orbit camera) wanted, or is a 2D view with depth effects enough? 2D for v1.
- Should systems support links into a specific layer (not just output → input), e.g. for skip connections between networks? Related: a System added to a System links to its first source and last sink; choosing another end (e.g. its loss block) is not possible yet.

**Instructions for the coding assistant (Claude in VS Code)**

1. Read `CLAUDE.md` in the repo root and the folder you're working in, then the relevant phase of this plan. Work one phase at a time.
2. At the start of each phase, list the files you will create or change and wait for confirmation.
3. Keep the graph schema in section 3 as the single contract; any change to it bumps `schema_version` and updates both the pydantic models and `schema.ts`.
4. Write tests alongside each adapter; every new layer type needs a test model in `examples/` and a schema snapshot test.
5. Never put framework imports at module top level outside the adapters; `import neurolume` must work with neither torch nor tensorflow installed.
6. Keep the renderer driven purely by the JSON; no framework knowledge in `frontend/`.
7. After each phase, check the "Done when" criteria, report what passed, and update the checkboxes in this plan.
8. Prefer simple, readable code over clever abstractions; this project is also a teaching resource.
9. Visual tuning values (edge opacity, zoom thresholds, pause timing) were chosen with the user; ask before changing them.
