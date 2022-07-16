const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/", (req, res) => {
  let sql = `SELECT * from dishes where available = 1`;

  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);

    for (let i = 0; i < rows.length; i++) {
      let el = rows[i];

      if (el.typesOfActivity) {
        el.typesOfActivity = JSON.parse(el.typesOfActivity);
      }

      if (el.bunddleItems) {
        el.bunddleItems = JSON.parse(el.bunddleItems);
      }

      el.available = true;
      el.isBunddle === 0 ? (el.isBunddle = false) : (el.isBunddle = true);
    }

    res.status(200).json(rows);
  });
});

module.exports = router;
