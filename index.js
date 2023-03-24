import cors from "cors";
import express from "express";
import config from "config";
import { datetime } from "./lib/dateTime.js";
import { router as drawing } from "./routes/drawing.js";

let jwtPrivateKey;

const app = express();
const port = process.env.PORT || 3000;

jwtPrivateKey = config.get("jwtPrivateKey");
if (!jwtPrivateKey) {
  console.log(
    "Fatal error: glinks_jwtPrivateKey not set in an environment variable"
  );
  process.exit(1);
}

app.use(express.json());
app.use(cors());

app.use("/api/drawing", drawing);

app.listen(port, () => {
  console.log(`${datetime()} - Sketch backend listening on port ${port}`);
});
