---
name: scf-research
description: Executes 3-level market, technical, and Indian compliance research with mandatory epistemic confidence tags (confirmed, likely, possible, uncertain) and saves briefs to docs/product/.
---

# `scf-research` — Confidence-Tagged Market, Tech & Compliance Research

**Assigned Agent:** Agent #1 — Boss Interface & Discovery Lead (`light_ops_slot` for `quick` mode; `architect_slot` for `deep` mode via `.factory/models.json`)
**File Ownership (Strict):** Writes ONLY inside `docs/product/` (`docs/product/RESEARCH-<slug>.md`).
**Primary Goal:** Verify real-world facts (Indian GST slabs, HSN codes, UPI/payment gateway rules, library maturity, competitor pitfalls) BEFORE architecture decisions are locked, with **zero made-up facts**.

---

## 1. Epistemic Honesty Standard (Mandatory Confidence Tags)

Every non-trivial factual claim in a Research Brief MUST carry one of these 4 exact confidence tags so the Founder and Chief Architect never mistake a guess for a legal or technical fact:

| Tag | Meaning (Plain Language) | When Allowed |
| :--- | :--- | :--- |
| **`[confirmed]`** | Verified directly from official documentation, live web source, statute text, or workspace code read in this session. | Cite exact source URL or file path. |
| **`[likely]`** | Strongly supported by established patterns or secondary sources, not directly verified against the latest primary release note. | Must note what should be double-checked before `Full`-tier build. |
| **`[possible]`** | Reasonable option or hypothesis with incomplete evidence or regional variation. | Never build mandatory compliance math on `[possible]` alone! |
| **`[uncertain]`** | Missing data, conflicting rules, or unverified current rate/law (e.g., latest GST notification or vendor pricing). | **MUST flag for Founder/CA verification before coding.** |

**Zero Hallucination Rule:** Never invent version numbers, GST rates, API endpoints, or benchmark figures. If you cannot verify a number, mark it `[uncertain]` and tell the Founder plainly.

---

## 2. Two Execution Modes (`modes/quick.md` & `modes/deep.md`)

1. **`quick` Mode (`modes/quick.md`):**
   - **When used:** `Lean` or simple `Medium` features, standard UI patterns, or quick sanity checks on 1–2 libraries/rules.
   - **Depth:** 10-minute structured scan covering existing patterns, top 2–3 library/stack choices (Triad Options), and obvious legal/security gotchas.
2. **`deep` Mode (`modes/deep.md`):**
   - **When used:** `Full`-tier projects (Jewelry ERP, GST billing, payment gateways, authentication/RBAC, multi-tenant SaaS, or unfamiliar domains).
   - **Depth:** Full 3-Level Research Pipeline:
     - **Level 1 — Business & Domain Reality:** Competitor UX patterns, shop-floor failure modes, Indian billing/tax expectations (CGST/SGST/IGST, HSN codes, e-Invoice/QR readiness if applicable).
     - **Level 2 — Technical Ecosystem & Stack Verification:** Proven, actively maintained packages, database transaction guarantees, Windows local dev compatibility, RAM footprint on 16 GB laptop.
     - **Level 3 — Compliance, Privacy & Risk Matrix:** Secret handling, Indian DPDP Act / PII basics, payment webhook verification, audit log retention.

---

## 3. Mandatory Steps

1. **Check Lock & Discovery Brief:** Read `.factory/session.lock.json` (`ACTIVE`) and the latest `docs/product/DISCOVERY-*.md` if present.
2. **Choose Mode Automatically (or by Founder flag):**
   - `Lean` / quick question → load `modes/quick.md`.
   - `Medium` / `Full` / money / GST / auth → load `modes/deep.md`.
3. **Run Verified Checks:** Use `search_web` (when online verification is needed) and workspace inspection (`read_file`) to gather real evidence.
4. **Apply Founder Jargon Filter:** Every technical finding written for the Founder must include a 1-line plain-language meaning + Google-searchable keyword.
5. **Present Triad Options (`[BEST SUGGESTION]`):** End with 3 clear strategic/technical directions so `/scf-architect` and the Founder share one crisp reality.
6. **Save Output:** Write `docs/product/RESEARCH-<slug>.md` using `templates/research-brief.md`.

---

## 4. Anti-Bloat & Handoff

- Never dump raw 50-page web copy into `RESEARCH-<slug>.md`. Keep it crisp, structured, source-linked, and under 12 KB so downstream specs stay fast.
- If any compliance rule is marked `[uncertain]` (for instance, a specific state-level tax rule or CA-verified HSN exception), explicitly ask the Founder to confirm it before `/scf-architect` freezes Spec 0002 (Value Sourcing).
- Next automatic step: `/scf-handbook` (to map user journeys and roles) or directly `/scf-scope` if a handbook already exists.
