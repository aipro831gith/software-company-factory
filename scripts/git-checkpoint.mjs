#!/usr/bin/env node
/**
 * git-checkpoint.mjs
 * Cross-platform atomic Git checkpoint, wave tagging, and safe rollback helper.
 * Usage:
 *   node scripts/git-checkpoint.mjs init "Initial commit message"
 *   node scripts/git-checkpoint.mjs commit "Batch 2 commit" [--wave 2]
 *   node scripts/git-checkpoint.mjs rollback checkpoint-wave-2
 *   node scripts/git-checkpoint.mjs status
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

function runGit(args, cwd = REPO_ROOT, allowFail = false) {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (err) {
    if (allowFail) return null;
    const stderr = err.stderr ? err.stderr.toString() : err.message;
    throw new Error(`git ${args.join(' ')} failed: ${stderr}`);
  }
}

function ensureGitInstalled() {
  const v = runGit(['--version'], REPO_ROOT, true);
  if (!v) {
    console.error('[FAIL] Git CLI is not installed or not on PATH. Run: winget install --id Git.Git -e --source winget');
    process.exit(1);
  }
}

function ensureLocalIdentity() {
  const name = runGit(['config', 'user.name'], REPO_ROOT, true);
  const email = runGit(['config', 'user.email'], REPO_ROOT, true);
  if (!name) runGit(['config', 'user.name', 'Software Company Factory']);
  if (!email) runGit(['config', 'user.email', 'factory@local.invalid']);
}

function runEnvSafetyPrecheck() {
  const hookRunner = path.join(REPO_ROOT, 'scripts', 'hook-runner.mjs');
  if (fs.existsSync(hookRunner)) {
    execFileSync(process.execPath, [hookRunner, '--hook', 'block-env-staging'], {
      cwd: REPO_ROOT,
      stdio: 'inherit',
    });
  }
}

function updateSessionLockSha(sha) {
  const lockPath = path.join(REPO_ROOT, '.factory', 'session.lock.json');
  if (!fs.existsSync(lockPath)) return;
  try {
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    lock.last_commit_sha = sha;
    fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n', 'utf8');
  } catch {
    // Non-fatal if lock cannot be parsed
  }
}

const [, , cmd, ...rest] = process.argv;
ensureGitInstalled();

if (cmd === 'status') {
  const inside = runGit(['rev-parse', '--is-inside-work-tree'], REPO_ROOT, true);
  if (inside !== 'true') {
    console.log('Git repository not initialized yet.');
    process.exit(0);
  }
  const branch = runGit(['rev-parse', '--abbrev-ref', 'HEAD'], REPO_ROOT, true) || 'unborn';
  const sha = runGit(['rev-parse', '--short', 'HEAD'], REPO_ROOT, true) || 'none';
  const dirty = runGit(['status', '--porcelain'], REPO_ROOT, true);
  console.log(`Git Branch: ${branch} | HEAD: ${sha} | Working Tree: ${dirty ? 'DIRTY' : 'CLEAN'}`);
  process.exit(0);
}

if (cmd === 'init') {
  const msg = rest[0] || 'chore(factory): initialize software-company-factory';
  if (!fs.existsSync(path.join(REPO_ROOT, '.git'))) {
    runGit(['init', '-b', 'main']);
  }
  ensureLocalIdentity();
  runGit(['add', '-A']);
  runEnvSafetyPrecheck();
  const status = runGit(['status', '--porcelain']);
  if (status) {
    runGit(['commit', '-m', msg]);
  }
  const sha = runGit(['rev-parse', '--short', 'HEAD'], REPO_ROOT, true);
  if (sha) {
    updateSessionLockSha(sha);
    runGit(['tag', '-f', 'checkpoint-init']);
  }
  console.log(`[PASS] Git initialized and checkpointed (${sha || 'empty'}): ${msg}`);
  process.exit(0);
}

if (cmd === 'commit') {
  const msg = rest[0];
  if (!msg) {
    console.error('[FAIL] Commit message is required.');
    process.exit(1);
  }
  let wave = null;
  const waveIdx = rest.indexOf('--wave');
  if (waveIdx !== -1 && rest[waveIdx + 1]) {
    wave = rest[waveIdx + 1];
  }
  if (!fs.existsSync(path.join(REPO_ROOT, '.git'))) {
    console.error('[FAIL] Git repo not initialized. Run: node scripts/git-checkpoint.mjs init');
    process.exit(1);
  }
  ensureLocalIdentity();
  runGit(['add', '-A']);
  runEnvSafetyPrecheck();
  const staged = runGit(['diff', '--cached', '--name-only']);
  if (!staged) {
    const sha = runGit(['rev-parse', '--short', 'HEAD'], REPO_ROOT, true);
    console.log(`[OK] Nothing new to commit (HEAD=${sha}).`);
    process.exit(0);
  }
  runGit(['commit', '-m', msg]);
  const sha = runGit(['rev-parse', '--short', 'HEAD']);
  updateSessionLockSha(sha);
  if (wave) {
    runGit(['tag', '-f', `checkpoint-wave-${wave}`]);
  }
  console.log(`[PASS] Atomic commit ${sha}${wave ? ` [tag: checkpoint-wave-${wave}]` : ''}: ${msg}`);
  process.exit(0);
}

if (cmd === 'rollback') {
  const target = rest[0];
  if (!target) {
    console.error('[FAIL] Provide a tag or commit SHA to roll back to.');
    process.exit(1);
  }
  runGit(['restore', '--source', target, '--staged', '--worktree', '.']);
  console.log(`[PASS] Working tree restored cleanly to ${target}.`);
  process.exit(0);
}

console.error('Usage: node scripts/git-checkpoint.mjs <init|commit|rollback|status> [args]');
process.exit(1);
