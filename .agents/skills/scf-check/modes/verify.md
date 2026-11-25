# `scf-check` Mode: Live Runtime Verify (`modes/verify.md`)

**Agent:** Agent #10 — QA Verification & Testing Agent (`worker_slot`)
**Required For:** `Lean`, `Medium`, `Full` tiers

## Step-by-Step Live Verification
1. **Static & Hook Sweep:**
   ```powershell
   node scripts/hook-runner.mjs --hook block-eval-usage; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-float-money; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-hardcoded-secrets
   ```
2. **Test Suite Execution:** Run unit, integration, and financial edge-case tests created by `/scf-test`.
3. **Live Runtime Smoke Proof:** Boot app/API locally, hit real endpoints (create -> read -> invalid input -> idempotency duplicate -> server math check), inspect response codes and DB state, then stop local server cleanly to free 16 GB RAM.
4. **Emit Gate Record:** Write `.factory/gates/<feature>.gate.json` and validate via `node scripts/gate-check.mjs --feature <feature>`.
   - On ANY failure: do NOT write `PASS`; emit `.factory/tickets/BUG-<NNN>.json` instead.
