# python/neurolume — notes for Claude

## Files

| File | What it does |
| --- | --- |
| `__init__.py` | Public API: `show`, `show_demo`, `to_graph`, `System`, `Component`, `Graph`, `Viewer`, `SCHEMA_VERSION` |
| `schema.py` | Pydantic models = the JSON contract. `Graph` validates that edges/groups/weights reference real ids |
| `adapters/base.py` | `to_graph()` dispatch (Graph → as-is, System → `.to_graph()`, torch → adapter), `fold_activations()` |
| `adapters/torch_adapter.py` | `from_torch()`: torch.fx trace + `ShapeProp`; fallback walks leaf modules with forward hooks. Linear, Conv1d/2d, pooling, BatchNorm, Dropout, Flatten, `+`/`torch.add` → `add`, `torch.cat` → `concat`; nested groups from the module tree |
| `adapters/keras_adapter.py` | `from_keras()`: reads `model.layers` + inbound nodes; converts channels-last shapes to channels-first; Dense kernels are transposed before sampling, and after a Flatten of channels-last maps their rows are reordered to channels-first (`_rows_channels_first`), so weight indices mean the same map cell in both frameworks |
| `weights.py` | `sample_dense()`: top-k / random edge sampling; pairs are `[in_index, out_index, value]` |
| `feature_maps.py` | `feature_maps()`: a `[C, H, W]` array → `FeatureMaps` (12 most active channels first, ≤32×32, 0-255 per channel, base64) |
| `system.py` | `System` builder: `add(name, model, x)`, `block(name, ..., description=, notes=)`, `connect(a, b, label=)` |
| `server.py` | Tornado app (like SnakeViz: one dependency, WebSockets built in for Phase 5), `show()` (server on a background thread with its own event loop, free port), `demo_graph()` fallback |
| `demo.py` | `demo_model()` / `demo_input()` (torch imported inside), `sample_digit()`: a drawn "7" (numpy) for CNN examples |

## Code map

**`adapters/torch_adapter.py`**: `from_torch()` (entry: trace → nodes/edges →
fold activations → weights → feature maps → groups) · `_RecordingShapeProp`
(records real outputs) · grouping: `_group_by_submodule` (the group tree),
`_group_loose_ends` (stem/head), `_scope`, `_parent_name`, `_module_names` ·
tracing: `_trace_with_fx`, fallback `_walk_modules` · per layer:
`_module_node` (modules → node type + params), `_describe_call` (functions such
as `+`, `torch.cat`, `flatten`) · shape helpers at the end.

**`adapters/keras_adapter.py`**: `from_keras()` (entry) · `_read_layers`
(walks layers, opens nested models as groups) · `_layer_node` (layer → node
type + params) · `_image_outputs` (feature maps, recursing into nested models)
· `_rows_channels_first` / `_flattened_image_shape` (Dense-after-Flatten weight
order) · shape/param helpers.

**`adapters/base.py`**: `to_graph()` (framework detection, Keras first),
`fold_activations()`. **`system.py`**: `System.add/block/connect/to_graph`.
**`server.py`**: `create_app` (Tornado: `/`, `/api/graph`, `/assets/`; request log off), `show` / `show_demo`, `Viewer` (thread + event loop; `stop()`)
(handle returned in notebooks), `demo_graph` (fallback without torch).

## Graph conventions

- Shapes **exclude the batch dimension** and are **channels-first** for images.
- **One parameter vocabulary for both frameworks** (see the plan, section 3):
  `tests/test_keras_adapter.py` checks LeNet and the MLP are identical in
  PyTorch and Keras. Torch padding that equals "same" is reported as `"same"`;
  Keras BatchNorm moving statistics are not counted as parameters.
- Node `type` is the normalised vocabulary in `schema.NodeType` (`dense`,
  `activation`, `dropout`, `flatten`, ...); unknown layers are `custom` with the
  class name in `label`.
- Node ids: fx `call_module` nodes use the qualified module name with `.` → `_`
  (`fc1`, `encoder_0`); a single placeholder is `input`; the fx output node is `output`.
- Activations are folded into the previous layer's `activation` field by default
  (`fold_activations_into_layers=False` to keep them).
- `weights` is keyed by dense node id; never ship full matrices.
- `feature_maps` (schema 1.3) is keyed by node id: the real output of image-like
  layers for the first example of a real-data `sample`. torch records it in
  `_RecordingShapeProp`; Keras via a probe `keras.Model`. Folded
  activations hand their maps to the layer they fold into (`carry_through_folds`).
  Pass `feature_maps=False` to skip; the MLP snapshot test does.

## Groups and systems (schema 1.2)

- A top-level group (`parent=None`) = one network. The frontend shows an
  overview whenever top-level groups exist.
- `System.to_graph()` prefixes node ids with `"<network>/"` and sets `group`;
  blocks are ungrouped `custom` nodes; links are ordinary edges (with optional
  `label`) from a network's last node that feeds nothing (its `output`) to the
  next one's first node that nothing feeds (its `input`). Using ends rather than
  node types makes a System added to a System (`add("pipe", other_system)`)
  link to its own end blocks, e.g. its sensor and prediction.
- Block `notes` (schema 1.2, `GraphNode.notes`) is Markdown with `$...$` /
  `$$...$$` LaTeX, dedented with `inspect.cleandoc`; the viewer shows it in the inspector when the block is clicked.
- A model that auto-groups (e.g. an autoencoder) added to a System keeps its groups one level down (`ae/encoder`, parent `ae`); the viewer opens `ae` as a nested overview.
- torch auto-grouping (`group_submodules=None` → auto) builds a **tree**
  (`_group_by_submodule`): every node has a scope, the qualified module it runs
  inside (`_scope()`: a module call's parent, or for function calls such as the
  residual `+`, the last entry of fx's `nn_module_stack`, with `@1` call suffixes
  stripped). Top level: children holding ≥2 layers become networks when there
  are ≥2 of them. A group with more than `NESTED_SPLIT_THRESHOLD` (8) layers and
  ≥2 such children is split again (`layer1` → `layer1.0`, `layer1.1`; group ids
  are qualified names). Loose layers before the first group / after the last
  become `stem` / `head` (`_group_loose_ends`, ≥2 layers, name not taken).
  The fx fallback uses `named_modules()` names for scopes.
- Keras nested models (a `keras.Model` used as a layer) are opened up by
  `_read_layers()`: their layers become nodes in a group named after the model
  (parent = enclosing model's group); the model's inputs are mapped to what
  feeds it and its name to its output layer, so edges pass through.
  `_image_outputs()` recurses into nested models (feeding each one the real
  value going into it), so their slabs get feature maps too. A nested model
  built with `keras.Input((None, None, C))` has unknown sizes inside.

## Adding things

- **New layer type** (e.g. Conv2d for Phase 2): extend `_module_node()` /
  `_describe_call()` in `torch_adapter.py`; add a test in `tests/test_torch_adapter.py`.
- **Schema change**: edit `schema.py`, bump `SCHEMA_VERSION`, run
  `scripts/generate_schema_ts.py`, delete and regenerate `tests/snapshots/mlp.json`
  (the snapshot test rewrites it when missing).
- **Keras**: keep keras imports inside `keras_adapter.py`. On the PyTorch
  backend a Keras model is also a `torch.nn.Module`, so `detect_framework`
  checks Keras **first**. Tests run on `KERAS_BACKEND=torch` (`tests/conftest.py`);
  TensorFlow has no Python 3.14 wheels.

## Gotchas

- The second argument everywhere is **`sample`** (renamed from
  `example_input`, which confused users who had already given Keras an input
  shape). It is either a shape without the batch dimension (`is_shape()`:
  `(1, 28, 28)`, `torch.Size`), turned into a zero batch, or real data. Only
  real data records feature maps. PyTorch without a sample raises
  `needs_sample_error()`, which explains what to pass.

- `demo_graph()` must match `to_graph(demo_model(), demo_input(), weights=None)`
  exactly — `tests/test_demo.py` checks nodes, edges and total params.
- `show()` blocks in scripts and returns a `Viewer` in REPLs/notebooks; pass
  `block=` to override. `port=None` picks a free port.
- Type hints matter to the user (Pylance strict): prefer `Graph.model_validate({...})`
  over passing dicts to pydantic constructors.
