import fs from 'fs-extra';
import { join } from 'node:path';
import chalk from 'chalk';

export async function initCommand() {
  const cwd = process.cwd();
  const levPath = join(cwd, '.lev');
  if (fs.existsSync(levPath)) {
    console.log(chalk.yellow('.lev directory already exists – nothing to init.'));
    return;
  }
  // For now, just copy template from scaffold in cli package (future)
  fs.mkdirSync(levPath);
  console.log(chalk.green('Initialized empty .lev folder. Next: run `lev lint` to verify fundamentals.'));
} 