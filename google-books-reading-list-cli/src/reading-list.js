export async function createReadingList(response) {
  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");

  const adapter = new FileSync("reading-list.json");
  const db = low(adapter);

  db.defaults({ books: [] }).write();

  db.get("books")
    .push({
      author: response.value[0][1],
      title: response.value[0][2],
      publisher: response.value[0][3]
    })
    .write();
}
