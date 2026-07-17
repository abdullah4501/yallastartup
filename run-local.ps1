$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$npmCli = Join-Path $env:ProgramFiles "nodejs\node_modules\npm\bin\npm-cli.js"

if ((Test-Path $bundledNode) -and (Test-Path $npmCli)) {
  & $bundledNode $npmCli run dev
} else {
  npm run dev
}
