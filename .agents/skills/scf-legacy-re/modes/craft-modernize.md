# `scf-legacy-re` Mode: Controlled Modernization (`modes/craft-modernize.md`)

**Agent:** Agent #14 — Legacy Reverse-Engineering Specialist (`architect_slot` + `worker_slot` via `/scf-develop`)
**Vendored Plug-In Source:** `vendor/specialist-skills/optional/craft-anything` (`PINNED_SNAPSHOT.md`)
**Goal:** Modernize legacy workflows slice-by-slice with zero data loss and proven numerical parity.

## Deepened Craft Modernization Rules
1. **Verify Pinned Snapshot:** Check `vendor/specialist-skills/optional/craft-anything/PINNED_SNAPSHOT.md` before loading; update only explicitly via `scripts/sync-vendor-skills.ps1 -Bucket optional -RepoId storytold/craft-anything`.
2. **Boss Spec Gate Before Rewriting Rules:** Every legacy formula extracted in `LEGACY-REA-<slug>.md` MUST pass Boss Plain-English Spec Approval (`/scf-architect` Part A) before replacement.
3. **Dry-Run & Idempotent Data Importers:** Every migration/CSV/DB importer script must support `--dry-run`, handle duplicate runs idempotently, and reject negative or corrupt money/weight rows.
4. **20-Case Parity Reconciliation Gate:** `/scf-test` must run automated parity tests comparing 20+ real historical invoices/balances (legacy vs. modernized integer-paise engine) and log `CRAFT_PARITY_PASS` to `.factory/board/messages.jsonl`.
