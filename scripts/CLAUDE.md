# scripts — notes for Claude

| File | What it does |
| --- | --- |
| `build_frontend.ps1` | `npm install` + `npm run build` (tsc + vite), also `vite build --mode export` (single-bundle build copied to `static/export/` for `export_html`), copies `frontend/dist` over `python/neurolume/static`, removes stale bundles (warns if in use), then **verifies** every asset `index.html` references exists |
| `generate_schema_ts.py` | Writes `frontend/src/schema.ts` from the pydantic models (small JSON-Schema → TS converter; every field is emitted as required because Python always serialises all fields) |

- Run the build from PowerShell: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\build_frontend.ps1`
  (Node must be on PATH; see root `CLAUDE.md`).
- The script checks `$LASTEXITCODE` instead of `$ErrorActionPreference = "Stop"`,
  because npm writes harmless warnings to stderr.
- Copy-then-clean order matters: a running Neurolume server can lock files on
  Windows, and an old delete-first version once left the package half-empty
  (white page in the browser).
