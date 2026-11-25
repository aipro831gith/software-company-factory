# Test Writing Guide & Financial Edge-Case Matrix (`references/test-writing-guide.md`)

## 1. Financial & Jewelry Precision Cases (Always Include for `Full` Tier)
- **Exact Integer Paise:** Test `100000` paise (₹1,000.00) * 3% GST = `3000` paise (₹30.00), never `3000.0000000000005`.
- **Half-Up Rounding Boundary:** Test an odd paise amount where `3%` produces `.5` paise (e.g., `50` paise * 3% = `1.5` -> rounds deterministically to `2` paise via `(amt * 300n + 5000n) / 10000n`).
- **Milligram Weight Purity:** Test `10500` mg (10.500 g) at `22K` (`916` ppt) with making charges + stone weight deduction (`gross_mg - stone_mg === net_mg`).
- **Split Payment Sum Invariant:** `cash_paise + upi_paise + card_paise + old_gold_paise + credit_paise === grand_total_paise`. Reject mismatch (`400 Bad Request`).

## 2. Clean Test Structure (AAA Pattern)
- **Arrange:** Create deterministic test data via factory helpers or seed transactions (clean up after test).
- **Act:** Execute the single real function or HTTP endpoint.
- **Assert:** Verify exact status code, exact integer output, DB row state, and absence of leaked stack traces or PII.
