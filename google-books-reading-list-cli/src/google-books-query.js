import chalk from "chalk";
import Table from "cli-table3";
import { addBookToReadingList } from "./add";

export async function queryGoogleBooksAPI(userQuery) {
  let books = require("google-books-search");
  let options = {
    field: "title",
    limit: 5
  };

  books.search(userQuery, options, function(error, results) {
    if (!error) {
      const table = new Table({
        head: ["Number", "Author", "Title", "Publisher"],
        colWidths: [10, 23, 20, 18],
        wordWrap: true
      });

      results.forEach((book, i) => {
        table.push([
          i + 1,
          String(book.authors),
          book.title,
          String(book.publisher)
        ]);
      });

      console.log(table.toString());
      addBookToReadingList(results);
    } else {
      console.error(chalk.redBright(`${error}. Program exit.`));
      process.exit();
    }
  });
}
