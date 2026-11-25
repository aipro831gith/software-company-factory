# `scf-check` Mode: Blind Cross-Model / Fresh-Session Review (`modes/review.md`)

**Agent:** Agent #11 — Cross-Model Reviewer (`blind_reviewer_slot` from `.factory/models.json`)
**Required For:** `Full` tier (money, GST, gold weight, auth, payments, banking)

## Rules for True Blindness
1. **Fresh Zero-History Session:** Never run this review inside the same conversation context that wrote the implementation. Resolve `blind_reviewer_slot` from `.factory/models.json` (alternate model family if available, else fresh zero-history `deep_logic_slot`).
2. **Inputs Given to Reviewer:** ONLY `SPEC-<NNN>.md`, the changed source/test files, and Spec 0002 Value Sourcing table.
3. **Mandatory Audit Checklist:**
   - [ ] Zero JS `Number` float math on currency, GST, discount, or metal weights (`block-float-money`).
   - [ ] 100% server-side calculation authority (tampered client totals ignored).
   - [ ] Atomic DB transactions + `Idempotency-Key` on invoice/payment mutations.
   - [ ] IDOR ownership checks on every read/update/void route.
   - [ ] Zero secrets, `eval()`, or PII in logs/`localStorage`.
4. **Output:** Either `blind_review_status: "PASS"` or structured `.factory/tickets/BUG-<NNN>.json` blockers.
