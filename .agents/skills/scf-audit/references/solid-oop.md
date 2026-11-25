# SOLID OOP & Adapter Reference (`references/solid-oop.md`)

**Plain Meaning:** *"External services (jaise Razorpay, SMS, WhatsApp, barcode printer) ko plug-and-play adapter ke peeche rakhna taaki kal provider badalna aasan ho."* (Google search: `"SOLID principles dependency inversion"`)

## Practical Rules (No Over-Engineering)
1. **Single Responsibility:** One service file does one clear job (do not mix PDF generation, GST math, and WhatsApp sending in one 900-line file).
2. **Dependency Inversion for External Vendors:** Define a tiny interface (`PaymentGateway`, `ReceiptPrinter`) so tests can use a deterministic test adapter while production uses the real provider.
3. **Avoid Deep Inheritance:** Prefer small interfaces and composition over 5-level class hierarchies.
