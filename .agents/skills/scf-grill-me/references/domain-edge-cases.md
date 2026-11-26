# Domain Edge-Case Bank (`references/domain-edge-cases.md`)

Select **3 to 5** scenarios matching the Founder's project. Never dump all scenarios unedited.

## 1. Jewelry, Retail & GST Billing Traps
- **Split Tender + Old Gold Exchange:** Cash + UPI + Card + Old Gold Deduction + Udhaar balance on a single invoice.
- **Rate Lock Timing:** Morning rate vs. afternoon rate change between kachcha estimate and final pakka GST bill.
- **Stone Weight & Wastage:** Deducting stone/beads (`gross_mg - stone_mg = net_mg`) before applying gold rate vs. making charges.
- **Void / Return Compliance:** GST invoices cannot be hard-deleted; must use void/Credit Note with Boss PIN + audit log.

## 2. Ledger, Finance & Banking Traps
- **Double-Click / Slow Network (`Idempotency-Key`):** Prevents charging or creating two bills when "Save" is tapped twice. *(Google search: `"idempotency key payment API"`)*
- **Negative / Tampered Input:** Blocking `-1` quantity, `>100%` discount, or client-altered totals on the server.
- **Concurrent Counter Updates:** Two staff billing the last 1 item or updating one customer's khata at the exact same second.

## 3. Operations, Staff & Hardware Traps
- **Staff Exit Revocation:** Instantly disabling a former employee's login while keeping their historical invoices intact.
- **Offline / Power Cut Recovery:** Preserving unsaved invoice draft locally if Wi-Fi drops mid-bill.
- **Weighing Scale / Printer Disconnect:** Clear non-blocking alert + audited manual fallback if COM/USB scale unplugs.
