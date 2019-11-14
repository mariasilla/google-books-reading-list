import chalk from "chalk";
import { createReadingList } from "./utils/reading-list-utils";

export function addBookToReadingList(books) {
  let prompts = require("prompts");

  let userOptions = books.map(book => {
    return {
      title: `${book.title} by ${book.authors}`,
      value: book
    };
  });

  (async () => {
    const response = await prompts([
      {
        type: "multiselect",
        name: "value",
        message: chalk.greenBright(
          `Select a book to save to your reading list`
        ),
        choices: userOptions,
        max: 1,
        hint: "- Space to select. Return to submit"
      }
    ]);

    const book = response.value[0];
    if (response.value.length !== 0) {
      console.log(
        chalk.magentaBright(
          `Book with title '${book.title}' by ${book.authors} has been added to your Reading List.`
        ),
        chalk.greenBright(
          `Run 'gb-reading-list view' to view your Reading List.`
        )
      );
      createReadingList(book);
    } else {
      console.error(
        chalk.redBright("Please make a selection."),
        chalk.magentaBright(`Run 'gb-reading-list search' to find new books.`)
      );
    }
  })();
}
