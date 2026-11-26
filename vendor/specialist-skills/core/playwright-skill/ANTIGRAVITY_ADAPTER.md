# Antigravity 2.0 Adapter — `lackeyjb/playwright-skill`

- **Assigned Specialist:** Agent #10 — QA Verification & Browser Testing Specialist (`scf-check`, `scf-test`)
- **Model Slot:** `worker_slot` (resolved dynamically from `.factory/models.json`)
- **Canonical Entry File:** `skills/playwright-skill/SKILL.md`
- **Windows 16 GB RAM Compatibility Notes:**
  - Run Playwright tests sequentially (`--workers=1` or `2` max) in PowerShell; shut down local dev server cleanly after E2E verification.
  - Pair with Antigravity's built-in browser or on-demand `playwright` MCP entry in `mcp/mcp_config.template.json`.
