---
name: scf-hardware-compliance
description: Dormant zero-overhead plug-in skill that activates only when a project connects to physical hardware, IoT devices, serial weighing scales, barcode printers, or embedded firmware.
---

# `scf-hardware-compliance` — Dormant Hardware, Scale & IoT Safety Plug-In

**Assigned Agent:** Agent #12 — Security, Compliance & Release Officer (`deep_logic_slot` resolved from `.factory/models.json`)
**Activation Rule:** **DORMANT ZERO-OVERHEAD PLUG-IN.** Do NOT load or run this skill for pure software, web, or SaaS projects. Activate **ONLY** when the project explicitly integrates physical shop or IoT hardware (such as jewelry digital weighing scales over RS-232/USB serial, thermal receipt/barcode printers, RFID tag readers, payment POS terminals, or embedded microcontrollers).
**File Ownership (Strict):** Writes hardware compliance checklists and test requirements into `docs/specs/HARDWARE-<slug>.md` and collaborates with `/scf-architect` and `/scf-test`. Never alters `src/` directly.

---

## 1. Plain-Language Why Hardware Integration Needs Extra Rules

When software talks to physical shop equipment (especially a **digital gold weighing scale** or **thermal barcode printer**), ordinary software bugs turn into direct money loss or counter shutdowns:
- A loose USB-to-Serial cable or half-received data packet can misread `10.500 g` as `1.050 g` or `0.000 g`.
- A weighing scale still fluctuating while gold is placed on the pan can lock an unstable wrong weight onto a GST invoice!
- A printer going out of paper or offline can freeze the entire billing counter if the app waits synchronously without timeouts.
- An unauthenticated local hardware bridge listening on `0.0.0.0` (shop Wi-Fi) could allow another device on the network to inject fake weight readings.

---

## 2. Mandatory Hardware & Scale Safety Protocol (`references/iot-safety-checklist.md`)

When activated, enforce all 6 controls inside `/scf-architect` (Spec Part B), `/scf-develop` (Wave Task Packets), and `/scf-test`:

1. **Strict Packet Framing & Stable-Weight Verification:**
   - Never parse raw partial serial buffer chunks into numbers. Buffer until the complete start/end frame delimiter arrives, verify checksum/CRC if the hardware protocol provides one, and check the **stable-reading flag** (or 3 consecutive identical readings within tolerance) before locking weight into an invoice.
   - Convert scale output immediately into **integer milligrams** (`mg`) — zero floating-point `Number` arithmetic (`block-float-money`).
2. **Sanity Range Bounds & Audited Manual Override:**
   - Reject negative weights, `NaN`, or readings above the scale's physical maximum capacity.
   - Whenever staff enters or adjusts weight manually (e.g., scale disconnected), record `weight_source: "MANUAL_OVERRIDE"`, `override_reason`, and `staff_id` in the immutable audit log (and require Manager/Boss approval if configured in `HANDBOOK`).
3. **Graceful Hardware Disconnect & Non-Blocking UI:**
   - Enforce short timeouts (`<= 3 seconds`) on serial/USB/printer calls.
   - On disconnect or paper-out, show a clear plain-language banner (*"Weighing scale disconnected — USB cable check karein ya Manager approval se weight enter karein"*) without crashing or losing the in-progress bill.
4. **Localhost-Only Hardware Bridge (`127.0.0.1`):**
   - Any Windows background helper reading COM/USB ports or thermal ESC/POS printers MUST bind strictly to `127.0.0.1` (never `0.0.0.0`), verify origin/shared local token, and avoid `eval()` or unsafe shell command string interpolation.
5. **Firmware / Driver Integrity (If Embedded Firmware Involved):**
   - Verify signed updates, rollback-safe boot/config state, and zero hardcoded Wi-Fi/API credentials in firmware or local config files (`block-hardcoded-secrets`).
6. **Deterministic Hardware Simulator in `tests/`:**
   - `/scf-test` must include automated tests using mock serial/printer streams covering: partial/fragmented packets, unstable reading rejection, sudden cable unplug mid-read, out-of-range spike rejection, and exact `mg` conversion.

---

## 3. Triad Options When Hardware Integration Is Requested

Present **3 concrete choices (`[BEST SUGGESTION]`)** in plain Hinglish/English with 1-line explanations + Google-searchable terms:
- **Option A — `[BEST SUGGESTION]` Local Windows Bridge (`127.0.0.1`) + Audited Manual Fallback:** Small, reliable local COM/USB service feeding exact integer milligrams into the web app, with instant audited manual fallback so billing never stops.
- **Option B — Browser `WebSerial` / `WebUSB` Direct:** Zero extra local service (works in Chrome/Edge on Windows after 1-time port permission click) — Google search: `"WebSerial API weighing scale"`.
- **Option C — Manual Entry in v1, Hardware Plug-In in Phase 2:** Ship billing and GST accuracy first, then connect live scale/printer hardware cleanly in Phase 2 once counter workflow is stable.
