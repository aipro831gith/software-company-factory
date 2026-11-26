---
name: scf-check
description: Executes live runtime verification (verify mode), zero-history blind review via blind_reviewer_slot (review mode), emits structured BUG tickets, and writes verified .gate.json proofs.
---

# `scf-check` — Live Runtime Verification, Blind Review & Bug Ticket Emitter

**Assigned Agents:**
- Agent #10 — QA Verification & Testing Agent (`verify` mode, resolved via `worker_slot`)
- Agent #11 — Cross-Model Reviewer & Debugger (`review` mode, resolved strictly via `blind_reviewer_slot` in `.factory/models.json`)

**File Ownership (Strict):** Writes ONLY `.factory/tickets/BUG-<NNN>.json` and `.factory/gates/<feature>.gate.json` (via `scripts/gate-check.mjs`). Never edits application `src/` files directly!
**Primary Goal:** Prove with real executed commands (never guesses) that the built feature works live, run an unbiased fresh-context blind review on `Full`-tier features, route any failure strictly to its `owner_agent`, and certify `.gate.json` only when 100% of checks pass.

---

## 1. Zero People-Pleasing & Zero Unverified "Done"

1. **Runtime Evidence Only:** Never say *"looks good"* or *"should work"* after reading code. A check counts as `PASS` ONLY if you ran the real build/server/API/browser/test command in this session and observed `exit code 0` + expected output.
2. **Never Fix Another Agent's Code Directly:** When QA finds a bug in `src/db/`, `src/server/`, or `src/web/`, QA **MUST NOT** patch `src/` directly. Emit `.factory/tickets/BUG-<NNN>.json` using `templates/bug-ticket.json` and hand it to Master Build Orchestrator to route strictly to `owner_agent`.
3. **Model-Agnostic Blind Review (`blind_reviewer_slot`):** For `Full`-tier features, `review` mode resolves `blind_reviewer_slot` from `.factory/models.json` (preferring an alternate model family if configured/available, OR a **fresh zero-history session** of `deep_logic_slot` with zero builder chat history).
4. **3-Attempt Circuit Breaker:** Track `attempt_count` on every `BUG-<NNN>.json`. If `attempt_count >= 3` (`max_attempts: 3`), STOP auto-fix retries and escalate immediately to `/scf-debug` (`deep_logic_slot`).

---

## 2. Two Execution Modes (`modes/*.md`)

### Mode 1 — `verify` (`modes/verify.md`)
Mandatory for `Lean` (6 checks), `Medium` (11 checks), and `Full` (15+ checks):
1. Verify `docs/specs/SPEC-<NNN>-<slug>.md` has `Status: APPROVED` (`Spec 0001`).
2. Verify `node scripts/hook-runner.mjs --all` (or target hooks: `block-eval-usage`, `block-float-money`, `block-hardcoded-secrets`, `block-assumed-spec-done`, `block-unsourced-values`).
3. Run full build, typecheck, and `/scf-test` automated test suite (`unit + integration + E2E`).
4. Start the real local app/API server briefly (protecting 16 GB RAM: shut down cleanly afterward!), run real HTTP requests / browser Playwright checks (on-demand 4th MCP slot), and verify:
   - Server computes money/GST/weights in integer paise/mg (not trusting client totals),
   - Real DB persistence survives request round-trip,
   - Zero uncaught 500 errors or console crashes.
5. Collect exact command outputs into `.factory/gates/<feature>.gate.json` and run `node scripts/gate-check.mjs --feature <feature>`.

### Mode 2 — `review` (`modes/review.md`)
Mandatory for **`Full`-tier** features (money, GST, gold weight, auth, payments):
1. Spawn or run a **fresh zero-history session** using `blind_reviewer_slot` (`prefer_different_family: true` in `.factory/models.json`).
2. Give the reviewer ONLY:
   - `docs/specs/SPEC-<NNN>-<slug>.md` (Spec 0001 & 0002)
   - The actual diff/files built under `src/` and `tests/`
   - **Do NOT** feed the builder's optimistic summary or reasoning!
3. Reviewer hunts specifically for:
   - Subtle financial rounding drift or float leakage (`Number` vs `BigInt`/`Decimal`),
   - IDOR / broken authorization / missing server-side price recalculation,
   - Race conditions on concurrent stock/payment updates (missing `Idempotency-Key` or transaction lock),
   - Spec 0002 discrepancies (screen showing a value not sourced from the authoritative spec).
4. If any `BLOCKER` or `HIGH` issue is found, emit `.factory/tickets/BUG-<NNN>.json` and fail the gate (`blind_review_status: "FAIL"`).

---

## 3. Structured Auto-Fix Bug Handover Loop

Whenever `verify` or `review` fails:
1. Determine exact `owner_agent` from `AGENTS.md` Section 6 (`database`, `backend`, or `frontend`).
2. Write `.factory/tickets/BUG-<NNN>.json` using `templates/bug-ticket.json`:
   - `ticket_id`, `severity` (`BLOCKER` | `HIGH`), `owner_agent`, `exact_file`, `exact_line`, `failing_command`, `expected`, `actual`, `attempt_count`, `max_attempts: 3`, `status: "OPEN"`.
3. Master Build Orchestrator routes `BUG-<NNN>` ONLY to `owner_agent`.
4. Owner fixes ONLY the root cause in their owned file and runs `failing_command`.
5. QA re-runs `verify` (and `review` if `Full` tier). If green, QA updates ticket `status: "RESOLVED"` and Agent #9 runs `node scripts/git-checkpoint.mjs commit "fix(<slice>): resolve BUG-<NNN>"`.

---

## 4. Gate Certification & Handoff

Once `verify` (and `review` for `Full`) passes with zero `OPEN` blockers:
- Write `.factory/gates/<feature>.gate.json` with `status: "PASS"`, `spec_status: "APPROVED"`, `checks_passed`, `blind_review_status`, and concrete `evidence` strings.
- Run `node scripts/gate-check.mjs --feature <feature>` and confirm `exit code 0`.
- Hand off to `/scf-sec-ops` (Phase 4 Security Audit) and `/scf-doc-sync`.

---

## 5. Vendored Core Specialist Bindings (`.factory/skills-registry.json`)

- **Agent #10 Live Verify (`verify`):** `vendor/specialist-skills/core/playwright-skill` (`ANTIGRAVITY_ADAPTER.md` -> `skills/playwright-skill/SKILL.md`), `vendor/specialist-skills/core/obra-superpowers` (verification-before-completion), `vendor/specialist-skills/core/jsmastery-skills`.
- **Agent #11 Blind Review (`review`):** `vendor/specialist-skills/core/addyosmani-agent-skills` (independent code review via `blind_reviewer_slot`).
