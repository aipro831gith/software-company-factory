---
name: scf-swarm-dispatch
description: Coordinates hybrid Antigravity /swarm parallel domain execution (3-5 concurrent workers, <=40KB slices) plus free-plan-proof local workflow-runner fallback and .factory/board/messages.jsonl logging.
---

# `scf-swarm-dispatch` — Hybrid `/swarm` & Free-Plan-Proof Wave Coordinator

**Assigned Agent:** Agent #3 — Master Coordinator & Swarm Lead (`architect_slot` for wave slicing; `worker_slot` for execution dispatch via `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY `.factory/waves/wave-plan.json` and `.factory/board/messages.jsonl`. Never writes application `src/` code directly!
**Primary Goal:** Execute multi-agent software builds fast and safely on 16 GB Windows RAM — using Antigravity's native `/swarm` board when available, or `scripts/workflow-runner.mjs` locally when running on a Free plan or headless CLI.

---

## 1. Non-Negotiable Dispatch, Domain-Lock & `caveman` Rules

1. **Hard Domain-Routing Rule (No Secret Side-Edits):**
   - Even a tiny 2-line button tweak, API field fix, or DB column change **MUST** be dispatched to its owning domain agent:
     - UI (`src/web/`, `src/app/`, `src/components/`) → **Agent #6 (Frontend)**
     - API/Logic (`src/server/`, `src/api/`, `src/services/`) → **Agent #7 (Backend)**
     - Schema/Migrations (`src/db/`, `prisma/`, `migrations/`) → **Agent #8 (Database)**
     - Tests (`tests/`) → **Agent #10 (QA)**
   - Every mutation MUST append an event to `.factory/board/messages.jsonl` so the local Boss Dashboard (`http://localhost:4173`) and every peer agent see the exact live state.
2. **RAM-Safe Concurrency Cap (Default 3, Burst Max 5):**
   - Never exceed **5 concurrent workers** (`config.hardware_envelope.max_concurrent_workers_per_wave: 5`); default to **3 concurrent workers** for normal modules.
   - Every worker receives **strictly disjoint `owned_files`** and **≤ 40 KB** context slice.
3. **Internal `caveman` Allowed, Boss Chat Banned:**
   - Workers and Coordinator MAY use ultra-terse `caveman` shorthand inside `.factory/board/messages.jsonl` and internal `@mention` handoffs to save ~65–75% output tokens.
   - **HARD-BANNED** on any message shown to the Founder (`STATUS.md`, Boss summaries, Spec Approvals).
4. **Model-Agnostic Slot Policy:** Leave vendor model names out of all briefs and manifests; reference ONLY `.factory/models.json` abstract slots (`worker_slot`, `deep_logic_slot`, `blind_reviewer_slot`).

---

## 2. Two Execution Modes (`modes/*.md`)

### Mode A — Native Antigravity `/swarm` Mode (`modes/native-swarm.md`)
Used when `/swarm` tools are active in the Antigravity session:
1. Coordinator creates flat named workers (`frontend-1`, `backend-1`, `database-1`, `verifier`) directly — never nested sub-swarms.
2. Authors who edit files simultaneously run with isolated workspace mode (`share`) or strictly disjoint `owned_files` from `.factory/waves/wave-plan.json`.
3. `verifier` (Agent #10) runs real checks and posts `BUG-<NNN>` back by `@name` on any failure.
4. Every milestone logs a mirror line to `.factory/board/messages.jsonl` via `scripts/workflow-runner.mjs --log-event` so the ₹0 Boss Dashboard stays 100% live!

### Mode B — Free-Plan-Proof Local Workflow Mode (`modes/free-plan-fallback.md`)
Used automatically if `/swarm` or `/run-workflow` is unavailable on the active plan/IDE:
1. Write `.factory/waves/wave-plan.json` with waves of 3–5 disjoint Task Packets.
2. Validate wave plan, agent IDs, `<= 40 KB` slices, and file-lock disjointness via:
   ```powershell
   node scripts/workflow-runner.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/ast-collision-guard.mjs
   ```
3. Dispatch sequential or parallel sub-agent workers wave-by-wave, logging `TASK_START`, `TASK_DONE`, `BUG_OPEN`, and `GATE_PASS` events into `.factory/board/messages.jsonl`.
4. After each wave, run `ast-collision-guard.mjs`, `hook-runner.mjs`, and `git-checkpoint.mjs commit` (`--wave N`).

---

## 3. Standard Dispatch Sequence (Step-by-Step)

1. **Verify Pre-Build Gates:** Confirm `session-lock-check` is `ACTIVE` and `SPEC-<NNN>` has `Status: APPROVED` (`Spec 0001`) + valid `Spec 0002` Value Sourcing.
2. **Build `.factory/waves/wave-plan.json`:** Assign exact `worker_id`, `agent_id` (from `.factory/skills-registry.json`), `model_slot`, `context_budget_kb <= 40`, and disjoint `owned_files`.
3. **Pre-Wave Verification:** Run `node scripts/workflow-runner.mjs` + `node scripts/ast-collision-guard.mjs` + `node scripts/analyze-token-usage.mjs`.
4. **Log Wave Start & Execute:** Log `WAVE_START` to `.factory/board/messages.jsonl` (`templates/board-event.json`), run workers, verify outputs, log `WAVE_DONE`, and run `node scripts/git-checkpoint.mjs commit`.
5. **Emit Boss Summary (Plain Language — Zero Caveman):** Translate the wave's verified progress into clear, polite Hinglish/English for the Founder.
