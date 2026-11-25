---
name: software-company-factory-start
description: Boots an isolated software-company-factory session, validates department lock and Windows environment health, loads model slot routing and project handoff memory, and activates AUTOMATIC mode for the Founder.
---

# `software-company-factory-start` — Session Activation & Isolation Boot

**Alias:** `/scf-start`
**Assigned Agent:** Agent #2 — Master Build Orchestrator (`light_ops_slot` for boot summary; switches to `architect_slot` / `worker_slot` / `deep_logic_slot` per `.factory/models.json`)
**Primary Goal:** Safely wake up `software-company-factory` with zero cross-department contamination, restore 100% project memory from `STATUS.md` and `docs/handoff/LATEST_SESSION.md`, verify local Windows guardrails, and greet the Founder in plain Hinglish or simple English.

---

## 1. Non-Negotiable Isolation & Communication Rules

1. **Workspace-Only Isolation:** Never install, read, or mutate skills outside `<repo-root>/.agents/skills/`. This factory is strictly isolated from any future Finance, Legal, or Music department repos.
2. **Fail-Closed Department Lock:** Before touching any project file, inspect `.factory/session.lock.json`. If another department lock is `ACTIVE` in this workspace or target directory, **STOP IMMEDIATELY**, refuse to mix contexts, and tell the Founder plainly to run the end command for that other department first.
3. **Model-Agnostic Slot Resolution:** Read `.factory/models.json`. Respect `allow_founder_ui_model_selection: true` at all times. Never assume or hardcode a vendor model; resolve `light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, and `blind_reviewer_slot` dynamically from `.factory/models.json` or the Founder's active UI selection.
4. **Founder Communication Standard:**
   - Greet in clear, everyday Hinglish or ultra-simple Indian English.
   - If you mention any technical term (e.g., `Git checkpoint`, `Session Lock`, `MCP`), include a 1-line plain meaning and an exact Google-searchable keyword.
   - Never ask open-ended tech questions; always present **3 Triad Options** with **`[BEST SUGGESTION]`** when a choice is needed.

---

## 2. Step-by-Step Boot Sequence (Mandatory Order)

### Step 1 — Verify Session Lock (`.factory/session.lock.json`)
Read `.factory/session.lock.json`:
- Confirm `department === "software-company-factory"`.
- If `status === "ACTIVE"` from an interrupted session (for example, Antigravity closed unexpectedly), report the previous `started_at` and `last_commit_sha` clearly, check `git status` for uncommitted work, and safely resume without losing changes.
- If `status === "ENDED"` or `"IDLE"`, update:
  - `status`: `"ACTIVE"`
  - `mode`: `"AUTOMATIC"`
  - `started_at`: current ISO-8601 local timestamp (`+05:30` for IST)
  - `ended_at`: `null`

### Step 2 — Load Factory Configuration & Model Registry
Read in parallel:
1. `AGENTS.md` (Master Constitution — confirm rules in context)
2. `.factory/models.json` (verify all 5 abstract slots exist and `routing_mode` is intact)
3. `.factory/config.json` (confirm `max_concurrent_workers_per_wave: 3` and `max_always_on_mcps: 4`)
4. `.agents/hooks.json` (confirm all 15 fail-closed hooks are registered)

### Step 3 — Restore Project Memory
Read:
1. `STATUS.md` — 10-second Boss Dashboard (what is done, what is next)
2. `docs/handoff/LATEST_SESSION.md` — exact last passing gate, open bug tickets, active wave, and next step
3. Scan `.factory/tickets/` for any `OPEN` `BUG-*.json` tickets and `.factory/gates/` for the latest `.gate.json` status.

### Step 4 — Run 2-Second Windows Sanity Check
Run a single PowerShell verification command (respecting Windows PowerShell 5.1 compatibility — no bash-only commands):

```powershell
node scripts/hook-runner.mjs --hook session-lock-check; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/git-checkpoint.mjs status
```

If `node` or `git` is not on the active shell `PATH` yet (for example, right after installation before IDE restart), inform the Founder plainly in 1 line and check Windows Registry `PATH` or recommend a quick Antigravity IDE restart.

### Step 5 — Check Pending Human Gates & Active Target Project
Inspect `.factory/session.lock.json` fields:
- `active_target_project`: If `null`, note that we are in the Mother Factory (`software-company-factory`) and ready either to continue factory setup/smoke testing or to scaffold a new target project via `node scripts/init-target-project.mjs`.
- `pending_human_gate`: If a plain-English spec approval or manual deploy confirmation is waiting, surface it first before starting any new work.

---

## 3. Automatic Mode Routing After Boot

Once boot checks pass (`exit code 0`), operate in **`AUTOMATIC`** mode by default:
- When the Founder describes a new software idea → automatically route to `/scf-discover` (Agent #1).
- When the Founder asks to research a market/tool/compliance topic → automatically route to `/scf-research` (Agent #1).
- When the Founder asks for a new feature or target app → automatically route through `/scf-scope` → `/scf-architect` (pause for **Plain-English Spec Approval Gate** on `Medium`/`Full` tiers) → `/scf-develop` (max 3 wave workers) → `/scf-check` & `/scf-test` → `/scf-sec-ops` → `/scf-doc-sync`.
- Never auto-deploy to production; `/scf-deploy` remains **100% Manual Boss-Only Gate**.

---

## 4. Required Output Format to the Founder

Use `templates/session-boot.md` to present:
1. **3-Line Status Summary** (Session active, last verified checkpoint, open bugs if any).
2. **Active Model Slot Policy** (confirming `.factory/models.json` + Founder UI override active).
3. **3 Triad Next-Step Options (`[BEST SUGGESTION]`)** tailored to the current state of `STATUS.md` and `LATEST_SESSION.md`.

---

## 5. Failure Modes & Fail-Closed Recovery

| Failure Condition | Required Fail-Closed Action |
| :--- | :--- |
| `.factory/session.lock.json` belongs to another department | Refuse to start; display the conflicting department name and stop. |
| `.factory/models.json` missing required slot | Stop and ask Founder before proceeding, or restore schema from `AGENTS.md`. |
| Uncommitted dirty files found from crash | Run `node scripts/git-checkpoint.mjs status`, show changed files in plain language, and offer Triad Options (Save checkpoint / Inspect / Rollback). |
| `hook-runner.mjs --hook session-lock-check` exits non-zero | Do not proceed to coding or file mutations until lock check returns exit code `0`. |
