import chalk from "chalk";
import Table from "cli-table3";
import { addBookToReadingList } from "./add";

export function queryGoogleBooksAPI(userQuery) {
  let books = require("google-books-search");
  let options = {
    limit: 5
  };

  books.search(userQuery, options, function(error, results) {
    if (!error) {
      const table = new Table({
        head: ["Index", "Author", "Title", "Publisher"],
        colWidths: [10, 23, 20, 18],
        wordWrap: true
      });

      results.forEach((book, i) => {
        if (book.authors === undefined) {
          book.authors = "Not available";
        }
        if (book.title === undefined) {
          book.title = "Not available";
        }
        if (book.publisher === undefined) {
          book.publisher = "Not available";
        }
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
