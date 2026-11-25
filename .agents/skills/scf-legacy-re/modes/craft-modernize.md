# `scf-legacy-re` Mode: Controlled Modernization (`modes/craft-modernize.md`)

**Slot:** `architect_slot` + `worker_slot` (via `/scf-develop`)
**Goal:** Modernize legacy workflows slice-by-slice with zero data loss and proven numerical parity.

## Modernization Rules
1. **Never Rewrite Unverified Rules:** Every legacy formula extracted in `LEGACY-REA-<slug>.md` must pass Boss review in `/scf-architect` Part A before replacement.
2. **Data Migration Idempotency:** Any CSV/DB importer script must be dry-runnable (`--dry-run`), idempotent (re-running does not duplicate records), and reject corrupt/negative rows loudly.
3. **Reconciliation Gate:** `/scf-test` must include parity tests comparing 20+ real historical cases (legacy vs. modernized integer-paise engine) and documenting every intentional rounding fix.
