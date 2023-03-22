import cors from "cors";
import express from "express";

import { router as drawing } from "./routes/drawing.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/drawing", drawing);

var currentdate = new Date();
var datetime =
  "Last start: " +
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();

app.listen(port, () => {
  console.log(`${datetime} - Sketch backend listening on port ${port}`);
});
