#!/usr/bin/env node
/**
 * check-portability.mjs
 * Validates all skills, hooks, scripts, and model-agnostic constraints for software-company-factory.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const CANONICAL_SKILLS = {
  'software-company-factory-start': ['templates/session-boot.md'],
  'software-company-factory-end': ['templates/session-handoff.md'],
  'scf-discover': ['templates/discovery-brief.md', 'references/grill-me-questions.md'],
  'scf-research': ['modes/quick.md', 'modes/deep.md', 'templates/research-brief.md'],
  'scf-handbook': ['templates/application-handbook.md'],
  'scf-change-impact': ['templates/impact-report.md'],
  'scf-scope': ['modes/tracer-bullet.md', 'modes/skateboard.md', 'modes/facade.md', 'modes/journey.md'],
  'scf-audit': ['references/clean-arch.md', 'references/ddd.md', 'references/functional.md', 'references/solid-oop.md'],
  'scf-architect': ['modes/new-feature.md', 'modes/stack-selection.md', 'templates/plain-english-spec.md', 'references/value-sourcing.md'],
  'scf-develop': ['modes/frontend-lead.md', 'modes/backend-lead.md', 'modes/database-builder.md', 'modes/wave-worker.md', 'references/ui-ux-pro-max.md'],
  'scf-check': ['modes/verify.md', 'modes/review.md', 'templates/bug-ticket.json'],
  'scf-test': ['references/test-writing-guide.md', 'templates/test-plan.md'],
  'scf-debug': ['templates/root-cause-report.md'],
  'scf-sec-ops': [
    'references/stage-1-secrets.md',
    'references/stage-2-pii.md',
    'references/stage-3-prod.md',
    'references/stage-4-deep-logic.md',
    'references/stage-5-attacker.md',
  ],
  'scf-doc-sync': ['templates/status-dashboard.md', 'templates/adr.md'],
  'scf-deploy': ['templates/pre-deploy-checklist.md'],
  'scf-legacy-re': ['modes/rea-analysis.md', 'modes/craft-modernize.md'],
  'scf-hardware-compliance': ['references/iot-safety-checklist.md'],
};

const args = new Set(process.argv.slice(2));
const REQUIRE_ALL = args.has('--require-all');
const JSON_MODE = args.has('--json');

// Construct forbidden hardcoded vendor model patterns dynamically so this file does not self-match
const FORBIDDEN_MODEL_REGEXES = [
  new RegExp(['gem', 'ini-[0-9]'].join(''), 'i'),
  new RegExp(['gem', 'ini\\s+[0-9]'].join(''), 'i'),
  new RegExp(['cla', 'ude-(sonnet|opus|haiku|[0-9])'].join(''), 'i'),
  new RegExp(['cla', 'ude\\s+(sonnet|opus|haiku)\\s+[0-9]'].join(''), 'i'),
  new RegExp(['gp', 't-[345]'].join(''), 'i'),
  new RegExp(['gp', 't-oss'].join(''), 'i'),
  new RegExp(['\\bo[134]-(mini|pro|preview)'].join(''), 'i'),
  new RegExp(['lla', 'ma-[234]'].join(''), 'i'),
  new RegExp(['gem', 'ma-[234]'].join(''), 'i'),
];

const POSIX_ONLY_CODE_PATTERNS = [
  /\brm\s+-rf\b/i,
  /\bchmod\s+\+x\b/i,
  /\bsudo\s+/i,
  /\|\s*xargs\b/i,
  /\bsed\s+-i\b/i,
];

const errors = [];
const warnings = [];
const checkedSkills = [];

function addError(msg) {
  errors.push(msg);
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[key] = val;
  }
  return fm;
}

function checkModelAgnostic(filePath, content) {
  const rel = path.relative(REPO_ROOT, filePath);
  for (const rx of FORBIDDEN_MODEL_REGEXES) {
    const m = content.match(rx);
    if (m) {
      addError(`Hardcoded model name "${m[0]}" found in ${rel}. Use abstract slots from .factory/models.json instead.`);
    }
  }
}

function checkPosixGlueInCodeBlocks(filePath, content) {
  const rel = path.relative(REPO_ROOT, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const blocksToCheck = [];
  if (ext === '.md') {
    const codeRegex = /```(?:bash|sh|zsh|shell|powershell|ps1)?\r?\n([\s\S]*?)```/gi;
    let m;
    while ((m = codeRegex.exec(content)) !== null) {
      blocksToCheck.push(m[1]);
    }
  } else if (['.mjs', '.js', '.py', '.ps1'].includes(ext)) {
    blocksToCheck.push(content);
  }
  for (const block of blocksToCheck) {
    for (const rx of POSIX_ONLY_CODE_PATTERNS) {
      const m = block.match(rx);
      if (m) {
        addError(`POSIX-only shell command "${m[0]}" found in executable code of ${rel}. Use cross-platform Node/Python/PowerShell.`);
      }
    }
  }
}

// 1. Validate core config & hooks
const configPath = path.join(REPO_ROOT, '.factory', 'config.json');
const modelsPath = path.join(REPO_ROOT, '.factory', 'models.json');
const hooksPath = path.join(REPO_ROOT, '.agents', 'hooks.json');

let config = {
  skill_validation: {
    skill_min_bytes: 4096,
    skill_max_bytes: 32768,
    subfile_max_bytes: 24576,
    description_max_chars: 400,
  },
  hardware_envelope: {
    hot_path_context_budget_kb: 90,
  },
};

if (!fs.existsSync(configPath)) {
  addError('Missing .factory/config.json');
} else {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (e) {
    addError(`Invalid JSON in .factory/config.json: ${e.message}`);
  }
}

if (!fs.existsSync(modelsPath)) {
  addError('Missing .factory/models.json');
} else {
  try {
    const models = JSON.parse(fs.readFileSync(modelsPath, 'utf8'));
    const requiredSlots = ['light_ops_slot', 'worker_slot', 'architect_slot', 'deep_logic_slot', 'blind_reviewer_slot'];
    for (const slot of requiredSlots) {
      if (!models.slots || !models.slots[slot]) {
        addError(`.factory/models.json missing required slot "${slot}"`);
      }
    }
  } catch (e) {
    addError(`Invalid JSON in .factory/models.json: ${e.message}`);
  }
}

if (!fs.existsSync(hooksPath)) {
  addError('Missing .agents/hooks.json');
} else {
  try {
    const rawHooks = fs.readFileSync(hooksPath, 'utf8');
    checkModelAgnostic(hooksPath, rawHooks);
    const hooksObj = JSON.parse(rawHooks);
    if (!Array.isArray(hooksObj.hooks) || hooksObj.hooks.length !== 15) {
      addError(`.agents/hooks.json must contain exactly 15 fail-closed hooks (found ${hooksObj.hooks ? hooksObj.hooks.length : 0})`);
    } else {
      for (const h of hooksObj.hooks) {
        if (h.fail_closed !== true) {
          addError(`Hook "${h.id}" in .agents/hooks.json must have fail_closed: true`);
        }
      }
    }
  } catch (e) {
    addError(`Invalid JSON in .agents/hooks.json: ${e.message}`);
  }
}

// 2. Validate scripts are model-agnostic and Windows-safe
const scriptsDir = path.join(REPO_ROOT, 'scripts');
if (fs.existsSync(scriptsDir)) {
  for (const file of fs.readdirSync(scriptsDir)) {
    if (file === 'check-portability.mjs' || file === 'hook-runner.mjs') continue;
    const fp = path.join(scriptsDir, file);
    if (fs.statSync(fp).isFile()) {
      const content = fs.readFileSync(fp, 'utf8');
      checkModelAgnostic(fp, content);
      checkPosixGlueInCodeBlocks(fp, content);
    }
  }
}

// 3. Validate skills in .agents/skills/
const skillsRoot = path.join(REPO_ROOT, '.agents', 'skills');
const minBytes = config.skill_validation?.skill_min_bytes ?? 4096;
const maxBytes = config.skill_validation?.skill_max_bytes ?? 32768;
const subMaxBytes = config.skill_validation?.subfile_max_bytes ?? 24576;
const descMaxChars = config.skill_validation?.description_max_chars ?? 400;
const hotPathMaxBytes = (config.hardware_envelope?.hot_path_context_budget_kb ?? 90) * 1024;

if (fs.existsSync(skillsRoot)) {
  const dirs = fs.readdirSync(skillsRoot, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

  for (const dirName of dirs) {
    if (!Object.prototype.hasOwnProperty.call(CANONICAL_SKILLS, dirName)) {
      addError(`Unknown skill folder ".agents/skills/${dirName}" is not in the 18 canonical skills.`);
      continue;
    }

    const skillDir = path.join(skillsRoot, dirName);
    const skillMdPath = path.join(skillDir, 'SKILL.md');
    const openaiYamlPath = path.join(skillDir, 'agents', 'openai.yaml');
    let totalHotPathBytes = 0;

    if (!fs.existsSync(skillMdPath)) {
      addError(`Missing SKILL.md in .agents/skills/${dirName}`);
      continue;
    }

    const skillContent = fs.readFileSync(skillMdPath, 'utf8');
    const skillBytes = Buffer.byteLength(skillContent, 'utf8');
    totalHotPathBytes += skillBytes;

    if (skillBytes < minBytes) {
      addError(`Anti-stub failure: ${dirName}/SKILL.md is ${skillBytes} bytes (minimum ${minBytes} bytes required).`);
    }
    if (skillBytes > maxBytes) {
      addError(`Bloat failure: ${dirName}/SKILL.md is ${skillBytes} bytes (maximum ${maxBytes} bytes allowed).`);
    }

    const fm = parseFrontmatter(skillContent);
    if (!fm || !fm.name || !fm.description) {
      addError(`${dirName}/SKILL.md missing valid YAML frontmatter with "name" and "description".`);
    } else {
      if (fm.name !== dirName) {
        addError(`${dirName}/SKILL.md frontmatter name "${fm.name}" does not match folder name "${dirName}".`);
      }
      if (fm.description.length > descMaxChars) {
        addError(`${dirName}/SKILL.md description is ${fm.description.length} chars (max ${descMaxChars}).`);
      }
    }

    checkModelAgnostic(skillMdPath, skillContent);
    checkPosixGlueInCodeBlocks(skillMdPath, skillContent);

    if (!fs.existsSync(openaiYamlPath)) {
      addError(`Missing ${dirName}/agents/openai.yaml`);
    } else {
      const yamlContent = fs.readFileSync(openaiYamlPath, 'utf8');
      const yamlBytes = Buffer.byteLength(yamlContent, 'utf8');
      if (yamlBytes < 100 || yamlBytes > 4096) {
        addError(`${dirName}/agents/openai.yaml size (${yamlBytes} bytes) out of expected range (100-4096 bytes).`);
      }
      checkModelAgnostic(openaiYamlPath, yamlContent);
    }

    for (const subRel of CANONICAL_SKILLS[dirName]) {
      const subPath = path.join(skillDir, subRel);
      if (!fs.existsSync(subPath)) {
        addError(`Missing required sub-file ${dirName}/${subRel}`);
      } else {
        const subContent = fs.readFileSync(subPath, 'utf8');
        const subBytes = Buffer.byteLength(subContent, 'utf8');
        totalHotPathBytes += subBytes;
        if (subBytes < 200) {
          addError(`Anti-stub failure: ${dirName}/${subRel} is only ${subBytes} bytes.`);
        }
        if (subBytes > subMaxBytes) {
          addError(`Sub-file bloat: ${dirName}/${subRel} is ${subBytes} bytes (max ${subMaxBytes}).`);
        }
        checkModelAgnostic(subPath, subContent);
        checkPosixGlueInCodeBlocks(subPath, subContent);
      }
    }

    if (totalHotPathBytes > hotPathMaxBytes) {
      addError(`Hot-path budget exceeded for ${dirName}: ${totalHotPathBytes} bytes > ${hotPathMaxBytes} bytes.`);
    }

    checkedSkills.push({
      name: dirName,
      skillBytes,
      totalHotPathBytes,
      subFiles: CANONICAL_SKILLS[dirName].length,
    });
  }

  const missingCanonical = Object.keys(CANONICAL_SKILLS).filter((k) => !dirs.includes(k));
  if (missingCanonical.length > 0) {
    const msg = `${missingCanonical.length} canonical skills not yet created: ${missingCanonical.join(', ')}`;
    if (REQUIRE_ALL) {
      addError(msg);
    } else {
      warnings.push(msg);
    }
  }
} else if (REQUIRE_ALL) {
  addError('Directory .agents/skills/ does not exist.');
} else {
  warnings.push('No skills created yet under .agents/skills/ (Batch 1 foundation mode).');
}

const result = {
  status: errors.length === 0 ? 'PASS' : 'FAIL',
  checked_skills_count: checkedSkills.length,
  checked_skills: checkedSkills,
  warnings,
  errors,
};

if (JSON_MODE) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`=== check-portability.mjs :: ${result.status} ===`);
  console.log(`Validated skills: ${checkedSkills.length}/18`);
  for (const s of checkedSkills) {
    console.log(`  [OK] ${s.name} (SKILL.md=${s.skillBytes}B, hotPath=${s.totalHotPathBytes}B, subFiles=${s.subFiles})`);
  }
  for (const w of warnings) {
    console.log(`  [WARN] ${w}`);
  }
  for (const e of errors) {
    console.error(`  [FAIL] ${e}`);
  }
}

process.exit(errors.length === 0 ? 0 : 1);
