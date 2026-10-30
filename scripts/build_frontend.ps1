# Build the Vite frontend and copy it into the Python package.
# npm writes warnings to stderr, so failures are detected with $LASTEXITCODE
# rather than $ErrorActionPreference = "Stop" (which would treat warnings as errors).
$static = Join-Path $PSScriptRoot "..\python\neurolume\static"
$assets = Join-Path $static "assets"
Push-Location $PSScriptRoot\..\frontend
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed" }
    # The single-bundle build that export_html() inlines (see vite.config.ts).
    npx vite build --mode export
    if ($LASTEXITCODE -ne 0) { throw "export build failed" }

    # Copy the new build over the old one first, so the package is never left
    # half-empty. (A running Neurolume server can hold files open, and Windows
    # refuses to delete open files.)
    New-Item -ItemType Directory -Force $assets -ErrorAction Stop | Out-Null
    Copy-Item -Force dist\assets\* $assets -ErrorAction Stop
    Copy-Item -Force dist\index.html $static -ErrorAction Stop
    New-Item -ItemType Directory -Force (Join-Path $static "export") -ErrorAction Stop | Out-Null
    Copy-Item -Force dist-export\index.html, dist-export\viewer.js, dist-export\viewer.css (Join-Path $static "export") -ErrorAction Stop

    # Then remove bundles from earlier builds. One still in use is left for next time.
    $current = Get-ChildItem dist\assets | ForEach-Object Name
    Get-ChildItem $assets | Where-Object { $current -notcontains $_.Name } | ForEach-Object {
        try { Remove-Item -Force $_.FullName -ErrorAction Stop }
        catch { Write-Warning "Could not remove old file $($_.Name) (in use?); it is harmless." }
    }

    # Check that every file index.html refers to was copied.
    $html = Get-Content (Join-Path $static "index.html") -Raw
    foreach ($match in [regex]::Matches($html, '(?:src|href)="/assets/([^"]+)"')) {
        if (-not (Test-Path (Join-Path $assets $match.Groups[1].Value))) {
            throw "index.html refers to assets/$($match.Groups[1].Value), which is missing"
        }
    }
    Write-Host "Frontend copied to python/neurolume/static"
} finally {
    Pop-Location
}
