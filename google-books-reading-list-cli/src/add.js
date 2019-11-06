import chalk from "chalk";

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
      console.warn(
        chalk.blueBright(
          `Book with title '${
            response.value[0][2]
          }' has been added to your reading list`
        )
      );
    } else {
      console.error(chalk.redBright("Please make a selection"));
    }
  })();
}
