# Test Plan Template (`tests/TEST-PLAN-<NNN>.md`)

```markdown
# Test Plan: SPEC-<NNN> (<Feature Name>)

- **Tier:** `<Lean | Medium | Full>`
- **Spec Reference:** `docs/specs/SPEC-<NNN>-<slug>.md`
- **Author:** QA Verification & Testing Agent (`scf-test`)

## Test Cases Matrix
| ID | Category | Scenario (Plain Language) | Expected Result | Target File |
| :--- | :--- | :--- | :--- | :--- |
| `T-01` | `Unit` | `<Integer paise + 3% GST calculation>` | `<Exact integer paise>` | `tests/unit/...` |
| `T-02` | `Security` | `<Tampered client total sent to API>` | `<Server ignores client total & recomputes>` | `tests/integration/...` |
| `T-03` | `Idempotency` | `<Double submit with same Idempotency-Key>` | `<Single bill created, no double stock deduction>` | `tests/integration/...` |
| `T-04` | `E2E` | `<Complete counter billing UI journey>` | `<Invoice rendered & saved in DB>` | `tests/e2e/...` |
```
