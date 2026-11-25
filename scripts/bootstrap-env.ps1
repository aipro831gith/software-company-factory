<#
.SYNOPSIS
  Verifies Windows workstation prerequisites for software-company-factory.
.DESCRIPTION
  Checks Git, Node.js, Python, and optional security CLIs (gitleaks, semgrep, trivy).
  Prints exact winget/pip install commands for any missing tool and exits non-zero
  if critical tools (Git, Node.js, Python) are missing.
#>

$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  software-company-factory :: Windows Environment Check" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$CriticalMissing = @()
$OptionalMissing = @()

function Test-RealExecutable {
  param(
    [string]$CommandName,
    [string[]]$VersionArgs
  )
  $cmd = Get-Command $CommandName -ErrorAction SilentlyContinue
  if (-not $cmd) {
    return @{ Found = $false; Output = "Not found on PATH" }
  }
  try {
    $prevPref = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $out = & $CommandName @VersionArgs 2>&1 | Out-String
    $code = $LASTEXITCODE
    $ErrorActionPreference = $prevPref
    if ($code -ne 0 -or [string]::IsNullOrWhiteSpace($out) -or $out -match "Microsoft Store") {
      return @{ Found = $false; Output = "Windows Store stub or non-working binary ($($cmd.Source))" }
    }
    return @{ Found = $true; Output = ($out.Trim() -split "`r?`n")[0]; Path = $cmd.Source }
  } catch {
    return @{ Found = $false; Output = $_.Exception.Message }
  }
}

$Checks = @(
  @{ Name = "git";     Args = @("--version"); Critical = $true;  Install = "winget install --id Git.Git -e --source winget" },
  @{ Name = "node";    Args = @("--version"); Critical = $true;  Install = "winget install --id OpenJS.NodeJS.LTS -e --source winget" },
  @{ Name = "python";  Args = @("--version"); Critical = $true;  Install = "winget install --id Python.Python.3.12 -e --source winget" },
  @{ Name = "gitleaks";Args = @("version");   Critical = $false; Install = "winget install --id Gitleaks.Gitleaks -e --source winget" },
  @{ Name = "trivy";   Args = @("--version"); Critical = $false; Install = "winget install --id AquaSecurity.Trivy -e --source winget" },
  @{ Name = "semgrep"; Args = @("--version"); Critical = $false; Install = "pip install semgrep" }
)

foreach ($item in $Checks) {
  $res = Test-RealExecutable -CommandName $item.Name -VersionArgs $item.Args
  $tag = if ($item.Critical) { "[CRITICAL]" } else { "[OPTIONAL]" }
  if ($res.Found) {
    Write-Host ("  [PASS] {0,-10} {1,-10} -> {2}" -f $tag, $item.Name, $res.Output) -ForegroundColor Green
  } else {
    $color = if ($item.Critical) { "Red" } else { "Yellow" }
    Write-Host ("  [MISS] {0,-10} {1,-10} -> {2}" -f $tag, $item.Name, $res.Output) -ForegroundColor $color
    Write-Host ("         Install: {0}" -f $item.Install) -ForegroundColor Gray
    if ($item.Critical) { $CriticalMissing += $item } else { $OptionalMissing += $item }
  }
}

Write-Host ""
Write-Host "Checking Mother Factory Core Files:" -ForegroundColor Cyan
$RepoRoot = Split-Path -Parent $PSScriptRoot
$RequiredFiles = @(
  "AGENTS.md",
  "CLAUDE.md",
  "STATUS.md",
  "README.md",
  ".gitignore",
  ".factory\models.json",
  ".factory\config.json",
  ".factory\session.lock.json",
  ".agents\hooks.json",
  "mcp\mcp_config.template.json"
)

$MissingFiles = @()
foreach ($rel in $RequiredFiles) {
  $full = Join-Path $RepoRoot $rel
  if (Test-Path $full) {
    Write-Host ("  [OK]   {0}" -f $rel) -ForegroundColor Green
  } else {
    Write-Host ("  [FAIL] {0} (missing)" -f $rel) -ForegroundColor Red
    $MissingFiles += $rel
  }
}

Write-Host ""
if ($CriticalMissing.Count -gt 0 -or $MissingFiles.Count -gt 0) {
  Write-Host "RESULT: BLOCKED (Fail-Closed). Install missing CRITICAL tools and re-run this script." -ForegroundColor Red
  if ($CriticalMissing.Count -gt 0) {
    Write-Host ""
    Write-Host "Run these commands in PowerShell, then restart your terminal:" -ForegroundColor Yellow
    foreach ($m in $CriticalMissing) {
      Write-Host ("  " + $m.Install) -ForegroundColor White
    }
  }
  exit 1
}

if ($OptionalMissing.Count -gt 0) {
  Write-Host "RESULT: READY WITH OPTIONAL TOOLS MISSING (built-in Node/regex security fallback active)." -ForegroundColor Yellow
} else {
  Write-Host "RESULT: 100% READY (all critical and optional security tools installed)." -ForegroundColor Green
}
exit 0
