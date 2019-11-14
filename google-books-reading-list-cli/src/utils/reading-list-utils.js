import Table from "cli-table3";

export function createReadingList(book) {
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");

  const adapter = new FileSync("reading-list.json");
  const db = low(adapter);

  db.defaults({ books: [] }).write();

  db.get("books")
    .push({
      title: book.title,
      author: String(book.authors),
      publisher: String(book.publisher)
    })
    .write();
}

export function createSearchResultTable(books) {
  const table = new Table({
    head: ["Index", "Author", "Title", "Publisher"],
    colWidths: [10, 23, 20, 18],
    wordWrap: true
  });

  books.forEach((book, i) => {
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
}
