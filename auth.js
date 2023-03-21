import { GCrypto } from "./lib/gcrypto.js";
import { mutableStdout } from "./lib/mutable.js";
import { promisify } from "node:util";
import * as readline from "readline";
import { httpGet } from "./lib/httpGet.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});
const question = promisify(rl.question).bind(rl);

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
  rl.close();

  const body = { email: email, password: GCrypto.hash(password) };
  const url = "https://woven-name-321505.appspot.com/api/auth/";
  const response = await httpGet(url, body);
  //const data = await response.text();
  const token = response.headers.get("x-auth-token");
  if (!token) {
    console.log("Not authorized");
  } else {
    console.log(token);
  }
}

login();
