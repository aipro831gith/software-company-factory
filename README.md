# `software-company-factory` — Mother AI Software Factory

Welcome! This repository is your **reusable AI Software Engineering Operating System** built for **Google Antigravity 2.0 on Windows 11** (and portable to Claude Code & OpenAI Codex).

It is **not** a single business app — it is the **Mother Factory** that plans, designs, builds in parallel waves, tests, secures, and ships real software projects (such as a Jewelry Business ERP) with plain-language explanations and strict safety guardrails.

---

## Quick Start for the Founder (3 Simple Steps)

1. **Open this folder in Google Antigravity 2.0.**
2. **Start a work session:** Type `/software-company-factory-start` (or `/scf-start`).
   - The factory automatically checks `.factory/session.lock.json`, loads `STATUS.md` and `docs/handoff/LATEST_SESSION.md`, and greets you in simple language.
3. **End a work session safely:** Type `/software-company-factory-end` (or `/scf-end`).
   - Saves a clean Git checkpoint, updates `STATUS.md` and `docs/handoff/LATEST_SESSION.md`, and marks the department lock `ENDED` so you can switch to other departments with zero mix-up.

---

## How AI Models Work (100% Future-Proof, Zero Lock-In)

You never need to edit skills or scripts when new AI models launch:
- Open **`.factory/models.json`** to customize any of the 5 role slots (`light_ops_slot`, `worker_slot`, `architect_slot`, `deep_logic_slot`, `blind_reviewer_slot`).
- Or simply pick your preferred model directly in Antigravity's model dropdown (`allow_founder_ui_model_selection: true`).

---

## Hardware & Safety Defaults (16 GB RAM Windows Laptop)

- **Max Concurrent Wave Workers:** `3` (configured in `.factory/config.json`)
- **Max Always-On MCP Servers:** `4` (`mcp/mcp_config.template.json`: `filesystem`, `github`, `sequential-thinking`, plus on-demand `playwright`/`postgres`)
- **15 Fail-Closed Guardrail Hooks:** Automatically block `eval()`, floating-point money/GST math, `.env` leaks, hardcoded secrets, unapproved specs, and unapproved production deploys.

---

## Useful Verification Commands (Windows PowerShell)

```powershell
# 1. Check installed Windows tools (Git, Node, Python, security CLIs)
powershell -ExecutionPolicy Bypass -File scripts/bootstrap-env.ps1

# 2. Verify all skills are deep, valid, and model-agnostic
node scripts/check-portability.mjs

# 3. Run built-in self-test on all 15 safety hooks
node scripts/hook-runner.mjs --self-test

# 4. Scaffold a brand-new isolated target app repo
node scripts/init-target-project.mjs --name smoke-gold-calc --dir ../smoke-gold-calc
```
