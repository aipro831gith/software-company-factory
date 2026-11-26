# `scf-swarm-dispatch` Mode: Free-Plan-Proof Local Fallback (`modes/free-plan-fallback.md`)

**Use When:** Running on a plan or environment without native `/swarm` or `/run-workflow` tools.

## Deterministic Local Wave Loop
1. **Validate Wave Manifest:**
   ```powershell
   node scripts/workflow-runner.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/ast-collision-guard.mjs
   ```
2. **Execute Wave-by-Wave:** Run up to 3 (burst max 5) isolated Task Packets (`<= 40 KB` slice each) per wave, strictly respecting `AGENTS.md` Section 6 ownership.
3. **Log Every Event:** Append real JSONL records to `.factory/board/messages.jsonl` using `node scripts/workflow-runner.mjs --log-event`.
4. **Fail-Closed Wave Gate:** After each wave, run `block-eval-usage`, `block-float-money`, `block-hardcoded-secrets`, and `git-checkpoint.mjs commit --wave <N>` before starting Wave `N+1`.
