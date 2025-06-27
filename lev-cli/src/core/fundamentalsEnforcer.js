import fs from 'fs-extra';
import { join } from 'node:path';
import YAML from 'yaml';
import { globSync } from 'glob';

export function loadFundamentalsFiles(root) {
  const pattern = join(root, '**/fundamentals.yaml');
  return globSync(pattern, { nodir: true });
}

function parseYaml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return YAML.parse(content);
  } catch (err) {
    return { __parseError: err.message };
  }
}

function collectPackageIds(levRoot) {
  const indexFile = join(levRoot, 'lev_modules', 'index.json');
  if (!fs.existsSync(indexFile)) return [];
  const json = JSON.parse(fs.readFileSync(indexFile));
  const names = json.packages?.map((p) => p.name.split('/').pop().replace(/\.yaml$/i, '')) || [];
  return names;
}

function collectLibAgentIds(levRoot) {
  const files = globSync(join(levRoot, 'lib', 'agents', '*.yaml'));
  const ids = [];
  for (const f of files) {
    try {
      const doc = YAML.parse(fs.readFileSync(f, 'utf8'));
      if (doc?.id) ids.push({ id: doc.id, file: f });
    } catch (_) {
      // ignore parse errors here; lint will catch separately
    }
  }
  return ids;
}

export function enforce(levRoot) {
  const results = { errors: [], warnings: [] };

  // Check parse validity for each fundamentals.yaml
  for (const file of loadFundamentalsFiles(levRoot)) {
    const parsed = parseYaml(file);
    if (parsed.__parseError) {
      results.errors.push({ file, message: 'YAML parse error: ' + parsed.__parseError });
    }
  }

  // Shadowing check
  const ruleActive = true; // assume rule present
  if (ruleActive) {
    const packageIds = collectPackageIds(levRoot);
    const libIds = collectLibAgentIds(levRoot);
    for (const { id, file } of libIds) {
      if (packageIds.includes(id)) {
        results.errors.push({ file, message: `Shadowing package id '${id}' is not allowed.` });
      }
    }
  }

  return results;
} 