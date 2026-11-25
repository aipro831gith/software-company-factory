# Hardware, Scale & IoT Safety Checklist (`references/iot-safety-checklist.md`)

Activate ONLY for projects connecting to weighing scales, thermal/barcode printers, RFID readers, POS terminals, or embedded firmware:

- [ ] **Packet Integrity:** Complete frame delimiter + stable-reading check before accepting weight/sensor data.
- [ ] **Integer Milligram Conversion:** Convert weight readings immediately to integer `mg` (zero float arithmetic).
- [ ] **Audit Trail on Manual Override:** Log `weight_source`, `user_id`, and `reason` whenever live scale reading is overridden.
- [ ] **Disconnect Resilience:** Hardware timeout (< 3s) never hangs UI or corrupts an in-progress invoice transaction.
- [ ] **Localhost-Only Bridge:** Local Windows USB/COM port helpers bind strictly to `127.0.0.1` with origin/token validation.
- [ ] **Hardware Simulator Tests:** `tests/` covers corrupted packet, mid-read unplug, and boundary weight (`1 mg` to max scale load).
