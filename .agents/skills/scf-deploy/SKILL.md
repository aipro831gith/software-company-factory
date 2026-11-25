---
name: scf-deploy
description: Enforces the 100% manual Boss-Only production release gate, verifying all .gate.json proofs, security gates, rollback anchors, and explicit Founder confirmation before deploy.
---

# `scf-deploy` — 100% Manual Boss-Only Production Release Gate

**Assigned Agent:** Agent #12 — Security, Compliance & Release Officer (`deep_logic_slot` for pre-flight verification; `light_ops_slot` for plain-language Boss checklist)
**Primary Goal:** Guarantee that **NO agent can ever push or deploy unfinished, unverified, or risky code to production automatically**. Production deployment happens **ONLY** when every machine gate passes AND the Founder explicitly confirms release.

---

## 1. Non-Negotiable Release Locks (Fail-Closed)

1. **Zero Autonomous Production Deploys:** Even in `AUTOMATIC` mode, `software-company-factory` stops cleanly at *"Ready for UAT & `/scf-deploy`"* once tests and security pass. Hook #15 (`block-unapproved-deploy`) hard-blocks deployment unless `deploy_approved_by_founder === true` and `.factory/gates/deploy-approval.gate.json` has `manual_boss_confirm: true`.
2. **All Feature Gates Must Be `PASS`:** Hook #14 (`pre-deploy-gate-verify`) runs `node scripts/gate-check.mjs --all`. If any feature gate is `FAIL`, missing, or has `open_blockers > 0`, deployment is blocked immediately.
3. **Zero Open `BUG-*.json` Tickets:** Scan `.factory/tickets/`. Any `OPEN` `BLOCKER` or `HIGH` ticket halts release.
4. **Verified Rollback Tag Before Deploy:** Must have a clean Git checkpoint (`node scripts/git-checkpoint.mjs status` showing `Working Tree: CLEAN`) and a rollback tag (`checkpoint-release-<N>` or `checkpoint-wave-<N>`) so recovery takes 1 command if anything goes wrong in production.

---

## 2. Step-by-Step Release Checklist (`templates/pre-deploy-checklist.md`)

### Step 1 — Run Pre-Deploy Machine Verification Chain
Run all release gates sequentially in PowerShell:

```powershell
node scripts/check-portability.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/gate-check.mjs --all --require-at-least-one; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook pre-release-security-gate; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-env-staging; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/git-checkpoint.mjs status
```

### Step 2 — Verify Production Environment & Backup Readiness
Confirm with clear plain-language checks:
- Production database backup / snapshot verified BEFORE running any schema migration.
- Production `.env` / platform secrets configured separately from local dev `.env` (never reusing dev secrets!).
- Production build succeeds cleanly (`npm run build` / target build command exit code `0`).
- Healthcheck endpoint (`/api/health`) verified and TLS/HTTPS + security headers active.

### Step 3 — Present Plain-Language Pre-Deploy Summary & Triad Options
Show the Founder `templates/pre-deploy-checklist.md` filled with real verified outputs:
- What is going live (plain Hinglish/English list of features)
- Proof that all `.gate.json` and 5-stage `scf-sec-ops` checks passed
- Rollback plan in 1 line (*"Agar live hone ke baad koi problem dikhe toh 1 command mein `checkpoint-release-<N>` par wapas aa jayenge"*)
- **Triad Options (`[BEST SUGGESTION]`):**
  1. **Option 1 — Deploy to Staging / Preview Link First (`[BEST SUGGESTION]` for `Full` tier):** Test live on a private preview URL with dummy/test transaction before customers touch it.
  2. **Option 2 — Deploy Directly to Production:** Only if already UAT-tested locally and Boss explicitly replies `"CONFIRM PRODUCTION DEPLOY"`.
  3. **Option 3 — Hold Release & Keep Local Only:** Save clean Git backup now and deploy later.

### Step 4 — Execute Only After Explicit Boss Confirmation
Once the Founder replies `"CONFIRM PRODUCTION DEPLOY"` (or approves staging):
1. Record `.factory/gates/deploy-approval.gate.json` (`manual_boss_confirm: true`, `approved_at`, `tier`).
2. Set `deploy_approved_by_founder: true` in `.factory/session.lock.json` ONLY for this deploy action, then run `node scripts/hook-runner.mjs --hook block-unapproved-deploy`.
3. Tag release checkpoint (`checkpoint-release-<N>`), execute the target project's deploy command, verify live `/api/health` + smoke check, and reset `deploy_approved_by_founder: false` immediately afterward so future deploys still require explicit Boss approval!
4. Run `/scf-doc-sync` to record the live release in `STATUS.md` and `docs/handoff/LATEST_SESSION.md`.
