#!/usr/bin/env node
/**
 * gate-check.mjs
 * Evaluates .factory/gates/<feature>.gate.json against workflow tier requirements.
 * Exits non-zero (fail-closed) if any required gate is missing or FAIL.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const opts = { all: false, feature: null, requireAtLeastOne: false, gatesDir: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--all') opts.all = true;
    else if (argv[i] === '--feature' && argv[i + 1]) opts.feature = argv[++i];
    else if (argv[i] === '--require-at-least-one') opts.requireAtLeastOne = true;
    else if (argv[i] === '--gates-dir' && argv[i + 1]) opts.gatesDir = path.resolve(argv[++i]);
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
const configPath = path.join(REPO_ROOT, '.factory', 'config.json');
const gatesDir = opts.gatesDir || path.join(REPO_ROOT, '.factory', 'gates');

if (!fs.existsSync(configPath)) {
  console.error('[FAIL] Missing .factory/config.json');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const tierRules = config.tiers || {};

function evaluateGateFile(filePath) {
  const name = path.basename(filePath);
  let gate;
  try {
    gate = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return { ok: false, name, reason: `Invalid JSON: ${e.message}` };
  }

  const tier = gate.tier;
  if (!tier || !tierRules[tier]) {
    return { ok: false, name, reason: `Unknown or missing tier "${tier}"` };
  }

  const req = tierRules[tier];
  if (gate.status !== 'PASS') {
    return { ok: false, name, reason: `Gate status is "${gate.status}" (expected "PASS")` };
  }
  if ((gate.open_blockers ?? 0) > 0) {
    return { ok: false, name, reason: `${gate.open_blockers} open BLOCKER bug ticket(s) remain` };
  }
  if ((gate.checks_passed ?? 0) < req.required_checks) {
    return { ok: false, name, reason: `checks_passed (${gate.checks_passed ?? 0}) < required (${req.required_checks} for ${tier})` };
  }
  if (req.require_spec_approval && gate.spec_status !== 'APPROVED') {
    return { ok: false, name, reason: `Spec 0001 violation: spec_status is "${gate.spec_status}" (must be "APPROVED" for ${tier})` };
  }
  if (req.require_blind_review && gate.blind_review_status !== 'PASS') {
    return { ok: false, name, reason: `Full tier requires blind_review_status === "PASS"` };
  }
  if (!Array.isArray(gate.evidence) || gate.evidence.length === 0) {
    return { ok: false, name, reason: 'Missing live runtime evidence array' };
  }

  return { ok: true, name, tier, checks_passed: gate.checks_passed };
}

if (!fs.existsSync(gatesDir)) {
  console.error(`[FAIL] Gates directory not found: ${gatesDir}`);
  process.exit(1);
}

if (opts.feature) {
  const fp = path.join(gatesDir, `${opts.feature}.gate.json`);
  if (!fs.existsSync(fp)) {
    console.error(`[FAIL] Missing gate file: ${fp}`);
    process.exit(1);
  }
  const res = evaluateGateFile(fp);
  if (!res.ok) {
    console.error(`[FAIL] ${res.name}: ${res.reason}`);
    process.exit(1);
  }
  console.log(`[PASS] ${res.name} (tier=${res.tier}, checks=${res.checks_passed})`);
  process.exit(0);
}

const files = fs
  .readdirSync(gatesDir)
  .filter((f) => f.endsWith('.gate.json'))
  .map((f) => path.join(gatesDir, f));

if (files.length === 0) {
  if (opts.requireAtLeastOne) {
    console.error('[FAIL] No .gate.json files found in .factory/gates/');
    process.exit(1);
  }
  console.log('[PASS] No feature .gate.json files present yet (Mother Factory baseline).');
  process.exit(0);
}

let failures = 0;
for (const fp of files) {
  const res = evaluateGateFile(fp);
  if (res.ok) {
    console.log(`[PASS] ${res.name} (tier=${res.tier}, checks=${res.checks_passed})`);
  } else {
    console.error(`[FAIL] ${res.name}: ${res.reason}`);
    failures++;
  }
}

process.exit(failures === 0 ? 0 : 1);
