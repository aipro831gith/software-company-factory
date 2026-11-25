---
name: scf-debug
description: Performs hypothesis-driven root-cause debugging using deep_logic_slot and enforces the 3-attempt circuit breaker with Founder Triad escalation.
---

# `scf-debug` — Root-Cause Debugger & 3-Attempt Circuit Breaker

**Assigned Agent:** Agent #11 — Cross-Model Reviewer & Debugger (`deep_logic_slot` resolved dynamically from `.factory/models.json`)
**File Ownership (Strict):** Writes diagnosis reports to `.factory/tickets/RCA-<NNN>.md`. Routes actual code fixes strictly to the owning builder (`database`, `backend`, or `frontend`) — or applies a targeted fix ONLY when explicitly dispatched on an escalated ticket with clean git checkpoint protection.
**Primary Goal:** Stop random trial-and-error guessing when a bug resists quick fixes, isolate the true root cause with reproducible evidence, and protect Founder quota via the **3-Attempt Circuit Breaker**.

---

## 1. When `/scf-debug` Activates

1. **Automatically via 3-Attempt Circuit Breaker (`AGENTS.md` Section 5):** When any `BUG-<NNN>.json` ticket reaches `attempt_count: 3` (`max_attempts: 3`) without turning green, the auto-fix loop **halts** and invokes `/scf-debug` on `deep_logic_slot` for a single deep root-cause pass.
2. **Directly by Founder (`/scf-debug`):** When a stubborn runtime error, database lock, Windows path issue, or calculation mismatch happens during development or testing.

---

## 2. Anti-Guessing Scientific Debugging Protocol (5 Steps)

### Step 1 — Freeze & Reproduce Deterministically
- Read the exact `.factory/tickets/BUG-<NNN>.json` (or Founder's error symptom).
- Run the exact `failing_command` once to observe the real error message, stack trace, and exit code. **Never guess from memory.**
- Verify the latest clean Git checkpoint (`node scripts/git-checkpoint.mjs status`) so rollback is always 1 command away.

### Step 2 — Gather Evidence Across Layer Boundaries
Trace the failing flow end-to-end without editing code yet:
- **Input / UI:** What exact payload left the browser/form?
- **API / Validation:** Did Zod/schema coerce or reject something silently?
- **Domain / Math:** Did `Number` float precision, integer truncation order, or timezone (`IST` vs `UTC`) shift a value?
- **Database / Transaction:** Did a foreign key constraint, SQLite lock, missing migration, or stale seed cause the failure?
- **Windows Environment:** Did a path separator (`\` vs `/`), missing env var, or PowerShell quoting break execution?

### Step 3 — Form 2–3 Ranked Hypotheses & Test Minimal Probe
Write down the 2–3 most likely root causes and check them against actual files and runtime logs before proposing any edit. Reject any hypothesis disproved by evidence.

### Step 4 — Write `templates/root-cause-report.md` (`.factory/tickets/RCA-<NNN>.md`)
Record clearly:
- Exact root cause (`file:line` + mechanism)
- Why earlier fix attempts failed
- Minimal surgical fix specification (assigning exact `owner_agent`)
- Regression test to add to `tests/` so this bug can never return

### Step 5 — Circuit-Breaker Decision Gate (Founder Escalation if Unresolved)
- **Case A (Root Cause Proven & Safe Fix Ready):** Apply or dispatch the single surgical fix to `owner_agent`, run the exact `failing_command` + full affected suite, verify `exit code 0`, update `BUG-<NNN>.json` to `RESOLVED`, and commit via `node scripts/git-checkpoint.mjs commit "fix(<scope>): resolve BUG-<NNN> after RCA"`.
- **Case B (Still Blocked After Deep Pass or Requires Business Rule Change):** **HALT IMMEDIATELY.** Never burn a 4th silent retry! Explain the blocker to the Founder in ultra-simple Hinglish/English (with 1-line jargon translations + Google keywords) and present **3 Triad Options (`[BEST SUGGESTION]`)**:
  1. **Option A — Minimal Workaround / Rollback:** Restore cleanly to `checkpoint-wave-<N>` and simplify the failing slice.
  2. **Option B — `[BEST SUGGESTION]` Guided Architecture/Rule Fix:** Update the exact rule/library causing the conflict and re-verify cleanly.
  3. **Option C — Pause & Inspect Manually / Defer Slice:** Keep the rest of the working app clean and defer this sub-feature.

---

## 3. Hard Guardrails

- **Never Suppress Errors to Fake Green:** Never wrap broken logic in empty `try { ... } catch {}`, never delete failing tests, and never disable any of the 15 fail-closed hooks.
- **Zero Hardcoded Model Names:** Always resolve `deep_logic_slot` dynamically from `.factory/models.json`.
