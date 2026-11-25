---
name: scf-scope
description: Slices a product handbook or idea into buildable vertical features, assigns Workflow Tiers (Vibe, Lean, Medium, Full), and writes scoped roadmaps to docs/scope/.
---

# `scf-scope` — Feature Slicing, Workflow Tier Dial & Roadmap Control

**Assigned Agent:** Agent #2 — Master Build Orchestrator (`architect_slot` for tier classification; `light_ops_slot` for roadmap formatting via `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY inside `docs/scope/` (`docs/scope/ROADMAP-<slug>.md` and `docs/scope/QUEUE.json`). Never writes application code or architecture specs directly.
**Primary Goal:** Prevent giant, unfinishable builds by slicing any product into small, testable, end-to-end features with the exact right **Workflow Tier** (`Vibe`, `Lean`, `Medium`, or `Full`).

---

## 1. Non-Negotiable Scoping Rules

1. **Vertical Slices Only (No Horizontal Layer Bombs):** Never create a roadmap slice like *"Build all 25 database tables first, then build all APIs, then build all UI"*. Every slice MUST deliver a working, testable business capability from UI → API → DB → Verified Gate.
2. **Automatic Workflow Tier Assignment (`AGENTS.md` Section 8):** Every feature slice MUST be tagged with one of the 4 official tiers:
   - **`Vibe` (3 checks):** Copy edit, color tweak, label fix, tiny CSS polish. Zero DB/API/money change.
   - **`Lean` (6 checks):** Simple single-table CRUD, static info page, non-financial helper utility.
   - **`Medium` (11 checks):** Multi-screen ERP module without money/auth core (e.g., Inventory catalog, Customer CRM directory, Supplier list, Read-only dashboard). **Requires Boss Plain-English Spec Approval.**
   - **`Full` (15+ checks):** Anything touching money (`INR`/paise), GST/tax calculations, gold/silver weight/purity, payments, ledger balances, authentication/RBAC, or PII exports. **Requires Boss Spec Approval + Blind Review + 5-Stage `scf-sec-ops` + `block-float-money`.**
3. **Plain-Language Founder Explanation:** When presenting the roadmap to the Founder, explain every slicing strategy using everyday business analogies and **Triad Options (`[BEST SUGGESTION]`)**.
4. **Zero Stub Roadmap Items:** Every slice in `docs/scope/ROADMAP-<slug>.md` must list: `feature_id`, `plain_title`, `tier`, `dependencies`, `acceptance_goal`, and `recommended_slot`.

---

## 2. Four Slicing Modes (`modes/*.md`)

Select the best slicing pattern automatically (or present Triad Options to the Founder if ambiguous):

1. **`tracer-bullet` (`modes/tracer-bullet.md`):** Build the thinnest end-to-end spine first (1 input → server calculation → 1 DB record → 1 printable/visible output), verify every hook and gate works, then expand features around that proven spine. **Default `[BEST SUGGESTION]` for new ERPs and Smoke Tests.**
2. **`skateboard` (`modes/skateboard.md`):** Ship a minimal usable tool on Day 1 (e.g., single-shop counter billing without multi-branch sync) so the business starts getting value immediately while Phase 2 modules build safely behind it.
3. **`facade` (`modes/facade.md`):** When replacing a legacy desktop app or Excel sheet, wrap high-priority daily pain points first behind a clean modern UI while migrating older reports in controlled stages.
4. **`journey` (`modes/journey.md`):** Slice strictly by complete daily user journeys from `docs/product/HANDBOOK-<slug>.md` (e.g., `Morning Rate Set` → `Sale Billing` → `Return/Exchange` → `Day-End Tally`).

---

## 3. Step-by-Step Execution Protocol

### Step 1 — Pre-Flight & Input Read
1. Verify `.factory/session.lock.json` is `ACTIVE` for `software-company-factory`.
2. Read `docs/product/DISCOVERY-<slug>.md`, `docs/product/RESEARCH-<slug>.md`, and `docs/product/HANDBOOK-<slug>.md` (if available).
3. If no Discovery Brief exists and requirements are ambiguous, route back to `/scf-discover` first rather than guessing business rules.

### Step 2 — Classify Risk & Assign Workflow Tiers
Inspect every proposed feature against the **High-Risk Escalation Checklist**:
- Does it compute, store, or display currency, GST, discounts, interest, or invoice totals? → **`Full`**
- Does it compute or store precious metal weight/purity/wastage? → **`Full`**
- Does it handle login, passwords, sessions, roles (`RBAC`), or payment webhooks? → **`Full`**
- Does it manage multi-screen business data without financial math or auth changes? → **`Medium`**
- Is it a simple standalone utility or UI polish? → **`Lean`** or **`Vibe`**

### Step 3 — Order Dependencies & Enforce Small Slices
- Ensure foundation slices (e.g., Auth/Roles, Master Rates, Core Ledger) precede dependent slices (e.g., GST Billing, Reports).
- Keep each slice sized so its implementation fits cleanly into **1–3 flat waves** (max 3 workers/wave, ≤ 40 KB worker context slice). If a feature needs > 15 new files, split it into two clean sub-features (`FEAT-002A` and `FEAT-002B`).

### Step 4 — Write `docs/scope/ROADMAP-<slug>.md` & `docs/scope/QUEUE.json`
Write the human-readable roadmap and machine-readable queue inside `docs/scope/`:
- Include a plain-language summary table ("Feature Sequence & Risk Level") with 1-line explanations of why the order makes sense.
- Highlight which features will trigger the **Plain-English Spec Approval Gate** (`Medium` and `Full`).

### Step 5 — Present Triad Options & Hand Off
Show the Founder the sliced roadmap in simple Hinglish/English with **3 Triad Options (`[BEST SUGGESTION]`)**:
- **Option 1 — `[BEST SUGGESTION]` Start Slice #1 Automatically (`/scf-architect`):** Begin architecture & Plain-English Spec for the highest-priority slice immediately.
- **Option 2 — Reorder or Merge Slices:** Tell me which feature you want built earlier or later.
- **Option 3 — Trim Scope for Faster Launch:** Move optional slices to Phase 2 so v1 finishes faster.

---

## 4. Hard Guardrails & Handoff

- **Never Bypass `Medium`/`Full` Spec Gate:** Scoping never authorizes coding directly. Every `Medium` and `Full` slice MUST pass `/scf-architect` (Spec 0001 + Spec 0002 + Founder `"APPROVE"`) before `/scf-develop` begins.
- **Model-Agnostic Slot Discipline:** Tag each slice in `QUEUE.json` only with abstract slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`).
- **Mid-Project Scope Changes:** If the Founder asks to alter an already-scoped or built feature later, invoke `/scf-change-impact` before modifying `docs/scope/`.
