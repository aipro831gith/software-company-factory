# Discovery Brief Template (`docs/product/DISCOVERY-<slug>.md`)

```markdown
# Product Discovery Brief: <Product Name>

- **Target Project Slug:** `<slug>`
- **Prepared By:** Boss Interface & Discovery Lead (`scf-discover`)
- **Preliminary Risk Tier:** `<Lean | Medium | Full>`
- **Founder Language:** `<Hinglish | Simple Indian English>`
- **Status:** `CONFIRMED_BY_FOUNDER`

---

## 1. Plain-Language Vision (Yeh Software Kya Karega)
<2-4 everyday sentences describing the business problem and daily shop/user workflow.>

## 2. Target Users & Roles
| Role (Aam Bhasha) | Daily Tasks | Must NEVER Be Allowed To Do |
| :--- | :--- | :--- |
| `<Owner / Boss>` | `<View profit, approve overrides, change rates>` | `<Skip audit log>` |
| `<Staff / Counter>` | `<Create estimate/bill, check stock>` | `<Hard-delete paid invoices>` |

## 3. Resolved "Grill Me" Edge-Case Decisions
1. **Split / Partial Payments:** <Exact Founder decision>
2. **Bill Cancellation / Mistake Handling:** <Exact Founder decision — e.g., Soft-cancel with audit trail only>
3. **Offline / Internet Drop Behavior:** <Exact Founder decision>
4. **Rate Change / Price Lock Rule:** <Exact Founder decision>
5. **Returns / Old Exchange / Rounding:** <Exact Founder decision>

## 4. Hard Business Invariants (Never Break These)
- All money values stored and computed in exact integer paise (never decimal floats).
- All gold/metal weights (if applicable) stored in exact integer milligrams.
- <Any domain-specific legal/GST/compliance invariant>

## 5. Out of Scope for Version 1 (Abhi Kya Nahi Banayenge)
- <Item 1 deferred to Phase 2>
- <Item 2 deferred to Phase 2>

## 6. Recommended Next Step
- **Next Automatic Step:** Run `/scf-research` (if compliance/tax/tech verification needed) -> `/scf-handbook` -> `/scf-scope`.
```
