#!/usr/bin/env node
/**
 * analyze-token-usage.mjs
 * Reports wave context slice sizes, model slot assignments, bug retry load, and hot-path budgets.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function readJsonSafe(fp) {
  if (!fs.existsSync(fp)) return null;
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch {
    return null;
  }
}

const config = readJsonSafe(path.join(REPO_ROOT, '.factory', 'config.json')) || {};
const models = readJsonSafe(path.join(REPO_ROOT, '.factory', 'models.json')) || {};
const wavePlan = readJsonSafe(path.join(REPO_ROOT, '.factory', 'waves', 'wave-plan.json'));
const ticketsDir = path.join(REPO_ROOT, '.factory', 'tickets');

console.log('=== software-company-factory :: Context & Slot Usage Report ===');
console.log(`Routing Mode: ${models.routing_mode || 'UNKNOWN'} (UI Override: ${models.allow_founder_ui_model_selection ?? false})`);

const slotNames = Object.keys(models.slots || {});
console.log(`Configured Abstract Slots (${slotNames.length}): ${slotNames.join(', ')}`);

const budgetKb = config.hardware_envelope?.worker_context_budget_kb ?? 40;
let violations = 0;

if (wavePlan && Array.isArray(wavePlan.waves)) {
  console.log(`\nWave Plan Summary (${wavePlan.waves.length} waves, worker slice cap <= ${budgetKb} KB):`);
  for (const w of wavePlan.waves) {
    const workers = Array.isArray(w.workers) ? w.workers : [];
    const totalKb = workers.reduce((acc, x) => acc + (x.context_budget_kb || 0), 0);
    console.log(`  Wave ${w.wave_id}: ${workers.length} workers, combined slice = ${totalKb} KB`);
    for (const worker of workers) {
      const kb = worker.context_budget_kb || 0;
      const flag = kb > budgetKb ? ' [OVER BUDGET]' : '';
      if (kb > budgetKb) violations++;
      console.log(`    - ${worker.worker_id} (slot=${worker.model_slot || 'worker_slot'}): ${kb} KB${flag}`);
    }
  }
} else {
  console.log('\nWave Plan: No active wave-plan.json yet.');
}

if (fs.existsSync(ticketsDir)) {
  const tickets = fs.readdirSync(ticketsDir).filter((f) => f.endsWith('.json'));
  console.log(`\nBug Tickets (${tickets.length}):`);
  for (const t of tickets) {
    const data = readJsonSafe(path.join(ticketsDir, t));
    if (data) {
      console.log(`  - ${data.ticket_id || t}: status=${data.status}, owner=${data.owner_agent}, attempts=${data.attempt_count}/${data.max_attempts}`);
    }
  }
}

process.exit(violations === 0 ? 0 : 1);
