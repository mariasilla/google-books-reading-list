import chalk from "chalk";

const menuOptions = {
  main: `
${chalk.greenBright("gb-reading-list [command] <options>")}
  ${chalk.blueBright(
    "general-search"
  )} ................ search for books that contain your text query
  ${chalk.blueBright(
    "title-search"
  )} ................ search for books where your text query is found in the title field
  ${chalk.blueBright(
    "author-search"
  )} ................ search for books where your text query is found in the author field
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

export function help(args) {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];
  console.log(menuOptions[subCmd] || menuOptions.main);
}
