import chalk from "chalk";
import Table from "cli-table3";

export async function queryGoogleBooksAPI(userQuery) {
  let books = require("google-books-search");
  let options = {
    field: "title",
    limit: 5
  };

  books.search(userQuery, options, function(error, results) {
    if (!error) {
      const table = new Table({
        head: ["Author", "Title", "Publisher"],
        colWidths: [23, 20, 18],
        wordWrap: true
      });

      results.forEach(book => {
        if (book.authors && book.title && book.publisher) {
          table.push([book.authors.toString(), book.title, book.publisher]);
        }
      });

      console.log(table.toString());
      process.exit();
    } else {
      console.error(chalk.redBright(`${error}. Program exit.`));
      process.exit();
    }
  });
}
