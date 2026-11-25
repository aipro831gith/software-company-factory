#!/usr/bin/env node
/**
 * init-target-project.mjs
 * Scaffolds a clean, isolated target project linked to software-company-factory rules.
 * Usage: node scripts/init-target-project.mjs --name smoke-gold-calc --dir ../smoke-gold-calc
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function parseArgs(argv) {
  const opts = { name: null, dir: null, tier: 'Medium' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--name' && argv[i + 1]) opts.name = argv[++i];
    else if (argv[i] === '--dir' && argv[i + 1]) opts.dir = path.resolve(argv[++i]);
    else if (argv[i] === '--tier' && argv[i + 1]) opts.tier = argv[++i];
  }
  return opts;
}

const opts = parseArgs(process.argv.slice(2));
if (!opts.name || !opts.dir) {
  console.error('Usage: node scripts/init-target-project.mjs --name <project-slug> --dir <target-path> [--tier Lean|Medium|Full]');
  process.exit(1);
}

if (fs.existsSync(opts.dir) && fs.readdirSync(opts.dir).length > 0) {
  console.error(`[FAIL] Target directory "${opts.dir}" already exists and is not empty.`);
  process.exit(1);
}

const dirs = [
  '.factory/gates',
  '.factory/tickets',
  '.factory/waves',
  'docs/product',
  'docs/scope',
  'docs/specs',
  'docs/handoff',
  'src/db',
  'src/server',
  'src/web',
  'tests',
];

for (const d of dirs) {
  fs.mkdirSync(path.join(opts.dir, d), { recursive: true });
}

const files = {
  'AGENTS.md': `# ${opts.name} — Target Project Constitution\n\nBuilt and governed by \`software-company-factory\` (v1.1).\n- Never hardcode secrets or model names.\n- Use integer paise/milligrams or Decimal/BigInt for all financial and weight math.\n- Every Medium/Full feature requires Plain-English Spec Approval (Spec 0001) and Value Sourcing (Spec 0002).\n`,
  'STATUS.md': `# ${opts.name} — Boss Status Dashboard\n\n- **Project:** \`${opts.name}\`\n- **Default Risk Tier:** \`${opts.tier}\`\n- **Phase:** Initialized — Ready for Discovery & Architecture\n`,
  'README.md': `# ${opts.name}\n\nScaffolded by \`software-company-factory\`.\n`,
  '.env.example': '# Copy to .env locally (never commit .env)\nAPP_PORT=3000\nDATABASE_URL=\n',
  '.gitignore': '.env\n.env.*\n!.env.example\nnode_modules/\ndist/\nbuild/\n.next/\n__pycache__/\n*.log\n',
  'docs/handoff/LATEST_SESSION.md': `# Latest Session\n\nProject \`${opts.name}\` initialized. Next step: run discovery (/scf-discover) and architecture spec (/scf-architect).\n`,
};

for (const [rel, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(opts.dir, rel), content, 'utf8');
}

try {
  execFileSync('git', ['init', '-b', 'main'], { cwd: opts.dir, stdio: 'ignore' });
  console.log(`[PASS] Initialized target project "${opts.name}" with Git at ${opts.dir}`);
} catch {
  console.log(`[PASS] Initialized target project "${opts.name}" at ${opts.dir} (Git skipped: git CLI not found).`);
}
process.exit(0);
