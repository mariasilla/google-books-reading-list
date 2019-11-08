import { queryGoogleBooksAPI } from "./google-books-query";
import chalk from "chalk";

export function search() {
  let prompts = require("prompts");

  (async () => {
    const userQuery = await prompts({
      type: "text",
      name: "value",
      message: chalk.green(
        `Please type query in command line to search for books:`
      ),
      validate: value => (value < 1 ? `Please enter at least one symbol` : true)
    });
    queryGoogleBooksAPI(userQuery.value);
  })();
}
