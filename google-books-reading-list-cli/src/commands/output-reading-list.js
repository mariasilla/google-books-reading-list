import chalk from "chalk";
import Table from "cli-table3";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export function outputReadingList() {
  const adapter = new FileSync("reading-list.json");
  const db = low(adapter);
  const books = db.get("books").value();

  const table = new Table({
    head: ["Index", "Author", "Title", "Publisher"],
    colWidths: [10, 23, 20, 18],
    wordWrap: true
  });

  if (books !== undefined) {
    books.forEach((book, i) => {
      table.push([i + 1, book.author, book.title, book.publisher]);
    });
    console.log(chalk.green("Here's your Reading List! Enjoy!:)"));
    console.log(table.toString());
    process.exit();
  } else {
    console.error(
      chalk.red("Nothing added to your Reading List yet."),
      chalk.greenBright("Run 'gb-reading-list help' to view possible commands.")
    );
    process.exit();
  }
}
