import chalk from "chalk";

const menuOptions = {
  main: `
${chalk.greenBright("gb-reading-list [command] <options>")}
  ${chalk.blueBright(
    "general-search"
  )} ................ search for books that contain your text query
  ${chalk.blueBright(
    "title-search"
  )} ................ return books with specific title
  ${chalk.blueBright(
    "author-search"
  )} ................ return books written by specific author
  ${chalk.blueBright("view")} ................ view your current Reading List
  ${chalk.blueBright("version")} ............ show package version
  ${chalk.blueBright("help")} ............... show help menu for a command
`,
  generalSearch: `//...,
        `,
  titleSearch: `//...,
        `,
  authorSearch: `//...,
        `,
  view: `//...,
        `
};

export function outputHelpOptions(args) {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];
  console.log(menuOptions[subCmd] || menuOptions.main);
}
