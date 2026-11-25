#!/usr/bin/env python3
"""
ui-search-bridge.py
Local zero-internet UI/UX Pro Max style, color palette, and typography search bridge
used by the Frontend Lead Orchestrator during planning.
"""
import argparse
import csv
import json
from pathlib import Path

BUILTIN_PATTERNS = [
    {
        "id": "jewelry-royal-gold",
        "domain": "jewelry erp retail billing pos",
        "style": "Warm Editorial Ledger with High-Contrast Trust",
        "palette": {
            "primary": "#8A5A00",
            "accent": "#C8962E",
            "background": "#FCFBF7",
            "surface": "#FFFFFF",
            "text": "#1C1917",
            "success": "#15803D",
            "danger": "#B91C1C",
        },
        "fonts": {"heading": "Plus Jakarta Sans", "body": "Inter", "numeric": "JetBrains Mono"},
        "notes": "Tabular numerals required for gold weights (mg) and INR/paise totals; WCAG AA contrast >= 4.5:1.",
    },
    {
        "id": "fintech-trust-navy",
        "domain": "banking finance accounting ledger gst invoice",
        "style": "Crisp Institutional Grid",
        "palette": {
            "primary": "#0F3D6E",
            "accent": "#0EA5E9",
            "background": "#F8FAFC",
            "surface": "#FFFFFF",
            "text": "#0F172A",
            "success": "#047857",
            "danger": "#DC2626",
        },
        "fonts": {"heading": "Inter", "body": "Inter", "numeric": "IBM Plex Mono"},
        "notes": "Ideal for GST reports, trial balance, and high-density tables with clear row zebra striping.",
    },
    {
        "id": "clean-saas-emerald",
        "domain": "inventory crm dashboard analytics admin",
        "style": "Modern Modular Bento Workspace",
        "palette": {
            "primary": "#065F46",
            "accent": "#10B981",
            "background": "#F9FAFB",
            "surface": "#FFFFFF",
            "text": "#111827",
            "success": "#059669",
            "danger": "#E11D48",
        },
        "fonts": {"heading": "Outfit", "body": "Inter", "numeric": "JetBrains Mono"},
        "notes": "Fast keyboard-first navigation with sticky action bar and responsive card collapse.",
    },
    {
        "id": "fast-pos-counter",
        "domain": "calculator quick billing counter mobile shop",
        "style": "Large Touch-Friendly Counter UI",
        "palette": {
            "primary": "#1E293B",
            "accent": "#D97706",
            "background": "#FFFFFF",
            "surface": "#F1F5F9",
            "text": "#0F172A",
            "success": "#16A34A",
            "danger": "#DC2626",
        },
        "fonts": {"heading": "DM Sans", "body": "DM Sans", "numeric": "Roboto Mono"},
        "notes": "48px minimum button height for fast shop-counter entry and instant live GST breakdown.",
    },
]


def load_external_catalog(repo_root: Path):
    catalog_dir = repo_root / ".factory" / "ui-catalog"
    items = []
    if not catalog_dir.exists():
        return items
    for fp in catalog_dir.glob("*.csv"):
        with fp.open("r", encoding="utf-8", errors="ignore") as f:
            reader = csv.DictReader(f)
            for row in reader:
                items.append(dict(row))
    for fp in catalog_dir.glob("*.json"):
        try:
            data = json.loads(fp.read_text(encoding="utf-8"))
            if isinstance(data, list):
                items.extend(data)
        except Exception:
            pass
    return items


def score_match(query_tokens, entry):
    blob = json.dumps(entry).lower()
    return sum(1 for tok in query_tokens if tok in blob)


def main():
    parser = argparse.ArgumentParser(description="Local UI/UX Pro Max design search bridge")
    parser.add_argument("--query", required=True, help="Search keywords (e.g., 'jewelry erp billing')")
    parser.add_argument("--limit", type=int, default=3, help="Max results to return")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    catalog = BUILTIN_PATTERNS + load_external_catalog(repo_root)
    tokens = [t.strip().lower() for t in args.query.split() if t.strip()]

    ranked = sorted(catalog, key=lambda item: score_match(tokens, item), reverse=True)
    top = ranked[: max(1, args.limit)]

    if args.json:
        print(json.dumps({"query": args.query, "results": top}, indent=2))
    else:
        print(f"UI/UX Search Results for: '{args.query}'")
        for idx, item in enumerate(top, 1):
            print(f"\n[{idx}] {item.get('id', item.get('name', 'pattern'))} - {item.get('style', '')}")
            if "palette" in item:
                print(f"    Palette: {item['palette']}")
            if "fonts" in item:
                print(f"    Fonts:   {item['fonts']}")
            if "notes" in item:
                print(f"    Notes:   {item['notes']}")


if __name__ == "__main__":
    main()
