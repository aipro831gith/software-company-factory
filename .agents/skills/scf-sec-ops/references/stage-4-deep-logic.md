# Security Stage 4: Deep Business Logic Audit (`references/stage-4-deep-logic.md`)

**Standard:** Trail of Bits Deep Logic & Financial Invariants (`Full` Tier Mandatory)

## Checklist
1. **IDOR & RBAC Verification:** Every read, update, void, or export query verifies both user role (`RBAC`) AND record ownership (`tenantId` / `shopId`).
2. **Auth Token Lifecycle:** Password reset tokens are single-use, cryptographically random, hashed in DB, and expire within 15 minutes. Terminating a staff account revokes active sessions immediately.
3. **100% Server-Side Math & `block-float-money`:**
   ```powershell
   node scripts/hook-runner.mjs --hook block-float-money
   ```
   Server ignores client-sent prices, gold rates, GST, and totals — recomputing everything in integer paise / milligrams inside an ACID transaction.
4. **Payment Webhooks & Idempotency:** Verify cryptographic HMAC signature on Razorpay/Stripe webhooks before marking orders paid; enforce unique `Idempotency-Key` on bill/payment creation.
5. **SQLi, XSS & Upload Safety:** Parameterized ORM/SQL queries only, React/HTML output escaping, and strict file extension + MIME + size checks on uploads.
