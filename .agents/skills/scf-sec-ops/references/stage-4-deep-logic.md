# Security Stage 4: Deep Business Logic Audit (`references/stage-4-deep-logic.md`)

**Agent:** Agent #9 — Dedicated Cybersecurity Specialist (`deep_logic_slot`)
**Standard:** Trail of Bits Deep Logic (Internal Audit Only) + OWASP 2025 (`claude-code-owasp`) + Financial Invariants (`Full` Tier Mandatory)

## Vendored Internal Audit References
- `vendor/specialist-skills/core/claude-code-owasp/ANTIGRAVITY_ADAPTER.md` (`skills/owasp-security/SKILL.md`)
- `vendor/specialist-skills/optional/trailofbits-skills/INTERNAL_AUDIT_ONLY.md` (**STRICT LEGAL RULE:** Internal audit knowledge only; `block-client-agpl-leak` hard-blocks copying into any client repo!)
- `vendor/specialist-skills/optional/strix/STANDALONE_ONLY.md` (Run `usestrix/strix` strictly standalone when IDE builds are paused on 16 GB RAM.)

## Deep Logic & Financial Checklist
1. **IDOR & RBAC Verification:** Every read, update, void, or export query verifies both user role (`RBAC`) AND record ownership (`tenantId` / `shopId`).
2. **Auth Token Lifecycle:** Single-use 15-min password reset tokens (hashed in DB), `Argon2id` passwords only, immediate session revocation on staff termination.
3. **100% Server-Side Math & Legal Isolation Hooks:**
   ```powershell
   node scripts/hook-runner.mjs --hook block-float-money; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-client-agpl-leak
   ```
4. **Payment Webhooks & Idempotency:** Verify HMAC signatures on Razorpay/Stripe webhooks; enforce unique `Idempotency-Key` on bill/payment creation inside ACID transactions.
5. **SQLi, XSS & Upload Safety:** Parameterized queries only, strict output escaping, and extension + MIME + size validation on uploads.
