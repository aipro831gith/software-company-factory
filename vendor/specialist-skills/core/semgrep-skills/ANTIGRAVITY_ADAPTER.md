# Antigravity 2.0 Adapter — `semgrep/skills`

- **Assigned Specialist:** Agent #9 — Dedicated Cybersecurity Specialist (`scf-sec-ops`)
- **Model Slot:** `deep_logic_slot` (resolved dynamically from `.factory/models.json`)
- **Canonical Entry Files:**
  - `skills/code-security/SKILL.md` (SAST static code security patterns)
  - `skills/llm-security/SKILL.md` (Agentic / prompt-injection & AI output checks)
  - `skills/semgrep/SKILL.md` (Semgrep rule authoring & execution)
- **Windows 16 GB RAM Rule:** Run `semgrep` sequentially on-demand via PowerShell — never as an always-on daemon.
