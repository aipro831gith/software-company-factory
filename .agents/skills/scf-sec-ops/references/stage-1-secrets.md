# Security Stage 1: Secret Leak Prevention (`references/stage-1-secrets.md`)

**Standard:** Gitleaks + Fail-Closed Environment Hygiene

## Checklist
1. **Verify `.gitignore` & `.env.example`:** Confirm `.env` and `.env.*` (except `.env.example`) are ignored and never committed.
2. **Staged Diff & Repo Scan:**
   ```powershell
   node scripts/hook-runner.mjs --hook block-env-staging; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-hardcoded-secrets
   ```
   Run `gitleaks detect --source . --no-banner --redact` sequentially on-demand if `gitleaks` is installed.
3. **Client Bundle Isolation:** Confirm zero server secrets (`DATABASE_URL`, `SESSION_SECRET`, `RAZORPAY_KEY_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`) appear under `NEXT_PUBLIC_`, `REACT_APP_`, or `VITE_` variables.
4. **DB Access & RLS:** Confirm privileged DB credentials live strictly on the server; if using client-accessible DB APIs, enforce strict Row-Level Security (`RLS`).
5. **Key Rotation Rule:** If any real secret ever touched Git history, flag immediately for immediate key revocation/rotation (never just delete in a new commit).
