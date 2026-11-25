# `scf-scope` Mode: User Journey Slicing (`modes/journey.md`)

**Best For:** Role-heavy multi-user apps (Owner + Munim + Sales Counter + Karigar) documented in `docs/product/HANDBOOK-<slug>.md`.
**Plain Meaning:** *"Har employee ke rozana ke kaam (journey) ke hisaab se features baantna."*

## How to Slice by User Journey
1. **One Journey = One Slice (or Split Pair):** Take each named journey from the Application Handbook (`Journey 1: Morning Rate Set`, `Journey 2: Counter Sale`, etc.).
2. **Bind Permissions Early:** Attach exact `RBAC` role checks inside the slice so security is never bolted on afterward.
3. **Assign Tier Honestly:** Any journey touching money, discounts, voids, or logins automatically receives `Full` tier.
