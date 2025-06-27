#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { lintCommand } from '../src/commands/lint.js';
import { initCommand } from '../src/commands/init.js';
import { runCommand } from '../src/commands/run.js';
import { installCommand } from '../src/commands/install.js';
import { searchCommand } from '../src/commands/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

program
  .name('lev')
  .description('Levenest CLI')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold .lev folder in current directory')
  .action(initCommand);

program
  .command('lint')
  .description('Validate fundamentals rules')
  .action(lintCommand);

program
  .command('run <workflowId>')
  .description('Run a workflow by id')
  .action(runCommand);

program
  .command('install <packageId>')
  .description('Install a package into lev_modules')
  .option('-v, --version <semver>', 'Specify version', 'latest')
  .action((pkg, options) => installCommand(pkg, options.version));

program
  .command('search <term>')
  .description('Search registry for packages')
  .action(searchCommand);

program
  .addHelpText('after', `\nDocumentation: https://docs.levenest.dev`);

program.parse(); 