# Security Stage 5: Attacker's Perspective Review (`references/stage-5-attacker.md`)

**Standard:** Adversarial Threat Hunt (`Full` Tier Mandatory — run via `blind_reviewer_slot` / `deep_logic_slot`)

## Adversarial Attack Scenarios to Test & Prove Blocked
1. **Negative Number & Overflow Abuse:** Submit `weightMg: -1000`, `quantity: -2`, `discountPaise: -500`, or `paidPaise: -100`. Server MUST return `400 Bad Request`.
2. **Discount & Price Tampering:** Intercept request and set `totalPaise: 1` or `discountBps: 15000` (150%). Server MUST reject or ignore client totals.
3. **Horizontal & Vertical Privilege Escalation:** Use a `Counter Staff` cookie to call `Boss`-only rate update, invoice void, or `GET /api/invoices/<other-id>`. Server MUST return `403` / `404`.
4. **Race Condition / Double-Spend:** Fire two concurrent `POST /api/invoices` requests for the last 1 piece in stock or same `Idempotency-Key`. Only 1 succeeds; stock never goes negative (`-1`).
5. **Sensitive Path Exposure:** Probe `/.env`, `/.git/HEAD`, `/swagger.json`, `/api/debug`. All MUST return `404` or `403`.
