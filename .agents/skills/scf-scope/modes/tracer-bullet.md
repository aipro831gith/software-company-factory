# `scf-scope` Mode: Tracer Bullet Slicing (`modes/tracer-bullet.md`)

**Best For:** Brand-new apps, Smoke Tests (`smoke-gold-calc`), and Father's Jewelry ERP v1.
**Plain Meaning:** *"Pehle ek patli par poori chalti hui line banao (input -> server math -> database -> bill screen), phir uske upar baaki features jodo."* (Google search: `"tracer bullet software development pragmatic"`)

## How to Slice with Tracer Bullet
1. **Slice 1 (The Spine):** Pick the single most important end-to-end flow (e.g., enter gold weight + rate -> server calculates integer paise + 3% GST -> save to DB -> show/print bill).
2. **Verify End-to-End Early:** Prove DB connection, integer math, API contract, UI rendering, tests, and `.gate.json` all pass on Slice 1 before building 10 extra screens.
3. **Expand Safely:** Add Slice 2 (Customer Khata), Slice 3 (Inventory Stock), Slice 4 (Returns/Exchange) onto the proven spine without breaking Slice 1.
