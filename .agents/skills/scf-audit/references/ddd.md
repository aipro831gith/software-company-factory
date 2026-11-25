# Domain-Driven Design Reference (`references/ddd.md`)

**Plain Meaning:** *"Software ke modules ko dukaan ke asli departments (Inventory, Billing, Karigar, Khata) ke naam aur niyam ke hisaab se alag-alag rakhna."* (Google search: `"domain driven design bounded context"`)

## Core Rules When Using DDD
1. **Bounded Contexts:** Each major module (`inventory`, `billing`, `khata`, `karigar`) owns its own tables and domain types. Never reach directly into another module's internal tables without going through its service API.
2. **Ubiquitous Language:** Use exact business terms in code (`grossWeightMg`, `netWeightMg`, `wastageBps`, `makingChargePaise`) instead of vague names (`val1`, `num2`).
3. **Aggregates & Invariants:** An `Invoice` aggregate enforces that `lineItemsSum + gstPaise === grandTotalPaise` before saving.
