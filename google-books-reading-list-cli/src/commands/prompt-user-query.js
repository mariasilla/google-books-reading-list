import chalk from "chalk";
import prompts from "prompts";

import { getBookData, parseBookData } from "../utils/api/api-utils";
import { outputSearchResultTable } from "../utils/reading-list/output-search-result-table";
import { promptBookMenuOptions } from "../utils/reading-list/prompt-book-menu";
import { API } from "../utils/api/api-config";

export async function promptUserQuery(args) {
  const cmd = args._[0];
  let data;
  let status;
  let statusText;

  console.log(chalk.bgMagentaBright(args._[0]));

  (async () => {
    const userQuery = await prompts({
      type: "text",
      name: "value",
      message: chalk.green(
        `Please type query in command line to search for books:`
      ),
      validate: value => (value < 1 ? `Please enter at least one symbol` : true)
    });

    if (cmd === "general-search") {
      ({ data, status, statusText } = await getBookData(
        API.BASE_URI,
        userQuery.value
      ));
    } else if (cmd === "title-search") {
      ({ data, status, statusText } = await getBookData(
        API.BASE_URI_TITLE,
        userQuery.value
      ));
    } else if (cmd === "author-search") {
      ({ data, status, statusText } = await getBookData(
        API.BASE_URI_AUTHOR,
        userQuery.value
      ));
    }

    if (status === 200) {
      const books = parseBookData(data, userQuery.value);

      if (books !== false && books !== undefined) {
        outputSearchResultTable(books);
        promptBookMenuOptions(books);
      } else if (books === false) {
        console.error(
          chalk.redBright(
            `Your search "${userQuery.value}" did not match any book results. Please try again. Program exit.`
          )
        );
      }
    } else {
      console.error(chalk.redBright(`${status}: ${statusText}. Program exit.`));
      process.exit();
    }
  })();
}
