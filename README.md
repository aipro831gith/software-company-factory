# `software-company-factory` v2.0 — Enterprise Specialist Mother Factory

Welcome! This repository (`C:\dev\software-company-factory`) is your **v2.0 Enterprise Specialist-Grade AI Software Factory** built for **Google Antigravity 2.0 on Windows 11 & macOS**.

It operates **15 Dedicated Permanent Specialist Agents**, **20 Canonical Factory Skills**, **31 Pre-Bundled Specialist Repos** (18 Core + 13 Optional plug-ins), **16 Fail-Closed Safety Hooks**, hybrid **`/swarm` + Free-Plan Fallback** execution, and a **₹0 Local Boss Mission Control Dashboard (`http://localhost:4173`)**.

---

## Quick Start for the Founder

1. **Open `C:\dev\software-company-factory` in Google Antigravity 2.0.**
2. **Start the ₹0 Boss Mission Control Dashboard (Windows PowerShell or Mac Terminal):**
   ```powershell
   node dashboard/server.mjs
   ```
   Open **http://localhost:4173** in your browser for real-time progress %, all 15 agents, live board events, and real exit-code gate proofs (uses **0 LLM tokens**).
3. **Start a work session:** Type `/software-company-factory-start` (or `/scf-start`).
4. **End a work session safely:** Type `/software-company-factory-end` (or `/scf-end`).

---

## Key v2.0 Upgrades

- **15 Dedicated Specialist Agents:** Agent #9 (Dedicated Cybersecurity), Agent #14 (Legacy Reverse-Engineering), and Agent #15 (Hardware & IoT) are 100% separate.
- **Zero-Caveman Boss Rule:** `caveman` token compression runs ONLY on internal agent/Swarm logs; Boss communication is always clear Hinglish or simple English.
- **100% Model-Agnostic:** All 5 slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`) resolve dynamically from `.factory/models.json`.
- **Legal & RAM Guards:** `trailofbits/skills` is isolated (`block-client-agpl-leak`), `usestrix/strix` runs standalone only, concurrency defaults to `3` (burst max `5`), and max `4` always-on MCPs (`filesystem`, `github`, `context7`, `sequential-thinking`).

---

## Verification Commands (Windows PowerShell)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-env.ps1
node scripts/check-portability.mjs --require-all
node scripts/hook-runner.mjs --self-test
node scripts/workflow-runner.mjs --self-test
node dashboard/server.mjs
```
