import cors from "cors";
import express from "express";
import { datetime } from "./lib/dateTime.js";

import { router as drawing } from "./routes/drawing.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/drawing", drawing);

app.listen(port, () => {
  console.log(`${datetime()} - Sketch backend listening on port ${port}`);
});
