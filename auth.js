const { GCrypto } = require("./lib/gcrypto");
const { mutableStdout } = require("./lib/mutable");
const util = require("util");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});
const question = util.promisify(rl.question).bind(rl);

function inputPass() {
  return new Promise((resolve) => {
    question("Password:").then((password) => {
      resolve(password);
    });
    mutableStdout.muted = true;
  });
}

async function login() {
  mutableStdout.muted = false;
  const email = await question("Username(email):");
  const password = await inputPass();

  console.log();
  console.log("username:" + email);
  console.log("hash pass:" + GCrypto.hash(password));
  rl.close();
}

login();
