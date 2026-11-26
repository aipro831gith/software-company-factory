# Antigravity 2.0 Adapter — `agamm/claude-code-owasp`

- **Assigned Specialist:** Agent #9 — Dedicated Cybersecurity Specialist (`scf-sec-ops`)
- **Model Slot:** `deep_logic_slot` (resolved dynamically from `.factory/models.json` — ignore any vendor-specific plugin defaults)
- **Canonical Entry File:** `skills/owasp-security/SKILL.md`
- **Antigravity Compatibility Notes:**
  - Load ONLY `skills/owasp-security/SKILL.md` on-demand via Progressive Disclosure (`<= 90 KB` hot-path).
  - Ignore `.claude-plugin/` and `.claude/` wrappers; execute checks through Windows PowerShell and `node scripts/hook-runner.mjs`.
  - Pair directly with `scf-sec-ops` Stages 2–5 (`Argon2id`, `IDOR`, `httpOnly` cookies, server-side financial math).
