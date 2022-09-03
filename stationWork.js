const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/:station", (req, res) => {
  const stations = ["grill", "fries", "drink", "assemble", "collect"];
  if (req.params.station === undefined) {
    return res.status(400).json({ message: "pole station jest wymagane" });
  }

  if (!stations.includes(req.params.station)) {
    return res.status(400).json({ message: "zły format pola station" });
  }

  let sql = `SELECT * FROM ${req.params.station}StationWork`;

  connection.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(rows);
  });
});

module.exports = router;
