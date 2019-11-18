import minimist from "minimist";
import chalk from "chalk";
import figlet from "figlet";

import { promptUserQuery } from "./commands/prompt-user-query";
import { outputHelpOptions } from "./commands/output-help-options";
import { outputVersion } from "./commands/output-version";
import { outputReadingList } from "./commands/output-reading-list";

export function cli(argsArray) {
  console.log(
    chalk.magentaBright(
      figlet.textSync("GB Reading List", { horizontalLayout: "full" })
    )
  );

  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || "help";

  if (args.version || args.v) {
    cmd = "version";
  }

  if (args.help || args.h) {
    cmd = "help";
  }

  switch (cmd) {
    case "version":
      outputVersion();
      break;

    case "help":
      outputHelpOptions(args);
      break;

    case "general-search":
      promptUserQuery(args);
      break;

    case "title-search":
      promptUserQuery(args);
      break;

    case "author-search":
      promptUserQuery(args);
      break;

    case "view":
      outputReadingList();
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
