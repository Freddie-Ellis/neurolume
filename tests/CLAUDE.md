# tests — notes for Claude

Run: `.venv/Scripts/python.exe -m pytest -q` from the repo root
(`pythonpath = ["python"]` is set in `pyproject.toml`). Torch tests use
`pytest.importorskip("torch")`; Keras tests also skip without keras.
`conftest.py` sets `KERAS_BACKEND=torch` before anything imports keras.

| File | Covers |
| --- | --- |
| `test_schema.py` | Validation rules, API endpoints (against a real server started by `show(block=False)`), **`schema.ts` is up to date** with the generator |
| `test_live.py` | `watch()`: a real WebSocket client gets the history in `hello`, batched `metrics` (NaN → null) and the finished `status`; streamed weights match the tensor; `live_sampler` whole-model stats (norm matches, percentiles in range, gradient and update after a step, NaN); `split=` and `predictions()` (scatter pairs, confusion matrix); the Keras callback (batches, `loss/val`, kernel values, stats with gradients, `validation=` predictions); history (paired thinning, `/api/run/weights`, `save()` → `open_run()`, export with the run); live feature maps keep their channels; Systems read every network and `network=` names metrics; plain `show()` graphs have `live: false` |
| `test_qt.py` | `NeurolumeWidget` serves, swaps and stops its model; `widget.watch()` serves a live run (skips without qtpy + a QtWebEngine binding) |
| `test_torch_adapter.py` | MLP shapes/params, folding, weight sampling, fx fallback, JSON snapshot, LeNet conv/pool/norm params, nested group tree + stem/head (`_TinyResNet`), add/concat edges, torchvision ResNet-18 (skips without torchvision) |
| `test_keras_adapter.py` | PyTorch ≡ Keras for LeNet and the MLP, channels-first shapes, kernel transpose, functional branches, mixed-framework System, nested models as groups (edges, shapes, feature maps) |
| `test_weights.py` | Top-k / random sampling |
| `test_feature_maps.py` | Channel ordering/cap, per-channel scaling, shrinking, `sample_digit()` |
| `test_system.py` | `System` builder, blocks, name rules, examples/system.py, torch auto-grouping, a System inside a System links to its ends |
| `test_demo.py` | Demo model goes through the adapter; fallback `demo_graph()` matches it |
| `test_imports.py` | `import neurolume` works with torch/tensorflow blocked |

- `snapshots/mlp.json` is regenerated automatically when deleted; delete it
  after an intentional schema change and check the new file's diff.
- Tests import example modules by adding `examples/` to `sys.path`.
- Frontend tests live next to the code (`frontend/src/**/*.test.ts`, Vitest).
