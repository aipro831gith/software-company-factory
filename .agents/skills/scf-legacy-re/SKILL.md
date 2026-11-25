---
name: scf-legacy-re
description: Optional plug-in skill for reverse-engineering and safely modernizing legacy apps, Excel workflows, or client codebases via REA analysis and Craft modernization.
---

# `scf-legacy-re` — Legacy Reverse-Engineering & Safe Modernization Plug-In

**Assigned Agent:** Agent #12 — Security, Compliance & Release Officer (`architect_slot` + `deep_logic_slot` resolved from `.factory/models.json`)
**Activation Rule:** **Dormant by default.** Activates ONLY when working on an **existing/legacy codebase**, messy spreadsheet/Access workflow, or client modernization project (adds zero context overhead to greenfield builds).
**File Ownership (Strict):** Writes reverse-engineering reports ONLY to `docs/product/LEGACY-REA-<slug>.md` and migration parity plans to `docs/scope/`. Never edits legacy code directly during analysis; all code changes flow through `/scf-audit` → `/scf-architect` → `/scf-develop` → `/scf-test`.
**Primary Goal:** Uncover how an undocumented old application *actually* works in production, catch hidden financial/security landmines before touching a file, and execute a zero-data-loss modernization.

---

## 1. Two Execution Modes (`modes/*.md`)

1. **`rea-analysis` (`modes/rea-analysis.md` — Reverse Engineering Analysis):**
   - Inspects the legacy repository, database schema/dumps, config files, spreadsheets, and UI routes.
   - Maps **As-Is Truth**: exact tables, hidden business formulas (tax, discounts, making charges, gold rounding), dead files, and security/float hazards.
   - Produces `docs/product/LEGACY-REA-<slug>.md` with mandatory epistemic confidence tags (`[confirmed]` vs `[uncertain]`) and a plain-language summary for the Founder.
2. **`craft-modernize` (`modes/craft-modernize.md` — Controlled Strangler Modernization):**
   - Pairs with `scf-scope` (`facade` mode), `scf-audit`, and `scf-architect` to replace one legacy module at a time without interrupting daily shop/business work.
   - Enforces **Parallel Shadow Reconciliation**: proves new integer-paise outputs match verified historical bills/ledgers (or flags intentional rounding bug fixes in the old app for explicit Boss approval).

---

## 2. Step-by-Step Legacy Onboarding Workflow

### Step 1 — Quarantine & Baseline Snapshot First (Never Mutate Blindly)
1. Verify `.factory/session.lock.json` is `ACTIVE` for `software-company-factory`.
2. Ensure the target legacy repository has a clean baseline Git commit and tag (`checkpoint-legacy-baseline`) before any refactoring begins.
3. Run read-only safety scans on the legacy codebase to surface immediate hazards:
   ```powershell
   node scripts/hook-runner.mjs --hook block-eval-usage --root <legacy-path>; node scripts/hook-runner.mjs --hook block-float-money --root <legacy-path>; node scripts/hook-runner.mjs --hook block-hardcoded-secrets --root <legacy-path>
   ```

### Step 2 — Extract True Business Rules & Data Traps (`modes/rea-analysis.md`)
- Document every screen, API route, background job, database table, and calculation formula actually present in code (never rely on outdated comments!).
- Translate every discovered trap into plain Hinglish/English for the Founder with a 1-line meaning + Google-searchable keyword (e.g., *"Purane code mein `Float` / `Number` use hua hai jisse ₹1–2 ka rounding drift aata tha; naye system mein hum `Integer Paise` use karenge — Google search: 'store currency as integer cents'"*).
- Tag any undocumented or conflicting legacy rule `[uncertain]` so `/scf-discover` or the Founder confirms the desired rule before `/scf-architect` writes the new spec.

### Step 3 — Present Triad Modernization Options (`[BEST SUGGESTION]`)
Never push a reckless *"delete everything and rewrite from scratch overnight"* plan. Present **3 concrete Triad Options**:
- **Option A — Minimal Security & Crash Patch (`Lean`):** Keep the legacy architecture intact; patch only leaked secrets, `eval()`, float-money bugs, and critical crashes.
- **Option B — `[BEST SUGGESTION]` Strangler Facade Migration (`Medium`/`Full`):** Wrap one high-pain module at a time behind clean modern APIs + React/Next.js UI while keeping old data intact and running automated parity reconciliation (`modes/craft-modernize.md`).
- **Option C — Clean Greenfield Rebuild + Idempotent Data Importer (`Full`):** Design a fresh clean architecture via `/scf-architect` and build a dry-runnable, idempotent importer (`--dry-run`) to migrate verified customers, inventory, and opening balances once.

### Step 4 — Hand Off to Standard Factory Pipeline
Once the Founder chooses an option:
- Feed `docs/product/LEGACY-REA-<slug>.md` into `/scf-audit` → `/scf-scope` → `/scf-architect` (Boss Plain-English Spec Approval) → `/scf-develop` → `/scf-test` (requiring legacy-vs-new reconciliation tests) → `/scf-sec-ops` → `/scf-deploy`.

---

## 3. Hard Fail-Closed Guardrails

- **Zero Silent Data Loss:** Never propose dropping or overwriting legacy database tables without an explicit verified backup and dry-run migration script.
- **Parity Proof Before Cutover:** Never declare a modernized billing/ledger module ready until at least 20 historical sample transactions reconcile within exact expected paise/milligram rules.
