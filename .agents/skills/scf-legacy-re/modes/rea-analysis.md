# `scf-legacy-re` Mode: Reverse Engineering Analysis (`modes/rea-analysis.md`)

**Agent:** Agent #14 — Legacy Reverse-Engineering Specialist (`architect_slot` / `deep_logic_slot`)
**Vendored Plug-In Source:** `vendor/specialist-skills/optional/rea` (`morluto/rea` — `reverse-engineer-anything/SKILL.md`)
**Goal:** Produce an honest, evidence-backed map of an existing undocumented codebase (`docs/product/LEGACY-REA-<slug>.md`).

## Deepened REA Analysis Steps
1. **Load Vendored REA Guide:** Read `vendor/specialist-skills/optional/rea/.agents/skills/reverse-engineer-anything/SKILL.md` (if present) alongside this checklist for deep static & runtime discovery.
2. **Inventory Entry Points, Schemas & Hidden Rules:** Map runtime, framework versions, DB tables/triggers, external APIs, and where prices, GST, weights, and permissions are actually computed.
3. **Read-Only Hazard Scan (Windows PowerShell):**
   ```powershell
   node scripts/hook-runner.mjs --hook block-eval-usage --root <legacy-path>; node scripts/hook-runner.mjs --hook block-float-money --root <legacy-path>; node scripts/hook-runner.mjs --hook block-hardcoded-secrets --root <legacy-path>
   ```
4. **Confidence-Tagged Founder Summary:** Tag every rule `[confirmed]` or `[uncertain]`, translate every technical finding with a 1-line plain meaning + Google keyword, and log `REA_COMPLETE` to `.factory/board/messages.jsonl`.
