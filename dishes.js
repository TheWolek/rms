const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/", (req, res) => {
  res.status(200).json(global.DISHES);
});

module.exports = router;
