# Third-Party Open-Source Specialist Skills & Licenses (`THIRD_PARTY_LICENSES.md`)

`software-company-factory` v2.0 pre-bundles and integrates open-source specialist skills, prompts, and MCP tooling under `vendor/specialist-skills/` and `mcp/mcp_config.template.json`. All original copyrights and licenses remain with their respective authors.

---

## 1. Strict Client-Repository Boundary Rules (Legal & Safety Isolation)

1. **`trailofbits/skills` (`CC-BY-SA-4.0` / `AGPL-3.0`) — INTERNAL AUDIT ONLY:**
   - Used strictly inside `software-company-factory` by **Agent #9 (Cybersecurity Specialist)** for internal security audits.
   - **HARD-BLOCKED** from ever being copied, vendored, or bundled into any client/target project repository (`block-client-agpl-leak` hook).
2. **`remotion-dev/skills` — COMMERCIAL LICENSE REVIEW:**
   - Dormant on-demand plug-in only. Before shipping a commercial client product that renders video with Remotion, verify Remotion's commercial company licensing terms.
3. **`usestrix/strix` (`Apache-2.0`) — STANDALONE ONLY:**
   - Must run standalone when Antigravity multi-agent IDE builds are paused on 16 GB RAM workstations.
4. **All Other `MIT` / `Apache-2.0` / `Open` Skills:**
   - Safe for Mother Factory internal engineering and reference; retain original copyright & license files inside each `vendor/specialist-skills/<bucket>/<name>/` directory.

---

## 2. Bucket A — 18 Pre-Bundled Core Specialist Repos (`vendor/specialist-skills/core/`)

| # | Repository | Source URL | License | Local Path / MCP | Assigned Agent(s) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `obra/superpowers` | https://github.com/obra/superpowers | MIT | `vendor/specialist-skills/core/obra-superpowers` | #4, #7, #10, #11 |
| 2 | `addyosmani/agent-skills` | https://github.com/addyosmani/agent-skills | MIT | `vendor/specialist-skills/core/addyosmani-agent-skills` | #5, #7, #11 |
| 3 | `mattpocock/skills` | https://github.com/mattpocock/skills | Open (see repo) | `vendor/specialist-skills/core/mattpocock-skills` | #6, #7 |
| 4 | `JavaScript-Mastery-Pro/skills` | https://github.com/JavaScript-Mastery-Pro/skills | MIT | `vendor/specialist-skills/core/jsmastery-skills` | #3, #4, #5, #7, #10 |
| 5 | `anthropics/skills` (`skill-creator`) | https://github.com/anthropics/skills | Apache-2.0 | `vendor/specialist-skills/core/anthropics-skill-creator` | #13 |
| 6 | `vercel-labs/skills` | https://github.com/vercel-labs/skills | MIT | `vendor/specialist-skills/core/vercel-labs-skills` | #13 |
| 7 | `JuliusBrussee/caveman` | https://github.com/JuliusBrussee/caveman | Apache-2.0 / MIT | `vendor/specialist-skills/core/caveman` | #3 & internal logs only |
| 8 | `pbakaus/impeccable` | https://github.com/pbakaus/impeccable | Apache-2.0 | `vendor/specialist-skills/core/impeccable` | #6 |
| 9 | `nextlevelbuilder/ui-ux-pro-max-skill` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | MIT | `vendor/specialist-skills/core/ui-ux-pro-max` | #6 |
| 10 | `vercel-labs/agent-skills` | https://github.com/vercel-labs/agent-skills | MIT | `vendor/specialist-skills/core/vercel-agent-skills` | #6 |
| 11 | `supabase/agent-skills` | https://github.com/supabase/agent-skills | MIT | `vendor/specialist-skills/core/supabase-agent-skills` | #8 |
| 12 | `agamm/claude-code-owasp` | https://github.com/agamm/claude-code-owasp | MIT | `vendor/specialist-skills/core/claude-code-owasp` | #9 |
| 13 | `semgrep/skills` | https://github.com/semgrep/skills | Open (see repo) | `vendor/specialist-skills/core/semgrep-skills` | #9 |
| 14 | `affaan-m/everything-claude-code` | https://github.com/affaan-m/everything-claude-code | MIT | `vendor/specialist-skills/core/ecc-security` | #9 |
| 15 | `lackeyjb/playwright-skill` | https://github.com/lackeyjb/playwright-skill | MIT | `vendor/specialist-skills/core/playwright-skill` | #10 |
| 16 | `upstash/context7` | https://github.com/upstash/context7 | MIT | `mcp/mcp_config.template.json#context7` | #2, #6, #7 |
| 17 | `github/github-mcp-server` | https://github.com/github/github-mcp-server | MIT | `mcp/mcp_config.template.json#github` | #12 |
| 18 | `google/skills` | https://github.com/google/skills | Apache-2.0 | `vendor/specialist-skills/core/google-skills` | #4 |

---

## 3. Bucket B — 13 Optional / Dormant Plug-In Repos (`vendor/specialist-skills/optional/`)

| # | Repository | Source URL | License / Rule | Local Path / MCP | Assigned Agent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `CloudAI-X/threejs-skills` | https://github.com/CloudAI-X/threejs-skills | MIT | `vendor/specialist-skills/optional/threejs-skills` | #6 |
| 2 | `remotion-dev/skills` | https://github.com/remotion-dev/skills | Official (verify commercial license) | `vendor/specialist-skills/optional/remotion-skills` | #6 |
| 3 | `199-biotechnologies/motion-dev-animations-skill` | https://github.com/199-biotechnologies/motion-dev-animations-skill | MIT | `vendor/specialist-skills/optional/motion-dev-animations` | #6 |
| 4 | `morluto/rea` | https://github.com/morluto/rea | MIT | `vendor/specialist-skills/optional/rea` | #14 |
| 5 | `storytold/craft-anything` | https://github.com/storytold/craft-anything | Apache-2.0 / MIT (pinned snapshot) | `vendor/specialist-skills/optional/craft-anything` | #14 |
| 6 | `prisma/skills` | https://github.com/prisma/skills | MIT | `vendor/specialist-skills/optional/prisma-skills` | #8 |
| 7 | `trailofbits/skills` | https://github.com/trailofbits/skills | **CC-BY-SA-4.0 / AGPL-3.0 (INTERNAL AUDIT ONLY)** | `vendor/specialist-skills/optional/trailofbits-skills` | #9 |
| 8 | `usestrix/strix` | https://github.com/usestrix/strix | Apache-2.0 (Standalone only) | `vendor/specialist-skills/optional/strix` | #9 |
| 9 | `garrytan/gstack` | https://github.com/garrytan/gstack | MIT | `vendor/specialist-skills/optional/gstack` | #1 |
| 10 | `AndyShaman/premortem` | https://github.com/AndyShaman/premortem | Open (see repo) | `vendor/specialist-skills/optional/premortem` | #2 |
| 11 | `blader/humanizer` | https://github.com/blader/humanizer | MIT | `vendor/specialist-skills/optional/humanizer` | #1 |
| 12 | `AgriciDaniel/claude-seo` | https://github.com/AgriciDaniel/claude-seo | MIT | `vendor/specialist-skills/optional/claude-seo` | #13 |
| 13 | `magicuidesign/mcp` | https://github.com/magicuidesign/mcp | MIT | `mcp/mcp_config.template.json#magicuidesign` | #6 |
