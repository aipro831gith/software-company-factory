---
name: scf-doc-sync
description: Keeps STATUS.md, AGENTS.md, README.md, LATEST_SESSION.md, and Architecture Decision Records synced in plain language after milestones.
---

# `scf-doc-sync` — Living Documentation & Boss Dashboard Synchronizer

**Assigned Agent:** Agent #12 — Security, Compliance & Release Officer (`light_ops_slot` resolved dynamically from `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY `STATUS.md`, `README.md`, `AGENTS.md` (when authorized by structural factory changes), `docs/handoff/LATEST_SESSION.md`, and `docs/handoff/ADR-*.md`. Never alters application `src/` or `tests/`.
**Primary Goal:** Ensure the Founder's 10-second dashboard (`STATUS.md`), technical constitution (`AGENTS.md`), and session handoff memory (`LATEST_SESSION.md`) ALWAYS reflect 100% machine-verified reality — zero stale claims, zero technical fluff, and zero model-name drift.

---

## 1. When `/scf-doc-sync` Runs

1. **After Every Completed `Full`-Tier Feature:** Automatically invoked once `/scf-check` (both `verify` and `review`) and `/scf-sec-ops` (Stages 1–5) produce `PASS` inside `.factory/gates/<feature>.gate.json`.
2. **After Major Architecture Decisions:** Writes an Architecture Decision Record (`ADR` — *1-line meaning: ek chhota record jo batata hai ki humne koi bada technical faisla kyun liya; Google search: `"architecture decision record markdown"`*) using `templates/adr.md` whenever stack, database, auth, or tax rules change.
3. **During Session Shutdown (`/software-company-factory-end`):** Ensures `STATUS.md` and `docs/handoff/LATEST_SESSION.md` are completely synced before `.factory/session.lock.json` transitions to `ENDED`.
4. **On Explicit Founder Request:** Whenever the Founder asks *"status update karo"*, *"README simplify karo"*, or *"naya guide likho"*.

---

## 2. Mandatory Anti-Drift & Honesty Rules

1. **Read Reality Before Writing Docs:** Never summarize from memory or prior chat! Before updating `STATUS.md` or `LATEST_SESSION.md`, read:
   - `.factory/gates/*.gate.json` (real verified gates and `checks_passed` counts)
   - `.factory/tickets/*.json` (real `OPEN` vs `RESOLVED` bugs and `attempt_count / 3`)
   - `node scripts/git-checkpoint.mjs status` (real branch, HEAD commit SHA, and clean/dirty tree state)
   - `docs/scope/QUEUE.json` (real pending vs completed slices)
2. **Boss 10-Second Clarity (`templates/status-dashboard.md`):** `STATUS.md` must stay scannable in 10 seconds in plain Hinglish or ultra-simple Indian English. Any unavoidable technical term MUST carry a 1-line meaning + Google-searchable keyword.
3. **`AGENTS.md` Size Discipline (`<= 12 KB`):** Keep `AGENTS.md` strictly `<= 12,288` bytes so every agent boots fast without burning context budget. Detailed instructions belong in `.agents/skills/<name>/` sub-files, not bloated inside `AGENTS.md`.
4. **Zero Hardcoded Model Names:** Document ONLY abstract slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`) and refer readers to `.factory/models.json`.
5. **Windows PowerShell Accuracy:** Every command example written into `README.md` or handoff docs must work natively on Windows PowerShell (e.g., using `-ExecutionPolicy Bypass` for `.ps1` scripts and zero POSIX-only commands).

---

## 3. Step-by-Step Sync Workflow

### Step 1 — Collect Machine Truth
Run a quick read-only inspection in PowerShell:

```powershell
node scripts/git-checkpoint.mjs status; node scripts/gate-check.mjs --all; node scripts/analyze-token-usage.mjs
```

### Step 2 — Update `STATUS.md` (`templates/status-dashboard.md`)
Update the 3 crisp sections:
- **Abhi Tak Kya Complete Hua:** List only features/batches backed by a `PASS` `.gate.json` or verified Git commit SHA.
- **Abhi Kya Chal Raha Hai / Pending Approvals:** Highlight any `pending_human_gate` (`SPEC-NNN` approval or `/scf-deploy` confirmation) and any `OPEN` `BUG-*.json` tickets.
- **Agla Kadam:** State the single clearest next action in 1 sentence.

### Step 3 — Update `README.md` & `docs/handoff/ADR-*.md` (If Needed)
- Update `README.md` only when new scripts, setup steps, or user workflows are added.
- Write `docs/handoff/ADR-<NNN>-<slug>.md` whenever a major stack, schema, or business-rule decision was made, including Triad Options evaluated and plain-language rationale.

### Step 4 — Update `docs/handoff/LATEST_SESSION.md` & Validate
- Sync `LATEST_SESSION.md` with exact commit SHA, last passing gate, open tickets, and recommended abstract slot for the next session.
- Run `node scripts/check-portability.mjs` if any factory configuration or skill doc was touched, ensuring `exit code 0`.

---

## 4. Failure Modes & Fail-Closed Guardrails

| Failure Condition | Required Fail-Closed Action |
| :--- | :--- |
| `STATUS.md` claims a feature is `DONE` without `.gate.json` `PASS` | Remove the `DONE` claim immediately; label it `BUILT_PENDING_QA` or `IN_PROGRESS`. |
| `AGENTS.md` grows above `12,288` bytes | Condense redundant prose or move reference tables into skill `references/` files before committing. |
| `README.md` contains unverified or Linux-only commands | Replace with verified Windows PowerShell / Node commands tested in this repo. |
| `check-portability.mjs` fails after doc sync | Fix immediately before running `git-checkpoint.mjs`. |
