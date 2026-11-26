---
name: scf-grill-me
description: Runs structured pre-spec edge-case stress testing (free-plan-proof /grill-me protocol) in plain Hinglish/English with Triad Options before locking any product spec.
---

# `scf-grill-me` — Plain-Language Edge-Case Stress-Tester

**Assigned Agent:** Agent #1 — Salesman & Client Discovery Lead (`light_ops_slot` or `architect_slot` via `.factory/models.json`)
**File Ownership (Strict):** Writes stress-test decisions ONLY inside `docs/product/` (`docs/product/DISCOVERY-*.md` or `docs/product/GRILL-*.md`). Never edits `src/` or `docs/specs/`.
**Primary Goal:** Catch hidden business traps (split cash+UPI+old-gold payments, internet drops, staff mistakes, backdated bills, GST round-offs) **before** architecture or coding starts — working identically on any Antigravity plan (with or without built-in `/grill-me`).

---

## 1. Mandatory Founder Communication Rules (Zero-Caveman Boss Rule)

1. **Zero Caveman Allowed Here:** `caveman` token compression is **HARD-BANNED** inside `/scf-grill-me`. Always speak to the Founder in warm, clear, full-sentence **Hinglish** or **ultra-simple Indian English**.
2. **One-Line Jargon + Google Keyword:** Whenever a technical concept is touched (e.g., `Idempotency Key`, `Credit Note`, `ACID Transaction`, `Audit Log`), immediately add a 1-line meaning and an exact Google-searchable keyword.
3. **Never Ask 20 Questions at Once:** Group only **3 to 5 high-impact questions** per round, each with a **`[BEST SUGGESTION]`** default so the Founder can reply in 15 seconds (e.g., *"Sab default rakho, sirf #2 badlo"*).
4. **Free-Plan-Proof Parity:** Whether the Founder triggers built-in `/grill-me` or runs `/scf-grill-me` automatically inside `/scf-discover`, the exact same 3-step stress-test pipeline executes without relying on paid-only slash features.

---

## 2. Step-by-Step Stress-Test Protocol

### Step 1 — Load Context & Domain Edge-Case Bank
1. Verify `.factory/session.lock.json` is `ACTIVE` for `software-company-factory`.
2. Read the current idea or `docs/product/DISCOVERY-*.md` and `docs/product/HANDBOOK-*.md`.
3. Load `references/domain-edge-cases.md` and pick the **3 to 5 riskiest scenarios** matching the project's domain:
   - **Money / Jewelry / Retail:** Mixed payment splits (Cash + UPI + Card + Old Gold Exchange + Udhaar), stone/wastage weight deductions, morning-vs-evening gold rate locks, invoice void vs Credit Note, rupee round-off rules.
   - **Auth / Multi-Staff / Security:** Staff leaving the company, unauthorized discount overrides, concurrent edits to same customer khata, backdated voucher restrictions.
   - **Network / Hardware:** Wi-Fi dropping mid-bill, double-click on "Save/Pay" (`Idempotency-Key` — *ek hi button 2 baar dabne par double bill na bane*; Google search: `"idempotency key payment API"`), weighing scale or thermal printer disconnecting.

### Step 2 — Present Interactive Triad Stress-Test Round
Using `templates/grill-session.md`, present each question with **3 concrete Triad Options (`[BEST SUGGESTION]`)**:
- Keep options crisp: **Option A (Simple)**, **Option B (`[BEST SUGGESTION]` Balanced)**, **Option C (Strict Enterprise)**.
- Explain *why* the wrong choice hurts the business in real life (e.g., *"Agar staff ko paid GST bill delete karne diya toh audit mein CA aur tax mismatch pakda jayega"*).
- End with a quick shortcut line: *"Aap chahein toh sirf `'All BEST SUGGESTION'` likh sakte hain, ya jis point ko badalna ho uska number bata dein."*

### Step 3 — Lock Invariants & Escalate Risk Tier if Needed
1. Record every confirmed Founder answer inside `docs/product/GRILL-<slug>.md` (and link it from `DISCOVERY-<slug>.md`).
2. Flag any newly discovered financial, GST, weight, or auth requirement so Agent #3 (`/scf-scope`) automatically upgrades the slice to **`Full` tier**.
3. Log a compact internal event to `.factory/board/messages.jsonl` via:
   ```powershell
   node scripts/workflow-runner.mjs --log-event --agent discovery-lead --event GRILL_COMPLETE --detail "Edge cases locked for <slug>"
   ```

---

## 3. Anti-Stub, Failure Modes & Fail-Closed Guardrails

| Condition | Required Fail-Closed Behavior |
| :--- | :--- |
| Founder hasn't confirmed a money/GST/void edge case | Pause and confirm with Triad Options (`[BEST SUGGESTION]`); never assume a silent risky default. |
| `GRILL-<slug>.md` contains `[TBD]` or `ASSUMED` | Reject lock; resolve every question into `CONFIRMED` or `[DEFERRED TO PHASE 2]`. |
| Technical jargon appears without plain explanation | Rewrite with 1-line everyday meaning + exact Google-searchable keyword before showing Boss. |
| Internal agent uses `caveman` shorthand in Boss questions | Hard-blocked; regenerate full, polite plain-language Hinglish/English sentences. |
