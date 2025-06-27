import chalk from 'chalk';

export async function runCommand(workflowId) {
  console.log(chalk.yellow(`[stub] Would run workflow '${workflowId}'.`));
  // Future: resolve workflow YAML and execute via Execution-Engine agent
} 