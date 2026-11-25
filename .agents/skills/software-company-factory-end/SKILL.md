---
name: software-company-factory-end
description: Safely closes an active software-company-factory session, verifies working tree, runs atomic Git checkpoint, updates STATUS.md and LATEST_SESSION.md, and marks session lock ENDED.
---

# `software-company-factory-end` — Clean Shutdown & Handoff Lock

**Alias:** `/scf-end`
**Assigned Agent:** Agent #2 — Master Build Orchestrator (`light_ops_slot` for handoff summary)
**Primary Goal:** Guarantee zero half-baked files, zero lost context, and 100% clean department isolation when the Founder finishes work or switches to another AI company department.

---

## 1. Non-Negotiable Shutdown Rules

1. **Zero Broken Code Left Behind:** Never close a session while merge conflict markers, failed syntax checks, or uncheckpointed changes remain unrecorded.
2. **Truthful Handoff Memory:** `docs/handoff/LATEST_SESSION.md` and `STATUS.md` must record ONLY real verified gates, exact file paths, real commit SHAs, and exact open bug tickets (`BUG-*.json`) — never vague summaries.
3. **Strict Isolation Lock (`ENDED`):** `.factory/session.lock.json` must transition cleanly to `status: "ENDED"` with an accurate `ended_at` timestamp so any other department started afterward knows this department closed cleanly.
4. **Model-Agnostic Continuity:** Never hardcode model names in handoff docs; record only which abstract slot (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`) is recommended for the next session.

---

## 2. Step-by-Step Shutdown Sequence (Mandatory Order)

### Step 1 — Pre-Shutdown Hygiene & Portability Verification
Run quick verification checks before creating the final session commit:

```powershell
node scripts/check-portability.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-env-staging; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-hardcoded-secrets
```

If any check fails:
- Do **NOT** mark `.factory/session.lock.json` as `ENDED` silently.
- Fix the issue or present **3 Triad Options (`[BEST SUGGESTION]`)** to the Founder (Fix now / Rollback dirty file to last clean tag / Pause with explicit warning recorded in `LATEST_SESSION.md`).

### Step 2 — Update `STATUS.md` (10-Second Boss Dashboard)
Rewrite `STATUS.md` in plain Hinglish or simple English covering:
- Current Phase & Active Target Project
- What was completed and machine-verified in this session
- Any pending Founder decisions (`pending_human_gate`)
- Exact next step for the next `/software-company-factory-start`

### Step 3 — Write Fresh `docs/handoff/LATEST_SESSION.md`
Use `templates/session-handoff.md` to record:
- Exact timestamp (`+05:30` IST)
- Last passing gate file(s) from `.factory/gates/`
- Any open bug tickets from `.factory/tickets/` (`attempt_count / max_attempts`)
- Exact next skill or wave to resume (`Recommended Slot: <slot_name>`)

### Step 4 — Mark `.factory/session.lock.json` as `ENDED` & Checkpoint Git
Update `.factory/session.lock.json`:
- `status`: `"ENDED"`
- `ended_at`: current ISO-8601 local timestamp

Then run the atomic Git checkpoint so the clean `STATUS.md`, `LATEST_SESSION.md`, and `ENDED` lock state are saved together:

```powershell
node scripts/git-checkpoint.mjs commit "chore(session): end software-company-factory session cleanly"; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/git-checkpoint.mjs status
```

*(Note: `git-checkpoint.mjs` writes its post-commit SHA log to `.factory/logs/last-checkpoint.json` which is gitignored, so the working tree stays `CLEAN` after commit.)*

---

## 3. Required Output Format to the Founder

Confirm shutdown in 5 crisp lines of plain Hinglish/English:
1. **Session Lock:** `ENDED` (`software-company-factory` safely locked — ab aap koi bhi doosra department bina mix-up ke start kar sakte hain).
2. **Git Backup Commit:** `<short_sha>` (`Working Tree: CLEAN`).
3. **Saved Memory:** `STATUS.md` + `docs/handoff/LATEST_SESSION.md` updated.
4. **Open Tickets / Pending Gate:** `<None or exact list>`.
5. **Next Resume Command:** Jab wapas kaam shuru karna ho, bas `/software-company-factory-start` likhein.
