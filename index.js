("use strict");
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("drawing.json", (err, data) => {
    if (err) throw err;
    let obj = JSON.parse(data);
    res.send(obj);
  });
});

app.post("/", function (req, res) {
  fs.writeFileSync("drawing.json", JSON.stringify(req.body));
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Sketch backend listening on port ${port}`);
});
