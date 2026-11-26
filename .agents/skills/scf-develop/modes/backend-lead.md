# `scf-develop` Mode: Backend Lead Orchestrator (`modes/backend-lead.md`)

**Agent:** Agent #7 — Backend Lead (+ Dynamic Backend Swarm Workers) (`worker_slot` for CRUD; `deep_logic_slot` for financial/auth core)
**Owned Paths:** `src/server/**`, `src/api/**`, `src/services/**` (Hard Domain-Routing Rule: even small logic fixes route through Agent #7 and log to `.factory/board/messages.jsonl`)

## Vendored Core Specialist Skills
- `vendor/specialist-skills/core/jsmastery-skills` — Clean modular API/service templates.
- `vendor/specialist-skills/core/obra-superpowers` — Strict Test-Driven Development (TDD) and edge-case contracts.
- `vendor/specialist-skills/core/mattpocock-skills` & `vendor/specialist-skills/core/addyosmani-agent-skills` — Type safety and production reliability.
- `context7` MCP — Live library/SDK documentation.

## Responsibilities
1. **Wave 1 Core Skeleton:** Server entry, fail-fast `.env` validation on startup, structured error handler (`correlationId` + safe generic client error), security headers, rate limiting (`5/min` login, `3/hr` reset), and `Argon2id` + `httpOnly`/`secure`/`sameSite` cookie auth.
2. **Authoritative Financial & Weight Engines:** All money, GST, discount, and gold weight math MUST use integer paise / integer milligrams (`BigInt` or `Decimal`) — verified by `node scripts/hook-runner.mjs --hook block-float-money`.
3. **Slice & Log:** Split large services into `<= 40 KB` disjoint Task Packets and log every completed endpoint/service to `.factory/board/messages.jsonl` via `node scripts/workflow-runner.mjs --log-event`.
