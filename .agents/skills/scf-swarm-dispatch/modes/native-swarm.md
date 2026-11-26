# `scf-swarm-dispatch` Mode: Native Antigravity `/swarm` (`modes/native-swarm.md`)

**Use When:** Native `/swarm` board tools (`swarm`, `post_message`, `read_board`, `swarm_wait`) are available.

## Flat Swarm Rules
1. **No Nested Spawning:** Coordinator spawns domain workers flat onto one board (`database`, `backend-1`, `frontend-1`, `verifier`; max 5 active workers, default 3).
2. **Disjoint Ownership First:** Before `swarm{action:"add"}`, validate `.factory/waves/wave-plan.json` with `node scripts/ast-collision-guard.mjs` so zero two workers ever touch the same file.
3. **Internal Caveman Shorthand Allowed:** Workers may post compact status messages internally (`@verifier [done] gst.ts int-paise ok; tests pass`), while Coordinator translates final reports into clear Hinglish/English for the Boss.
4. **Mirror Key Milestones to Dashboard:** Log `WAVE_START`, `TASK_DONE`, `BUG_OPEN`, and `WAVE_DONE` via `node scripts/workflow-runner.mjs --log-event` so `http://localhost:4173` updates live.
