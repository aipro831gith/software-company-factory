# Change Impact Report Template (`docs/scope/IMPACT-<NNN>-<slug>.md`)

```markdown
# Change Impact Report: IMPACT-<NNN> (<Short Title>)

- **Requested By:** Founder
- **Analyzed By:** Master Build Orchestrator (`scf-change-impact`)
- **Affected Spec(s):** `<SPEC-NNN>`
- **Resulting Risk Tier:** `<Lean | Medium | Full>`
- **Requires Spec Re-Approval (Spec 0001):** `<YES | NO>`

---

## 1. Plain-Language Summary (Before vs. After)
- **Before (Abhi Kya Hai):** <Current behavior>
- **After (Naya Change):** <Requested behavior>

## 2. 7-Step Ripple-Effect Map
| Layer | Affected Files / Modules | Impact & Migration Note |
| :--- | :--- | :--- |
| **1. Business Rule** | `<e.g., GST / Discount / Role rule>` | `<Exact rule change>` |
| **2. Database & Old Data** | `<src/db/...>` | `<Old invoices preserved? Additive column?>` |
| **3. Backend & Spec 0002** | `<src/services/...>` | `<New Value Sourcing entry>` |
| **4. Frontend UI & Print** | `<src/components/...>` | `<Screens/forms updated>` |
| **5. Security & Tier** | `<scf-sec-ops>` | `<Promoted to Full tier? YES/NO>` |
| **6. Tests & Gates** | `<tests/... , .factory/gates/...>` | `<Must re-run after edit>` |
| **7. Git Rollback Anchor** | `<checkpoint-wave-N>` | `<Safe restore tag verified>` |

## 3. Triad Options for the Founder
1. **Option A (Minimal Patch):** <Fastest route + limitations>
2. **Option B (`[BEST SUGGESTION]` Clean Spec Update + Full Gate Re-Verify):** <Balanced, zero regression risk>
3. **Option C (Defer to Phase 2):** <Ship current module first, build this next>

Reply with Option 1 / 2 / 3 (or `"APPROVE Option 2"`) to proceed.
```
