$ErrorActionPreference = "Stop"
Push-Location $PSScriptRoot\..\frontend
try {
    npm install
    npm run build
    Copy-Item -Recurse -Force dist\* ..\python\neurolume\static\
} finally {
    Pop-Location
}
