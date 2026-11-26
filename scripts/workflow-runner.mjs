#!/usr/bin/env node
/**
 * workflow-runner.mjs
 * Pre-built Free-Plan-Proof deterministic workflow engine for software-company-factory v2.0.
 * Mirrors native /run-workflow and /swarm wave execution locally using:
 *   - .factory/waves/wave-plan.json
 *   - .factory/skills-registry.json
 *   - .factory/board/messages.jsonl
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const opts = { status: false, selfTest: false, logEvent: false, agent: 'coordinator', event: 'NOTE', detail: '', plan: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--status') opts.status = true;
    else if (argv[i] === '--self-test') opts.selfTest = true;
    else if (argv[i] === '--log-event') opts.logEvent = true;
    else if (argv[i] === '--agent' && argv[i + 1]) opts.agent = argv[++i];
    else if (argv[i] === '--event' && argv[i + 1]) opts.event = argv[++i];
    else if (argv[i] === '--detail' && argv[i + 1]) opts.detail = argv[++i];
    else if (argv[i] === '--plan' && argv[i + 1]) opts.plan = path.resolve(argv[++i]);
  }
  return opts;
}

function readJson(fp) {
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function appendBoardMessage(boardPath, entry) {
  fs.mkdirSync(path.dirname(boardPath), { recursive: true });
  let nextSeq = 1;
  if (fs.existsSync(boardPath)) {
    const lines = fs.readFileSync(boardPath, 'utf8').split(/\r?\n/).filter(Boolean);
    nextSeq = lines.length + 1;
  }
  const record = {
    seq: nextSeq,
    ts: new Date().toISOString(),
    agent: entry.agent || 'coordinator',
    event: entry.event || 'UPDATE',
    detail: entry.detail || '',
  };
  fs.appendFileSync(boardPath, JSON.stringify(record) + '\n', 'utf8');
  return record;
}

function validateWavePlanWithRegistry(planPath, config, registry) {
  const errors = [];
  if (!fs.existsSync(planPath)) {
    return { skipped: true, errors, waves: 0, workers: 0 };
  }
  const plan = readJson(planPath);
  const maxWorkers = config.hardware_envelope?.max_concurrent_workers_per_wave ?? 5;
  const maxContextKb = config.hardware_envelope?.worker_context_budget_kb ?? 40;
  const validAgentIds = new Set((registry.agents || []).map((a) => a.id));

  const waves = Array.isArray(plan.waves) ? plan.waves : [];
  let totalWorkers = 0;
  for (const wave of waves) {
    const workers = Array.isArray(wave.workers) ? wave.workers : [];
    totalWorkers += workers.length;
    if (workers.length > maxWorkers) {
      errors.push(`Wave ${wave.wave_id}: ${workers.length} workers exceed burst cap (${maxWorkers}).`);
    }
    const ownedInWave = new Set();
    for (const w of workers) {
      if ((w.context_budget_kb ?? 0) > maxContextKb) {
        errors.push(`Worker "${w.worker_id}": context ${w.context_budget_kb} KB > ${maxContextKb} KB cap.`);
      }
      if (w.agent_id !== undefined && !validAgentIds.has(w.agent_id)) {
        errors.push(`Worker "${w.worker_id}": unknown agent_id ${w.agent_id}.`);
      }
      for (const f of w.owned_files || []) {
        const norm = f.replace(/\\/g, '/');
        if (ownedInWave.has(norm)) {
          errors.push(`Wave ${wave.wave_id}: duplicate file ownership "${norm}".`);
        }
        ownedInWave.add(norm);
      }
    }
  }
  return { skipped: false, errors, waves: waves.length, workers: totalWorkers };
}

const opts = parseArgs(process.argv.slice(2));
const configPath = path.join(REPO_ROOT, '.factory', 'config.json');
const registryPath = path.join(REPO_ROOT, '.factory', 'skills-registry.json');
const boardPath = path.join(REPO_ROOT, '.factory', 'board', 'messages.jsonl');

const config = readJson(configPath);
const registry = readJson(registryPath);

if (opts.selfTest) {
  const tmpDir = path.join(REPO_ROOT, '.factory', 'tmp', 'workflow-self-test');
  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  const testBoard = path.join(tmpDir, 'messages.jsonl');
  const rec = appendBoardMessage(testBoard, { agent: 'backend-lead', event: 'TASK_DONE', detail: 'self-test ok' });
  if (rec.seq !== 1) {
    console.error('[FAIL] workflow-runner self-test failed to append JSONL seq=1.');
    process.exit(1);
  }

  const goodPlan = path.join(tmpDir, 'good-wave.json');
  fs.writeFileSync(
    goodPlan,
    JSON.stringify({
      waves: [
        {
          wave_id: 1,
          workers: [
            { worker_id: 'db-1', agent_id: 8, context_budget_kb: 24, owned_files: ['src/db/schema.ts'] },
            { worker_id: 'be-1', agent_id: 7, context_budget_kb: 32, owned_files: ['src/server/gst.ts'] },
            { worker_id: 'fe-1', agent_id: 6, context_budget_kb: 28, owned_files: ['src/web/calc.tsx'] },
          ],
        },
      ],
    })
  );
  const okRes = validateWavePlanWithRegistry(goodPlan, config, registry);
  if (okRes.errors.length > 0) {
    console.error(`[FAIL] workflow-runner self-test rejected valid plan: ${okRes.errors.join('; ')}`);
    process.exit(1);
  }

  const badPlan = path.join(tmpDir, 'bad-wave.json');
  fs.writeFileSync(
    badPlan,
    JSON.stringify({
      waves: [
        {
          wave_id: 1,
          workers: [
            { worker_id: 'w1', agent_id: 6, context_budget_kb: 10, owned_files: ['src/a.ts'] },
            { worker_id: 'w2', agent_id: 6, context_budget_kb: 10, owned_files: ['src/b.ts'] },
            { worker_id: 'w3', agent_id: 7, context_budget_kb: 10, owned_files: ['src/c.ts'] },
            { worker_id: 'w4', agent_id: 7, context_budget_kb: 10, owned_files: ['src/d.ts'] },
            { worker_id: 'w5', agent_id: 8, context_budget_kb: 10, owned_files: ['src/e.ts'] },
            { worker_id: 'w6', agent_id: 10, context_budget_kb: 10, owned_files: ['src/f.ts'] },
          ],
        },
      ],
    })
  );
  const badRes = validateWavePlanWithRegistry(badPlan, config, registry);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  if (badRes.errors.length === 0) {
    console.error('[FAIL] workflow-runner self-test failed to enforce max 5 burst worker cap.');
    process.exit(1);
  }

  console.log('[PASS] workflow-runner.mjs self-test passed (JSONL board append, domain check, 5-worker burst cap).');
  process.exit(0);
}

if (opts.logEvent) {
  const rec = appendBoardMessage(boardPath, { agent: opts.agent, event: opts.event, detail: opts.detail });
  console.log(`[PASS] Logged board event #${rec.seq} (${rec.agent}:${rec.event})`);
  process.exit(0);
}

const planPath = opts.plan || path.join(REPO_ROOT, '.factory', 'waves', 'wave-plan.json');
const res = validateWavePlanWithRegistry(planPath, config, registry);
const boardLines = fs.existsSync(boardPath) ? fs.readFileSync(boardPath, 'utf8').split(/\r?\n/).filter(Boolean).length : 0;

if (res.errors.length > 0) {
  for (const err of res.errors) console.error(`[FAIL] ${err}`);
  process.exit(1);
}

console.log(
  `[PASS] workflow-runner.mjs :: agents=${registry.agents.length}, board_events=${boardLines}, ` +
    `default_workers=${config.hardware_envelope?.default_concurrent_workers_per_wave ?? 3}, ` +
    `burst_max=${config.hardware_envelope?.max_concurrent_workers_per_wave ?? 5}, ` +
    `active_waves=${res.waves}`
);
process.exit(0);
