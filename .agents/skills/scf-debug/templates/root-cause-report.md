# Root-Cause Analysis Report Template (`.factory/tickets/RCA-<NNN>.md`)

```markdown
# Root-Cause Analysis: RCA-<NNN> (Linked: BUG-<NNN>)

- **Model Slot Used:** `deep_logic_slot` (resolved via `.factory/models.json`)
- **Ticket Owner:** `<database | backend | frontend>`
- **Attempt Count at Escalation:** `<3 / 3>`
- **Git Safe Rollback Tag:** `<checkpoint-wave-N>`

---

## 1. Plain-Language Explanation for the Founder
<2 simple sentences explaining what broke and why, with 1-line meaning + Google keyword for any technical term.>

## 2. Observed Failure Evidence
- **Failing Command:** `<exact command>`
- **Expected:** `<expected output>`
- **Actual:** `<observed error/output>`

## 3. Proven Root Cause (`exact_file:line`)
- **Mechanism:** <Exact code/config/timing flaw>
- **Why Previous Attempts Failed:** <What those attempts missed>

## 4. Surgical Fix & Regression Test Plan
1. **Fix in `<owned_file>`:** <Exact minimal change>
2. **Permanent Test in `tests/`:** <Test case preventing recurrence>

## 5. Escalation Triad Options (Required if Circuit Breaker Halted)
1. **Option A (Safe Rollback):** <Restore last clean checkpoint>
2. **Option B (`[BEST SUGGESTION]` Targeted Fix):** <Recommended resolution>
3. **Option C (Defer Slice):** <Keep core working, defer edge slice>
```
