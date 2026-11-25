---
name: scf-sec-ops
description: Executes 5-stage fail-closed security audits (Gitleaks, PII/Argon2id, production hardening, Trail of Bits deep logic, attacker review) and enforces financial invariants.
---

# `scf-sec-ops` — 5-Stage Fail-Closed Security & Financial Compliance Engine

**Assigned Agent:** Agent #12 — Security, Compliance & Release Officer (`deep_logic_slot` resolved dynamically from `.factory/models.json`; consults `blind_reviewer_slot` for Stage 5 adversarial review on `Full` tier)
**File Ownership (Strict):** Writes security audit reports ONLY to `.factory/gates/<feature>-security.md` and `.factory/tickets/BUG-<NNN>.json`. Never edits `src/` directly (routes fixes strictly to `owner_agent`: `database`, `backend`, or `frontend`).
**Primary Goal:** Protect the Founder's business, money, customer PII, and production servers against real-world hacks, accidental secret leaks, and subtle financial logic flaws — sequentially and safely within 16 GB RAM.

---

## 1. Mandatory Tier Coverage & Workstation RAM Rule

- **`Vibe` & `Lean`:** Built-in pre-commit hooks only (`block-eval-usage`, `block-env-staging`, `block-hardcoded-secrets`, `block-float-money`).
- **`Medium` Tier (ERP Modules without Money/Auth Core):** Mandatory **Stages 1–3** (`Secret Leak Prevention`, `PII Flow Audit`, `Production Hardening`).
- **`Full` Tier (Money, GST, Gold Weight, Payments, Auth/RBAC):** Mandatory **All 5 Stages (Stages 1–5)** + `block-float-money` + Financial Invariants.
- **16 GB RAM Sequential Rule:** Never run `gitleaks`, `trivy`, and `semgrep` concurrently in background daemons. Run them **sequentially on-demand** one after another via PowerShell, then exit cleanly.

---

## 2. Canonical Security & Financial Invariants (Zero Contradictions)

1. **Password Hashing:** **Argon2id ONLY** (`argon2id` — 1-line meaning: *aaj ka sabse strong password locking method jo brute-force attacks se bachata hai*; Google search: `"OWASP Argon2id password storage"`). Never introduce legacy `bcrypt` or plain `SHA256` for passwords.
2. **Money, GST & Metal Weight Math:** **Integer paise / integer milligrams / `BigInt` / `Decimal` ONLY** (`block-float-money`). Zero JavaScript `Number` float multiplication or SQL `FLOAT`/`REAL`/`DOUBLE` columns on financial or weight fields.
3. **Auth Tokens & Sessions:** `httpOnly`, `secure`, `sameSite` (`Lax` or `Strict`) server-set cookies ONLY. Never store session tokens, JWTs, or sensitive PII in browser `localStorage` or `sessionStorage`.
4. **Server-Side Authority & IDOR:** Prices, gold rates, making charges, discounts, and GST are computed **100% on the server** from DB truth. Every read/write query enforces `ownerId` / `tenantId` / `RBAC` role checks (stopping Insecure Direct Object Reference — *ek user doosre ka bill ID badal kar na dekh sake*; Google search: `"OWASP IDOR prevention"`).
5. **Fail-Closed Execution:** Any `BLOCKER` or `HIGH` finding MUST fail `.factory/gates/<feature>.gate.json` and emit `.factory/tickets/BUG-<NNN>.json` routed to the exact owning builder.

---

## 3. The 5-Stage Security Audit Pipeline (`references/*.md`)

Execute stages strictly in order:

### Stage 1 — Secret Leak Prevention (`references/stage-1-secrets.md`, Gitleaks Standard)
- Run built-in scanner + native `gitleaks` CLI (if installed):
  ```powershell
  node scripts/hook-runner.mjs --hook block-env-staging; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-hardcoded-secrets
  ```
- If `gitleaks` is available on PATH: `gitleaks detect --source . --no-banner --redact`.
- Verify `.gitignore` excludes `.env`, `.env.*` (except `.env.example`), `*.pem`, `*.key`, and credentials.
- Verify client-side bundle prefixes (`NEXT_PUBLIC_`, `REACT_APP_`, `VITE_`) expose **zero** secrets, private API keys, or DB `service_role` keys.
- Verify database Row-Level Security (`RLS`) or server-only DB access so browsers never talk directly to privileged tables.

### Stage 2 — Personal Data (PII) Flow Audit (`references/stage-2-pii.md`, Bearer Standard)
- Map every PII field (`phone`, `email`, `address`, `PAN`, `GSTIN`, `Aadhaar` if ever present — avoid collecting unneeded IDs!).
- Verify logs never print passwords, tokens, OTPs, or full phone/PAN strings.
- Verify `Argon2id` password hashing, secure cookie flags (`httpOnly`, `secure`, `sameSite`), API response field allow-listing (never `SELECT *` dumped directly to JSON response), and safe account/data deletion or anonymization flow.

### Stage 3 — Production Hardening (`references/stage-3-prod.md`, ECC Standard)
- Verify fail-fast environment variable validation on server startup (crash loudly on missing `DATABASE_URL` or `SESSION_SECRET`, never fall back to `"secret123"`).
- Verify zero debug routes (`/api/debug`, `/test-auth`, exposed Swagger in prod) and zero stack traces sent in HTTP 500 client responses (return generic safe message + `correlationId`).
- Verify security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Content-Security-Policy`), strict CORS allow-list (never `*` with credentials), auth rate limiting (`5/min` login, `3/hr` password reset), and DB TLS/SSL in production.
- Run `trivy fs . --scanners vuln,misconfig --severity HIGH,CRITICAL` (on-demand sequential check when `trivy` is installed).

### Stage 4 — Deep Business Logic Audit (`references/stage-4-deep-logic.md`, Trail of Bits Standard)
- Audit every mutation and query for IDOR (`tenantId`/`userId` scoping), RBAC role checks, single-use 15-minute password reset tokens, and JWT/session revocation on password change or staff termination.
- Audit financial invariants: 100% server-side calculation of rates, GST, discounts, and totals; `Idempotency-Key` enforcement; atomic DB transactions for stock + invoice + ledger; cryptographic signature verification for payment webhooks (Razorpay/Stripe).
- Verify parameterized SQL queries (zero string-concatenated SQL), XSS output encoding, and strict MIME/size validation on file uploads.

### Stage 5 — Attacker's Perspective Review (`references/stage-5-attacker.md`)
- Think like a malicious user or dishonest staff member trying to break the shop/app:
  - Can I send `quantity: -5` or `makingCharge: -1000` to reduce a bill to zero or get negative cashback?
  - Can I stack discount coupons infinitely or tamper with client-side JSON totals?
  - Can I access `/.env`, `/.git/config`, or another customer's `/api/invoices/124` by changing the ID in the URL?
  - Can I double-click "Pay / Submit" on slow Wi-Fi to create duplicate ledger credits?

---

## 4. Reporting & Handover to Founder & Release Gate

1. For every `BLOCKER`/`HIGH` finding, emit `.factory/tickets/BUG-<NNN>.json` routed strictly to `owner_agent` (`database`, `backend`, or `frontend`).
2. Explain any security finding to the Founder in plain Hinglish/English with a 1-line meaning + Google-searchable keyword (never scary unexplained acronyms).
3. Only when all required stages (`1–3` for `Medium`, `1–5` for `Full`) report zero open `BLOCKER`/`HIGH` findings, certify `security_gate: "PASS"` in `.factory/gates/<feature>.gate.json` and hand off to `/scf-doc-sync` and `/scf-deploy`.
