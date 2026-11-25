# Pre-Deploy Boss Checklist (`templates/pre-deploy-checklist.md`)

```markdown
# Production Release Checklist: <Project Name> (`v<X.Y.Z>`)

- **Release Officer:** `scf-deploy`
- **Target Environment:** `<Staging Preview | Production>`
- **Git Rollback Tag:** `<checkpoint-release-N>` (Working Tree: `CLEAN`)

---

## 1. Automated Gate Proofs (Must All Be PASS)
| Gate Check | Result | Evidence |
| :--- | :--- | :--- |
| Feature `.gate.json` Verification | `<PASS>` | `node scripts/gate-check.mjs --all` |
| 5-Stage Security (`scf-sec-ops`) | `<PASS>` | Zero open BLOCKER/HIGH findings |
| Integer Money & Weight Guard | `<PASS>` | `block-float-money` exit code 0 |
| Secret & `.env` Hygiene | `<PASS>` | `block-env-staging` + `block-hardcoded-secrets` |
| Production Build | `<PASS>` | `<build command exit 0>` |

## 2. Database Backup & Secret Check
- [ ] Pre-migration DB backup verified
- [ ] Production secrets set on host (zero dev/test keys reused)
- [ ] Health endpoint (`/api/health`) & HTTPS verified

## 3. Boss Final Decision Gate (Mandatory)
Reply **"CONFIRM PRODUCTION DEPLOY"** to release now, **"STAGING FIRST"** for a private preview link, or **"HOLD"** to cancel.
```
