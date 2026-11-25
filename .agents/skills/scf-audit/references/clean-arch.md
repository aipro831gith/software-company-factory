# Clean Architecture Reference (`references/clean-arch.md`)

**Plain Meaning:** *"Business ke asli niyam (jaise GST aur gold rate ka hisaab) ko UI aur database se alag safe box mein rakhna, taaki screen badalne par hisaab kabhi na toote."* (Google search: `"clean architecture dependency rule"`)

## Folder & Dependency Rules
1. **`domain/` (Pure Core — Zero Framework Imports):** Integer paise/milligram math, GST rules, validation invariants. Easy to unit test in milliseconds.
2. **`services/` / `use-cases/`:** Orchestrates business actions (`createInvoice`, `recordPayment`) using repositories.
3. **`db/` / `repositories/`:** Database queries, migrations, transactions (`Prisma` / `PostgreSQL` / `SQLite`).
4. **`api/` & `web/`:** HTTP routes, auth middleware, and UI screens — thin adapters calling `services/`.

## Why It Fits Wave Workers
Because `domain/`, `db/`, `api/`, and `web/` live in cleanly separated directories matching `AGENTS.md` Section 6, Database, Backend, and Frontend wave workers can build in parallel with zero file collisions.
