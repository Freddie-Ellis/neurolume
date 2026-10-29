# python/neurolume — notes for Claude

## Files

| File | What it does |
| --- | --- |
| `__init__.py` | Public API: `show`, `show_demo`, `to_graph`, `System`, `Component`, `Graph`, `Viewer`, `SCHEMA_VERSION` |
| `schema.py` | Pydantic models = the JSON contract. `Graph` validates that edges/groups/weights reference real ids |
| `adapters/base.py` | `to_graph()` dispatch (Graph → as-is, System → `.to_graph()`, torch → adapter), `fold_activations()` |
| `adapters/torch_adapter.py` | `from_torch()`: torch.fx trace + `ShapeProp`; fallback walks leaf modules with forward hooks |
| `weights.py` | `sample_dense()`: top-k / random edge sampling; pairs are `[in_index, out_index, value]` |
| `system.py` | `System` builder: `add(name, model, x)`, `block(name, ..., description=, notes=)`, `connect(a, b, label=)` |
| `server.py` | FastAPI app, `show()` (background thread, free port), `demo_graph()` fallback |
| `demo.py` | `demo_model(nested=False)` / `demo_input()`; torch imported inside the functions |

## Graph conventions

- Shapes **exclude the batch dimension**.
- Node `type` is the normalised vocabulary in `schema.NodeType` (`dense`,
  `activation`, `dropout`, `flatten`, ...); unknown layers are `custom` with the
  class name in `label`.
- Node ids: fx `call_module` nodes use the qualified module name with `.` → `_`
  (`fc1`, `encoder_0`); a single placeholder is `input`; the fx output node is `output`.
- Activations are folded into the previous layer's `activation` field by default
  (`fold_activations_into_layers=False` to keep them).
- `weights` is keyed by dense node id; never ship full matrices.

## Groups and systems (schema 1.2)

- A top-level group (`parent=None`) = one network. The frontend shows an
  overview whenever top-level groups exist.
- `System.to_graph()` prefixes node ids with `"<network>/"` and sets `group`;
  blocks are ungrouped `custom` nodes; links are ordinary edges (with optional
  `label`) from a network's last `output` node to the next one's first `input`.
- Block `notes` (schema 1.2, `GraphNode.notes`) is Markdown with `$...$` /
  `$$...$$` LaTeX, dedented with `inspect.cleandoc`; the viewer opens it as a page.
- torch auto-grouping (`group_submodules=None` → auto): nodes are grouped by the
  top-level child module that owns them, when ≥2 children each hold ≥2 layers.
  Identity of modules is matched via `named_modules()`.

## Adding things

- **New layer type** (e.g. Conv2d for Phase 2): extend `_module_node()` /
  `_describe_call()` in `torch_adapter.py`; add a test in `tests/test_torch_adapter.py`.
- **Schema change**: edit `schema.py`, bump `SCHEMA_VERSION`, run
  `scripts/generate_schema_ts.py`, delete and regenerate `tests/snapshots/mlp.json`
  (the snapshot test rewrites it when missing).
- **Keras adapter** (planned): `adapters/keras_adapter.py`, dispatched from
  `base.to_graph()`; keep keras imports inside that module.

## Gotchas

- `demo_graph()` must match `to_graph(demo_model(), demo_input(), weights=None)`
  exactly — `tests/test_demo.py` checks nodes, edges and total params.
- `show()` blocks in scripts and returns a `Viewer` in REPLs/notebooks; pass
  `block=` to override. `port=None` picks a free port.
- Type hints matter to the user (Pylance strict): prefer `Graph.model_validate({...})`
  over passing dicts to pydantic constructors.
