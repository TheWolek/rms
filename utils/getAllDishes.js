const mysql = require("mysql");
const creds = require("../db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

global.DISHES = [];

function getAllDishes() {
  let sql = `SELECT * from dishes where available = 1`;

  connection.query(sql, (err, rows) => {
    if (err) return console.log(err);

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

    global.DISHES = rows;
  });
}

module.exports = { getAllDishes };
