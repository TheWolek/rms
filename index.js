const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const bodyParser = require("body-parser");

const getAllDishes = require("./utils/getAllDishes");
const dishes = require("./dishes");
const orders = require("./orders");
const stationWork = require("./stationWork");

const checkHeaders = function (req, res, next) {
  const apikey = req.get("x-api-key");
  if (!apikey) return res.status(401).json({});
  if (apikey !== process.env.API_KEY) return res.status(401).json({});
  // console.log(req.get("x-api-key"));
  next();
};

app.use(cors());
app.use(checkHeaders);

app.use(bodyParser.json());
app.use("/dishes", dishes);
app.use("/orders", orders);
app.use("/stationwork", stationWork);

app.get("/", (req, res) => {
  res.send("helloo");
});

app.listen(port, () => {
  console.log(`app @ ${port}`);
  getAllDishes.getAllDishes();
});
