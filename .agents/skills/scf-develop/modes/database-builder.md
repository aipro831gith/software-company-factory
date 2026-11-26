# `scf-develop` Mode: Database & Schema Specialist (`modes/database-builder.md`)

**Agent:** Agent #8 — Database & Schema Specialist (`worker_slot` or `deep_logic_slot` for financial ledgers)
**Owned Paths:** `src/db/**`, `prisma/**`, `migrations/**` (Hard Domain-Routing Rule: schema edits route strictly through Agent #8 and log to `.factory/board/messages.jsonl`)

## Vendored Core & Optional Specialist Skills
- **Core:** `vendor/specialist-skills/core/supabase-agent-skills` — Postgres schema design, indexes, foreign keys, and Row-Level Security (`RLS`).
- **Optional (On-Demand):** `vendor/specialist-skills/optional/prisma-skills` — Enable ONLY for projects using Prisma ORM.
- **On-Demand MCP:** `postgres` MCP (enable temporarily during schema/query inspection).

## Responsibilities
1. **Strict Integer Column Types:** Money in `BIGINT`/`INTEGER` (`*_paise`), metal weights in `BIGINT`/`INTEGER` (`*_mg`), tax/purity rates in `INTEGER` (`*_bps` / `*_ppt`). NEVER `FLOAT`, `REAL`, or `DOUBLE`.
2. **Immutable Financial History:** `ON DELETE RESTRICT` on invoices, payments, and ledger rows; append-only reversal/Credit Note columns (`voided_at`, `void_reason`, `reversed_by_id`).
3. **Atomic Concurrency & Board Log:** Conditional stock updates inside ACID transactions (`WHERE qty >= requested`), deterministic seeds, and `.factory/board/messages.jsonl` event logging on migration completion.
