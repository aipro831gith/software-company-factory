<#
.SYNOPSIS
  Safe Windows PowerShell vendor skill sync & license-isolation helper for software-company-factory v2.0.
.DESCRIPTION
  Reads .factory/skills-registry.json, clones or updates Bucket A (core) or Bucket B (optional)
  specialist repos into vendor/specialist-skills/, strips nested .git directories so parent Git
  tracks them cleanly without submodule conflicts, and verifies trailofbits isolation.
#>

param(
  [ValidateSet("all", "core", "optional")]
  [string]$Bucket = "all",
  [string]$RepoId = "",
  [switch]$DryRun,
  [switch]$VerifyOnly
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$RegistryPath = Join-Path $RepoRoot ".factory\skills-registry.json"

if (-not (Test-Path $RegistryPath)) {
  Write-Host "[FAIL] Missing .factory/skills-registry.json" -ForegroundColor Red
  exit 1
}

$Registry = Get-Content $RegistryPath -Raw | ConvertFrom-Json
$Entries = @()

if ($Bucket -eq "all" -or $Bucket -eq "core") {
  foreach ($item in $Registry.specialist_repos.bucket_a_core) {
    $Entries += [PSCustomObject]@{ Bucket = "core"; Data = $item }
  }
}
if ($Bucket -eq "all" -or $Bucket -eq "optional") {
  foreach ($item in $Registry.specialist_repos.bucket_b_optional) {
    $Entries += [PSCustomObject]@{ Bucket = "optional"; Data = $item }
  }
}

if (-not [string]::IsNullOrWhiteSpace($RepoId)) {
  $Entries = $Entries | Where-Object { $_.Data.id -eq $RepoId }
  if ($Entries.Count -eq 0) {
    Write-Host "[FAIL] RepoId '$RepoId' not found in .factory/skills-registry.json" -ForegroundColor Red
    exit 1
  }
}

$GitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $VerifyOnly -and -not $DryRun -and -not $GitCmd) {
  Write-Host "[FAIL] Git CLI not found on PATH." -ForegroundColor Red
  exit 1
}

$MissingCount = 0
foreach ($entry in $Entries) {
  $item = $entry.Data
  if ($item.portability -eq "NATIVE_MCP" -or $item.path -like "mcp/*") {
    Write-Host ("  [MCP]  {0} -> {1}" -f $item.id, $item.path) -ForegroundColor Cyan
    continue
  }

  $TargetPath = Join-Path $RepoRoot ($item.path -replace '/', '\')
  if ($VerifyOnly) {
    if (Test-Path $TargetPath) {
      $NestedGit = Join-Path $TargetPath ".git"
      if (Test-Path $NestedGit) {
        Write-Host ("  [FAIL] {0}: nested .git found at {1}" -f $item.id, $NestedGit) -ForegroundColor Red
        $MissingCount++
      } else {
        Write-Host ("  [OK]   {0} ({1})" -f $item.id, $item.load_mode) -ForegroundColor Green
      }
    } else {
      Write-Host ("  [MISS] {0} -> {1}" -f $item.id, $item.path) -ForegroundColor Yellow
      $MissingCount++
    }
    continue
  }

  if ($DryRun) {
    Write-Host ("  [DRY]  Would clone {0} (--depth 1) -> {1} (strip .git)" -f $item.url, $TargetPath) -ForegroundColor Gray
    continue
  }

  $ParentDir = Split-Path -Parent $TargetPath
  New-Item -ItemType Directory -Force -Path $ParentDir | Out-Null
  if (Test-Path $TargetPath) {
    Remove-Item -Path $TargetPath -Recurse -Force
  }

  Write-Host ("  [SYNC] Cloning {0} -> {1}" -f $item.id, $item.path) -ForegroundColor Cyan
  $prevPref = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & git clone --depth 1 --quiet $item.url $TargetPath 2>&1 | Out-Null
  $code = $LASTEXITCODE
  $ErrorActionPreference = $prevPref

  if ($code -ne 0 -or -not (Test-Path $TargetPath)) {
    Write-Host ("  [FAIL] Clone failed for {0} ({1})" -f $item.id, $item.url) -ForegroundColor Red
    $MissingCount++
    continue
  }

  $NestedGit = Join-Path $TargetPath ".git"
  if (Test-Path $NestedGit) {
    Remove-Item -Path $NestedGit -Recurse -Force
  }
  Write-Host ("  [OK]   Vendored {0} (nested .git stripped)" -f $item.id) -ForegroundColor Green
}

if ($VerifyOnly -and $MissingCount -gt 0) {
  Write-Host ("RESULT: {0} specialist repo(s) missing or have nested .git." -f $MissingCount) -ForegroundColor Yellow
  exit 1
}

if (-not $VerifyOnly -and -not $DryRun -and $MissingCount -gt 0) {
  Write-Host ("RESULT: Completed with {0} clone failure(s)." -f $MissingCount) -ForegroundColor Red
  exit 1
}

Write-Host "RESULT: sync-vendor-skills.ps1 completed cleanly." -ForegroundColor Green
exit 0
