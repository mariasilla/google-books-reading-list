import { queryGoogleBooksAPI } from "./utils";
import chalk from "chalk";

export async function search() {
  let standard_input = process.stdin;

  standard_input.setEncoding("utf-8");

  console.warn(
    chalk.blueBright(`Please type query in command line to search for books:`)
  );

  standard_input.on("data", function(userQuery) {
    if (userQuery === "exit\n") {
      console.error(chalk.redBright(`User input incomplete, program exit.`));
      process.exit();
    } else {
      queryGoogleBooksAPI(userQuery);
    }
  });
}
