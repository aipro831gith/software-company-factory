# `scf-develop` Mode: Database & Schema Builder (`modes/database-builder.md`)

**Agent:** Agent #6 — Database & Schema Builder (`worker_slot` or `deep_logic_slot` for financial ledgers)
**Owned Paths:** `src/db/**`, `prisma/**`, `migrations/**`

## Responsibilities
1. **Wave 1 Schema & Migrations:** Translate `SPEC-<NNN>` Part B into clean relational tables with primary keys, foreign keys, `NOT NULL` defaults, and query indexes.
2. **Strict Column Types:**
   - Money columns: `BIGINT` / `INTEGER` (`*_paise`) — **NEVER** `FLOAT`, `REAL`, or `DOUBLE`.
   - Weight columns: `BIGINT` / `INTEGER` (`*_mg`) — **NEVER** `FLOAT`.
   - Rates/percentages: `INTEGER` (`*_bps` basis points or `*_ppt` purity parts-per-thousand).
3. **Immutable Financial History:** Use `ON DELETE RESTRICT` on invoices, ledger entries, and payments. Add `voided_at`, `void_reason`, and `reversed_by_id` instead of hard deletes.
4. **Deterministic Seed Script:** Provide clean idempotent seed data for dev/testing (e.g., default roles, sample items) with zero production secret leakage.
