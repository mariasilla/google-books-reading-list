import chalk from "chalk";

export function version() {
  const packagejson = require("../package.json");
  console.log(chalk.greenBright(`Current Version ${packagejson.version}`));
}
