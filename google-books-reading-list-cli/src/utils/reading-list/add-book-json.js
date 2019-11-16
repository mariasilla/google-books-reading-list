import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export function addBookToJson(book) {
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
