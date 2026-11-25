---
name: scf-handbook
description: Generates a plain-language Application Handbook covering business model, user journeys, role permission matrix, and visual workflow maps inside docs/product/.
---

# `scf-handbook` — Plain-Language Application Handbook

**Assigned Agent:** Agent #1 — Boss Interface & Discovery Lead (`light_ops_slot` or `architect_slot` via `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY inside `docs/product/` (`docs/product/HANDBOOK-<slug>.md`).
**Primary Goal:** Give the non-coder Founder a crystal-clear, 5-minute "Owner's Manual" showing exactly how every user, screen, permission, and business rule connects together before coding starts.

---

## 1. Why This Handbook Exists (Zero Confusion Before Building)

Code specs tell engineers *what files to write*, whereas the **Application Handbook** tells the Founder *how their business actually runs inside the software*:
1. **Business Model & Daily Money Flow:** How items/services enter, how rates/taxes apply, how payments settle, and how profit/stock updates.
2. **End-to-End User Journeys:** Step-by-step "Click 1 → Click 2 → Screen Result" walkthroughs for every real person (Owner, Accountant, Counter Staff, Customer).
3. **Role & Permission Matrix (`RBAC`):** Exact table of who can View, Create, Edit, Approve, or Cancel — explained in plain shop language *(with 1-line meaning of `RBAC` = Role-Based Access Control; Google search: `"role based access control matrix"`).*
4. **Visual Connection Map:** A clean Mermaid diagram showing how screens talk to rules and ledgers so the Founder can spot missing links instantly.

---

## 2. Step-by-Step Execution Protocol

### Step 1 — Pre-Flight & Input Gathering
1. Verify `.factory/session.lock.json` is `ACTIVE` for `software-company-factory`.
2. Read `docs/product/DISCOVERY-<slug>.md` and `docs/product/RESEARCH-<slug>.md` (if present).
3. Check if any `[uncertain]` compliance or business edge cases remain unresolved. If critical rules are missing, surface **3 Triad Options (`[BEST SUGGESTION]`)** before finalizing the handbook.

### Step 2 — Build the 4 Mandatory Handbook Sections
Using `templates/application-handbook.md`, produce `docs/product/HANDBOOK-<slug>.md`:

1. **Section 1 — Business Model & Golden Rules (Dukaan Ka Niyam):**
   - Plain Hinglish/English summary of how the business makes/tracks value.
   - Explicit list of **Non-Negotiable Invariants** (e.g., `"Paid invoices can never be deleted — only reversed via Credit Note"`, `"GST and making charges always calculate on the server in integer paise"`).
2. **Section 2 — Daily User Journeys (Step-by-Step Workflows):**
   - Write 3 to 6 concrete journeys (e.g., `Journey A: Morning Rate Set`, `Journey B: New Sale + Split Payment + GST Invoice`, `Journey C: Old Exchange / Return`, `Journey D: Day-End Cash & Stock Tally`).
   - Include failure/offline recovery steps inside each journey ("Agar network chala jaye toh step 4 par draft locally save hoga").
3. **Section 3 — Role & Permission Matrix (Kaun Kya Kar Sakta Hai):**
   - Clear table mapping every Role (`Owner / Boss`, `Manager / Munim`, `Counter Staff`, `Auditor / CA Read-Only`) against every Module (`Rates`, `Inventory`, `Billing`, `Discounts`, `Customer Khata`, `Reports`, `Settings`).
   - Mark sensitive overrides (like > 5% discount, invoice cancellation, or backdated entry) as **`Boss Approval Required`**.
4. **Section 4 — Visual Connection Map (System Map):**
   - Create a clean `flowchart TD` or `flowchart LR` Mermaid diagram (valid syntax, quoted labels for any parentheses/special chars) connecting User Roles → Core Screens → Server Rules → Ledger/Database.

### Step 3 — Founder Walkthrough & Triad Check
Present a short 6-line summary of the Handbook in chat, highlight any sensitive permission rules (especially who can give discounts or cancel bills), and offer **Triad Options (`[BEST SUGGESTION]`)**:
- **Option 1 — `[BEST SUGGESTION]` Lock Handbook & Start Feature Slicing (`/scf-scope`):** Proceed automatically to break the roadmap into safe buildable slices.
- **Option 2 — Adjust Roles or Journeys First:** Tell me which permission or daily flow you want to change.
- **Option 3 — Add Extra Compliance/Audit Rules:** Run a deeper research pass (`/scf-research` deep mode) on a specific workflow before scoping.

---

## 3. Quality & Anti-Stub Standards

- Never write generic filler like `"User logs in and uses dashboard"`. Every journey must name concrete inputs, calculations, outputs, and error/edge-case behavior.
- Never hardcode vendor model names or bypass `docs/product/` ownership boundaries.
- Keep technical terms paired with a 1-line plain meaning and Google-searchable keyword.
