import express from "express";
import bodyParser from "body-parser";

import exchange from "./route/Exchange.route.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Server is ON, really!");
});

app.use("/api/excange", exchange);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
