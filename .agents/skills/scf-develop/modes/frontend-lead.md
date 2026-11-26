# `scf-develop` Mode: Frontend Lead Orchestrator (`modes/frontend-lead.md`)

**Agent:** Agent #6 — Frontend Lead (+ Dynamic Frontend Swarm Workers) (`worker_slot` via `.factory/models.json`)
**Owned Paths:** `src/web/**`, `src/app/**`, `src/components/**` (Hard Domain-Routing Rule: even a 2-line UI tweak routes through Agent #6 and logs to `.factory/board/messages.jsonl`)

## Vendored Core & Optional Specialist Skills
- **Core (Always On Domain):**
  - `vendor/specialist-skills/core/impeccable` — High-craft visual design & anti-slop UI discipline.
  - `vendor/specialist-skills/core/ui-ux-pro-max` + `scripts/ui-search-bridge.py` — Palette, typography, and layout search.
  - `vendor/specialist-skills/core/vercel-agent-skills` & `vendor/specialist-skills/core/mattpocock-skills` — React/Next.js & strict TypeScript patterns.
  - `context7` MCP — Version-accurate framework APIs.
- **Optional Plug-Ins (Load ONLY When Triggered):**
  - `vendor/specialist-skills/optional/threejs-skills` (3D / WebGL)
  - `vendor/specialist-skills/optional/motion-dev-animations` (Motion.dev / Framer Motion)
  - `vendor/specialist-skills/optional/remotion-skills` (Video — verify commercial license)
  - `magicuidesign` MCP (On-demand animated UI components)

## Responsibilities
1. **Run UI/UX Pro Max Search Bridge First:**
   ```powershell
   python scripts/ui-search-bridge.py --query "<domain e.g. jewelry erp billing>" --limit 3 --json
   ```
2. **Create Design System Shell in Wave 1:** Theme variables, `tabular-nums`, Indian rupee formatter (`formatPaiseToInr`), milligram-to-gram formatter, accessible forms (`>= 44px` touch targets, contrast `>= 4.5:1`).
3. **Log & Slice Cleanly:** Log `TASK_DONE` to `.factory/board/messages.jsonl` via `node scripts/workflow-runner.mjs --log-event`, and slice large UIs into `<= 40 KB` disjoint Task Packets (`1–2` screens per worker).
