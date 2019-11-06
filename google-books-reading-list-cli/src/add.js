import chalk from "chalk";
import { createReadingList } from "./reading-list";

export async function addBookToReadingList(results) {
  let prompts = require("prompts");
  let booksArray = [];

  results.forEach((book, i) => {
    booksArray.push([
      i + 1,
      String(book.authors),
      book.title,
      String(book.publisher)
    ]);
  });

  let userOptions = booksArray.map(book => {
    return {
      title: book[2],
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
    if (response.value.length !== 0) {
      console.log(
        chalk.blueBright(
          `Book with title '${
            response.value[0][2]
          }' has been added to your Reading List.`
        ),
        chalk.greenBright(
          `Run 'gb-reading-list view' to view your Reading List.`
        )
      );

      createReadingList(response);
    } else {
      console.error(
        chalk.redBright("Please make a selection"),
        chalk.greenBright(`Run 'gb-reading-list search' to find new books.`)
      );
    }
  })();
}
