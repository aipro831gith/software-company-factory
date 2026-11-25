# `scf-develop` Mode: Frontend Lead Orchestrator (`modes/frontend-lead.md`)

**Agent:** Agent #4 — Frontend Lead Orchestrator (`worker_slot` via `.factory/models.json`)
**Owned Paths:** `src/web/**`, `src/app/**`, `src/components/**`

## Responsibilities
1. **Run UI/UX Pro Max Search Bridge First:**
   ```powershell
   python scripts/ui-search-bridge.py --query "<project domain e.g. jewelry erp billing>" --limit 3 --json
   ```
   Lock in the palette, typography (`tabular-nums` for numbers/money/weights), contrast >= 4.5:1, and responsive layout tokens before Wave 2 UI workers start.
2. **Create Design System Shell in Wave 1:** Shared theme variables, INR paise-to-rupee formatter (`formatPaiseToInr(paiseBigInt)`), milligram-to-gram formatter, accessible form inputs, and error boundary components.
3. **Slice Large UIs into Wave Packets:** If > 3 screens/views exist, write clean disjoint Task Packets in `.factory/waves/wave-plan.json` (1–2 screens per `Frontend-Worker`, `<= 40 KB` context each).
4. **Never Duplicate Server Math:** UI may render live preview estimates for UX speed, but must clearly mark previews as estimates and always render the authoritative totals returned by the backend API.
