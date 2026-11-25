---
name: scf-audit
description: Audits existing or target codebase structure, selects the cleanest architecture pattern (Clean, DDD, Functional, SOLID OOP), and flags debt before building.
---

# `scf-audit` — Codebase Structure & Architecture Pattern Auditor

**Assigned Agent:** Agent #3 — Chief Architect & Stack Selector (`architect_slot` via `.factory/models.json`; uses `deep_logic_slot` when auditing complex financial/auth legacy logic)
**File Ownership (Strict):** Writes audit reports inside `docs/specs/AUDIT-<slug>.md` or `docs/handoff/`. Read-only on `src/` and `tests/` (never silently rewrites app code during an audit).
**Primary Goal:** Inspect an existing or newly scaffolded project repository, diagnose structural risks, and pick the cleanest architecture style so code stays modular, readable, and collision-free across parallel wave workers.

---

## 1. When `/scf-audit` Runs

- Automatically before `/scf-architect` plans a feature on an **existing** target codebase (or after `/scf-legacy-re` reverse-engineers an old repo).
- Periodically after 3–5 completed features on a growing ERP (like Jewelry ERP) to prevent "spaghetti code" and circular dependencies.
- Whenever the Founder asks: *"Is the codebase clean, safe, and easy to extend?"*

---

## 2. Four Architecture Pattern References (`references/*.md`)

Read the matching reference before recommending a pattern:
1. **`references/clean-arch.md`:** Best for business ERPs (Jewelry ERP, Inventory + GST Billing + Accounting). Separates pure domain math (paise/GST rules) from database and UI frameworks so rules never break when UI changes.
2. **`references/ddd.md` (Domain-Driven Design):** Best for large multi-module domains with rich state transitions (e.g., Karigar job-work -> Hallmarking -> Counter Stock -> Sale -> Old Gold Melting).
3. **`references/functional.md`:** Best for pure calculation engines, tax pipelines, pricing calculators (`smoke-gold-calc`), and stateless API transforms — deterministic inputs -> outputs with zero hidden mutation bugs.
4. **`references/solid-oop.md`:** Best for extensible service adapters (multiple payment gateways, printer drivers, SMS/WhatsApp providers) behind clean interfaces.

---

## 3. Step-by-Step Audit Protocol

### Step 1 — Structural & Ownership Hygiene Scan
Inspect the target repo tree and check:
1. **Layer Separation:** Are DB queries mixed directly inside React/UI components? (Flag as `HIGH` architectural leak — UI must talk through clean server/API boundaries.)
2. **Financial Math Purity:** Run `node scripts/hook-runner.mjs --hook block-float-money` and `block-eval-usage` on the target directory to catch any hidden float math or unsafe dynamic execution.
3. **File Size & Context Slice Safety:** Flag any monolithic file > 400 lines or > 20 KB that would blow past the `40 KB` wave worker context budget or cause merge collisions.
4. **Hardcoded Secrets & Config:** Run `block-hardcoded-secrets` and inspect `.env.example` vs `.gitignore`.

### Step 2 — Dependency & Circular Import Check
Inspect imports across `src/db/`, `src/server/`, `src/services/`, and `src/web/`:
- Verify **one-way dependency flow**: `UI -> API/Controllers -> Domain Services -> Repositories/DB` (never `Domain -> UI` or `DB -> API`).
- Verify zero duplicate business logic across modules (e.g., GST calculation duplicated in 3 different files — must consolidate into 1 canonical server service!).

### Step 3 — Select Best-Fit Architecture Pattern (Triad Options)
Present **3 concrete architecture options (`[BEST SUGGESTION]`)** in plain Hinglish/English with 1-line explanations + Google-searchable terms:
- **Option A — Simple Modular (`functional.md` + lightweight folders):** Best for tiny apps/calculators (`smoke-gold-calc`).
- **Option B — `[BEST SUGGESTION]` Clean Modular Core (`clean-arch.md` + pure functional math core):** Best for Jewelry ERP & multi-module business apps; protects GST/gold rules from UI or DB changes.
- **Option C — Bounded Domain Modules (`ddd.md` + `solid-oop.md` adapters):** Best for multi-branch enterprise systems with complex workflows and external hardware/gateways.

### Step 4 — Write `docs/specs/AUDIT-<slug>.md`
Include:
- Plain-language Health Scorecard (Green / Yellow / Red)
- Top 3–5 concrete findings (`exact_file`, `severity`, `why it matters in plain words`, `fix owner_agent`)
- Selected Architecture Pattern + folder convention rules for `/scf-architect` and `/scf-develop`.

---

## 4. Hard Guardrails

- **Never Refactor Blindly During Audit:** Audit produces findings and an approved plan; actual code changes happen only through `/scf-architect` → `/scf-develop` (with disjoint wave ownership) → `/scf-test`.
- **Zero Jargon Without Translation:** Whenever mentioning `Clean Architecture`, `DDD`, `SOLID`, or `Circular Dependency`, include a 1-line plain meaning and Google-searchable keyword.
