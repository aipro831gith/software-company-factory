# `scf-develop` Mode: Fresh Wave Worker (`modes/wave-worker.md`)

**Agents:** Agents #7 & #8 — Dynamic Frontend / Backend Sub-Agent Pool (`worker_slot` or `deep_logic_slot`)
**Context Budget:** **Hard Cap `<= 40 KB`** (receives ONLY its 1 Task Packet + exact Spec slice + shared type definitions).

## Worker Execution Rules
1. **Stay Strictly Inside `owned_files`:** Never edit any file outside your Task Packet's `owned_files` list. If you notice a missing API field or DB column owned by another agent, report it cleanly in your completion note instead of editing their file!
2. **Zero Stubs, Complete Implementations:** Write full input validation, loading/error states, accessibility labels, and edge-case guards — never 5-line placeholder files.
3. **Self-Verify Before Returning:** Run syntax/typecheck + `block-float-money` + `block-eval-usage` on your owned files before reporting ready for Wave Checkpoint.
4. **Report Concisely:** Return exact files created/modified, exported symbols, and exact command output — no inflated claims.
