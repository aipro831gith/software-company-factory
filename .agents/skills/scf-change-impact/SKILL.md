---
name: scf-change-impact
description: Runs a 7-step ripple-effect impact analysis before any mid-project requirement change, checking DB, API, UI, Spec 0001/0002, tests, and risk tier escalation.
---

# `scf-change-impact` — 7-Step Mid-Project Change Ripple Analyzer

**Assigned Agent:** Agent #2 — Master Build Orchestrator (`architect_slot` via `.factory/models.json`; escalates to `deep_logic_slot` if change alters money/auth invariants)
**File Ownership (Strict):** Writes impact report to `docs/scope/IMPACT-<NNN>-<slug>.md` (never edits `src/` or `tests/` directly during analysis).
**Primary Goal:** Protect the Founder from "ek chhota sa change bol diya aur poora billing/database toot gaya" by mapping every ripple effect *before* approving code edits.

---

## 1. When `/scf-change-impact` Triggers Automatically

Automatically invoke this skill whenever the Founder requests a change **after** a spec has already been approved or partially built:
- Changing a tax rule, discount formula, gold purity rule, or payment split workflow
- Adding/removing a database field on an existing module
- Changing user permissions or role capabilities
- Changing a screen flow that affects another screen or report

*(Note: Tiny visual/copy edits with zero data/logic impact stay in `Vibe` tier and skip full 7-step impact analysis.)*

---

## 2. The Mandatory 7-Step Ripple-Effect Analysis

### Step 1 — Capture the Exact Requested Change in Plain Language
State clearly:
- What the system does **today** (Before), and
- What the Founder wants it to do **now** (After).

### Step 2 — Database & Historical Data Ripple Check
Check `src/db/`, `prisma/`, `migrations/`, and `docs/specs/`:
- Does this require a new column, table, or migration?
- **Critical Non-Coder Check:** *What happens to OLD bills/records created before today?* (e.g., must old invoices keep their historical rate/GST untouched while only new invoices use the new rule?)
- Does any financial column risk violating `block-float-money` (integer paise/milligrams)?

### Step 3 — Backend API & Business Logic Ripple Check
Check `src/server/`, `src/api/`, `src/services/`:
- Which endpoints, validation schemas, and server calculators must change?
- Does this touch **Spec 0002 (Value Sourcing)** — i.e., where does the new value come from?
- Are any other modules (like Reports, Exports, or Audit Logs) consuming the changed API?

### Step 4 — Frontend UI & Validation Ripple Check
Check `src/web/`, `src/app/`, `src/components/`:
- Which screens, forms, print templates, or error messages must update?
- Will counter staff workflow speed or mobile layout be affected?

### Step 5 — Risk Tier & Security Impact Check
Determine whether this change escalates the feature's Workflow Tier (`Vibe` → `Lean` → `Medium` → `Full`):
- Any touch to money, GST, weight, auth, or permissions **automatically promotes the change to `Full` tier** (requiring blind `/scf-check review` + 5-stage `scf-sec-ops`).

### Step 6 — Existing Tests & Gate Invalidation Check
List which existing tests in `tests/` and gate proofs in `.factory/gates/*.gate.json` become stale and MUST be re-run before marking the change complete.

### Step 7 — Rollback Safety & Triad Options (`[BEST SUGGESTION]`)
Confirm the current clean Git checkpoint tag (`node scripts/git-checkpoint.mjs status`) and present **3 Triad Options** to the Founder in simple Hinglish/English using `templates/impact-report.md`:
- **Option 1 — Safe Minimal Patch:** Smallest isolated change with backward compatibility for old records.
- **Option 2 — `[BEST SUGGESTION]` Clean Spec Update + Full Re-Verify:** Update affected Spec (`SPEC-NNN`), re-approve Spec 0001, build cleanly in a targeted wave, and re-run all affected tests + gates.
- **Option 3 — Defer to Phase 2 Module:** Keep current module stable for launch and schedule this change as its own clean next feature.

---

## 3. Hard Fail-Closed Rules

- **Spec 0001 Re-Approval Gate:** If a change alters a `Medium` or `Full` spec's business logic or data contract, the spec's status resets to `DRAFT` until the Founder replies `"APPROVE"` on the updated Plain-English Summary.
- **Zero Silent Data Destruction:** Never suggest a destructive database migration (dropping columns/rows with live customer or financial history) without an explicit backup/migration plan and Boss confirmation.
- **File Ownership Preserved:** Once the Founder approves the impact report, Master Build Orchestrator routes updates sequentially through `scf-architect` → `scf-develop` (disjoint wave packets) → `scf-test` → `scf-check`.
