const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/", (req, res) => {
  res.status(200).json(global.DISHES);
});

router.post("/", (req, res) => {
  //recive {displayName: STR, price: FLOAT, typesOfActivity: JSON[STR, ...], bunddleItems(optional): JSON[INT, ...], isBunddle: 0,1, category_id: INT}
  //return 400 if any of required params is missing
  //return 400 if any of parameters has wrong format
  //return 400 if bunddleItems is null and isBunddle = 1
  //return 400 if typesOfActivity is not null and isBunddle = 1
  //return 500 if there was a DB error
  //return 200 with dishId

  if (req.body.displayName === "" || req.body.displayName === undefined) {
    return res.status(400).json({ message: "pole displayName jest wymagane" });
  }
  if (req.body.price === "" || req.body.price === undefined) {
    return res.status(400).json({ message: "pole price jest wymagane" });
  }
  if (req.body.isBunddle === "" || req.body.isBunddle === undefined) {
    return res.status(400).json({ message: "pole isBunddle jest wymagane" });
  }
  if (req.body.category_id === "" || req.body.category_id === undefined) {
    return res.status(400).json({ message: "pole category_id jest wymagane" });
  }

  if (req.body.isBunddle === 1) {
    if (req.body.bunddleItems === "" || req.body.bunddleItems === undefined) {
      return res
        .status(400)
        .json({ message: "pole bunddleItems jest wymagane" });
    }
    if (req.body.typesOfActivity !== undefined) {
      return res
        .status(400)
        .json({ message: "nie możesz podać typesOfActivity dla zestawu" });
    }
  }

  if (typeof req.body.displayName != "string") {
    return res.status(400).json({ message: "zły format pola displayName" });
  }
  if (typeof req.body.price != "number") {
    return res.status(400).json({ message: "zły format pola price" });
  }
  if (typeof req.body.category_id != "number") {
    return res.status(400).json({ message: "zły format pola category_id" });
  }

  if (![0, 1].includes(req.body.isBunddle)) {
    return res.status(400).json({ message: "zły format pola isBunddle" });
  }

  if (req.body.isBunddle === 1) {
    if (
      !Array.isArray(req.body.bunddleItems) ||
      req.body.bunddleItems.length === 0
    ) {
      return res.status(400).json({ message: "zły format pola bunddleItems" });
    }

    req.body.bunddleItems.forEach((i) => {
      if (typeof i != "number") {
        return res
          .status(400)
          .json({ message: "zły format pola bunddleItems" });
      }
    });
  } else {
    if (req.body.bunddleItems !== undefined) {
      return res.status(400).json({
        message: "nie możesz podać bunddleItems jeśli to nie jest zestaw",
      });
    }
    if (
      !Array.isArray(req.body.typesOfActivity) ||
      req.body.typesOfActivity.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "zły format pola typesOfActivity" });
    }

    req.body.typesOfActivity.forEach((i) => {
      if (typeof i != "string") {
        return res
          .status(400)
          .json({ message: "zły format pola typesOfActivity" });
      }

      if (!["grill", "assemble", "fries", "drink"].includes(i)) {
        return res
          .status(400)
          .json({ message: "zły format pola typesOfActivity" });
      }
    });
  }

  let typesOfActivity = req.body.typesOfActivity
    ? "'" + JSON.stringify([...req.body.typesOfActivity]) + "'"
    : null;
  let bunddleItems = req.body.bunddleItems
    ? "'" + JSON.stringify([...req.body.bunddleItems]) + "'"
    : null;

  let sql = `INSERT INTO dishes (displayName, price, typesOfActivity, bunddleItems, isBunddle, available, category_id) VALUES ("${req.body.displayName}", "${req.body.price}", ${typesOfActivity}, ${bunddleItems}, ${req.body.isBunddle}, 1, ${req.body.category_id})`;

  connection.query(sql, (err, result) => {
    if (err) return console.log(err);
    res.status(200).json(result);
  });
});

router.get("/categories", (req, res) => {
  let sql = `SELECT * from dish_categories dc`;

  connection.query(sql, (err, rows) => {
    if (err) return console.log(err);

    res.status(200).json(rows);
  });
});

module.exports = router;
