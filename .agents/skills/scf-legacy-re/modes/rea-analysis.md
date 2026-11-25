# `scf-legacy-re` Mode: Reverse Engineering Analysis (`modes/rea-analysis.md`)

**Slot:** `architect_slot` / `deep_logic_slot`
**Goal:** Produce an honest, evidence-backed map of an existing undocumented codebase (`docs/product/LEGACY-REA-<slug>.md`).

## Analysis Steps
1. **Inventory Entry Points & Dependencies:** List runtime, framework versions, database engine, external APIs, and outdated/vulnerable packages.
2. **Trace Real Money & Data Flows:** Find where prices, taxes, weights, and permissions are actually calculated (often buried in UI files or DB triggers!).
3. **Security & Float Hazard Scan:** Run `node scripts/hook-runner.mjs --hook block-eval-usage`, `block-float-money`, and `block-hardcoded-secrets` across the legacy repo and log findings without mutating code.
4. **Confidence-Tagged Summary:** Tag every discovered business rule `[confirmed]` (verified in code) or `[uncertain]` (needs Founder/user walkthrough) in plain language.
