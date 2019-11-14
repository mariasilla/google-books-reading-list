import chalk from "chalk";

import { queryTitleField, parseData } from "../utils/api-utils";
import { createSearchResultTable } from "../utils/reading-list-utils";
import { addBookToReadingList } from "../add";

export function titleSearch() {
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

    const { data } = await queryTitleField(userQuery.value);
    const { status } = await queryTitleField(userQuery.value);
    const { statusText } = await queryTitleField(userQuery.value);

    if (status === 200) {
      const books = parseData(data, userQuery.value);

      if (books !== undefined) {
        createSearchResultTable(books);
        addBookToReadingList(books);
      }
    } else {
      console.error(chalk.redBright(`${status}: ${statusText}. Program exit.`));
      process.exit();
    }
  })();
}
