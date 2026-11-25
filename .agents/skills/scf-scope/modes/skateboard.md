# `scf-scope` Mode: Skateboard-to-Car Slicing (`modes/skateboard.md`)

**Best For:** Urgent business launches where manual paper/Excel pain needs relief fast.
**Plain Meaning:** *"Day 1 par ek chhota par chalne wala scooter/skateboard de do, phir usko upgrade karke car banao — aadha adhura car ka pahiya mat do."* (Google search: `"skateboard MVP Henrik Kniberg"`)

## How to Slice with Skateboard
1. **Usable Day-1 Core:** Every milestone must be 100% usable on its own at a real shop counter (never deliver a database without a UI, or a UI with fake hardcoded numbers).
2. **Defer Automation, Keep Accuracy:** For example, v1 may accept daily gold rate typed once each morning by the Boss, while v2 adds automated bullion feed lookup — both still use exact integer paise math.
3. **Clear Phase Tags:** Mark each slice `V1-LAUNCH` vs `V2-EXPANSION` inside `docs/scope/QUEUE.json`.
