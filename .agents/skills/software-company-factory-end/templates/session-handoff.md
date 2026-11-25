# Session Handoff Template (`docs/handoff/LATEST_SESSION.md`)

Use this exact layout when writing `docs/handoff/LATEST_SESSION.md` during `/software-company-factory-end`:

```markdown
# Latest Session Handoff (`docs/handoff/LATEST_SESSION.md`)

- **Department:** `software-company-factory`
- **Session State:** `ENDED`
- **Ended At:** `<YYYY-MM-DDTHH:mm:ss+05:30>`
- **Active Target Project:** `<project-slug or None>`
- **Last Verified Commit:** `<short_sha>`
- **Last Passing Gate:** `<.factory/gates/*.gate.json or Mother Factory checkpoint>`

## What Was Completed This Session
- <Bullet 1 with exact file or feature reference>
- <Bullet 2>

## Open Bug Tickets & Pending Gates
- **Open Tickets:** `<None or BUG-NNN (owner_agent, attempt_count/3)>`
- **Pending Human Gate:** `<None or SPEC-NNN approval / /scf-deploy confirmation>`

## Exact Next Step on Resume
- **Next Action:** <1 clear plain-language sentence>
- **Recommended Abstract Slot:** `<light_ops_slot | worker_slot | architect_slot | deep_logic_slot>`
```
