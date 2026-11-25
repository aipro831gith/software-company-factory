# `scf-architect` Mode: Stack Selection (`modes/stack-selection.md`)

**Slot:** `architect_slot`
**Goal:** Choose the cleanest, lowest-maintenance, Windows-friendly tech stack tailored to the specific target project — never one-size-fits-all dogma.

## Stack Selection Criteria (Scored Against Workstation & Business Needs)
1. **Precision & Safety:** Native support for exact integer/BigInt/Decimal math (`block-float-money`), schema-level foreign keys, and Argon2id password hashing.
2. **Windows 11 + 16 GB RAM Comfort:** Fast startup (`< 3s`), zero mandatory heavy multi-container Docker mesh for basic local dev, clean PowerShell/Node/Python commands.
3. **UI Speed & Quality:** Supports clean component systems and UI/UX Pro Max design tokens (`scripts/ui-search-bridge.py`).
4. **Testing & Verification Speed:** Fast unit + API integration + Playwright browser verification without flaky custom harnesses.

## Standard Triad Stack Archetypes (Adapt Per Project)
- **Option A — Lightweight Local-First (Great for Smoke Tests & Single-Counter Utilities):**
  TypeScript + Node.js / Next.js or Vite + Express/Fastify + SQLite (WAL mode) + Drizzle/Prisma + Vitest + Playwright. *(Zero external DB server setup; 1-file backup.)*
- **Option B — `[BEST SUGGESTION]` Production Business ERP (Great for Jewelry ERP & Multi-User Shops):**
  TypeScript + Next.js (App Router) + Tailwind CSS + Prisma / Drizzle + PostgreSQL (or SQLite for single-shop v1 with clean Prisma migration path to Postgres) + Argon2id + Zod + Vitest + Playwright. *(Strongest type safety from DB to UI, exact BigInt/Decimal support, smooth Windows dev.)*
- **Option C — Python Data/API + Web Frontend (Great for Heavy Analytics / Hardware Bridges):**
  FastAPI (Python 3.12 + Pydantic + Decimal + SQLAlchemy) + PostgreSQL + React/Next.js frontend + Pytest + Playwright.
