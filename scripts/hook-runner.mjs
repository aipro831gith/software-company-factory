#!/usr/bin/env node
/**
 * hook-runner.mjs
 * Central fail-closed runner for all 15 guardrail hooks in .agents/hooks.json.
 * Supports: --hook <id>, --all, --self-test, --root <path>, --files <f1,f2>
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const opts = { hook: null, all: false, selfTest: false, root: DEFAULT_ROOT, files: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--hook' && argv[i + 1]) opts.hook = argv[++i];
    else if (argv[i] === '--all') opts.all = true;
    else if (argv[i] === '--self-test') opts.selfTest = true;
    else if (argv[i] === '--root' && argv[i + 1]) opts.root = path.resolve(argv[++i]);
    else if (argv[i] === '--files' && argv[i + 1]) {
      opts.files = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return opts;
}

function collectCodeFiles(rootDir, explicitFiles = []) {
  if (explicitFiles.length > 0) {
    return explicitFiles
      .map((f) => (path.isAbsolute(f) ? f : path.join(rootDir, f)))
      .filter((f) => fs.existsSync(f) && fs.statSync(f).isFile());
  }
  const results = [];
  const skipDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.next', '__pycache__', '.factory']);
  const codeExts = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.sql']);
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) walk(path.join(dir, entry.name));
      } else if (codeExts.has(path.extname(entry.name).toLowerCase())) {
        const fp = path.join(dir, entry.name);
        if (path.basename(fp) !== 'hook-runner.mjs') results.push(fp);
      }
    }
  }
  walk(rootDir);
  return results;
}

function getStagedFiles(rootDir, explicitFiles = []) {
  if (explicitFiles.length > 0) return explicitFiles.map((f) => f.replace(/\\/g, '/'));
  try {
    const out = execFileSync('git', ['diff', '--cached', '--name-only'], {
      cwd: rootDir,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    return out ? out.split(/\r?\n/).filter(Boolean) : [];
  } catch {
    return [];
  }
}

const MONEY_IDENT_RX = /(price|amount|total|subtotal|gst|tax|discount|rate|gold|weight|paise|rupee|inr|balance|ledger|invoice|payment|fee|makingcharge)/i;
const FLOAT_OP_RX = /(parseFloat\s*\(|Number\s*\([^)]*\)\s*[*/+-]|[*/+-]\s*\d*\.\d+|\d+\.\d+\s*[*/+-]|\b(FLOAT|DOUBLE|REAL)\b)/i;

const SECRET_PATTERNS = [
  { name: 'Google API key', rx: /AIza[0-9A-Za-z_-]{35}/ },
  { name: 'OpenAI/Stripe secret key', rx: /\bsk-(?:live|test|proj)?[0-9A-Za-z_-]{20,}/ },
  { name: 'GitHub PAT', rx: /\b(?:ghp|gho|ghu|ghs|ghr)_[0-9A-Za-z]{20,}/ },
  { name: 'AWS Access Key', rx: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'Private Key Header', rx: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'Client-exposed secret env', rx: /\b(?:NEXT_PUBLIC|REACT_APP|VITE)_[A-Z0-9_]*(?:SECRET|PRIVATE|SERVICE_ROLE|PASSWORD)[A-Z0-9_]*\b/ },
];

function runHook(hookId, rootDir, explicitFiles = []) {
  switch (hookId) {
    case 'session-lock-check': {
      const lockPath = path.join(rootDir, '.factory', 'session.lock.json');
      if (!fs.existsSync(lockPath)) return { ok: false, message: 'Missing .factory/session.lock.json' };
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
      if (lock.department !== 'software-company-factory') {
        return { ok: false, message: `Wrong department lock "${lock.department}". End other department first.` };
      }
      if (lock.status !== 'ACTIVE') {
        return { ok: false, message: `Session lock status is "${lock.status}". Run /software-company-factory-start first.` };
      }
      return { ok: true, message: 'Session lock ACTIVE for software-company-factory.' };
    }

    case 'block-eval-usage': {
      const files = collectCodeFiles(rootDir, explicitFiles);
      for (const fp of files) {
        const content = fs.readFileSync(fp, 'utf8');
        if (/\beval\s*\(|\bnew\s+Function\s*\(|vm\.runIn(?:This|New)Context\s*\(/.test(content)) {
          return { ok: false, message: `Unsafe dynamic code execution (eval/Function) found in ${path.relative(rootDir, fp)}` };
        }
      }
      return { ok: true, message: `Scanned ${files.length} file(s): zero eval/Function calls.` };
    }

    case 'block-float-money': {
      const files = collectCodeFiles(rootDir, explicitFiles);
      for (const fp of files) {
        const lines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (/^\s*(\/\/|#|\/\*|\*)/.test(line)) continue;
          if (MONEY_IDENT_RX.test(line) && FLOAT_OP_RX.test(line)) {
            return {
              ok: false,
              message: `Floating-point money/weight math detected at ${path.relative(rootDir, fp)}:${i + 1}. Use integer paise/milligrams, BigInt, or Decimal.`,
            };
          }
        }
      }
      return { ok: true, message: `Scanned ${files.length} file(s): zero floating-point money/weight violations.` };
    }

    case 'block-env-staging': {
      const staged = getStagedFiles(rootDir, explicitFiles);
      const forbidden = staged.filter((f) => {
        const base = path.basename(f);
        if (base === '.env.example') return false;
        return base === '.env' || base.startsWith('.env.') || /\.(pem|key|p12|pfx)$/i.test(base) || base === 'credentials.json' || base.startsWith('id_rsa');
      });
      if (forbidden.length > 0) {
        return { ok: false, message: `Blocked sensitive files from staging/commit: ${forbidden.join(', ')}` };
      }
      return { ok: true, message: 'Zero .env or private key files staged.' };
    }

    case 'block-hardcoded-secrets': {
      const files = collectCodeFiles(rootDir, explicitFiles);
      for (const fp of files) {
        const content = fs.readFileSync(fp, 'utf8');
        for (const pat of SECRET_PATTERNS) {
          if (pat.rx.test(content)) {
            return { ok: false, message: `Potential secret (${pat.name}) detected in ${path.relative(rootDir, fp)}` };
          }
        }
      }
      return { ok: true, message: `Scanned ${files.length} file(s): zero hardcoded secrets detected.` };
    }

    case 'block-assumed-spec-done': {
      const specsDir = path.join(rootDir, 'docs', 'specs');
      const gatesDir = path.join(rootDir, '.factory', 'gates');
      if (fs.existsSync(specsDir)) {
        for (const f of fs.readdirSync(specsDir).filter((x) => x.endsWith('.md'))) {
          const txt = fs.readFileSync(path.join(specsDir, f), 'utf8');
          const statusMatch = txt.match(/^Status:\s*(.+)$/im);
          const buildMatch = txt.match(/^BuildState:\s*(.+)$/im);
          if (statusMatch && /ASSUMED|DRAFT/i.test(statusMatch[1]) && buildMatch && /DONE/i.test(buildMatch[1])) {
            return { ok: false, message: `Spec 0001 violation: ${f} has BuildState DONE while Status is ${statusMatch[1].trim()}.` };
          }
        }
      }
      if (fs.existsSync(gatesDir)) {
        for (const f of fs.readdirSync(gatesDir).filter((x) => x.endsWith('.gate.json'))) {
          const g = JSON.parse(fs.readFileSync(path.join(gatesDir, f), 'utf8'));
          if (g.status === 'PASS' && (g.tier === 'Medium' || g.tier === 'Full') && g.spec_status !== 'APPROVED') {
            return { ok: false, message: `Spec 0001 violation: ${f} cannot PASS with spec_status "${g.spec_status}".` };
          }
        }
      }
      return { ok: true, message: 'Spec 0001 check passed (no ASSUMED specs marked DONE).' };
    }

    case 'block-unsourced-values': {
      const specsDir = path.join(rootDir, 'docs', 'specs');
      if (fs.existsSync(specsDir)) {
        for (const f of fs.readdirSync(specsDir).filter((x) => x.endsWith('.md'))) {
          const txt = fs.readFileSync(path.join(specsDir, f), 'utf8');
          if (/Tier:\s*(Medium|Full)/i.test(txt)) {
            if (!/Value Sourcing/i.test(txt)) {
              return { ok: false, message: `Spec 0002 violation: ${f} is Medium/Full tier but missing Value Sourcing section.` };
            }
            if (/\|\s*(TBD|UNKNOWN|ASSUMED)\s*\|/i.test(txt)) {
              return { ok: false, message: `Spec 0002 violation: ${f} contains TBD/UNKNOWN/ASSUMED value source.` };
            }
          }
        }
      }
      return { ok: true, message: 'Spec 0002 check passed (all Medium/Full spec values sourced).' };
    }

    case 'pre-commit-portability': {
      execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'check-portability.mjs')], { cwd: rootDir, stdio: 'pipe' });
      return { ok: true, message: 'check-portability.mjs passed.' };
    }

    case 'pre-commit-ast-collision': {
      execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'ast-collision-guard.mjs')], { cwd: rootDir, stdio: 'pipe' });
      return { ok: true, message: 'ast-collision-guard.mjs passed.' };
    }

    case 'pre-commit-lint-typecheck': {
      const scriptsDir = path.join(rootDir, 'scripts');
      if (fs.existsSync(scriptsDir)) {
        for (const f of fs.readdirSync(scriptsDir).filter((x) => x.endsWith('.mjs'))) {
          execFileSync(process.execPath, ['--check', path.join(scriptsDir, f)], { cwd: rootDir, stdio: 'pipe' });
        }
      }
      return { ok: true, message: 'Node syntax check passed for factory scripts.' };
    }

    case 'pre-commit-unit-tests': {
      const pkgPath = path.join(rootDir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        if (pkg.scripts && pkg.scripts.test && !/no test specified/i.test(pkg.scripts.test)) {
          execFileSync('npm', ['test'], { cwd: rootDir, stdio: 'pipe', shell: true });
          return { ok: true, message: 'npm test passed.' };
        }
      }
      return { ok: true, message: 'No target package test suite yet (Mother Factory baseline).' };
    }

    case 'post-wave-git-checkpoint': {
      execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'git-checkpoint.mjs'), 'status'], { cwd: rootDir, stdio: 'pipe' });
      return { ok: true, message: 'Git checkpoint status verified.' };
    }

    case 'pre-release-security-gate': {
      for (const subHook of ['block-eval-usage', 'block-float-money', 'block-hardcoded-secrets']) {
        const res = runHook(subHook, rootDir, explicitFiles);
        if (!res.ok) return res;
      }
      return { ok: true, message: 'Built-in static security gate passed.' };
    }

    case 'pre-deploy-gate-verify': {
      execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'gate-check.mjs'), '--all'], { cwd: rootDir, stdio: 'pipe' });
      return { ok: true, message: 'gate-check.mjs --all passed.' };
    }

    case 'block-unapproved-deploy': {
      const lockPath = path.join(rootDir, '.factory', 'session.lock.json');
      const gatePath = path.join(rootDir, '.factory', 'gates', 'deploy-approval.gate.json');
      const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {};
      const gate = fs.existsSync(gatePath) ? JSON.parse(fs.readFileSync(gatePath, 'utf8')) : {};
      if (lock.deploy_approved_by_founder !== true || gate.status !== 'PASS' || gate.manual_boss_confirm !== true) {
        return { ok: false, message: 'Production deploy blocked: explicit manual Boss /scf-deploy approval is required.' };
      }
      return { ok: true, message: 'Manual Boss deploy approval verified.' };
    }

    default:
      return { ok: false, message: `Unknown hook "${hookId}"` };
  }
}

function runSelfTest() {
  const tmpRoot = path.join(DEFAULT_ROOT, '.factory', 'tmp', 'hook-self-test');
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  fs.mkdirSync(path.join(tmpRoot, '.factory', 'gates'), { recursive: true });
  fs.mkdirSync(path.join(tmpRoot, 'docs', 'specs'), { recursive: true });
  fs.mkdirSync(path.join(tmpRoot, 'src'), { recursive: true });

  const results = [];
  const expect = (label, shouldPass, res) => {
    const passed = res.ok === shouldPass;
    results.push({ label, passed, detail: res.message });
    if (!passed) {
      console.error(`[FAIL] Self-test "${label}": expected ok=${shouldPass}, got ok=${res.ok} (${res.message})`);
    } else {
      console.log(`[PASS] Self-test "${label}": ${res.message}`);
    }
  };

  // 1. session-lock-check
  fs.writeFileSync(path.join(tmpRoot, '.factory', 'session.lock.json'), JSON.stringify({ department: 'software-company-factory', status: 'ACTIVE', deploy_approved_by_founder: false }));
  expect('session-lock ACTIVE', true, runHook('session-lock-check', tmpRoot));
  fs.writeFileSync(path.join(tmpRoot, '.factory', 'session.lock.json'), JSON.stringify({ department: 'software-company-factory', status: 'ENDED' }));
  expect('session-lock ENDED blocks', false, runHook('session-lock-check', tmpRoot));

  // 2. block-float-money
  const badGst = path.join(tmpRoot, 'src', 'badGst.js');
  const goodGst = path.join(tmpRoot, 'src', 'goodGst.js');
  fs.writeFileSync(badGst, 'const gstAmount = totalPrice * 0.03;\n');
  fs.writeFileSync(goodGst, 'const gstPaise = (totalPaise * 3n) / 100n;\n');
  expect('block-float-money traps float GST', false, runHook('block-float-money', tmpRoot, [badGst]));
  expect('block-float-money allows BigInt paise', true, runHook('block-float-money', tmpRoot, [goodGst]));

  // 3. block-eval-usage
  const badEval = path.join(tmpRoot, 'src', 'badEval.js');
  fs.writeFileSync(badEval, 'const x = eval("1+1");\n');
  expect('block-eval-usage traps eval()', false, runHook('block-eval-usage', tmpRoot, [badEval]));

  // 4. block-env-staging
  expect('block-env-staging traps .env', false, runHook('block-env-staging', tmpRoot, ['.env.local']));
  expect('block-env-staging allows .env.example', true, runHook('block-env-staging', tmpRoot, ['.env.example']));

  // 5. block-hardcoded-secrets
  const badSec = path.join(tmpRoot, 'src', 'secret.js');
  const fakeTok = ['AIza', 'SyDummyTestKey12345678901234567890123'].join('');
  fs.writeFileSync(badSec, `const k = "${fakeTok}";\n`);
  expect('block-hardcoded-secrets traps API key', false, runHook('block-hardcoded-secrets', tmpRoot, [badSec]));

  // 6. block-assumed-spec-done & block-unsourced-values
  fs.writeFileSync(path.join(tmpRoot, 'docs', 'specs', 'SPEC-001.md'), 'Tier: Full\nStatus: ASSUMED\nBuildState: DONE\n');
  expect('block-assumed-spec-done traps ASSUMED+DONE', false, runHook('block-assumed-spec-done', tmpRoot));
  expect('block-unsourced-values traps missing Value Sourcing', false, runHook('block-unsourced-values', tmpRoot));

  // 7. block-unapproved-deploy
  expect('block-unapproved-deploy blocks without Boss approval', false, runHook('block-unapproved-deploy', tmpRoot));

  // 8. Repo-wide portability & syntax self-checks
  expect('pre-commit-portability on Mother Factory', true, runHook('pre-commit-portability', DEFAULT_ROOT));
  expect('pre-commit-lint-typecheck on Mother Factory', true, runHook('pre-commit-lint-typecheck', DEFAULT_ROOT));
  expect('pre-commit-ast-collision on Mother Factory', true, runHook('pre-commit-ast-collision', DEFAULT_ROOT));

  fs.rmSync(tmpRoot, { recursive: true, force: true });
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\nSelf-test summary: ${results.length - failed}/${results.length} checks passed.`);
  process.exit(failed === 0 ? 0 : 1);
}

const opts = parseArgs(process.argv.slice(2));
if (opts.selfTest) {
  runSelfTest();
} else if (opts.all) {
  const hooksJson = JSON.parse(fs.readFileSync(path.join(opts.root, '.agents', 'hooks.json'), 'utf8'));
  let failures = 0;
  for (const h of hooksJson.hooks) {
    try {
      const res = runHook(h.id, opts.root, opts.files);
      if (res.ok) console.log(`[PASS] ${h.id}: ${res.message}`);
      else {
        console.error(`[FAIL] ${h.id}: ${res.message}`);
        failures++;
      }
    } catch (e) {
      console.error(`[FAIL] ${h.id}: ${e.message}`);
      failures++;
    }
  }
  process.exit(failures === 0 ? 0 : 1);
} else if (opts.hook) {
  try {
    const res = runHook(opts.hook, opts.root, opts.files);
    if (res.ok) {
      console.log(`[PASS] ${opts.hook}: ${res.message}`);
      process.exit(0);
    }
    console.error(`[FAIL] ${opts.hook}: ${res.message}`);
    process.exit(1);
  } catch (e) {
    console.error(`[FAIL] ${opts.hook}: ${e.message}`);
    process.exit(1);
  }
} else {
  console.error('Usage: node scripts/hook-runner.mjs <--hook id | --all | --self-test>');
  process.exit(1);
}
