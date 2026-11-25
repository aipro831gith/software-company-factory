#!/usr/bin/env node
/**
 * ast-collision-guard.mjs
 * Checks file-lock ownership in .factory/waves/wave-plan.json and scans changed files
 * for merge conflict markers or duplicate top-level exported symbols across wave slices.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function normalizeRel(p) {
  return p.replace(/\\/g, '/').replace(/^\.\//, '');
}

function validateWavePlan(planPath, maxWorkers, maxContextKb) {
  const errors = [];
  if (!fs.existsSync(planPath)) {
    return { skipped: true, errors };
  }
  let plan;
  try {
    plan = JSON.parse(fs.readFileSync(planPath, 'utf8'));
  } catch (e) {
    return { skipped: false, errors: [`Invalid JSON in ${planPath}: ${e.message}`] };
  }

  const waves = Array.isArray(plan.waves) ? plan.waves : [];
  for (const wave of waves) {
    const workers = Array.isArray(wave.workers) ? wave.workers : [];
    if (workers.length > maxWorkers) {
      errors.push(`Wave ${wave.wave_id}: ${workers.length} workers exceed hardware cap (${maxWorkers}).`);
    }
    const seenFiles = new Map();
    const seenExports = new Map();

    for (const w of workers) {
      if ((w.context_budget_kb ?? 0) > maxContextKb) {
        errors.push(`Wave ${wave.wave_id} worker "${w.worker_id}": context ${w.context_budget_kb} KB > ${maxContextKb} KB limit.`);
      }
      const owned = Array.isArray(w.owned_files) ? w.owned_files : [];
      for (const rawFile of owned) {
        const file = normalizeRel(rawFile);
        if (seenFiles.has(file)) {
          errors.push(`File collision in Wave ${wave.wave_id}: "${file}" claimed by both "${seenFiles.get(file)}" and "${w.worker_id}".`);
        } else {
          seenFiles.set(file, w.worker_id);
        }

        const absFile = path.join(REPO_ROOT, file);
        if (fs.existsSync(absFile) && fs.statSync(absFile).isFile()) {
          const content = fs.readFileSync(absFile, 'utf8');
          if (/^(<{7}|={7}|>{7})/m.test(content)) {
            errors.push(`Unresolved conflict markers detected in ${file}.`);
          }
          const exportRegex = /\bexport\s+(?:async\s+)?(?:function|const|class|type|interface)\s+([A-Za-z0-9_]+)/g;
          let m;
          while ((m = exportRegex.exec(content)) !== null) {
            const sym = m[1];
            const prev = seenExports.get(sym);
            if (prev && prev.file !== file && prev.worker !== w.worker_id && wave.enforce_unique_exports) {
              errors.push(`Duplicate exported symbol "${sym}" across ${prev.file} (${prev.worker}) and ${file} (${w.worker_id}).`);
            } else {
              seenExports.set(sym, { file, worker: w.worker_id });
            }
          }
        }
      }
    }
  }
  return { skipped: false, errors };
}

const args = new Set(process.argv.slice(2));
const configPath = path.join(REPO_ROOT, '.factory', 'config.json');
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
const maxWorkers = config.hardware_envelope?.max_concurrent_workers_per_wave ?? 3;
const maxContextKb = config.hardware_envelope?.worker_context_budget_kb ?? 40;

if (args.has('--self-test')) {
  const tmpDir = path.join(REPO_ROOT, '.factory', 'tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  const badPlan = path.join(tmpDir, 'bad-wave-plan.json');
  fs.writeFileSync(
    badPlan,
    JSON.stringify({
      waves: [
        {
          wave_id: 1,
          workers: [
            { worker_id: 'w1', context_budget_kb: 30, owned_files: ['src/billing.ts'] },
            { worker_id: 'w2', context_budget_kb: 30, owned_files: ['src/billing.ts'] },
          ],
        },
      ],
    })
  );
  const res = validateWavePlan(badPlan, maxWorkers, maxContextKb);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  if (res.errors.length === 0) {
    console.error('[FAIL] ast-collision-guard self-test failed to detect collision.');
    process.exit(1);
  }
  console.log('[PASS] ast-collision-guard.mjs self-test verified file collision detection.');
  process.exit(0);
}

const planPath = path.join(REPO_ROOT, '.factory', 'waves', 'wave-plan.json');
const result = validateWavePlan(planPath, maxWorkers, maxContextKb);

if (result.skipped) {
  console.log('[PASS] ast-collision-guard.mjs: No active wave-plan.json present.');
  process.exit(0);
}

if (result.errors.length > 0) {
  for (const err of result.errors) {
    console.error(`[FAIL] ${err}`);
  }
  process.exit(1);
}

console.log('[PASS] ast-collision-guard.mjs: Zero file or symbol collisions detected.');
process.exit(0);
