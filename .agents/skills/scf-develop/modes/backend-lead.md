# `scf-develop` Mode: Backend Lead Orchestrator (`modes/backend-lead.md`)

**Agent:** Agent #5 — Backend Lead Orchestrator (`worker_slot` for CRUD; `deep_logic_slot` for financial/auth core)
**Owned Paths:** `src/server/**`, `src/api/**`, `src/services/**`

## Responsibilities
1. **Wave 1 Core Skeleton:** Server entry point, fail-fast `.env` schema validation on startup, structured error handler (correlation ID + generic client error), security headers, rate limiting, and auth/RBAC middleware (`Argon2id` + `httpOnly` cookie sessions).
2. **Authoritative Calculation Services:** Implement all money, GST, discount, and gold-weight engines using integer paise/milligrams (`BigInt` or `Decimal`) — verify with `node scripts/hook-runner.mjs --hook block-float-money`.
3. **Slice Large APIs into Wave Packets:** Assign 1 endpoint group or 1 domain service per `Backend-Worker` with strictly disjoint file paths and explicit TypeScript/JSON request-response contracts.
4. **Enforce Spec 0002 & IDOR:** Validate every request body via strict schema validation, verify record ownership on every read/write, and require `Idempotency-Key` on payment/invoice creation.
