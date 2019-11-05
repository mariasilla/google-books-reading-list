import chalk from 'chalk';

const menus = {
  main: `
${chalk.greenBright('gb-reading-list [command] <options>')}
  ${chalk.blueBright('search')} ................ search for new favorite books
  ${chalk.blueBright('version')} ............ show package version
  ${chalk.blueBright('help')} ............... show help menu for a command
`,
  search: `//...
        `
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}
