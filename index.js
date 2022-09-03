const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
const bodyParser = require("body-parser");

const getAllDishes = require("./utils/getAllDishes");
const dishes = require("./dishes");
const orders = require("./orders");
const stationWork = require("./stationWork");

app.use(cors());
app.use(bodyParser.json());
app.use("/dishes", dishes);
app.use("/orders", orders);
app.use("/stationWork", stationWork);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`app @ ${port}`);
  getAllDishes.getAllDishes();
});
