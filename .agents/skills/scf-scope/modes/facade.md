# `scf-scope` Mode: Facade / Strangler Slicing (`modes/facade.md`)

**Best For:** Legacy modernization or replacing messy Excel sheets / old desktop billing software without stopping daily business.
**Plain Meaning:** *"Purani dukaan band kiye bina ek-ek naya counter bahar se jodna, jab tak poora naya system ready na ho jaye."* (Google search: `"strangler fig pattern software migration"`)

## How to Slice with Facade
1. **Map Existing Bottlenecks:** Pair with `/scf-legacy-re` to list which legacy screens or spreadsheets hurt most today.
2. **Wrap One Workflow at a Time:** Build the modern replacement slice with clean API boundaries + import/export bridge for legacy CSV/DB records.
3. **Zero Data Loss Transition:** Every slice must include a reconciliation check proving old totals match new integer-paise totals.
