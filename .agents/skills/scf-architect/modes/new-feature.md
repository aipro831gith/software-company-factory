# `scf-architect` Mode: New Feature Dual Spec (`modes/new-feature.md`)

**Slot:** `architect_slot` (plus `deep_logic_slot` review on `Full` tier financial/auth specs)
**Input:** Next pending feature from `docs/scope/QUEUE.json` + `docs/specs/STACK-<slug>.md` + `docs/product/HANDBOOK-<slug>.md`

## Execution Checklist
1. **Verify Tier (`Vibe` / `Lean` / `Medium` / `Full`):** If the feature touches currency, GST, weights, discounts, passwords, roles, or PII, enforce `Full` tier regardless of earlier estimates.
2. **Draft Part B First (Engineering Precision), Present Part A First (Boss Clarity):**
   - Design DB schema (integer paise/mg, foreign keys, indexes), API endpoints, Value Sourcing table (`Spec 0002`), and disjoint File Ownership Map (`database`, `backend`, `frontend`, `qa`).
   - Translate the core design into Part A (What, Why + Google terms, Spec 0002 summary table, Tier badge, Approval prompt).
3. **Run Spec Hook Before Presenting:**
   ```powershell
   node scripts/hook-runner.mjs --hook block-unsourced-values
   ```
4. **Pause for Boss `"APPROVE"` (`Medium` / `Full`):**
   - For `Lean` tier: inform Founder briefly and proceed automatically unless Founder stops.
   - For `Medium` & `Full` tiers: **MUST STOP** and wait for Founder `"APPROVE"` before updating `Status: APPROVED` and invoking `/scf-develop`.
