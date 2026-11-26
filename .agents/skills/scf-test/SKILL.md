---
name: scf-test
description: Designs and writes unit, integration, E2E, and financial boundary test suites inside tests/ for Medium and Full tier features.
---

# `scf-test` — Automated Unit, Integration & Financial Edge-Case Test Suite

**Assigned Agent:** Agent #10 — QA Verification & Testing Agent (`worker_slot` for standard suites; consults `deep_logic_slot` for complex financial/concurrency test cases via `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY inside `tests/` (`tests/unit/`, `tests/integration/`, `tests/e2e/`). Never alters production logic in `src/` to make a failing test pass!
**Primary Goal:** Build deterministic, fast, automated test suites that catch real money rounding bugs, negative-value attacks, IDOR leaks, and broken user journeys before the Founder ever tests the app.

---

## 1. Non-Negotiable Testing Standards

1. **Test the Real Contract, Never Fake Mocks:**
   - For financial/GST/gold math: call the **real** calculation functions and DB transaction layer — never mock out the tax calculator you are supposed to test!
   - Never relax assertions or skip failing tests (`test.skip` / `it.skip` are forbidden in `.gate.json` certification).
2. **Never Edit `src/` to Force a Pass:** If a test fails because `src/` has a bug, leave the failing test intact and emit `.factory/tickets/BUG-<NNN>.json` routed to `owner_agent` (`database`, `backend`, or `frontend`).
3. **Windows & 16 GB RAM Friendly:** Run suites cleanly in PowerShell without spawning heavy parallel browser clusters (run Playwright E2E sequentially with 1–2 workers max).

---

## 2. Mandatory Test Coverage Matrix by Workflow Tier

| Tier | Mandatory Test Layers in `tests/` |
| :--- | :--- |
| **`Vibe`** | Syntax/lint/typecheck only (no new test suite required unless regression risk). |
| **`Lean`** | Happy-path + invalid-input unit/API tests (`tests/unit/`, `tests/integration/`). |
| **`Medium`** | Unit + API Integration + DB round-trip + UI smoke check (Playwright on-demand). |
| **`Full`** | All `Medium` layers **PLUS** Financial Boundary Matrix (`references/test-writing-guide.md`), Idempotency duplicate-submit test, Negative/tampered payload security tests, RBAC/IDOR unauthorized access tests, and full E2E user journey. |

---

## 3. Step-by-Step Test Authoring Workflow

### Step 1 — Read Spec & Build Test Plan (`templates/test-plan.md`)
1. Read `docs/specs/SPEC-<NNN>-<slug>.md` (especially Spec 0002 Value Sourcing & Acceptance Criteria) and `docs/product/DISCOVERY-<slug>.md` ("Grill Me" edge cases).
2. Map every Acceptance Criterion and every "Grill Me" edge case to at least 1 concrete test case in `tests/`.

### Step 2 — Write Tests in `tests/` Using `references/test-writing-guide.md`
Cover all 5 critical test buckets:
1. **Unit Math & Domain Invariants:**
   - 22K / 24K / 18K gold weight in milligrams (`mg`) -> paise calculation -> 3% GST (`300 bps`) -> half-up rounding check.
   - Verify `0.1 + 0.2` float drift never occurs (e.g., `100000n` paise at 3% = `3000n` paise exact).
   - Zero weight, fractional paise boundary (`x.5` paise round-off), and huge values (`₹99,99,999.99`).
2. **Adversarial & Abuse Inputs (Mandatory for `Full`):**
   - Negative quantity (`-1`), negative discount, > 100% discount, tampered client `totalPaise: 1` when real items cost `₹50,000` (server MUST ignore tampered total!).
   - Duplicate `Idempotency-Key` POST (second request returns original bill without double-charging or double-deducting stock).
3. **Auth, RBAC & IDOR Tests (Mandatory when auth exists):**
   - Counter staff attempting Boss-only rate change or invoice void → must return `403 Forbidden`.
   - User A requesting User B's record by ID → must return `403` or `404`.
   - Unauthenticated request to protected route → must return `401`.
4. **Database Transaction Atomicity:**
   - Simulate failure mid-invoice (e.g., item 2 out of stock) → verify item 1 stock and invoice header rolled back cleanly.
5. **End-to-End UI Journey (`tests/e2e/`):**
   - Real browser form submit → server calculation → refreshed page shows persisted DB record.

### Step 3 — Execute Suite & Report Exact Counts
Run the test suite in PowerShell, capture exact `passed / failed / skipped` counts, and hand off results to `/scf-check verify`.
- If `failed > 0`: emit `.factory/tickets/BUG-<NNN>.json` per failing module and hand off to Master Build Orchestrator.
- If `failed === 0 && skipped === 0`: report exact command output to `/scf-check`.

---

## 4. Vendored Core Specialist Bindings (`.factory/skills-registry.json`)

- `vendor/specialist-skills/core/playwright-skill` (`ANTIGRAVITY_ADAPTER.md`) — Sequential E2E browser testing (`--workers=1` or `2` on 16 GB RAM).
- `vendor/specialist-skills/core/obra-superpowers` — Strict Test-Driven Development (TDD) and edge-case assertion patterns.
- `vendor/specialist-skills/core/jsmastery-skills` — Integration & boundary suite structures.
