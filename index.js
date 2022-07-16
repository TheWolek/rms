const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const bodyParser = require("body-parser");

const dishes = require("./dishes");

app.use(cors());
app.use(bodyParser.json());
app.use("/dishes", dishes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app @ ${port}`);
});
