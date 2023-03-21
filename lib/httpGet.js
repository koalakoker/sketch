import fetch from "node-fetch";

async function httpGet(url, body) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export { httpGet };
