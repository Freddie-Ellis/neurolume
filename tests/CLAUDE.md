# tests — notes for Claude

Run: `.venv/Scripts/python.exe -m pytest -q` from the repo root
(`pythonpath = ["python"]` is set in `pyproject.toml`). Torch tests use
`pytest.importorskip("torch")`.

| File | Covers |
| --- | --- |
| `test_schema.py` | Validation rules, API endpoints, **`schema.ts` is up to date** with the generator |
| `test_torch_adapter.py` | MLP shapes/params, folding, weight sampling, fx fallback, JSON snapshot |
| `test_weights.py` | Top-k / random sampling |
| `test_system.py` | `System` builder, blocks, name rules, examples/system.py, torch auto-grouping |
| `test_demo.py` | Demo model goes through the adapter; fallback `demo_graph()` matches it |
| `test_imports.py` | `import neurolume` works with torch/tensorflow blocked |

- `snapshots/mlp.json` is regenerated automatically when deleted; delete it
  after an intentional schema change and check the new file's diff.
- Tests import example modules by adding `examples/` to `sys.path`.
- Frontend tests live next to the code (`frontend/src/**/*.test.ts`, Vitest).
