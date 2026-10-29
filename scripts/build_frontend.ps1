# Build the Vite frontend and copy it into the Python package.
# npm writes warnings to stderr, so failures are detected with $LASTEXITCODE
# rather than $ErrorActionPreference = "Stop" (which would treat warnings as errors).
$static = Join-Path $PSScriptRoot "..\python\neurolume\static"
Push-Location $PSScriptRoot\..\frontend
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed" }
    # Remove the previous build so old hashed bundles do not pile up.
    if (Test-Path $static) { Remove-Item -Recurse -Force (Join-Path $static "*") -ErrorAction Stop }
    New-Item -ItemType Directory -Force $static -ErrorAction Stop | Out-Null
    Copy-Item -Recurse -Force dist\* $static -ErrorAction Stop
} finally {
    Pop-Location
}
