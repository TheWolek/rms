const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/:station", (req, res) => {
  //recive station name via params
  //return 400 if no params was passed
  //return 400 if param does not match
  //return 500 if there was DB error
  //return 200 on success with {dishId: INT, displayName: STR, id: INT, dishStatus: STR ('new', 'rdyToPck', 'done')}
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

router.put("/complete", (req, res) => {
  //recive {id: INT, newStatus: STR ('new','rdyToPck', 'done')}
  //return 400 if no params were passed
  //return 400 if any of params does not match
  //return 500 if there was DB error
  //return 200 on success
  const statuses = ["new", "rdyToPck", "done"];
  if (req.body.id === undefined) {
    return res.status(400).json({ message: "pole id jest wymagane" });
  }
  if (req.body.newStatus === undefined) {
    return res.status(400).json({ message: "pole newStatus jest wymagane" });
  }

  if (typeof req.body.id !== "number") {
    return res.status(400).json({ message: "zły format pola id" });
  }

  if (!statuses.includes(req.body.newStatus)) {
    return res.status(400).json({ message: "zły format pola newStatus" });
  }

  let sql = `UPDATE dishesInOrders SET dishStatus = ${req.body.newStatus} WHERE id = ${id}`;

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({});
  });
});

module.exports = router;
