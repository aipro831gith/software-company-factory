# UI/UX Pro Max Design Bridge (`references/ui-ux-pro-max.md`)

Used exclusively by **Agent #4 (Frontend Lead Orchestrator)** in Wave 1 via:

```powershell
python scripts/ui-search-bridge.py --query "<domain keywords>" --limit 3
```

## Non-Negotiable Visual Quality Rules
1. **Indian Business Clarity First:** Clear labels (INR `₹` with Indian comma grouping `1,23,456.00`, grams `10.500 g`), `tabular-nums` monospace alignment for every price/weight column, and crisp print-ready invoice layout.
2. **Contrast & Touch Targets:** Minimum `4.5:1` text contrast (WCAG AA) and minimum `44px–48px` clickable button height for fast shop-counter or mobile usage.
3. **No Generic Clutter:** Stick to the 1 selected palette and 1 font pairing returned by `ui-search-bridge.py`; avoid noisy animations that slow down billing counters.
4. **Explicit Loading, Empty & Error States:** Every table and form must show clear plain-language feedback on slow network or validation errors.
