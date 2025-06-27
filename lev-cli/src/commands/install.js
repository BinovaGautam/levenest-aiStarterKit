import chalk from 'chalk';

export async function installCommand(packageId, version) {
  console.log(chalk.yellow(`[stub] Would install package '${packageId}' (version: ${version}).`));
  // Future: download package, verify checksum, update lev_modules/index.json & lev.lock.yaml
} 