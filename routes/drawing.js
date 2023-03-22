import express from "express";
import * as fs from "node:fs";
import { auth } from "../lib/auth.js";

export const router = express.Router();

router.get("/", auth, (req, res) => {
  fs.readFile("drawing.json", (err, data) => {
    if (err) throw err;
    let obj = JSON.parse(data);
    res.send(obj);
  });
});

router.post("/", auth, function (req, res) {
  fs.writeFileSync("drawing.json", JSON.stringify(req.body));
  res.send(req.body);
});
