import chalk from "chalk";

import packageJson from "../../package.json";

export function outputVersion() {
  console.log(chalk.greenBright(`Current Version ${packageJson.version}`));
}
