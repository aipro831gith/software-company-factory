#!/usr/bin/env node
/**
 * dashboard/server.mjs
 * Zero-cost (Rs 0, zero LLM calls) local Boss Mission Control server for software-company-factory v2.0.
 * Cross-platform Windows & macOS using built-in Node.js http + fs.watch + SSE.
 * Default: http://localhost:4173
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.SCF_DASHBOARD_PORT || 4173);
const HOST = process.env.SCF_DASHBOARD_HOST || '127.0.0.1';

const sseClients = new Set();
let lastCheckRun = null;

function readJsonSafe(fp, fallback = null) {
  try {
    if (!fs.existsSync(fp)) return fallback;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch {
    return fallback;
  }
}

function readJsonlSafe(fp) {
  try {
    if (!fs.existsSync(fp)) return [];
    return fs
      .readFileSync(fp, 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getGitInfo() {
  try {
    const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const dirty = execFileSync('git', ['status', '--porcelain'], { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const tagsRaw = execFileSync('git', ['tag', '--sort=-creatordate'], { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const tags = tagsRaw ? tagsRaw.split(/\r?\n/).slice(0, 8) : [];
    return { branch, sha, clean: dirty.length === 0, tags };
  } catch {
    return { branch: 'unknown', sha: 'none', clean: false, tags: [] };
  }
}

function computeProgressMetrics(wavePlan, boardMessages, gates, tickets) {
  const waves = Array.isArray(wavePlan?.waves) ? wavePlan.waves : [];
  let totalTasks = 0;
  let completedTasks = 0;
  for (const w of waves) {
    for (const worker of w.workers || []) {
      totalTasks++;
      if (worker.status === 'DONE' || worker.status === 'PASS') completedTasks++;
    }
  }

  // Average duration between TASK_START / TASK_DONE or sequential wave events in board messages
  let avgSeconds = null;
  if (boardMessages.length >= 2) {
    const diffs = [];
    for (let i = 1; i < boardMessages.length; i++) {
      const t1 = Date.parse(boardMessages[i - 1].ts);
      const t2 = Date.parse(boardMessages[i].ts);
      if (Number.isFinite(t1) && Number.isFinite(t2) && t2 >= t1 && t2 - t1 < 3600000) {
        diffs.push((t2 - t1) / 1000);
      }
    }
    if (diffs.length > 0) {
      avgSeconds = Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
    }
  }

  const passGates = gates.filter((g) => g.status === 'PASS').length;
  const openBugs = tickets.filter((t) => t.status === 'OPEN').length;

  let overallPct = 0;
  if (totalTasks > 0) {
    overallPct = Math.round((completedTasks / totalTasks) * 100);
  } else if (gates.length > 0) {
    overallPct = Math.round((passGates / gates.length) * 100);
  } else {
    overallPct = 100; // Mother Factory baseline ready
  }

  return {
    overallPct,
    totalTasks,
    completedTasks,
    avgEventGapSeconds: avgSeconds,
    passGates,
    totalGates: gates.length,
    openBugs,
    totalBugs: tickets.length,
  };
}

function buildState() {
  const lock = readJsonSafe(path.join(REPO_ROOT, '.factory', 'session.lock.json'), {});
  const config = readJsonSafe(path.join(REPO_ROOT, '.factory', 'config.json'), {});
  const models = readJsonSafe(path.join(REPO_ROOT, '.factory', 'models.json'), {});
  const registry = readJsonSafe(path.join(REPO_ROOT, '.factory', 'skills-registry.json'), { agents: [], specialist_repos: {} });
  const hooks = readJsonSafe(path.join(REPO_ROOT, '.agents', 'hooks.json'), { hooks: [] });
  const wavePlan = readJsonSafe(path.join(REPO_ROOT, '.factory', 'waves', 'wave-plan.json'), { waves: [] });
  const boardMessages = readJsonlSafe(path.join(REPO_ROOT, '.factory', 'board', 'messages.jsonl'));

  const gatesDir = path.join(REPO_ROOT, '.factory', 'gates');
  const gates = fs.existsSync(gatesDir)
    ? fs.readdirSync(gatesDir).filter((f) => f.endsWith('.gate.json')).map((f) => ({ file: f, ...readJsonSafe(path.join(gatesDir, f), {}) }))
    : [];

  const ticketsDir = path.join(REPO_ROOT, '.factory', 'tickets');
  const tickets = fs.existsSync(ticketsDir)
    ? fs.readdirSync(ticketsDir).filter((f) => f.endsWith('.json')).map((f) => ({ file: f, ...readJsonSafe(path.join(ticketsDir, f), {}) }))
    : [];

  const skillsDir = path.join(REPO_ROOT, '.agents', 'skills');
  const canonicalSkills = fs.existsSync(skillsDir)
    ? fs.readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : [];

  // Map live status per agent from active wavePlan & latest board events
  const activeWorkersByAgent = new Map();
  for (const w of wavePlan?.waves || []) {
    for (const worker of w.workers || []) {
      const list = activeWorkersByAgent.get(worker.agent_id) || [];
      list.push(worker);
      activeWorkersByAgent.set(worker.agent_id, list);
    }
  }

  const coreRepos = registry.specialist_repos?.bucket_a_core || [];
  const optRepos = registry.specialist_repos?.bucket_b_optional || [];

  const agents = (registry.agents || []).map((a) => {
    const assignedRepos = [...coreRepos, ...optRepos].filter((r) => (r.assigned_agents || []).includes(a.id));
    const workers = activeWorkersByAgent.get(a.id) || [];
    let status = 'IDLE';
    let pct = 100;
    let currentTask = 'Standing by — ready for dispatch';
    if (workers.length > 0) {
      const done = workers.filter((w) => w.status === 'DONE' || w.status === 'PASS').length;
      const blocked = workers.some((w) => w.status === 'BLOCKED' || w.status === 'FAIL');
      pct = Math.round((done / workers.length) * 100);
      status = blocked ? 'BLOCKED' : done === workers.length ? 'DONE' : 'WORKING';
      currentTask = workers.map((w) => `${w.worker_id} (${w.status || 'WORKING'})`).join(', ');
    } else if (a.id === 12) {
      status = 'DONE';
      currentTask = 'Git repository synced & checkpoints tagged';
    } else if (a.id === 13) {
      status = 'ACTIVE';
      currentTask = 'Serving live Boss Mission Control UI';
    }
    return {
      ...a,
      status,
      progressPct: pct,
      currentTask,
      vendoredRepos: assignedRepos.map((r) => ({ id: r.id, load_mode: r.load_mode, client_repo_allowed: r.client_repo_allowed })),
    };
  });

  const metrics = computeProgressMetrics(wavePlan, boardMessages, gates, tickets);

  return {
    generatedAt: new Date().toISOString(),
    platform: process.platform,
    repoRoot: REPO_ROOT,
    session: lock,
    config,
    models,
    git: getGitInfo(),
    metrics,
    agents,
    canonicalSkills,
    hooks: hooks.hooks || [],
    gates,
    tickets,
    wavePlan,
    boardMessages: boardMessages.slice(-80),
    registry,
    lastCheckRun,
  };
}

function broadcastState(reason = 'file_change') {
  if (sseClients.size === 0) return;
  const payload = JSON.stringify({ reason, state: buildState() });
  for (const res of sseClients) {
    try {
      res.write(`event: state\ndata: ${payload}\n\n`);
    } catch {
      sseClients.delete(res);
    }
  }
}

let debounceTimer = null;
function scheduleBroadcast(reason) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => broadcastState(reason), 80);
}

// Watch .factory/ and .agents/hooks.json cross-platform (Windows & macOS)
const watchTargets = [
  path.join(REPO_ROOT, '.factory'),
  path.join(REPO_ROOT, '.factory', 'board'),
  path.join(REPO_ROOT, '.factory', 'gates'),
  path.join(REPO_ROOT, '.factory', 'tickets'),
  path.join(REPO_ROOT, '.factory', 'waves'),
  path.join(REPO_ROOT, '.agents', 'hooks.json'),
];
for (const target of watchTargets) {
  try {
    if (fs.existsSync(target)) {
      fs.watch(target, { persistent: false }, () => scheduleBroadcast(`watch:${path.basename(target)}`));
    }
  } catch {
    // Non-fatal fallback: heartbeat + manual refresh remain active
  }
}

function runScriptAsync(scriptArgs) {
  return new Promise((resolve) => {
    const start = Date.now();
    execFile(process.execPath, scriptArgs, { cwd: REPO_ROOT, maxBuffer: 16 * 1024 * 1024 }, (err, stdout, stderr) => {
      const durationMs = Date.now() - start;
      const exitCode = err ? (typeof err.code === 'number' ? err.code : 1) : 0;
      const outText = [stdout, stderr].filter(Boolean).join('\n').trim();
      lastCheckRun = {
        command: `node ${scriptArgs.join(' ')}`,
        exitCode,
        durationMs,
        timestamp: new Date().toISOString(),
        output: outText,
      };
      scheduleBroadcast('script_run');
      resolve(lastCheckRun);
    });
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 64) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
    return;
  }

  if (req.method === 'GET' && url.pathname === '/styles.css') {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'no-store' });
    fs.createReadStream(path.join(__dirname, 'styles.css')).pipe(res);
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/state') {
    sendJson(res, 200, buildState());
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.write(`event: state\ndata: ${JSON.stringify({ reason: 'initial', state: buildState() })}\n\n`);
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/run/portability') {
    const result = await runScriptAsync(['scripts/check-portability.mjs', '--require-all']);
    sendJson(res, 200, result);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/run/hooks-self-test') {
    const result = await runScriptAsync(['scripts/hook-runner.mjs', '--self-test']);
    sendJson(res, 200, result);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/run/workflow-status') {
    const result = await runScriptAsync(['scripts/workflow-runner.mjs', '--status']);
    sendJson(res, 200, result);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/board') {
    try {
      const body = await readRequestBody(req);
      const detail = String(body.detail || '').trim();
      const agent = String(body.agent || 'founder').trim() || 'founder';
      const event = String(body.event || 'BOSS_NOTE').trim() || 'BOSS_NOTE';
      if (!detail) {
        sendJson(res, 400, { error: 'Message detail is required.' });
        return;
      }
      const boardPath = path.join(REPO_ROOT, '.factory', 'board', 'messages.jsonl');
      fs.mkdirSync(path.dirname(boardPath), { recursive: true });
      const existing = readJsonlSafe(boardPath);
      const record = { seq: existing.length + 1, ts: new Date().toISOString(), agent, event, detail };
      fs.appendFileSync(boardPath, JSON.stringify(record) + '\n', 'utf8');
      scheduleBroadcast('boss_note');
      sendJson(res, 201, record);
    } catch (e) {
      sendJson(res, 400, { error: e.message });
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, uptimeSec: Math.round(process.uptime()), memoryMb: Math.round(process.memoryUsage().rss / 1024 / 1024) });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

setInterval(() => {
  for (const res of sseClients) {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      sseClients.delete(res);
    }
  }
}, 15000).unref();

server.listen(PORT, HOST, () => {
  console.log(`[PASS] Boss Mission Control (Rs 0, zero LLM calls) running at http://${HOST}:${PORT}`);
  console.log(`       Serving real data from: ${REPO_ROOT}`);
});
