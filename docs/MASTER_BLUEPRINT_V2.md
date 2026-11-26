# `software-company-factory` v2.0 — Enterprise Specialist-Grade Master Architecture & Upgrade Blueprint

**Version:** 2.0.0 (Specialist-Vendored, `/swarm`-Integrated, Plug-and-Play Architecture)
**Target Repository:** `https://github.com/aipro831gith/software-company-factory` (Private)
**Target Local Path (Post-Migration):** `C:\dev\software-company-factory` *(migrated safely out of OneDrive)*
**Primary Runtime:** Google Antigravity 2.0 (Windows 11, App v2.35+ / CLI, Native `/swarm` + `/run-workflow` + Free-Plan Fallbacks)
**Cross-Platform Portability:** Claude Code (`@AGENTS.md`) & OpenAI Codex (`agents/openai.yaml`)

---

## Chapter 1: Version 1.1 → Version 2.0 Complete Upgrade Changelog

> **CRITICAL CONTEXT FOR GOOGLE ANTIGRAVITY 2.0:** You are upgrading an already-working **v1.1** `software-company-factory` repository (`18/18` skills, `14/14` passing fail-closed hooks, model-agnostic `.factory/models.json`, private GitHub remote already configured) into **v2.0 Enterprise Specialist-Grade**. Preserve all passing v1.1 guardrails while executing every upgrade below.

| Capability Area | What Was in Version 1.1 | What Forensic Audit Exposed | Exact Upgrade in Version 2.0 |
| :--- | :--- | :--- | :--- |
| **Local Workspace Path** | `OneDrive\Desktop\Software company factory` | OneDrive sync locks `.git` and slows heavy multi-file builds/vendoring | **Batch 0 Safe Migration** to `C:\dev\software-company-factory` (preserving full Git history, tags, and `origin` remote) |
| **Agent Architecture** | 12 permanent agents (Cybersecurity, Docs, Release, Legacy RE & Hardware all combined in Agent #12) | Overloaded generalist roles; no dedicated full-time Cybersecurity or separate Hardware vs. Legacy RE specialists | **15 Dedicated Permanent Specialist Agents** (Agent #9 = Dedicated Cybersecurity; Agent #14 = Legacy Reverse-Engineering; Agent #15 = Hardware & IoT) |
| **Specialist Depth** | AI-written ~1 KB mode/reference files (`rea-analysis.md` 956 B, `ui-ux-pro-max.md` 976 B) | Generic checklists lacked real specialist engineering depth | **31 Verified Real Open-Source Specialist Repos** pre-bundled via `vendor/specialist-skills/` (18 Bucket A Core + 13 Bucket B On-Demand Plug-ins) + `THIRD_PARTY_LICENSES.md` |
| **Multi-Agent Execution** | Manual wave-plan JSON only (max 3 workers) | Missed native Nov 2026 Antigravity `/swarm` live board & `/run-workflow` | **Hybrid Salesman + Native `/swarm` Board (`3–5` concurrent workers on 16 GB RAM)** + **Pre-built Free-Plan Fallback Protocols** for `/swarm`, `/run-workflow`, `/grill-me`, `/teamwork` |
| **Domain Ownership** | General ownership table | Small edits risked being edited by a single agent without notifying owning team | **Hard Domain-Routing Rule:** Even tiny frontend/backend/DB edits MUST route through the owning domain skill + log to `.factory/board/messages.jsonl` |
| **Extensibility** | Static 18-skill list | Adding new languages, DBs, skills, or MCPs required manual doc edits | **Plug-and-Play Modular Registry (`.factory/skills-registry.json`)** — add any new skill/language/MCP to any specialist agent in 60 seconds |
| **Boss Visibility** | Text `STATUS.md` only | Non-coder Founder wanted live visual progress, per-agent %, avg time & real gate proof | **₹0-Cost Local Boss Mission Control Dashboard (`dashboard/` on `http://localhost:4173`)** reading real JSON gates, timestamps, and board logs |

---

## Chapter 2: Founder Profile, Communication Standard & Zero-Caveman Boss Rule

1. **Founder Profile:** Non-coder entrepreneur in India building a multi-department AI Company (first department = `software-company-factory`; first real production project after smoke test = Father's **Jewelry Business ERP**, followed later by Banking stress-tests and separate Finance/Legal/Music departments).
2. **Boss Communication Standard (Non-Negotiable):**
   * Speak in simple, warm **Hinglish** or **ultra-simple Indian English**.
   * Every technical term gets a **1-line plain-language meaning** + **Google-searchable keyword**.
   * Every choice uses **Triad Options** (`Option 1 / Option 2 / Option 3`) with **`[BEST SUGGESTION]`** clearly tagged.
   * **CRITICAL `caveman` SCOPING RULE:** `JuliusBrussee/caveman` cuts output tokens by ~65–75% — it is enabled **STRICTLY for internal agent-to-agent handoffs, Swarm board logs, and sub-agent execution notes**. It is **HARD-BANNED** when speaking to the Founder (Boss Interface, Discovery, Plain-English Spec Approval, and `STATUS.md` MUST always remain clear, polite, full-sentence plain language).

---

## Chapter 3: Workstation Envelope, Safe OneDrive Migration & Model-Agnostic Slots

### 3.1 Hardware & Concurrency Envelope (Windows 11, Intel Core Ultra 255H, 16 GB RAM, 1 TB+ SSD)

* **Cloud Brain / Local Hands:** All LLM inference runs in the cloud via Google Antigravity (offline 24 GB+ local LLMs remain disabled).
* **Concurrency Cap (Updated for v2.0):** Default **3 concurrent workers**, burst cap **max 5 concurrent workers** on 16 GB RAM.
* **MCP Cap:** Max **4 always-on lightweight MCPs** (`filesystem`, `github/github-mcp-server`, `upstash/context7`, `sequential-thinking`). Heavy/niche MCPs (`playwright`, `magicuidesign/mcp`, `postgres`) load **on-demand only**.
* **Standalone Heavy Tools Warning:** `usestrix/strix` (Docker/staging pentester) MUST NEVER run concurrently with Antigravity IDE + multi-agent builds on 16 GB RAM — run strictly standalone when IDE builds are paused.
* **Windows PowerShell Safety:** Zero POSIX-only shell glue (`rm -rf`, bash pipes). All scripts use `.ps1`, `.mjs`, or `.py`.

### 3.2 Safe Migration Protocol (Batch 0: OneDrive → `C:\dev\software-company-factory`)

1. Verify current Git working tree is clean and pushed to `origin/main` (`https://github.com/aipro831gith/software-company-factory`).
2. Create `C:\dev\` and cleanly copy/clone the full repository (including `.git`, all branches, and tags `checkpoint-init` through `checkpoint-wave-4`) to `C:\dev\software-company-factory`.
3. Verify `git status`, `git log --oneline -5`, `git tag`, `node scripts/check-portability.mjs`, and `node scripts/hook-runner.mjs --self-test` all exit `0` inside `C:\dev\software-company-factory`.
4. Instruct the Founder to open `C:\dev\software-company-factory` in Antigravity IDE before starting Batch 1 (old OneDrive folder remains untouched as a read-only backup until Founder deletes it manually).

### 3.3 Model-Agnostic Abstract Slot Architecture (`.factory/models.json`)

* **ZERO hardcoded model names inside any skill, hook, or script** (mechanically enforced by `check-portability.mjs`).
* All 5 abstract slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`) resolve dynamically from `.factory/models.json` with `allow_founder_ui_model_selection: true` and `[primary -> secondary -> fallback]` chains.

---

## Chapter 4: 15 Dedicated Specialist Agents + Hybrid `/swarm` & Free-Plan-Proof Engine

### 4.1 Complete 15-Agent Organization Chart

| Dept | # | Dedicated Specialist Agent | Core Pre-Bundled Skills & Tools Assigned | Strict File / Domain Ownership |
| :--- | :--- | :--- | :--- | :--- |
| **Front Desk** | **1** | **Salesman & Client Discovery Lead** | `scf-discover`, `scf-grill-me` (pre-built), `scf-handbook`, optional `garrytan/gstack`, `blader/humanizer` | Simple Hinglish/English Boss chat, `docs/product/` |
| **Front Desk** | **2** | **Market & Tech Researcher** | `scf-research`, `upstash/context7` (live version-accurate docs), optional `AndyShaman/premortem` | `docs/product/RESEARCH-*.md` |
| **Command** | **3** | **Master Coordinator & Swarm Lead** | `scf-scope`, `scf-swarm-dispatch`, `scf-workflow-runner` (pre-built `/run-workflow` + `/teamwork` fallback), `start`/`end`, `JuliusBrussee/caveman` (internal logs only) | `docs/scope/`, `.factory/waves/`, `.factory/board/`, domain routing |
| **Command** | **4** | **Chief System Architect** | `JavaScript-Mastery-Pro/skills` (`architect`), `obra/superpowers` (spec-first planning), `google/skills`, Plain-English Spec Approval Gate | Strongest stack selector, `docs/specs/` (Spec 0001 & 0002) |
| **Command** | **5** | **Change-Impact & Codebase Auditor** | `JavaScript-Mastery-Pro/skills` (`audit`), `scf-change-impact`, `addyosmani/agent-skills` | 7-step ripple-effect check & architecture audits |
| **Builders** | **6** | **Frontend Lead (+ Dynamic Frontend Swarm Workers)** | `pbakaus/impeccable`, `nextlevelbuilder/ui-ux-pro-max-skill`, `vercel-labs/agent-skills`, `mattpocock/skills` (+ optional `threejs-skills`, `motion-dev`, `remotion`, `magicuidesign/mcp`) | Exclusively `src/web/*`, `src/app/*`, `src/components/*` |
| **Builders** | **7** | **Backend Lead (+ Dynamic Backend Swarm Workers)** | `JavaScript-Mastery-Pro/skills` (`develop`), `obra/superpowers` (strict TDD), `mattpocock/skills`, `addyosmani/agent-skills`, `upstash/context7` | Exclusively `src/server/*`, `src/api/*`, `src/services/*` |
| **Builders** | **8** | **Database & Schema Specialist** | `supabase/agent-skills` (Postgres/RLS/migrations), optional `prisma/skills` | Exclusively `src/db/*`, `prisma/*`, `migrations/*`, integer-paise/mg columns |
| **Security** | **9** | **Dedicated Cybersecurity Specialist** *(100% Separate!)* | `agamm/claude-code-owasp` (OWASP 2025 + ASVS 5.0 + Agentic AI), `semgrep/skills`, `affaan-m/ECC` (`production-audit` & `security-review`), `gitleaks`, `trivy` (+ internal-only `trailofbits/skills` & standalone `usestrix/strix`) | `.factory/gates/*-security.md`, `.factory/tickets/BUG-*.json` (never edits `src/` directly) |
| **Quality** | **10** | **QA Verification & Browser Testing Specialist** | `lackeyjb/playwright-skill`, `obra/superpowers` (verification-before-completion), `JavaScript-Mastery-Pro/skills` (`check`/`test`), Antigravity Built-in Browser | `tests/*`, live E2E/API proof, Bug Ticket creation |
| **Quality** | **11** | **Cross-Model Blind Reviewer & Root-Cause Debugger** | `addyosmani/agent-skills` (code review), `obra/superpowers` (systematic debugging), `scf-debug` (3-attempt circuit breaker) | Fresh-session blind reviews & stubborn root-cause analysis |
| **Integrity** | **12** | **GitHub, Version Control & Backup Agent** | `github/github-mcp-server`, `scripts/git-checkpoint.mjs`, `scripts/ast-collision-guard.mjs` | `git init`, atomic commits, wave tags, AST collision checks, GitHub push |
| **Release** | **13** | **Docs, Dashboard Sync & Manual Release Gatekeeper** | `scf-doc-sync`, `scf-deploy` (100% manual Boss gate), `anthropics/skills/skill-creator`, `vercel-labs/skills`, optional `AgriciDaniel/claude-seo` | `STATUS.md`, `dashboard/`, `AGENTS.md`, manual deploy |
| **Modernize** | **14** | **Legacy Reverse-Engineering Specialist** *(Dedicated!)* | `morluto/rea` (pre-bundled) + `storytold/craft-anything` (pinned snapshot + updater) | `docs/product/LEGACY-REA-*.md` — activates ONLY for reverse engineering/modernization |
| **Hardware** | **15** | **Hardware & IoT Compliance Specialist** *(Dedicated & Dormant!)* | `scf-hardware-compliance` (zero overhead when inactive) | Activates ONLY for weighing scales, thermal printers, serial/Bluetooth/IoT/embedded projects |

### 4.2 Strict Domain Ownership & Hybrid `/swarm` Execution Rules

1. **No Secret Side-Edits Rule:** Even a 2-line frontend button tweak or a small backend formula fix **MUST** route through the owning domain agent (Agent #6 Frontend, Agent #7 Backend, or Agent #8 Database) and log its action to `.factory/board/messages.jsonl` so every agent always knows the exact current state.
2. **Flat Domain-Grouped `/swarm` Dispatch (3–5 Concurrent Workers):**
   * Because `/swarm` workers do not recursively nest-spawn sub-swarms, the **Master Coordinator** spawns named domain workers directly onto the shared Swarm Board (e.g., `Frontend-Lead`, `Frontend-Worker-1`, `Backend-Worker-1`, `Database-Builder`, `@verifier` — capped at **max 5 active workers**, default **3**).
   * Every worker receives strictly **disjoint file paths** and **≤ 40 KB** focused task context.
3. **Free-Plan-Proof Pre-Built Protocols:**
   * If `/swarm` or `/run-workflow` is available in Antigravity, the factory uses them natively.
   * If the user ever runs on a Free plan or an IDE without `/run-workflow` / `/teamwork`, pre-built skills (`scf-grill-me`, `scf-swarm-dispatch`, `scf-workflow-runner`) execute the **exact same multi-step waves and message board protocol locally** using `scripts/workflow-runner.mjs` + `.factory/board/messages.jsonl`!

---

## Chapter 5: Complete 31-Repo Plug-and-Play Specialist Registry (`.factory/skills-registry.json`)

### 5.1 Bucket A — 18 Core Pre-Bundled Winners (Pre-Downloaded Inside `vendor/specialist-skills/core/`)

| # | Name | Exact GitHub URL | License & Portability | Assigned Agent(s) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `obra/superpowers` | `https://github.com/obra/superpowers` | MIT \| NATIVE | #4 Architect, #7 Backend, #10 QA, #11 Debugger |
| 2 | `addyosmani/agent-skills` | `https://github.com/addyosmani/agent-skills` | MIT \| NATIVE | #5 Auditor, #7 Backend, #11 Reviewer |
| 3 | `mattpocock/skills` | `https://github.com/mattpocock/skills` | Open \| NATIVE | #6 Frontend, #7 Backend |
| 4 | `JavaScript-Mastery-Pro/skills` | `https://github.com/JavaScript-Mastery-Pro/skills` | MIT \| NATIVE | #3 Coordinator, #4 Architect, #5 Auditor, #7 Backend, #10 QA |
| 5 | `anthropics/skills` (`skill-creator`) | `https://github.com/anthropics/skills/tree/main/skills/skill-creator` | Apache-2.0 \| NATIVE | #13 Docs & Skill Authoring |
| 6 | `vercel-labs/skills` | `https://github.com/vercel-labs/skills` | MIT \| NATIVE CLI | #13 Registry & Skill Updater (`npx skills`) |
| 7 | `JuliusBrussee/caveman` | `https://github.com/JuliusBrussee/caveman` | Apache-2.0 \| NATIVE | #3 Coordinator & Internal Workers ONLY (BANNED on Boss chat!) |
| 8 | `pbakaus/impeccable` | `https://github.com/pbakaus/impeccable` | Apache-2.0 \| NATIVE | #6 Frontend Lead |
| 9 | `nextlevelbuilder/ui-ux-pro-max-skill` | `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` | MIT \| NATIVE | #6 Frontend Lead (`ui-search-bridge.py`) |
| 10 | `vercel-labs/agent-skills` | `https://github.com/vercel-labs/agent-skills` | MIT \| NATIVE | #6 Frontend Lead & Workers |
| 11 | `supabase/agent-skills` | `https://github.com/supabase/agent-skills` | MIT \| NATIVE | #8 Database Specialist |
| 12 | `agamm/claude-code-owasp` | `https://github.com/agamm/claude-code-owasp` | MIT \| PORTABLE | #9 Cybersecurity Specialist |
| 13 | `semgrep/skills` | `https://github.com/semgrep/skills` | Open \| PORTABLE | #9 Cybersecurity Specialist |
| 14 | `affaan-m/ECC` (`production-audit` + `security-review`) | `https://github.com/affaan-m/ecc` | MIT \| PORTABLE | #9 Cybersecurity Specialist |
| 15 | `lackeyjb/playwright-skill` | `https://github.com/lackeyjb/playwright-skill` | MIT \| PORTABLE | #10 QA & Browser Testing |
| 16 | `upstash/context7` | `https://github.com/upstash/context7` | MIT \| NATIVE MCP | #2 Researcher, #6 Frontend, #7 Backend |
| 17 | `github/github-mcp-server` | `https://github.com/github/github-mcp-server` | MIT \| NATIVE MCP | #12 GitHub & Backup Agent |
| 18 | `google/skills` | `https://github.com/google/skills` | Apache-2.0 \| NATIVE | #4 Architect & Cloud Deploy |

### 5.2 Bucket B — 13 Optional / Dormant Plug-Ins (`vendor/specialist-skills/optional/` — On-Demand Only)

| # | Name | Exact GitHub URL | License / Safety Rule | Trigger Condition |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `CloudAI-X/threejs-skills` | `https://github.com/CloudAI-X/threejs-skills` | MIT \| PORTABLE | 3D / WebGL / React Three Fiber projects |
| 2 | `remotion-dev/skills` | `https://github.com/remotion-dev/skills` | Official \| **Check Remotion commercial license** | Programmatic React video generation |
| 3 | `199-biotechnologies/motion-dev-animations-skill` | `https://github.com/199-biotechnologies/motion-dev-animations-skill` | MIT \| PORTABLE | High-polish Motion.dev / Framer Motion animations |
| 4 | `morluto/rea` | `https://github.com/morluto/rea/blob/main/.agents/skills/reverse-engineer-anything/SKILL.md` | MIT \| NATIVE | Agent #14 Legacy Reverse Engineering |
| 5 | `storytold/craft-anything` | `https://github.com/storytold/craft-anything` | Apache-2.0 / MIT \| Pinned Snapshot | Agent #14 App Understanding & Modernization |
| 6 | `prisma/skills` | `https://github.com/prisma/skills` | MIT \| NATIVE | Projects using Prisma ORM instead of Supabase |
| 7 | `trailofbits/skills` | `https://github.com/trailofbits/skills` | **CC-BY-SA-4.0 / AGPL-3.0 — INTERNAL AUDIT ONLY; NEVER COPY INTO CLIENT REPOS!** | Agent #9 Deep internal security audits |
| 8 | `usestrix/strix` | `https://github.com/usestrix/strix` | Apache-2.0 \| **RUN STANDALONE ONLY (NOT ALONGSIDE IDE ON 16 GB RAM)** | Isolated Docker/staging pentesting |
| 9 | `garrytan/gstack` | `https://github.com/garrytan/gstack` | MIT \| PORTABLE | Heavy CEO/Design discovery & launch sprints |
| 10 | `AndyShaman/premortem` | `https://github.com/AndyShaman/premortem` | Open \| PORTABLE | 10–15 min pre-launch risk check |
| 11 | `blader/humanizer` | `https://github.com/blader/humanizer` | MIT \| PORTABLE | Polishing client proposals & public copy |
| 12 | `AgriciDaniel/claude-seo` | `https://github.com/AgriciDaniel/claude-seo` | MIT \| PORTABLE | Technical SEO & AI Search (GEO) audits |
| 13 | `magicuidesign/mcp` | `https://github.com/magicuidesign/mcp` | MIT \| NATIVE MCP | Animated Magic UI marketing components |

### 5.3 Future Plug-and-Play Extensibility Rule (Add Any Skill, Language, or MCP in 60 Seconds)

To add a new specialist skill (e.g., Rust, Go, MongoDB, Flutter, or 2 new Database skills) or a new MCP server later:
1. Drop the skill folder into `vendor/specialist-skills/core/<domain>/<skill-name>/` (or `optional/`).
2. Add a 4-line entry in **`.factory/skills-registry.json`** mapping `skill_id`, `path`, `assigned_agent_id`, and `load_mode` (`core_on_domain` vs `dormant_on_demand`).
3. For a new MCP server, add 1 block to `mcp/mcp_config.template.json` with `"auto_start": false` (on-demand) or `true` (only if total always-on MCPs ≤ 4).
4. Run `node scripts/check-portability.mjs` — zero rewrites to `AGENTS.md` or other agents!

---

## Chapter 6: Complete `software-company-factory` v2.0 Directory Tree

```text
C:\dev\software-company-factory\
├── AGENTS.md                        # Master Constitution (<= 12 KB, strict domain routing + Swarm + Boss rules)
├── CLAUDE.md                        # "@AGENTS.md"
├── STATUS.md                        # Plain-language Boss summary
├── README.md                        # Quickstart guide
├── THIRD_PARTY_LICENSES.md          # Complete MIT/Apache/AGPL attribution + client-repo boundary rules
├── .gitignore                       # Strict secret/env/node_modules exclusions
├── .factory/
│   ├── session.lock.json            # ACTIVE / ENDED multi-company isolation lock
│   ├── models.json                  # 5 Abstract Model Slots (zero hardcoded models)
│   ├── config.json                  # RAM cap (default 3, burst max 5 workers), MCP cap (4), tier rules
│   ├── skills-registry.json         # Plug-and-play master mapping of all 15 agents <-> 31+ skills & MCPs
│   ├── board/
│   │   └── messages.jsonl           # Append-only real agent-to-agent & Swarm board event log
│   ├── gates/                       # Deterministic machine proof (*.gate.json — real script exit codes)
│   ├── tickets/                     # Auto-Fix Bug Handover Tickets (BUG-*.json, max 3 retries)
│   └── waves/                       # Disjoint File-Ownership Task Packet Manifests (wave-plan.json)
├── .agents/
│   ├── hooks.json                   # 15 Fail-Closed Hooks (including block-client-agpl-leak & domain-lock)
│   └── skills/                      # 20 Canonical Factory Skills (18 v1.1 + scf-grill-me + scf-swarm-dispatch)
├── vendor/
│   └── specialist-skills/
│       ├── core/                    # 18 Bucket A pre-bundled specialist skills (loaded via Progressive Disclosure)
│       └── optional/                # 13 Bucket B dormant plug-ins (on-demand only; trailofbits isolated)
├── dashboard/                       # ₹0-Cost Local Boss Mission Control UI (http://localhost:4173)
│   ├── server.mjs                   # Zero-dependency Node.js local server + SSE live file watcher (< 50 MB RAM)
│   ├── index.html                   # Clean, visual non-coder Boss Dashboard (overall %, per-agent %, avg time, gates)
│   └── styles.css                   # High-contrast modern dashboard styling
├── docs/
│   ├── MASTER_BLUEPRINT_V2.md       # Cleanly archived v2.0 Master Blueprint
│   ├── FOUNDER_AND_CLIENT_GUIDE.html
│   ├── FOUNDER_AND_CLIENT_GUIDE.md
│   ├── product/ | scope/ | specs/ | handoff/
├── scripts/                         # 11 Real Executable Windows-Safe Scripts
│   ├── bootstrap-env.ps1
│   ├── check-portability.mjs        # Validates 20 skills + skills-registry.json + zero hardcoded models + <=90KB hot-path
│   ├── gate-check.mjs
│   ├── git-checkpoint.mjs
│   ├── ast-collision-guard.mjs
│   ├── hook-runner.mjs              # Runs all 15 fail-closed hooks + --self-test
│   ├── analyze-token-usage.mjs
│   ├── init-target-project.mjs
│   ├── ui-search-bridge.py
│   ├── sync-vendor-skills.ps1       # Safe pin/update helper for optional/evolving repos (e.g., craft-anything)
│   └── workflow-runner.mjs          # Pre-built Free-Plan-Proof deterministic workflow engine
└── mcp/
    └── mcp_config.template.json     # Lean 4-MCP default config (filesystem, github, context7, sequential-thinking)
```

---

## Chapter 7: ₹0-Cost Local Boss Mission Control Dashboard (`dashboard/`)

* **Cost:** **₹0** (runs 100% locally on `http://localhost:4173` using built-in Node.js `http` + `fs.watch`, zero LLM API calls, `< 50 MB RAM`).
* **Anti-Hallucination Guarantee:** The dashboard **NEVER displays AI-written stories** — every card reads strictly from machine-written JSON/JSONL files produced by real scripts:
  1. **Factory Status Header:** Active department, active target project, current phase, active model slots, Git branch/commit SHA (from `.factory/session.lock.json` & `.factory/models.json`).
  2. **Overall Progress % & Average Task Time:** Calculated directly from completed vs. total Task Packets in `.factory/waves/wave-plan.json` and real start/end timestamps in `.factory/board/messages.jsonl`.
  3. **Deployed Agents Grid (All 15 Agents + Active Swarm Workers):** Shows each agent's status (`IDLE` / `WORKING` / `BLOCKED` / `DONE`), current task, per-agent completion `%`, and active skill count from `.factory/skills-registry.json`.
  4. **Real Gatekeeper & Test Proof Panel:** Lists every script execution from `.factory/gates/*.gate.json` (`hook-runner.mjs`, `check-portability.mjs`, `block-float-money`, `semgrep`, `gitleaks`, `playwright`) with real **`EXIT 0 (PASS)`** or **`EXIT 1 (FAIL)`** badges and exact timestamps.
  5. **Live Auto-Fix Ticket & Board Feed:** Streams `.factory/tickets/BUG-*.json` (open vs. resolved, owner agent, retry count `1/3`) and `.factory/board/messages.jsonl` live without page refresh.
* **Launch Command:** `node dashboard/server.mjs` (or automatically offered on `/software-company-factory-start`).

---

## Chapter 8: 5-Batch Antigravity v2.0 Upgrade Execution Plan

Execute strictly in **5 verified batches** (never dump all changes in one turn):

* **Batch 0 — Safe OneDrive → `C:\dev\software-company-factory` Migration:** Verify clean Git state, migrate/clone full repo with history + tags to `C:\dev\software-company-factory`, verify `check-portability.mjs` & `hook-runner.mjs --self-test` exit `0`, and pause so Founder switches Antigravity workspace to `C:\dev\software-company-factory`.
* **Batch 1 — Modular Registry, Free-Plan Workflows & Updated Scripts:** Create `.factory/skills-registry.json`, `.factory/board/messages.jsonl`, `scripts/sync-vendor-skills.ps1`, `scripts/workflow-runner.mjs`, update `.factory/config.json` (concurrency default `3`, burst max `5`), update `mcp/mcp_config.template.json` (with `upstash/context7` & `github/github-mcp-server`), update `AGENTS.md` (strict domain routing + zero-caveman Boss rule + 15 agents), and add `scf-grill-me` + `scf-swarm-dispatch` skills → verify & `git commit` (`checkpoint-v2-batch-1`).
* **Batch 2 — Pre-Bundle Bucket A Core Specialist Skills (18 Repos):** Clone/vendor the 18 Bucket A repos cleanly into `vendor/specialist-skills/core/` (stripping nested `.git` directories so the parent repo tracks them cleanly!), adapt any `[PORTABLE]` Claude skills to Antigravity frontmatter/paths, write `THIRD_PARTY_LICENSES.md`, and wire every domain agent's `SKILL.md` to its vendored core skills → run `check-portability.mjs` & `git commit` (`checkpoint-v2-batch-2`).
* **Batch 3 — Pre-Bundle Bucket B Dormant Plug-ins (13 Repos) + Deepen Specialist Agents #9, #14, #15:** Vendor Bucket B repos into `vendor/specialist-skills/optional/` (isolating `trailofbits/skills` with a fail-closed hook `block-client-agpl-leak` so it is NEVER copied into client repos, marking `usestrix/strix` standalone-only, and pinning `craft-anything`), separate Agents #9 (Cybersecurity), #14 (Legacy RE), and #15 (Hardware & IoT), and deepen `scf-develop`, `scf-sec-ops`, `scf-legacy-re` mode files → run `check-portability.mjs` + `hook-runner.mjs --self-test` & `git commit` (`checkpoint-v2-batch-3`).
* **Batch 4 — Build ₹0 Local Boss Mission Control Dashboard (`dashboard/`) + Update Guide + GitHub Push:** Build `dashboard/server.mjs`, `dashboard/index.html`, `dashboard/styles.css`, verify live server on `http://localhost:4173` with real JSON gate data, update `docs/FOUNDER_AND_CLIENT_GUIDE.html` & `.md` for v2.0, clean up old root blueprint filename to `docs/MASTER_BLUEPRINT_V2.md`, commit (`checkpoint-v2-complete`), and `git push origin main --tags`!

---

## Chapter 9: Mandatory Live Smoke Test (`smoke-gold-calc` on `/swarm` + Boss Dashboard)

Before starting Father's Jewelry Business ERP:
1. Run `node dashboard/server.mjs` and open `http://localhost:4173` in Chrome.
2. Inside Antigravity (`C:\dev\software-company-factory`), run `/software-company-factory-start`.
3. Build `smoke-gold-calc` (Gold Rate & 3% GST Calculator with live history): verify Plain-English Spec Approval Gate, verify `/swarm` builds Frontend + Backend + DB cleanly, verify `block-float-money` traps intentional float GST math and routes `BUG-001` to Backend, verify Boss Dashboard updates % and green `EXIT 0` gates live, and run `/software-company-factory-end`.
