require = require("esm")(module);
import { API } from "../src/utils/api/api-config";
import { getBookData, parseBookData } from "../src/utils/api/api-utils";
import { mockBooksGeneral, mockBooksTitle, mockBooksAuthor } from "./mock-data";

describe("Cli module should be loaded", () => {
  let mockRequire;
  let spyCli;

  beforeEach(() => {
    process.argv = ["/usr/local/bin/node", "node_modules/.bin/jest"];
    mockRequire = require("../src/cli");
    spyCli = jest.spyOn(mockRequire, "cli");
  });

  test("cli() function should be called with process.argv", () => {
    mockRequire.cli(process.argv);

    expect(spyCli).toBeCalledTimes(1);
    expect(spyCli).toHaveBeenCalledWith([
      "/usr/local/bin/node",
      "node_modules/.bin/jest"
    ]);
  });

  test("if the wrong command is passed, error message should print to the console", () => {
    process.argv.push("run commands");

    const spyLogError = jest.spyOn(console, "error");
    mockRequire.cli(process.argv);

    expect(spyLogError).toBeCalledTimes(1);
    expect(spyLogError).toHaveBeenCalledWith(
      '"run commands" is not a valid command!'
    );
  });
});

describe("Function getBookData() should handle API get request correctly", () => {
  let userInput;
  let baseUri;
  let status;
  let statusText;
  let data;

  beforeEach(async () => {
    userInput = "love";
    baseUri = API.BASE_URI;
    ({ data, status, statusText } = await getBookData(baseUri, userInput));
  });

  test("status should be 200", async () => {
    expect(status).toEqual(200);
  });

  test("statusText should be OK", async () => {
    expect(statusText).toEqual("OK");
  });

  test("function should return json object", async () => {
    expect(data).toBeDefined();
  });

  describe("parseBookData() function should parse data", () => {
    test("should return object of books with general results if API.BASE_URI is passed", async () => {
      const books = parseBookData(data);
      expect(books).toEqual(mockBooksGeneral);
    });

    test("return object of books with specific title if BASE_URI_TITLE is passed", async () => {
      baseUri = API.BASE_URI_TITLE;
      userInput = "jaVascript";
      ({ data } = await getBookData(baseUri, userInput));
      const books = parseBookData(data);
      expect(books).toEqual(mockBooksTitle);
    });

    test("return object of books with specific author if BASE_URI_AUTHOR is passed", async () => {
      baseUri = API.BASE_URI_AUTHOR;
      userInput = "Flannagan";
      ({ data } = await getBookData(baseUri, userInput));
      const books = parseBookData(data);
      expect(books).toEqual(mockBooksAuthor);
    });
  });
});
