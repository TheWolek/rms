const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/", (req, res) => {
  res.status(200).json(global.DISHES);
});

router.get("/categories", (req, res) => {
  let sql = `SELECT * from dish_categories dc`;

  connection.query(sql, (err, rows) => {
    if (err) return console.log(err);

    res.status(200).json(rows);
  });
});

module.exports = router;
