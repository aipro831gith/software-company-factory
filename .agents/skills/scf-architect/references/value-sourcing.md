# Spec 0002 — Value Sourcing Standard (`references/value-sourcing.md`)

**Rule:** Every value produced, stored, or shown to a user must have a **single, named, verifiable origin**. Never leave numbers to AI imagination, client-side defaults, or hardcoded demo constants.

## Allowed Source Categories
1. **`USER_INPUT`:** Typed/selected by an authenticated user with explicit server-side Zod/schema bounds (e.g., weight `> 0` and `<= 10000000` mg).
2. **`DB_RECORD`:** Read from a specific `table.column` (e.g., `gold_rates.rate_22k_paise_per_gram`), with explicit behavior if missing (fail loudly with actionable message `"Set today's 22K gold rate first"`, never silently use `0`!).
3. **`SERVER_FORMULA`:** Deterministic integer/Decimal calculation executed on the server (e.g., `metalPaise = (netWeightMg * ratePerGramPaise + 500n) / 1000n`).
4. **`SYSTEM_GENERATED`:** Cryptographic UUID/correlation ID, sequential invoice number generated inside a DB transaction, or server UTC timestamp.
5. **`CONFIG_CONSTANT`:** Statutory or domain constant explicitly documented and approved (e.g., `GST_JEWELRY_BPS = 300` for 3% GST, `[confirmed]` by Founder/CA).

## Forbidden Sources (Blocked by `block-unsourced-values`)
- `TBD`, `UNKNOWN`, `ASSUMED`, `"hardcoded placeholder"`, or `"client calculates and sends total"`.
