require = require("esm")(module);

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
