import chalk from 'chalk';
import { join } from 'node:path';
import fs from 'fs-extra';
import YAML from 'yaml';
import { enforce } from '../core/fundamentalsEnforcer.js';

function findFundamentalsFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      results.push(...findFundamentalsFiles(p));
    } else if (file === 'fundamentals.yaml') {
      results.push(p);
    }
  }
  return results;
}

export async function lintCommand() {
  const cwd = process.cwd();
  const fundamentalsFiles = findFundamentalsFiles(join(cwd, '.lev'));
  if (fundamentalsFiles.length === 0) {
    console.log(chalk.red('No fundamentals.yaml files found. Did you run `lev init`?'));
    process.exitCode = 1;
    return;
  }
  // Placeholder: load YAMLs and just report count
  console.log(chalk.blue(`Found ${fundamentalsFiles.length} fundamentals.yaml file(s).`));
  let errors = 0;
  for (const file of fundamentalsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    try {
      YAML.parse(content);
    } catch (err) {
      console.log(chalk.red(`YAML parse error in ${file}: ${err.message}`));
      errors += 1;
    }
  }
  const enforcerResults = enforce(join(cwd, '.lev'));
  enforcerResults.errors.forEach(e => console.log(chalk.red(`Error: ${e.message} (${e.file})`)));
  enforcerResults.warnings.forEach(w => console.log(chalk.yellow(`Warning: ${w.message} (${w.file})`)));

  if (errors || enforcerResults.errors.length) {
    console.log(chalk.red(`Lint failed with ${errors + enforcerResults.errors.length} error(s).`));
    process.exitCode = 1;
  } else {
    console.log(chalk.green('Lint passed.'));
  }
} 