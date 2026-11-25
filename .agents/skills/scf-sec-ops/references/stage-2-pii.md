# Security Stage 2: Personal Data (PII) Flow Audit (`references/stage-2-pii.md`)

**Standard:** Bearer PII Privacy & Canonical Auth Rules

## Checklist
1. **PII Inventory:** List every stored personal field (`name`, `phone`, `email`, `address`, `gstin`, `pan`) and verify why each field is necessary.
2. **Log Redaction:** Confirm console/file logs never print passwords, session cookies, OTPs, API secrets, or unmasked phone/email/PAN values.
3. **Canonical Password Hashing (`Argon2id` Only):** Verify all password hashing uses `Argon2id` with safe memory/time parameters. Reject `bcrypt`, `MD5`, `SHA1`, or unsalted hashes.
4. **Cookie & Storage Rules:** Verify auth sessions use `httpOnly`, `secure` (in HTTPS prod), and `sameSite` cookies. Reject storing tokens or PII inside `localStorage`.
5. **API Field Allow-Listing & Deletion:** Responses must explicitly select safe fields (never leak `passwordHash`, `resetTokenHash`, or internal flags). Confirm an account deactivation / PII anonymization path exists without breaking immutable tax invoices.
