# Security Stage 3: Production Hardening (`references/stage-3-prod.md`)

**Standard:** Production Hardening & Dependency Hygiene

## Checklist
1. **Fail-Fast Env Validation:** Server startup must validate required environment variables via schema and exit immediately on missing secrets — zero insecure default fallbacks.
2. **Strip Debug & Backdoor Routes:** Verify zero `/debug`, `/dev-login`, or unauthenticated admin endpoints exist.
3. **Safe Error Handling:** Client responses on unexpected errors return generic plain messages + `correlationId` only — never SQL queries, file paths, or stack traces.
4. **HTTP Security Headers & CORS:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Strict-Transport-Security` (when HTTPS enabled)
   - `Content-Security-Policy`
   - Explicit CORS origin allow-list (never `*` with cookies).
5. **Rate Limiting & Dependency Scan:** Confirm `5/min` on login and `3/hr` on password reset. Run `trivy fs . --scanners vuln,misconfig --severity HIGH,CRITICAL` sequentially on-demand if `trivy` is installed.
