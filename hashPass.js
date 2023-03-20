const { GCrypto } = require("./lib/gcrypto");
const { mutableStdout } = require("./lib/mutable");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

mutableStdout.muted = false;

readline.question("Password:", (password) => {
  console.log();
  console.log(GCrypto.hash(password));
  readline.close();
});

mutableStdout.muted = true;
