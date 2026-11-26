# Antigravity 2.0 Adapter — `affaan-m/ECC` (`ecc-security`)

- **Assigned Specialist:** Agent #9 — Dedicated Cybersecurity Specialist (`scf-sec-ops`)
- **Model Slot:** `deep_logic_slot` / `blind_reviewer_slot` (resolved dynamically from `.factory/models.json`)
- **Canonical Entry Files (Load Only Relevant Skills):**
  - `skills/security-review/SKILL.md` (Adversarial & production-audit patterns)
  - `skills/verification-loop/SKILL.md` (Verification gate patterns)
- **Antigravity Compatibility Notes:**
  - Use `.antigravity-plugin/` or `skills/security-review/SKILL.md` selectively; do NOT copy `.claude/` hooks over `software-company-factory`'s `.agents/hooks.json`.
  - Enforce Windows PowerShell compatibility (`install.ps1` style); ignore `.sh` scripts.
