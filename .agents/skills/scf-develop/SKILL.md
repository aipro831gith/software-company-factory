---
name: scf-develop
description: Orchestrates Frontend Lead, Backend Lead, Database Builder, and flat max-3 wave workers with <=40KB context slices, UI/UX Pro Max lookups, and AST collision checks.
---

# `scf-develop` — Multi-Track Engineering & Flat Wave Orchestrator

**Assigned Agents:**
- Agent #2 — Master Build Orchestrator (dispatches waves from `.factory/waves/wave-plan.json`)
- Agent #4 — Frontend Lead Orchestrator (`modes/frontend-lead.md` + `scripts/ui-search-bridge.py`)
- Agent #5 — Backend Lead Orchestrator (`modes/backend-lead.md`)
- Agent #6 — Database & Schema Builder (`modes/database-builder.md`)
- Agents #7 & #8 — Dynamic Frontend & Backend Sub-Agent Pools (`modes/wave-worker.md`, resolved via `worker_slot` or `deep_logic_slot` in `.factory/models.json`)

**Primary Goal:** Build approved specs cleanly, fast, and collision-free on a 16 GB Windows workstation by combining strict single-file ownership with **Flat Wave Dispatching (max 3 concurrent workers, ≤ 40 KB context per worker)**.

---

## 1. Mandatory Pre-Build Gates (Fail-Closed)

Before writing a single line of application code under `src/`:
1. **Verify Session Lock:** Run `node scripts/hook-runner.mjs --hook session-lock-check`. Must exit `0` (`ACTIVE`).
2. **Verify Spec 0001 Approval:** For any `Medium` or `Full` feature, inspect `docs/specs/SPEC-<NNN>-<slug>.md` and confirm `Status: APPROVED` (explicitly approved by the Founder). **If `DRAFT` or `ASSUMED`, STOP and route back to `/scf-architect`.**
3. **Verify Spec 0002 Value Sourcing:** Run `node scripts/hook-runner.mjs --hook block-unsourced-values`. Must exit `0`.
4. **Resolve Model Slots Dynamically:** Read `.factory/models.json`:
   - Standard UI/API/DB slices → `worker_slot`
   - Financial math, GST, gold weight, auth, RBAC, or payment webhooks → `deep_logic_slot`
   - Never hardcode any vendor model name in task packets or prompts.

---

## 2. Strict Single-File Ownership & Zero Edit Wars

Every builder ONLY writes inside its assigned paths from `SPEC-<NNN>` and `AGENTS.md` Section 6:
- **Database Builder (`database`):** `src/db/**`, `prisma/**`, `migrations/**`
- **Backend Lead & Backend Workers (`backend`):** `src/server/**`, `src/api/**`, `src/services/**`
- **Frontend Lead & Frontend Workers (`frontend`):** `src/web/**`, `src/app/**`, `src/components/**`
- **QA Test Writer (`qa`):** `tests/**` (via `/scf-test`)
- **Exception:** Builders may update ONLY the 1-line `BuildState:` header inside `docs/specs/SPEC-<NNN>-<slug>.md` when build completes, never the spec contract itself.

---

## 3. Flat Wave Spawning Protocol (Max 3 Workers, ≤ 40 KB Context)

Leads NEVER nest-spawn sub-agents directly. Instead, Leads + Master Build Orchestrator execute this exact flat wave loop:

### Step 1 — Generate `.factory/waves/wave-plan.json`
Master Build Orchestrator slices the approved spec into **Waves**:
- **Wave 1 (Foundation — Max 3 Workers):**
  1. `database`: Schema, constraints, migrations, deterministic seed script (`modes/database-builder.md`)
  2. `backend-lead`: Core server bootstrap, auth/RBAC middleware, shared integer math types (`modes/backend-lead.md`)
  3. `frontend-lead`: Runs `python scripts/ui-search-bridge.py --query "<domain>"` (`references/ui-ux-pro-max.md`), sets design tokens, layout shell, and component contracts (`modes/frontend-lead.md`)
- **Wave 2..N (Parallel Feature Slices — Max 3 Workers Per Wave):**
  - Each worker gets ONE isolated Task Packet (`modes/wave-worker.md`) containing:
    - Exact `worker_id` & `model_slot` (`worker_slot` or `deep_logic_slot`)
    - Strict `owned_files` list (zero overlap with sibling workers in the same wave)
    - Minimal spec slice + API/DB type signatures totaling **`<= 40 KB`** (`context_budget_kb <= 40`)
    - Exact verification command for that slice

### Step 2 — Run Pre-Wave Guard & Dispatch Max 3 Workers
1. Run `node scripts/ast-collision-guard.mjs` and `node scripts/analyze-token-usage.mjs` **before** launching workers to prove zero file overlap and `<= 40 KB` slice compliance.
2. Dispatch up to 3 fresh sub-agent workers for the current wave.
3. Each worker builds **complete, production-grade code** (zero 5-line stubs, zero `TODO` placeholders, zero `eval()`, zero float money math).

### Step 3 — Post-Wave Verification & Atomic Checkpoint
Immediately after Wave `N` workers finish:
1. Run collision, security, and syntax hooks in PowerShell:
   ```powershell
   node scripts/ast-collision-guard.mjs; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-eval-usage; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-float-money; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; node scripts/hook-runner.mjs --hook block-hardcoded-secrets
   ```
2. Run project typecheck/build/lint (`pre-commit-lint-typecheck`).
3. If clean, Agent #9 runs atomic checkpoint:
   ```powershell
   node scripts/git-checkpoint.mjs commit "feat(<slug>): complete wave <N>" --wave <N>
   ```
4. If any check fails, emit `.factory/tickets/BUG-<NNN>.json` routed strictly to the owning worker (`database`, `backend`, or `frontend`) — do NOT advance to Wave `N+1` until Wave `N` is green!

---

## 4. Non-Negotiable Code Quality & Security Invariants

1. **Money & Gold Math (`block-float-money`):** Integer paise, integer milligrams, basis-point rates, `BigInt` / `Decimal` only. Never `parseFloat()` or JS `Number` decimal multiplication on currency/GST/weight.
2. **Passwords & Auth:** `Argon2id` only. Cookies must be `httpOnly`, `secure` (in prod), `sameSite: 'lax' | 'strict'`. Zero tokens or PII in `localStorage`.
3. **Server Authority & IDOR:** Every query/mutation checks authenticated user role and record ownership (`tenantId`/`ownerId`). Totals and taxes always compute server-side.
4. **Windows-Safe Tooling:** Zero POSIX-only shell commands inside build scripts or app helpers.

---

## 5. Handoff After Final Wave

Once all waves in `.factory/waves/wave-plan.json` are committed and green:
- Update `BuildState: BUILT_PENDING_QA` in `docs/specs/SPEC-<NNN>-<slug>.md`.
- Automatically invoke `/scf-test` (Agent #10 writes/runs test suites) followed by `/scf-check` (`verify` mode for all tiers ≥ `Lean`, plus `review` mode via `blind_reviewer_slot` for `Full` tier).

---

## 6. Vendored Core Specialist Bindings (`.factory/skills-registry.json`)

Load ONLY the matching domain specialist skill on-demand (`<= 40 KB` worker slice; zero cross-domain edits):
- **Agent #6 Frontend:** `vendor/specialist-skills/core/impeccable`, `vendor/specialist-skills/core/ui-ux-pro-max`, `vendor/specialist-skills/core/vercel-agent-skills`, `vendor/specialist-skills/core/mattpocock-skills`, plus `context7` MCP.
- **Agent #7 Backend:** `vendor/specialist-skills/core/jsmastery-skills`, `vendor/specialist-skills/core/obra-superpowers` (strict TDD), `vendor/specialist-skills/core/mattpocock-skills`, `vendor/specialist-skills/core/addyosmani-agent-skills`, plus `context7` MCP.
- **Agent #8 Database:** `vendor/specialist-skills/core/supabase-agent-skills` (Postgres, RLS, migrations, integer columns).
- **Internal Swarm Shorthand Only:** `vendor/specialist-skills/core/caveman` (strictly for `.factory/board/messages.jsonl` and internal worker handoffs — NEVER on Boss chat).
