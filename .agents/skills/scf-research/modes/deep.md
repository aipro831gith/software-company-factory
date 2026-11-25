# `scf-research` — Deep 3-Level Mode (`modes/deep.md`)

**Slot:** `architect_slot` (via `.factory/models.json`)
**Use When:** `Medium` or `Full` tier systems involving money, GST, gold/inventory ledgers, authentication, payments, or multi-module ERPs.

## Level 1 — Domain, Competitor & Compliance Reality
- Map how real Indian businesses/users currently perform this task (paper register, Excel, legacy desktop software).
- Verify statutory or tax formats (e.g., GST 3% on gold jewelry vs. making charges, HSN codes, invoice numbering continuity) and tag every rule with `[confirmed]` / `[likely]` / `[possible]` / `[uncertain]`.
- Flag any `[uncertain]` legal/tax item for Founder + CA confirmation.

## Level 2 — Technical & Architectural Fit
- Evaluate candidate stacks against:
  1. Exact integer/Decimal financial math support (zero float leakage),
  2. ACID database transactions and foreign-key integrity,
  3. Clean Windows 11 local development & low RAM usage (target <= 11.5 GB total),
  4. Long-term maintainability and ecosystem stability.
- Compare top 3 stack/pattern approaches using **Triad Options (`[BEST SUGGESTION]`)**.

## Level 3 — Security, PII & Operational Failure Modes
- Identify top attacker/mistake vectors (negative quantities, IDOR, leaked `.env`, concurrent stock race conditions, unverified webhooks).
- Verify how `scf-sec-ops` Stages 1–5 will guard each risk.
- Summarize findings in `docs/product/RESEARCH-<slug>.md` using `templates/research-brief.md`.
