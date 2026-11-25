# Dual Spec Template (`docs/specs/SPEC-<NNN>-<slug>.md`)

```markdown
# SPEC-<NNN>: <Feature Title>

Tier: <Lean | Medium | Full>
Status: DRAFT
BuildState: PENDING
Project: <target-project-slug>
OwnerArchitectSlot: architect_slot

---

## PART A — Boss Plain-English Summary (Padhne Mein Aasaan)

### 1. Hum Kya Bana Rahe Hain (What)
<2-3 simple everyday sentences explaining what the user clicks and what the software delivers.>

### 2. Hum Ye Tech / Design Kyun Chun Rahe Hain (Why + Google Keywords)
- **Database & Safety:** <1-line plain reason> — *Google search: `"<exact keyword>"`*
- **Calculation Rule:** <1-line plain reason for integer paise/mg server calculation> — *Google search: `"<exact keyword>"`*
- **Screen Design:** <1-line plain reason> — *Google search: `"<exact keyword>"`*

### 3. Har Number / Data Kahan Se Aayega (Value Sourcing Summary — Spec 0002)
| Screen Par Kya Dikhega | Asli Source Kahan Hai (Koi Guess Nahi) |
| :--- | :--- |
| `<e.g., 22K Gold Rate>` | `<Boss daily input saved in gold_rates table>` |
| `<e.g., 3% GST Amount>` | `<Server computes exact integer paise from taxable total>` |

### 4. Risk Tier & Automated Safety Checks
- **Workflow Tier:** `<Medium (11 Checks) | Full (15+ Checks)>`
- **Included Protections:** `<Plain list: Spec Gate, Automated Tests, Integer Money Guard, 5-Stage Security, Blind Review>`

### 5. Boss Decision Gate
Reply **"APPROVE"** to start automatic build, or tell me what to change.

---

## PART B — Machine Engineering Contract (For Builders, QA & Gatekeeper)

### 1. Spec 0002 — Full Value Sourcing Matrix
| Field / Output | Layer | Unit & Type | Authoritative Source | Validation & Rounding Rule |
| :--- | :--- | :--- | :--- | :--- |
| `<field_name>` | `<DB/API/UI>` | `<INTEGER paise>` | `<table.column / server formula / user input>` | `<min 0, half-up, server-authoritative>` |

### 2. Disjoint File Ownership Map (Wave Collision Guard)
| Owner Role | Exclusive File Paths |
| :--- | :--- |
| `database` | `src/db/<slice>/**`, `prisma/migrations/**` |
| `backend` | `src/server/<slice>/**`, `src/services/<slice>/**` |
| `frontend` | `src/web/<slice>/**`, `src/components/<slice>/**` |
| `qa` | `tests/<slice>/**` |

### 3. Database Schema & API Contracts
- **Tables & Constraints:** <Exact columns, BigInt/Integer paise & mg, FKs with ON DELETE RESTRICT>
- **API Endpoints:** <Method, Path, Auth/RBAC role, Idempotency-Key requirement, Request/Response JSON>

### 4. Acceptance Criteria & Verification Commands
1. `node scripts/hook-runner.mjs --hook block-float-money`
2. `<Exact build/typecheck/unit/integration/E2E command>`
3. `node scripts/gate-check.mjs --feature SPEC-<NNN>`
```
