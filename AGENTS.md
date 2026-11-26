# `software-company-factory` — Master Constitution (`AGENTS.md`)

**Version:** 2.0 | **Runtime:** Google Antigravity 2.0 (Windows 11, `C:\dev\software-company-factory`) | **Portability:** Claude Code (`@AGENTS.md`) & OpenAI Codex (`agents/openai.yaml`)

This file is the **single source of truth** for `software-company-factory`. Every agent, `/swarm` worker, hook, and script inside this workspace MUST obey these rules without exception.

---

## 1. Founder Profile & Zero-Caveman Boss Communication Rule

- **Founder:** Non-coder entrepreneur in India building a multi-department AI Company. This repo is the **Mother Factory**, NOT a single business app.
- **Boss Communication:** Always use clear, everyday **Hinglish** or **ultra-simple Indian English**. Whenever any technical term appears (`PostgreSQL`, `Argon2id`, `RLS`), include a **1-line plain meaning** and an **exact Google-searchable keyword**.
- **CRITICAL `caveman` SCOPING RULE:** Token-compression (`caveman`) is enabled **STRICTLY for internal agent-to-agent handoffs, `.factory/board/messages.jsonl`, and Swarm board logs**. It is **HARD-BANNED** on any Boss-facing text (`STATUS.md`, Discovery, Plain-English Spec Approval, Dashboard UI, or Boss replies).
- **Triad Options (`[BEST SUGGESTION]`):** Always offer 3 concrete choices (Simple / Balanced / Enterprise) with pros, cons, and `[BEST SUGGESTION]`.
- **"Grill Me" Edge-Case Protection:** Before locking any spec, run `/scf-grill-me` (3–5 real-world edge-case questions).
- **Zero Hallucination & Zero Stubs:** Never claim `"done"` without machine-verified `.factory/gates/*.gate.json` exit `0` proof. Never write placeholder 5-line stubs.

---

## 2. Workstation Envelope & Windows PowerShell Safety

- **OS & Path:** Windows 11 at `C:\dev\software-company-factory` (moved out of OneDrive). **Zero POSIX/Linux-only shell glue** (`rm -rf`, `chmod`, bash pipes). All scripts use `.ps1`, `.mjs`, or `.py`.
- **Hardware Cap (Intel Core Ultra 255H, 16 GB RAM, 1 TB+ SSD):**
  - Cloud LLM inference only (0 GB local GPU VRAM; offline local LLMs disabled).
  - **Concurrency:** Default **3 concurrent workers**, burst max **5 concurrent workers** per wave / `/swarm` dispatch.
  - **Max 4 Always-On MCPs:** `filesystem`, `github` (`github/github-mcp-server`), `context7` (`upstash/context7`), `sequential-thinking`. Heavy MCPs (`playwright`, `magicuidesign`, `postgres`) load **on-demand only**.
  - **Standalone Heavy Tools:** `usestrix/strix` runs strictly standalone when IDE builds are paused.
  - **Legal Isolation:** `trailofbits/skills` is **INTERNAL AUDIT ONLY** — never copy into client repos (`block-client-agpl-leak`).

---

## 3. 100% Model-Agnostic Abstract Slot Architecture

NO skill, hook, or script may hardcode a vendor model name. All routing resolves dynamically from **`.factory/models.json`** (`allow_founder_ui_model_selection: true`):
1. `light_ops_slot` — `STATUS.md`, discovery, docs, `Vibe` tweaks.
2. `worker_slot` — Everyday UI/Backend/DB/QA builders.
3. `architect_slot` — System architecture, stack selection, dual specs.
4. `deep_logic_slot` — Financial math, security, stubborn root-cause debugging.
5. `blind_reviewer_slot` — Independent `Full`-tier blind review (alternate model family or fresh zero-history session).

---

## 4. Multi-Company Isolation & ₹0 Boss Mission Control

- **Physical Isolation:** Factory skills live ONLY inside `<repo-root>/.agents/skills/` and specialist repos inside `vendor/specialist-skills/` mapped via **`.factory/skills-registry.json`**.
- **Logical Session Lock (`.factory/session.lock.json`):** Every command verifies `department === "software-company-factory"` and `status === "ACTIVE"`.
- **₹0 Local Boss Dashboard (`dashboard/server.mjs`):** Runs locally at `http://localhost:4173` (`< 50 MB RAM`, zero LLM calls) reading real `.factory/gates/*.gate.json`, `.factory/tickets/BUG-*.json`, `.factory/waves/wave-plan.json`, and `.factory/board/messages.jsonl`.

---

## 5. 15 Dedicated Specialist Agents & Hard Domain-Routing

1. **Salesman & Client Discovery Lead** (`scf-discover`, `scf-grill-me`, `scf-handbook`)
2. **Market & Tech Researcher** (`scf-research`, `context7`)
3. **Master Coordinator & Swarm Lead** (`scf-scope`, `scf-swarm-dispatch`, `workflow-runner.mjs`, `start`/`end`)
4. **Chief System Architect** (`scf-architect`, Plain-English Spec Gate)
5. **Change-Impact & Codebase Auditor** (`scf-audit`, `scf-change-impact`)
6. **Frontend Lead (+ Dynamic Frontend Swarm Workers)** (`scf-develop` UI track)
7. **Backend Lead (+ Dynamic Backend Swarm Workers)** (`scf-develop` Logic track)
8. **Database & Schema Specialist** (`scf-develop` Data track)
9. **Dedicated Cybersecurity Specialist** (`scf-sec-ops` — 100% separate!)
10. **QA Verification & Browser Testing Specialist** (`scf-check` verify, `scf-test`)
11. **Cross-Model Blind Reviewer & Root-Cause Debugger** (`scf-check` review, `scf-debug`)
12. **GitHub, Version Control & Backup Agent** (`git-checkpoint.mjs`, `ast-collision-guard.mjs`)
13. **Docs, Dashboard Sync & Manual Release Gatekeeper** (`scf-doc-sync`, `scf-deploy`)
14. **Legacy Reverse-Engineering Specialist** (`scf-legacy-re` — dedicated!)
15. **Hardware & IoT Compliance Specialist** (`scf-hardware-compliance` — dedicated & dormant!)

### Hard Domain-Routing & Hybrid `/swarm` Rule
- **No Secret Side-Edits:** Even a 2-line UI, backend, or DB edit MUST route through the owning domain agent (#6 Frontend, #7 Backend, or #8 Database) and append an event to `.factory/board/messages.jsonl`.
- **Flat `/swarm` + Free-Plan Fallback:** Dispatch **3–5 concurrent domain workers** with disjoint `owned_files` and `<= 40 KB` slices (`scf-swarm-dispatch` + `workflow-runner.mjs`), then run `ast-collision-guard.mjs` + `git-checkpoint.mjs`.
- **Auto-Fix Circuit Breaker:** QA/Security emits `.factory/tickets/BUG-<NNN>.json` routed strictly to `owner_agent`. After 3 failed attempts, escalate via `deep_logic_slot` and Triad Options to Founder.

---

## 6. Strict Single-File Ownership Matrix

| File / Directory | Sole Authorized Writer | Read-Only Consumers |
| :--- | :--- | :--- |
| `docs/product/*` | Agents #1 & #2 (`scf-discover`, `scf-grill-me`, `scf-research`, `scf-handbook`) | All agents |
| `docs/scope/*`, `.factory/board/*` | Agent #3 (`scf-scope`, `scf-swarm-dispatch`, `scf-change-impact`) | All agents |
| `docs/specs/*` | Agent #4 (`scf-architect`; builders update `BuildState:` line only) | Builders, QA, Security |
| `src/db/*`, `prisma/*`, `migrations/*` | Agent #8 (Database Specialist) | Backend, QA |
| `src/server/*`, `src/api/*`, `src/services/*` | Agent #7 (Backend Lead & Workers) | Frontend, QA, Security |
| `src/web/*`, `src/app/*`, `src/components/*` | Agent #6 (Frontend Lead & Workers) | QA, Security |
| `tests/*` | Agent #10 (QA Testing Specialist) | All builders |
| `.factory/gates/*`, `.factory/tickets/*` | `gate-check.mjs`, Agent #9 (Security), Agent #10 (QA) | Coordinator, Boss |
| `AGENTS.md`, `STATUS.md`, `dashboard/*`, `docs/handoff/*` | Agent #13 (`scf-doc-sync`, `start`/`end`) | All agents |

---

## 7. Spec Approval Gate, Tiers & Fail-Closed Security

- **Spec Gate (`Medium` & `Full`):** Part A (Boss Plain-English Summary + Google terms) + Part B (`Spec 0001` `Status: APPROVED`, `Spec 0002` Value Sourcing, Disjoint File Map).
- **Workflow Tiers:** `Vibe` (3 checks) | `Lean` (6 checks) | `Medium` (11 checks) | `Full` (15+ checks: Blind Review + 5-Stage `scf-sec-ops` + `block-float-money`).
- **Canonical Security:** `Argon2id` passwords only; integer paise/milligrams/`Decimal`/`BigInt` only; `httpOnly`/`secure`/`sameSite` cookies; 100% server-side price/GST/gold math; 100% Manual Boss `/scf-deploy`; 15+ fail-closed hooks.
- **Extensible Registry:** All 31 specialist repos live in `.factory/skills-registry.json` (`vendor/specialist-skills/`), validated with zero hardcoded model names (`check-portability.mjs`).
