import minimist from "minimist";
import chalk from "chalk";

import { generalSearch } from "./commands/general-search";
import { titleSearch } from "./commands/title-search";
import {authorSearch} from "./commands/author-search"
import { help } from "./help";
import { version } from "./version";
import { view } from "./view";

export function cli(argsArray) {
  let figlet = require("figlet");
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
      version(args);
      break;

    case "help":
      help(args);
      break;

    case "general-search":
      generalSearch(args);
      break;

    case "title-search":
      titleSearch(args);
      break;

      case "author-search":
        authorSearch(args);
        break;

    case "view":
      view(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
