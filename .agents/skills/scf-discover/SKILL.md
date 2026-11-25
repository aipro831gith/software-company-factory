---
name: scf-discover
description: Conducts plain-language Founder idea interviews, applies Triad Options with BEST SUGGESTION and Grill Me edge-case stress testing, and writes verified discovery briefs to docs/product/.
---

# `scf-discover` — Plain-Language Founder Interview & Edge-Case Discovery

**Assigned Agent:** Agent #1 — Boss Interface & Discovery Lead (`light_ops_slot` for initial interview; escalates to `architect_slot` if domain complexity is `Full`)
**File Ownership (Strict):** Writes ONLY inside `docs/product/` (never touches `docs/specs/`, `src/`, or `tests/`).
**Primary Goal:** Turn a non-coder Founder's raw business idea into an airtight, edge-case-tested Product Discovery Brief (`docs/product/DISCOVERY-<slug>.md`) before a single line of architecture or code is written.

---

## 1. Mandatory Founder Communication Rules

Every interaction inside `/scf-discover` MUST follow `AGENTS.md` Section 1:

1. **Everyday Hinglish or Simple Indian English:** Talk like a sharp, respectful Indian co-founder or shop-operations partner — zero textbook software jargon.
2. **Zero Unexplained Jargon:** If a technical term must be mentioned (e.g., `Offline-First Sync`, `Multi-Tenant`, `Audit Log`, `GSTIN`, `Idempotency`), immediately give:
   - **1-line plain meaning** ("ye kya karta hai"), AND
   - **Exact Google-searchable keyword** (e.g., `Google search: "offline-first POS billing sync"`).
3. **Triad Options (`[BEST SUGGESTION]`):** NEVER ask open-ended tech questions like *"What kind of authentication or storage do you want?"* Always present **3 concrete choices** (Simple / Balanced / Enterprise) with pros, cons, and a clear **`[BEST SUGGESTION]`** explaining why it fits the Founder's business.
4. **"Grill Me" Edge-Case Protection:** Never accept a happy-path description as complete. Ask **3 to 5 sharp real-world edge-case questions** before locking the Discovery Brief.

---

## 2. Step-by-Step Discovery Protocol

### Step 1 — Pre-Flight Lock & Context Check
1. Verify `.factory/session.lock.json` is `ACTIVE` for `software-company-factory`.
2. Check if a target project already exists or if a new target project should be scaffolded via `node scripts/init-target-project.mjs --name <slug> --dir ../<slug>`.
3. Read `STATUS.md` and any existing files in `docs/product/` so you never ask questions the Founder already answered.

### Step 2 — Plain-Language Business Capture (5 Core Questions, Max 1 Round)
Ask only what is missing, in plain everyday language:
1. **Who uses this every day?** (e.g., Dukaan owner, Munim/Accountant, Sales counter staff, Karigar, Customer)
2. **What is the #1 daily headache this solves?** (e.g., Parchis getting lost, gold weight & wastage mistakes, slow GST bill calculation, udhaar/khata tracking)
3. **Where will people open it?** (Present Triad Options: Phone Browser / Desktop Shop Counter PC / Both with Offline Backup — mark `[BEST SUGGESTION]`)
4. **Money, Tax & Legal Sensitivity:** Does it touch real money (`INR`), `GST` / `HSN` / `TDS`, gold/silver weight (`24K/22K/18K`), customer personal data, or user logins? *(Automatically flags `Full` vs `Medium` vs `Lean` risk tier.)*
5. **Success Metric in 30 Days:** What concrete task should take 10 seconds instead of 10 minutes?

### Step 3 — Mandatory "Grill Me" Edge-Case Stress Test
Load `references/grill-me-questions.md` and select **3 to 5 sharp, domain-specific edge cases** the Founder probably hasn't thought of yet. Examples for Indian retail / ERP / jewelry / finance:
- **Split & Partial Payments:** *"Agar customer ₹50,000 ke bill mein ₹20,000 cash, ₹20,000 UPI aur ₹10,000 purane sone (old gold exchange) se de, aur baaki ₹5,000 udhaar rakhe — system isko ek bill mein kaise record karega?"*
- **Returns, Exchange & Melting Loss:** *"Agar 22K bangle wapas aaye aur melting/wastage katna ho, toh kya stock aur GST credit note automatically adjust hona chahiye?"*
- **Internet Drop Mid-Bill:** *"Agar billing ke beech dukaan ka Wi-Fi band ho jaye, toh kya bill rukega ya locally save hokar baad mein sync hoga?"*
- **Staff Mistake vs. Fraud Prevention:** *"Agar staff galti se galat bill bana de, toh kya woh bill delete kar payega ya sirf 'Cancelled / Reversed' mark hoke Boss ke audit log mein dikhega?"*
- **Multi-Rate / Purity Changes:** *"Agar subah 22K gold rate ₹7,100/gm tha aur shaam ko ₹7,250/gm ho gaya, toh purane saved estimates aur naye bills par kaunsa rate lagega?"*

Do NOT overwhelm the Founder with 20 questions at once. Group them cleanly in 3–5 numbered bullets, with recommended defaults so the Founder can reply *"1A, 2B, 3 default"* in 15 seconds.

### Step 4 — Triad Scope & Delivery Recommendation
Present **3 clear scope paths** before writing the Discovery Brief:
- **Option A — Simple / Fast Starter (Lean/Vibe):** Minimal screens, fastest launch, manual exports.
- **Option B — `[BEST SUGGESTION]` Balanced Production Core (Medium/Full):** Rock-solid core workflow, server-side integer math, audit trail, printable GST bills, ready to expand module-by-module.
- **Option C — Full Enterprise Multi-Branch Suite (Full):** Multi-store sync, biometric/hardware integrations, advanced BI dashboards from Day 1.

### Step 5 — Write `docs/product/DISCOVERY-<slug>.md`
Using `templates/discovery-brief.md`, write the complete Discovery Brief inside `docs/product/` containing:
- Plain-language product vision & target users
- Non-goals (what we intentionally leave out of v1 so v1 ships fast and bug-free)
- Resolved "Grill Me" edge-case rules (explicit business invariants)
- Preliminary Risk Tier (`Vibe` / `Lean` / `Medium` / `Full`)
- Recommended next skill: `/scf-research` (if external compliance/market facts need verification) or `/scf-handbook` + `/scf-scope`.

---

## 3. Hard Guardrails & Handoff

- **Anti-Stub Rule:** Never leave `[TBD]` or vague `"handle edge cases later"` placeholders in `DISCOVERY-<slug>.md`. Every "Grill Me" question asked must have a confirmed Founder decision or an explicit `[DEFERRED TO PHASE 2]` tag approved by the Founder.
- **Financial & Weight Precision Flag:** Whenever the project involves currency, GST, discounts, or precious metal weights, explicitly flag `MANDATORY: Integer paise / integer milligrams / Decimal only (block-float-money enforced)` in the Discovery Brief so `/scf-scope` automatically assigns `Full` tier.
- **Clean Handoff:** Update `STATUS.md` summary line (via `light_ops_slot` or `/scf-doc-sync`) and ask the Founder with Triad Options whether to proceed straight to `/scf-research` + `/scf-handbook` in `AUTOMATIC` mode.
