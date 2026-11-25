# `software-company-factory` — Ultra-Detailed Master Architecture & Build Blueprint

**Version:** 1.1 (Model-Agnostic & Future-Proof Production Specification)
**Target Repository Name:** `software-company-factory`
**Primary Runtime:** Google Antigravity 2.0 (Windows 11 Desktop IDE + CLI)
**Cross-Platform Portability:** Claude Code (`@AGENTS.md`) & OpenAI Codex (`agents/openai.yaml`)
**Architecture Mode:** Automatic-First Multi-Agent Software Factory with Plain-English Spec Approval Gate, Model-Agnostic Slot Routing & Strict Department Isolation

---

## Chapter 1: Founder Profile, Communication Standard & Operating Philosophy

> **CRITICAL CONTEXT FOR GOOGLE ANTIGRAVITY 2.0:** Read this entire chapter before writing a single line of code or asking a single question. You do not have the prior chat history between the Founder and the System Architect. This chapter gives you the complete truth about who you are building for, how they communicate, and what standards are non-negotiable.

### 1.1 Who the Founder Is & The Long-Term Vision

* **Background:** The Founder is a **non-coder entrepreneur in India** who does not write code manually and does not have formal software engineering training.
* **Ultimate Business Vision:** Build a multi-department AI Company where each digital service operates as its own isolated, self-contained factory (starting with `software-company-factory`, and later expanding to separate departments such as Finance, Legal/Accounting, and Music).
* **Immediate Objective (This Repository):** We are **NOT** building a business app inside this repository. We are building the **Mother Factory (`software-company-factory`)** — a reusable, portable, bulletproof AI Software Engineering Operating System that will later build, test, secure, modernize, and ship any real software product.
* **Planned Future Target Projects (Built AFTER This Factory Passes Smoke Testing):**
  1. **Smoke Test (30-minute verification):** A tiny Gold Rate & GST Calculator mini-app to prove every hook, agent handover, Git commit, and start/end switch works live.
  2. **First Real Production Project:** Father's **Jewelry Business ERP Software** (inventory, gold weight/purity, making charges, GST billing, customer ledger) built module-by-module.
  3. **Future Stress Tests:** Banking-grade financial workflow test, client freelance apps, and legacy software reverse-engineering/modernization.

### 1.2 Mandatory Founder Communication Standard

Every agent that speaks to the Founder (especially the Boss Interface, Discovery Agent, Architect, and Release Gatekeeper) **MUST** follow these exact rules:

1. **Language & Tone:** Match the Founder's language seamlessly — clear, everyday **Hinglish** (Roman Hindi mixed with simple English) or **ultra-simple Indian English**. Never use dense academic English or unexplained engineering jargon.
2. **Zero Unexplained Jargon Rule:** Whenever a technical term MUST appear (e.g., `PostgreSQL`, `RLS`, `Argon2id`, `Idempotency Key`, `Prisma`), immediately include:
   * A **1-line plain-language meaning** ("ye kya karta hai"), and
   * The **exact Google-searchable keyword** so the Founder can verify it independently in 10 seconds.
3. **Triad Options Rule (`[BEST SUGGESTION]`):** Never ask open-ended technical questions like *"Which database do you want?"* Always present **3 concrete choices** (Simple / Balanced / Enterprise) with pros, cons, and a clear **`[BEST SUGGESTION]`** tag explaining *why*.
4. **"Grill Me" Edge-Case Protection:** Before locking any product spec, proactively ask 3 to 5 sharp, plain-language edge-case questions ("Agar customer aadha cash aur aadha UPI de toh?", "Agar internet chala jaye toh?") so hidden business rules are caught before coding starts.
5. **Zero People-Pleasing & Zero Hallucination:** Never claim a task is `"done"` without machine-verified runtime proof (`.factory/gates/*.gate.json`). Never invent numbers, mock data, or placeholder 5-line stub files. If something fails or is blocked, state the exact reason plainly.

---

## Chapter 2: Hardware Envelope, Antigravity 2.0 Execution Model & Model-Agnostic Slot Architecture

### 2.1 Founder's Exact Workstation Specs

| Hardware / Plan Component | Exact Specification | Engineering Constraint for Factory |
| :--- | :--- | :--- |
| **Operating System** | Windows (PowerShell primary shell) | **Zero POSIX/Linux-only shell glue.** All scripts must use cross-platform Node.js (`.mjs`), Python (`.py`), or PowerShell (`.ps1`). No `rm -rf`, no bash-only pipes. |
| **Processor** | Intel Core Ultra 255H (built-in GPU + 10–30 TOPS NPU) | Fast multi-core local builds, TypeScript compilation, and Git/AST operations. |
| **Memory (RAM)** | **16 GB RAM** | **Hard Concurrency Cap:** Max **3 concurrent active worker agents per wave** + max **4 always-on lightweight MCP servers**. Never run heavy Docker stacks + 10 MCPs simultaneously. |
| **Storage** | 1 TB+ SSD | Plenty of room for Git history, versioned snapshots, and multiple target app repos. |
| **Antigravity Plan** | Google AI Pro (Jio 18-month bundle; models evolve over time) | Cloud LLM inference only. **Zero hardcoded model lock-in** — models are hot-swappable via `.factory/models.json` and Founder UI selection. |

### 2.2 Cloud Brain vs. Local Hands Reality

* **Where the AI Thinks (Cloud):** All LLM reasoning runs remotely on cloud servers — consuming **0 GB** of local GPU VRAM. Offline local LLM execution (e.g., Gemma 4 26B via Antigravity SDK LiteRT) requires **24 GB+ RAM/VRAM** ([Remio AI Antigravity Local Models Analysis](https://www.remio.ai/post/google-antigravity-sdk-local-models-bring-agents-offline-but-hardware-sets-the-b)), so offline LLMs are explicitly **disabled** in this factory.
* **Where the Factory Executes (Local Windows PC):** Google Antigravity Desktop IDE, Agent Manager, local terminal, Git, local dev servers, database, browser tests, and MCP servers run locally ([Google Antigravity Getting Started](https://www.skills.google/focuses/163036?catalog_rank=%7B%22rank%22%3A517%2C%22num_filters%22%3A0%2C%22has_search%22%3Afalse%7D&parent=catalog&qlcampaign=5k-dodl-65)).
* **RAM Budget Discipline (Target ≤ 11.5 GB Peak on 16 GB Laptop):**
  * Windows OS + Browser: ~4.5 GB
  * Antigravity 2.0 Desktop IDE: ~1.5–2.0 GB
  * 4 Lightweight MCPs (`filesystem`, `github`, `sequential-thinking`, on-demand `playwright`/`postgres`): ~1.0 GB
  * Local App Dev Server + Test Runner (up to 3 parallel workers in a wave): ~2.5–3.5 GB
  * Heavy Security CLIs (`semgrep`, `trivy`, `gitleaks`): Run **sequentially on-demand** via hooks — NEVER as permanent background daemons.

### 2.3 100% Model-Agnostic Abstract Slot Architecture (Future-Proof Forever)

> **HARD ARCHITECTURAL RULE:** AI models launch, upgrade, and retire every few months (for example, Antigravity rolling out `Gemini 4 Hydrogen` while retiring older models on Nov 30, 2026 per [Kingy AI](https://kingy.ai/blog/gemini-4-carbon/)). Therefore, **NO skill, hook, or script in `software-company-factory` may EVER hardcode a specific model name.**

Instead, the entire factory uses **5 Abstract Role Slots** stored in ONE single editable registry file: **`.factory/models.json`**.

1. **Founder Always Has Final Control:** While building the factory or running any target app, the Founder can freely choose or switch the active model in Antigravity's model picker OR update `.factory/models.json` in 10 seconds — **zero code, skill, or script changes required**.
2. **Automatic Fallback Chains:** Every slot defines `[primary -> secondary -> fallback]`. If any model is deprecated, unavailable on the current plan, or hits quota, the factory automatically falls back to the next available model in that slot's chain.
3. **Instant Upgrade Ready:** Whenever stronger models unlock in the future (e.g., `Gemini 4 Neon`, `Gemini 4 Carbon`, `Claude 5.5+`, or any 2027+ frontier model), simply paste the new model ID into the target slot in `.factory/models.json` and the entire 18-skill factory upgrades instantly!

| Abstract Slot Name | Role in Factory | Editable Starter Preset (Nov 2026 — Swap Anytime) | Future Upgrade Target (Whenever Unlocked) |
| :--- | :--- | :--- | :--- |
| **`light_ops_slot`** | `STATUS.md` updates, Discovery, Docs, `Vibe` tweaks | `Gemini 4 Hydrogen (Medium)` → fallback `active_ui_model` | Any fast low-cost model |
| **`worker_slot`** | Everyday coding, UI/Backend Wave Workers, Tests | **`Gemini 4 Hydrogen (High)`** (default workhorse: 2.5x faster than 3.8 Flash, 57% Terminal-Bench 4.1, 1M context per [The New Stack](https://thenewstack.io/gemini-4-hydrogen-orchestrator/)) | `Gemini 4 Hydrogen (High)` / future fast coder |
| **`architect_slot`** | System Architecture, Stack Selection, Complex Specs | **`Gemini 4 Hydrogen (Extra High / xhigh)`** (score 54 on Intelligence Index per [Google Cloud Guide](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/guides/gemini-4-hydrogen)) → or Founder-selected `Claude Sonnet 4.6` while active | `Gemini 4 Carbon` / `Neon` / `Claude 5.5+` / any future frontier model |
| **`deep_logic_slot`** | Financial math, Auth/Security, Hard Debugging | **`Gemini 4 Hydrogen (Extra High / xhigh)`** → fallback `architect_slot` | Strongest available reasoning model |
| **`blind_reviewer_slot`** | Independent `Full`-tier Code Review & Spec Critic | **Different model family if available** (e.g., `Claude` if `Gemini` built it), **OR** a **fresh zero-history session** of `deep_logic_slot` (`xhigh`) when only one family is available | Any alternate frontier model family |

**Example `.factory/models.json` Schema (User-Editable Anytime):**

```json
{
  "schema_version": "1.0",
  "routing_mode": "FOUNDER_OVERRIDE_ALLOWED",
  "allow_founder_ui_model_selection": true,
  "slots": {
    "light_ops_slot": {
      "primary": { "model": "gemini-4-hydrogen", "effort": "medium" },
      "fallback": { "model": "active-antigravity-default", "effort": "high" }
    },
    "worker_slot": {
      "primary": { "model": "gemini-4-hydrogen", "effort": "high" },
      "fallback": { "model": "active-antigravity-default", "effort": "high" }
    },
    "architect_slot": {
      "primary": { "model": "gemini-4-hydrogen", "effort": "xhigh" },
      "secondary": { "model": "claude-sonnet-4.6", "effort": "high" },
      "fallback": { "model": "active-antigravity-default", "effort": "high" }
    },
    "deep_logic_slot": {
      "primary": { "model": "gemini-4-hydrogen", "effort": "xhigh" },
      "fallback": { "model": "active-antigravity-default", "effort": "xhigh" }
    },
    "blind_reviewer_slot": {
      "prefer_different_family": true,
      "primary": { "model": "claude-sonnet-4.6", "effort": "high" },
      "fallback": { "model": "gemini-4-hydrogen", "effort": "xhigh", "require_fresh_session": true }
    }
  }
}
```

---

## Chapter 3: Multi-Company Isolation & Activation Lifecycle

The Founder will eventually operate multiple independent AI companies (Software, Finance, Legal, Music) on the same workstation. **Zero cross-department rule leakage is mandatory.**

### 3.1 Two-Layer Isolation Standard

1. **Physical Workspace Isolation:** All skills live strictly inside `<repo-root>/.agents/skills/<skill-name>/SKILL.md` (official Antigravity workspace scope, replacing deprecated `.agents/workflows/` per [Google Antigravity Agent Skills Docs](https://antigravity.google/docs/skills/)). Do **NOT** install factory skills into global `~/.agents/skills/`.
2. **Logical Session Lock (`.factory/session.lock.json`):** Every factory command checks `.factory/session.lock.json` before mutating files:

```json
{
  "department": "software-company-factory",
  "version": "1.1.0",
  "status": "ACTIVE",
  "mode": "AUTOMATIC",
  "active_target_project": "jewelry-erp",
  "started_at": "2026-11-25T18:10:00+05:30",
  "ended_at": null,
  "last_commit_sha": "a1b2c3d",
  "active_wave": 0,
  "pending_human_gate": null
}
```

### 3.2 Start & End Commands (Automatic-First + Optional Manual Overrides)

* **Start Command:** `/software-company-factory-start` *(alias: `/scf-start`)*
  1. Verifies `.factory/session.lock.json` (if another department lock is active, refuses to mix and instructs user to end the other department first).
  2. Sets `status: "ACTIVE"` and `mode: "AUTOMATIC"`.
  3. Reads `STATUS.md`, `.factory/models.json`, and `docs/handoff/LATEST_SESSION.md` to restore complete project memory.
  4. Runs a 2-second environment sanity check (Git status clean? Hooks active?).
  5. Greets the Founder in simple Hinglish/English with a 3-line summary of current status and asks what to build or continue.
* **End Command:** `/software-company-factory-end` *(alias: `/scf-end`)*
  1. Verifies no uncommitted broken code is left behind; runs `scripts/git-checkpoint.mjs` to create a clean session-end commit.
  2. Updates `STATUS.md` and writes a fresh `docs/handoff/LATEST_SESSION.md` (exact next step, open tickets, last passing gate).
  3. Updates `.factory/session.lock.json` to `status: "ENDED"`.
  4. Confirms clean shutdown so the Founder can safely switch to another company/department with zero context bleed.
* **Default Automatic Mode vs. Manual Slash Overrides:**
  * In normal operation, the Founder only uses `/software-company-factory-start`, describes their goal in plain language, approves the Plain-English Spec when prompted, tests the finished app at the end, and runs `/software-company-factory-end`.
  * Because Antigravity natively exposes every `.agents/skills/<skill-name>/SKILL.md` as a `/<skill-name>` slash command ([Google Antigravity Agent Skills Docs](https://antigravity.google/docs/skills/)), power-user overrides (`/scf-discover`, `/scf-architect`, `/scf-sec-ops`, `/scf-debug`, `/scf-deploy`, etc.) remain available anytime without complicating the automatic flow.

---

## Chapter 4: Complete Multi-Agent Organization Chart & Dynamic Wave Spawning

### 4.1 Exact Total Agent Count: **12 Permanent Specialist Agents + Dynamic Worker Pool (Max 3 Active Workers per Wave)**

Every role has **one clear owner**, **strict file-write boundaries**, and **zero overlapping responsibilities**:

| # | Agent Role | Department | Primary Skills Owned | Exact Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Boss Interface & Discovery Lead** | Product & Client | `scf-discover`, `scf-research`, `scf-handbook` | Speaks to Founder in simple language; runs "Grill Me" edge-case discovery, confidence-tagged research, and creates the plain-English Application Handbook. |
| **2** | **Master Build Orchestrator** | Command & Dispatch | `scf-scope`, `scf-change-impact`, `software-company-factory-start/end` | **The Central Dispatcher.** Slices approved specs into isolated Task Packets, enforces file-lock ownership, dispatches Dynamic Sub-Agent Waves (max 3 concurrent), and routes Auto-Fix Bug Tickets. |
| **3** | **Chief Architect & Stack Selector** | Architecture | `scf-architect`, `scf-audit` | Picks the strongest future-proof tech stack per project (stack-agnostic factory); writes dual Plain-English + Technical Specs with Spec 0001 (`Assumed` Gate) and Spec 0002 (`Value Sourcing` Gate); triggers **Founder Spec Approval Gate**. |
| **4** | **Frontend Lead Orchestrator** | Engineering (UI) | `scf-develop` (UI track) + `ui-search-bridge.py` | Owns design system ([UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): 80 styles, 194 palettes, 74 font pairings), component contracts, and breaks large UI modules into small Task Packets for Dynamic Frontend Sub-Agents. |
| **5** | **Backend Lead Orchestrator** | Engineering (API/Logic) | `scf-develop` (Logical track) | Owns API contracts, auth middleware, business rules, and breaks large backend services into small isolated Task Packets for Dynamic Backend Sub-Agents. |
| **6** | **Database & Schema Builder** | Engineering (Data) | `scf-develop` (Data track) | Exclusively owns DB schema, migrations, foreign keys, indexes, integer-paise/milligram financial columns, and deterministic seed data. |
| **7** | **Dynamic Frontend Sub-Agent Pool** | Engineering (Scale) | Spawned by Master Orchestrator from Frontend Task Packets | Executes 1 small UI slice (e.g., 1–2 screens or 1 component group) in a **fresh, tiny context window (≤ 40 KB)** so context never overflows. |
| **8** | **Dynamic Backend Sub-Agent Pool** | Engineering (Scale) | Spawned by Master Orchestrator from Backend Task Packets | Executes 1 small API/service slice (e.g., 1 endpoint group or 1 calculation engine) in a **fresh, tiny context window (≤ 40 KB)**. |
| **9** | **GitHub, Version Control & Backup Agent** | Integrity & DevOps | `scripts/git-checkpoint.mjs`, `scripts/ast-collision-guard.mjs` | Runs `git init`, AST collision checks before merge, atomic `git commit` after every verified task/wave, rollback tags (`checkpoint-wave-N`), and safe GitHub push/backup. |
| **10** | **QA Verification & Testing Agent** | Quality Assurance | `scf-check` (`verify`), `scf-test` | Runs live app builds, API smoke tests, browser verification, and automated unit/integration/E2E suites. On any failure, files a structured **Bug Handover Ticket** to the exact owning builder. |
| **11** | **Cross-Model Reviewer & Debugger** | Quality Assurance | `scf-check` (`review`), `scf-debug` | Runs blind code review on `Full`-tier features via `blind_reviewer_slot`, and performs structured root-cause diagnosis on stubborn bugs via `deep_logic_slot`. |
| **12** | **Security, Compliance & Release Officer** | Security & Shipping | `scf-sec-ops`, `scf-doc-sync`, `scf-deploy`, `scf-legacy-re`, `scf-hardware-compliance` | Runs 5-stage security audit + financial invariants; keeps `STATUS.md` & `AGENTS.md` synced; guards **100% Manual Boss `/scf-deploy`**; activates `scf-legacy-re` or `scf-hardware-compliance` only when needed. |

### 4.2 Dynamic Sub-Agent Wave Spawning Protocol (Solving Context Overflow & 1-Level Nesting)

Why many multi-agent systems crash: either one giant agent tries to build 30 files and hallucinates when its context fills up, OR sub-agents try to spawn nested sub-agents (blocked by most agent runtimes) OR 10 agents run at once and crash a 16 GB laptop.

**Our Bulletproof Solution — Flat Wave Dispatching:**
1. When Frontend work has **> 3 screens/components** (or Backend has **> 3 service modules**), the **Frontend Lead** or **Backend Lead** does **NOT** try to nest-spawn agents directly. Instead, it writes a clean **`Task Packet Manifest`** (`.factory/waves/wave-plan.json`), breaking the work into atomic, non-overlapping file slices (each slice touches strictly disjoint file paths).
2. The **Master Build Orchestrator** reads `wave-plan.json` and dispatches **flat, fresh Sub-Agent Workers in Waves of MAX 3 concurrent agents**:
   * **Wave 1 (Foundation):** Database Builder (schema + migrations) + Frontend Lead (Design System tokens + layout shell) + Backend Lead (core server + auth skeleton) → `ast-collision-guard.mjs` → `git-checkpoint.mjs` (`git commit`).
   * **Wave 2 (Parallel Build Slice A — Max 3 Workers):** e.g., `Frontend-Worker-1` (Inventory UI) + `Frontend-Worker-2` (Billing UI) + `Backend-Worker-1` (Inventory API). Each worker receives ONLY its 1 Task Packet + exact Spec slice (≤ 40 KB total context!). → Collision check → `git commit`.
   * **Wave 3 (Parallel Build Slice B — Max 3 Workers):** e.g., `Backend-Worker-2` (GST & Gold Rate Engine) + `Frontend-Worker-3` (Customer Ledger UI) + `QA-Test-Writer` (unit tests for Wave 2). → Collision check → `git commit`.
3. **Result:** Even a 100-file ERP module executes fast, **no worker ever fills its context window**, **no two workers ever edit the same file simultaneously**, and **16 GB RAM stays cool and responsive**.

### 4.3 Automatic Inter-Agent Bug Handover & Self-Healing Loop

When the **QA Agent (`scf-check` / `scf-test`)** or **Security Officer (`scf-sec-ops`)** detects any failure, it NEVER tries to randomly hack someone else's code. Instead:

1. **Ticket Creation:** Writes `.factory/tickets/BUG-<NNN>.json`:
   ```json
   {
     "ticket_id": "BUG-004",
     "severity": "BLOCKER",
     "owner_agent": "backend",
     "exact_file": "src/services/billing/gstCalculator.ts",
     "exact_line": 42,
     "failing_command": "npm test -- gstCalculator.test.ts",
     "expected": "3% GST on 100000 paise = 3000 paise (exact integer)",
     "actual": "Returned 3000.0000000000005 (float detected by block-float-money)",
     "attempt_count": 1,
     "max_attempts": 3,
     "status": "OPEN"
   }
   ```
2. **Automatic Routing:** Master Build Orchestrator routes `BUG-004` directly to the exact `owner_agent` (`frontend`, `backend`, or `database`).
3. **Targeted Repair:** That owner opens ONLY the affected file(s), fixes the root cause, and runs the exact `failing_command`.
4. **Re-Verification & Commit:** QA Agent re-runs verification; if green, marks `status: "RESOLVED"` and GitHub/Backup Agent runs `git commit -m "fix(billing): resolve BUG-004 integer GST math"`.
5. **Anti-Loop Circuit Breaker (`max_attempts: 3`):** If the same bug fails 3 times, the loop **halts automatically**, invokes the **Cross-Model Debugger** (`deep_logic_slot`) once for root-cause analysis, and if still unresolved, escalates cleanly to the Founder in plain Hinglish/English with 3 Triad Options. Zero infinite loops, zero wasted quota.

---

## Chapter 5: The Plain-English Spec Approval Gate (Non-Coder Standard)

Before any `Medium` or `Full` tier feature enters Wave Coding, **Chief Architect (`scf-architect`)** MUST generate `docs/specs/SPEC-<NNN>-<slug>.md` with **two mandatory halves**, and pause for Founder approval:

### Part A: Boss Plain-English Summary (Always Shown First in Chat)

* **1. Hum Kya Bana Rahe Hain (What):** 2–3 simple sentences explaining the feature like a shop/business workflow.
* **2. Hum Ye Tech / Design Kyun Chun Rahe Hain (Why):** Plain reason + **Google-Searchable Terms** (e.g., *"PostgreSQL database — Google search: 'PostgreSQL ACID transactions for accounting'"*).
* **3. Har Number / Data Kahan Se Aayega (Value Sourcing Summary — Spec 0002):** Simple table showing every screen field and its exact source (e.g., *"Gold Rate -> Live admin input stored in `gold_rates` table, never hardcoded"*).
* **4. Risk Level & Security Checks:** `Vibe` / `Lean` / `Medium` / `Full` tier badge + exact number of automated checks that will run.
* **5. Clear Decision Prompt:** `Reply "APPROVE" to start automatic build, or tell me what to change.`

### Part B: Machine Engineering Contract (Read by Builders & Gatekeeper)

* **Spec 0001 (`Assumed` Spec Gate):** Status must be `APPROVED` (not `ASSUMED` or `DRAFT`) before `gate-check.mjs` will ever allow a feature to transition to `DONE`.
* **Spec 0002 (Full Value Sourcing Matrix):** Exact DB table/column, API endpoint, and validation schema for every produced/displayed value.
* **Exact File Ownership Map:** Lists exact file paths assigned to `database`, `backend`, and `frontend` so parallel builders never collide.
* **Acceptance Criteria & Verification Commands:** Exact shell commands that prove the feature works live.

---

## Chapter 6: Complete Repository Tree & Single-File Ownership

### 6.1 Mother Factory Repo (`software-company-factory`)

```text
software-company-factory/
├── AGENTS.md                        # Master Constitution (<= 12 KB, single source of truth)
├── CLAUDE.md                        # Thin pointer: "@AGENTS.md"
├── STATUS.md                        # Boss 10-second dashboard (always plain language)
├── README.md                        # Beginner-friendly quickstart guide
├── .gitignore                       # Strict secret/env/build artifact exclusions
├── .factory/
│   ├── session.lock.json            # ACTIVE / ENDED department lock
│   ├── models.json                  # Model-Agnostic Abstract Slot Registry (hot-swappable anytime)
│   ├── config.json                  # RAM cap (max 3 workers), tier thresholds, wave settings
│   ├── gates/                       # Deterministic pass/fail proofs (*.gate.json)
│   ├── tickets/                     # Auto-Fix Bug Handover Tickets (BUG-*.json)
│   └── waves/                       # Task Packet Manifests (wave-plan.json)
├── .agents/
│   ├── hooks.json                   # 15 Automated Fail-Closed Guardrail Hooks
│   └── skills/                      # 18 Canonical Skills (Antigravity native discovery)
│       ├── software-company-factory-start/
│       ├── software-company-factory-end/
│       ├── scf-discover/
│       ├── scf-research/
│       ├── scf-handbook/
│       ├── scf-change-impact/
│       ├── scf-scope/
│       ├── scf-audit/
│       ├── scf-architect/
│       ├── scf-develop/
│       ├── scf-check/
│       ├── scf-test/
│       ├── scf-debug/
│       ├── scf-sec-ops/
│       ├── scf-doc-sync/
│       ├── scf-deploy/
│       ├── scf-legacy-re/
│       └── scf-hardware-compliance/
├── docs/
│   ├── product/                     # Discovery notes, Research briefs, Application Handbook
│   ├── scope/                       # Roadmap & sliced feature queue
│   ├── specs/                       # Approved Plain-English + Technical Specs
│   └── handoff/                     # LATEST_SESSION.md & ADRs
├── scripts/                         # 9 Real Executable Scripts (Windows + Cross-Platform)
│   ├── bootstrap-env.ps1
│   ├── check-portability.mjs
│   ├── gate-check.mjs
│   ├── git-checkpoint.mjs
│   ├── ast-collision-guard.mjs
│   ├── hook-runner.mjs
│   ├── analyze-token-usage.mjs
│   ├── init-target-project.mjs
│   └── ui-search-bridge.py
└── mcp/
    └── mcp_config.template.json     # Lean 4-MCP template for ~/.gemini/config/mcp_config
```

### 6.2 Strict Single-File Ownership Matrix (Zero Edit Wars)

| File / Directory | Sole Authorized Writer | Read-Only Consumers |
| :--- | :--- | :--- |
| `docs/product/*` | Boss Interface & Discovery Lead (`scf-discover`, `scf-research`, `scf-handbook`) | All agents |
| `docs/scope/*` | Master Build Orchestrator (`scf-scope`) | All agents |
| `docs/specs/*` (Content) | Chief Architect (`scf-architect`) | Builders, QA, Security (Builders may ONLY update the 1-line `Status:` header) |
| `src/db/*`, `prisma/*`, `migrations/*` | Database & Schema Builder | Backend, QA |
| `src/server/*`, `src/api/*`, `src/services/*` | Backend Lead & Backend Sub-Agents | Frontend, QA, Security |
| `src/web/*`, `src/app/*`, `src/components/*` | Frontend Lead & Frontend Sub-Agents | QA, Security |
| `tests/*` | QA Verification & Testing Agent (`scf-test`) | All builders (for running tests) |
| `.factory/gates/*` | `scripts/gate-check.mjs` (triggered by QA & Security) | Master Orchestrator, Boss |
| `.factory/models.json` | Founder (or updated on Founder command) | All agents (read-only) |
| `AGENTS.md`, `STATUS.md`, `docs/handoff/*` | `scf-doc-sync` & `start`/`end` lifecycle skills | All agents |

---

## Chapter 7: All 18 Canonical Skills — Exact Depth, Structure & Byte Budgets

Adapted from the proven Modular Progressive Disclosure standard ([JavaScript-Mastery-Pro/skills](https://github.com/jsmastery-pro/skills/blob/main/package.json), [Google Antigravity Agent Skills Docs](https://antigravity.google/docs/skills/)):

### 7.1 Mechanical Anti-Stub, Anti-Bloat & Model-Agnostic Rules (Enforced by `check-portability.mjs`)

* **Every Skill Folder MUST Contain:**
  1. `SKILL.md` — **Minimum ≥ 4 KB** (mechanically rejects lazy 5-line stubs!), **Target 8–26 KB**, **Hard Cap ≤ 32 KB**, with valid YAML frontmatter (`name`, `description ≤ 400 chars` written in clear third-person trigger keywords).
  2. `agents/openai.yaml` — 0.5–1.5 KB Codex/cross-IDE adapter.
  3. Modular sub-files (`modes/*.md`, `templates/*.md`, `references/*.md`) — **Hard Cap ≤ 24 KB per file** so context loads on-demand.
* **Hot-Path Context Budget:** Total bytes loaded along any single active workflow path **MUST be ≤ 90 KB**.
* **ZERO Hardcoded Model Names (Strictly Enforced):** `check-portability.mjs` FAILS if any `SKILL.md` or sub-file hardcodes a vendor model name (like `gemini-3.8`, `claude-sonnet`, `gpt-oss`, etc.). Every skill MUST reference ONLY abstract slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`) resolved dynamically from `.factory/models.json` or the Founder's active UI selection.

### 7.2 Complete 18-Skill Specification Table

| # | Skill Folder | Target `SKILL.md` | Required Sub-Files (`modes/`, `templates/`, `references/`) | Core Contract |
| :--- | :--- | :--- | :--- | :--- |
| **1** | `software-company-factory-start` | 6–8 KB | `templates/session-boot.md` | Verifies isolation lock, loads `STATUS.md` + `.factory/models.json` + `LATEST_SESSION.md`, enables Automatic Mode |
| **2** | `software-company-factory-end` | 6–8 KB | `templates/session-handoff.md` | Runs final `git-checkpoint.mjs`, updates `STATUS.md` + `LATEST_SESSION.md`, sets lock `ENDED` |
| **3** | `scf-discover` | 8–12 KB | `templates/discovery-brief.md`, `references/grill-me-questions.md` | Non-coder idea interview, Triad Options `[BEST SUGGESTION]`, edge-case stress testing |
| **4** | `scf-research` | 8–12 KB | `modes/quick.md`, `modes/deep.md`, `templates/research-brief.md` | 3-level market/tech/compliance research with `confirmed / likely / possible / uncertain` tags |
| **5** | `scf-handbook` | 8–12 KB | `templates/application-handbook.md` | Business model, user journeys, role matrix, visual connection map in plain language |
| **6** | `scf-change-impact` | 8–10 KB | `templates/impact-report.md` | 7-step ripple-effect analyzer before mid-project requirement changes |
| **7** | `scf-scope` | 10–14 KB | `modes/tracer-bullet.md`, `modes/skateboard.md`, `modes/facade.md`, `modes/journey.md` | Slices roadmap into features, assigns Workflow Tier (`Vibe`/`Lean`/`Medium`/`Full`), owns `docs/scope/` |
| **8** | `scf-audit` | 10–14 KB | `references/clean-arch.md`, `references/ddd.md`, `references/functional.md`, `references/solid-oop.md` | Audits existing/target codebase structure and selects architecture pattern |
| **9** | `scf-architect` | 20–28 KB | `modes/new-feature.md`, `modes/stack-selection.md`, `templates/plain-english-spec.md`, `references/value-sourcing.md` | Strongest-stack selector + Spec 0001 (`Assumed` Gate) + Spec 0002 (`Value Sourcing`) + **Boss Approval Gate** |
| **10** | `scf-develop` | 14–20 KB | `modes/frontend-lead.md`, `modes/backend-lead.md`, `modes/database-builder.md`, `modes/wave-worker.md`, `references/ui-ux-pro-max.md` | Orchestrates UI Track ([UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)), Backend Track, DB Track, and Wave Task Packets |
| **11** | `scf-check` | 14–18 KB | `modes/verify.md`, `modes/review.md`, `templates/bug-ticket.json` | Live runtime evidence gate (`verify`) + Fresh cross-model/fresh-session blind review (`review`) + Bug Ticket emitter |
| **12** | `scf-test` | 12–16 KB | `references/test-writing-guide.md`, `templates/test-plan.md` | Unit, integration, E2E, financial edge-case test suites |
| **13** | `scf-debug` | 8–12 KB | `templates/root-cause-report.md` | Hypothesis-driven root-cause debugging + 3-attempt circuit-breaker escalation |
| **14** | `scf-sec-ops` | 16–22 KB | `references/stage-1-secrets.md`, `references/stage-2-pii.md`, `references/stage-3-prod.md`, `references/stage-4-deep-logic.md`, `references/stage-5-attacker.md` | Full 5-stage security audit (Gitleaks, Bearer, [ECC](https://github.com/affaan-m/ecc), [Trail of Bits](https://github.com/trailofbits/skills), Attacker Review) + Financial Invariants |
| **15** | `scf-doc-sync` | 8–12 KB | `templates/status-dashboard.md`, `templates/adr.md` | Updates `STATUS.md`, `AGENTS.md`, `README.md`, and API/user guides |
| **16** | `scf-deploy` | 8–12 KB | `templates/pre-deploy-checklist.md` | **100% Manual Boss-Only Gate.** Verifies all `.gate.json` green + Boss confirmation before production release |
| **17** | `scf-legacy-re` | 8–12 KB | `modes/rea-analysis.md`, `modes/craft-modernize.md` | Optional plug-in for reverse-engineering/modernizing existing apps via [morluto/rea](https://github.com/morluto/rea) & [storytold/craft-anything](https://github.com/storytold/craft-anything) |
| **18** | `scf-hardware-compliance` | 6–10 KB | `references/iot-safety-checklist.md` | **Dormant zero-overhead plug-in.** Activates ONLY when a project involves hardware/IoT/firmware/embedded devices |

---

## Chapter 8: Automatic Complexity Scaling (Workflow Tier Dial)

| Workflow Tier | Auto-Trigger Examples | Check Count | Mandatory Pipeline | Abstract Model Slot Routing (Resolved via `.factory/models.json`) |
| :--- | :--- | :--- | :--- | :--- |
| **Vibe** | Copy edit, color tweak, tiny UI polish | **3 checks** | Lint + Typecheck + Self-check + `git commit` | `light_ops_slot` |
| **Lean** | Simple CRUD form, static page, helper utility | **6 checks** | Vibe + `/scf-check verify` (live runtime proof) + `.gate.json` | `worker_slot` |
| **Medium** | Standard ERP module (Inventory, Customer CRM, Reports) | **11 checks** | Lean + **Boss Plain-English Spec Approval** + `/scf-test` suite + `scf-sec-ops` Stages 1–3 + AST Collision Check | `architect_slot` (Spec) + `worker_slot` (Wave Workers) |
| **Full** | High-risk / money / auth (Gold Weight & GST Billing, Payments, Banking, Auth/RBAC) | **15+ checks** | Medium + **Blind `/scf-check review`** + Full 5-Stage `scf-sec-ops` (Stages 1–5) + `block-float-money` + `/scf-doc-sync` + Boss UAT | `architect_slot` + `deep_logic_slot` (Core) + `blind_reviewer_slot` (Review) |

---

## Chapter 9: 15 Fail-Closed Lifecycle Hooks & 5-Stage Security Engine

### 9.1 All 15 Automated Guardrail Hooks (`.agents/hooks.json`)

Every hook is **FAIL-CLOSED** (non-zero exit blocks execution — zero silent `warn` downgrades):

1. `session-lock-check` — Blocks file mutations if `.factory/session.lock.json` is not `ACTIVE` for `software-company-factory`.
2. `block-eval-usage` — Rejects `eval()`, `new Function()`, and unsafe dynamic code execution.
3. `block-float-money` — Rejects JS `Number`/float arithmetic on currency, GST, gold weight, or ledger fields (mandates integer paise/milligrams or `Decimal`/BigInt).
4. `block-env-staging` — Hard-blocks staging `.env`, `.env.local`, private keys, or credentials into Git.
5. `block-hardcoded-secrets` — Runs Gitleaks / regex secret scan on every staged diff (`NEXT_PUBLIC_` / `REACT_APP_` key exposure check).
6. `block-assumed-spec-done` — Enforces Spec 0001: blocks marking any feature `DONE` if its spec is still `ASSUMED` or unapproved.
7. `block-unsourced-values` — Enforces Spec 0002: rejects specs missing Value Sourcing entries for UI/API fields.
8. `pre-commit-portability` — Runs `scripts/check-portability.mjs` whenever `.agents/skills/` is edited (including zero hardcoded model names!).
9. `pre-commit-ast-collision` — Runs `scripts/ast-collision-guard.mjs` before merging any parallel wave.
10. `pre-commit-lint-typecheck` — Runs project linter + strict TypeScript/schema typecheck.
11. `pre-commit-unit-tests` — Runs affected unit tests before atomic commit.
12. `post-wave-git-checkpoint` — Runs `scripts/git-checkpoint.mjs` to create verified atomic commit + rollback tag.
13. `pre-release-security-gate` — Runs 5-stage `scf-sec-ops` (`semgrep`, `trivy`, `gitleaks`, PII check, logic audit).
14. `pre-deploy-gate-verify` — Runs `scripts/gate-check.mjs` verifying all `.factory/gates/*.gate.json` are `PASS`.
15. `block-unapproved-deploy` — Hard-blocks any automated production deploy without explicit manual Boss `/scf-deploy` approval.

### 9.2 5-Stage Security Engine (`scf-sec-ops`)

1. **Stage 1 — Secret Leak Prevention (Gitleaks standard):** Env vars, `.gitignore`/`.env.example`, client-bundle secret exposure (`NEXT_PUBLIC_`), Supabase/DB RLS + `service_role` protection, Git history rotation alert.
2. **Stage 2 — Personal Data (PII) Flow Audit (Bearer standard):** Complete PII map, log redaction, third-party SDK audit, **Argon2id** password hashing (single canonical standard — no `bcrypt` contradiction), `httpOnly`/`secure`/`sameSite` cookies (zero PII/tokens in `localStorage`), API response field allow-listing, account deletion flow.
3. **Stage 3 — Production Hardening ([affaan-m/ECC](https://github.com/affaan-m/ecc) standard):** Fail-fast env validation on startup, remove debug/backdoor routes, generic client errors + correlation IDs, security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, HSTS, CSP/helmet), rate limiting (5/min login, 3/hr password reset), strict CORS allow-list, DB TLS/SSL.
4. **Stage 4 — Deep Business Logic Audit ([Trail of Bits Skills](https://github.com/trailofbits/skills) standard):** IDOR ownership checks on every record read/write, single-use 15-min reset tokens, JWT expiry + revocation, **100% server-side price/GST/gold-rate/discount calculation**, payment webhook signature verification (Razorpay/Stripe), parameterized SQL, XSS sanitization, strict file upload validation.
5. **Stage 5 — Attacker's Perspective Review ([affaan-m/ECC](https://github.com/affaan-m/ecc) `security-review`):** ID manipulation, auth bypass, privilege escalation, negative-quantity/negative-payment attacks, infinite discount stacking, self-referral abuse, internal path exposure (`.env`, `.git`, Swagger).

---

## Chapter 10: 9 Executable Zero-Dependency Scripts & Lean MCP Config

### 10.1 All 9 Scripts in `scripts/` (Windows PowerShell + Node.js ESM)

| Script | Language | Purpose & Fail-Closed Exit Behavior |
| :--- | :--- | :--- |
| `bootstrap-env.ps1` | PowerShell | Verifies Git, Node.js, Python, and security CLIs (`gitleaks`, `semgrep`, `trivy`) on Windows; prints exact `winget`/`pip` install commands for any missing tool and exits non-zero if critical tools are absent. |
| `check-portability.mjs` | Node.js | Validates all 18 skills: `SKILL.md` (4 KB–32 KB), sub-files (≤ 24 KB), `description` ≤ 400 chars, hot-path ≤ 90 KB, `agents/openai.yaml` present, **ZERO hardcoded vendor model names inside skills**, zero Linux-only shell glue. |
| `gate-check.mjs` | Node.js | Evaluates `.factory/gates/<feature>.gate.json` against required tier checks (`Vibe`/`Lean`/`Medium`/`Full`). Exits non-zero if any required gate is missing or `FAIL`. |
| `git-checkpoint.mjs` | Node.js | Guarantees `git init` exists, verifies clean working tree rules, runs atomic `git commit`, tags `checkpoint-wave-<N>`, and supports 1-command safe rollback. |
| `ast-collision-guard.mjs` | Node.js | Checks file-lock manifests and AST/symbol diffs across parallel wave workers before merge; blocks overwrite collisions. |
| `hook-runner.mjs` | Node.js | Central runner for `.agents/hooks.json` (executes `block-float-money`, `block-eval-usage`, secret scan, etc. cross-platform on Windows). |
| `analyze-token-usage.mjs` | Node.js | Reads Antigravity session logs/manifests to report model quota burn across main thread vs. wave sub-agents. |
| `init-target-project.mjs` | Node.js | Scaffolds a brand-new clean target project repository (e.g., `jewelry-erp/`) with industry-standard `docs/`, `src/`, `tests/`, `STATUS.md`, linked cleanly to `software-company-factory`. |
| `ui-search-bridge.py` | Python | Local zero-internet search bridge for [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) style/palette/font pairing lookups during Frontend Lead planning. |

### 10.2 Lean 4-MCP Config (`mcp/mcp_config.template.json` → `~/.gemini/config/mcp_config`)

Per [Fastero Antigravity Guide](https://fastero.com/blog/google-antigravity), keep only **4 lightweight MCPs** configured by default to protect 16 GB RAM:
1. `filesystem` (scoped strictly to workspace directory)
2. `github` (for automated repo creation, commits, PRs, and cloud backups)
3. `sequential-thinking` (for deep architectural and debugging reasoning)
4. `playwright` *(or `postgres`)* — enabled **on-demand** only during live browser verification or DB schema inspection.

---

## Chapter 11: 4-Batch Antigravity Build Roadmap

Antigravity **MUST NEVER** attempt to generate all 18 skills + 9 scripts in a single turn (which causes truncation and lazy stubs). Build strictly in **4 verified batches**:

* **Batch 1 — Core Foundation, Model Registry, Hooks & Scripts:** Create `AGENTS.md`, `CLAUDE.md`, `STATUS.md`, `README.md`, `.gitignore`, `.factory/models.json`, `.factory/config.json`, `.factory/session.lock.json`, `.agents/hooks.json`, `mcp/mcp_config.template.json`, and all 9 `scripts/`. Run `powershell -File scripts/bootstrap-env.ps1` + `node scripts/git-checkpoint.mjs init "Batch 1: Factory foundation, model registry, hooks, and scripts"`.
* **Batch 2 — Lifecycle & Phase 0 Product Planning Skills:** Create full-depth skill folders (`SKILL.md` ≥ 4 KB + sub-files + `agents/openai.yaml`, using abstract model slots ONLY) for `software-company-factory-start`, `software-company-factory-end`, `scf-discover`, `scf-research`, `scf-handbook`, `scf-change-impact`. Run `node scripts/check-portability.mjs` (must exit 0) → `node scripts/git-checkpoint.mjs commit "Batch 2: Lifecycle and Phase 0 planning skills"`.
* **Batch 3 — Phase 1–3 Engineering, Wave Orchestration & QA Skills:** Create full-depth skill folders for `scf-scope`, `scf-audit`, `scf-architect`, `scf-develop`, `scf-check`, `scf-test`, `scf-debug`. Run `node scripts/check-portability.mjs` (must exit 0) → `node scripts/git-checkpoint.mjs commit "Batch 3: Engineering core, wave builders, and QA skills"`.
* **Batch 4 — Phase 4 Security, Release & Plug-in Skills:** Create full-depth skill folders for `scf-sec-ops`, `scf-doc-sync`, `scf-deploy`, `scf-legacy-re`, `scf-hardware-compliance`. Run full `node scripts/check-portability.mjs` + `node scripts/hook-runner.mjs --self-test` → `node scripts/git-checkpoint.mjs commit "Batch 4: Security, release gate, and optional plug-in skills"`.

---

## Chapter 12: Mandatory 30-Minute Smoke Test (Before Father's Jewelry ERP)

Before building any real business software, run this exact live test to prove the factory works end-to-end:

1. Open Antigravity inside `software-company-factory` and run `/software-company-factory-start`.
2. Give a 1-sentence test prompt: *"Create a tiny target project `smoke-gold-calc` — a Gold Rate & 3% GST Calculator with live history."*
3. Verify **Plain-English Spec Approval Gate** pauses and explains the spec clearly in simple Hinglish/English → Reply `APPROVE`.
4. Verify **Wave Build** spawns clean Frontend/Backend/DB slices + runs `git-checkpoint.mjs`.
5. **Intentional Trap Test:** Ask an agent to use JavaScript `float` for GST calculation → confirm `block-float-money` hook **blocks** it loudly and QA files a `BUG-001` ticket routed back to Backend!
6. Run `/software-company-factory-end` → verify `STATUS.md`, `LATEST_SESSION.md`, clean Git commit, and `.factory/session.lock.json` status `ENDED`.
7. Once all 6 checks pass, `software-company-factory` is certified **Production-Ready** for Father's Jewelry Business ERP.
