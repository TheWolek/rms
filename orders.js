const express = require("express");
const router = express.Router();

const mysql = require("mysql");
const creds = require("./db_creds");
const connection = mysql.createConnection(creds);
connection.connect();

router.get("/active", (req, res) => {
  let sql = `SELECT o.orderId, o.displayOrderId, o.paymentMethod, o.takeAway, o.status,
  dio.id, dio.dishId, d.displayName, d.price, dio.dishStatus
  from orders o 
  join dishesInOrders dio on dio.orderId = o.orderId
  join dishes d on d.dishId = dio.dishId 
  WHERE isClosed = 0 and displayOrderId is not null;`;

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json([]);
    }

    let orders = [];

    result.forEach((el) => {
      let index = orders.findIndex((o) => o.orderId === el.orderId);
      if (index !== -1) {
        let item = {
          id: el.id,
          dishId: el.dishId,
          displayName: el.displayName,
          price: el.price,
          dishStatus: el.dishStatus,
        };
        orders[index].items.push(item);
      } else {
        let order = {
          orderId: el.orderId,
          displayOrderId: el.displayOrderId,
          PaymentMethod: el.paymentMethod,
          takeAway: el.takeAway === 0 ? false : tru,
          status: el.status,
          items: [
            {
              id: el.id,
              dishId: el.dishId,
              displayName: el.displayName,
              price: el.price,
              dishStatus: el.dishStatus,
            },
          ],
        };

        orders.push(order);
      }
    });

    return res.status(200).json(orders);
  });
});

router.post("/", (req, res) => {
  // recive {items: [INT, INT], paymentMethod: INT, takeAway: BOOL}
  // return 400 if any parameter is missing
  // return 500 if there was DB error
  // return 200 with {}

  if (
    req.body.paymentMethod === undefined ||
    req.body.paymentMethod === 0 ||
    typeof req.body.paymentMethod !== "number"
  ) {
    return res
      .status(400)
      .json({ message: "pole paymentMethod jest wymagane" });
  }

  if (
    req.body.takeAway === undefined ||
    typeof req.body.takeAway !== "boolean"
  ) {
    return res.status(400).json({ message: "pole takeAway jest wymagane" });
  }

  if (req.body.items === undefined || req.body.items.length === 0) {
    return res.status(400).json({ message: "pole items jest wymagane" });
  }

  function getLastOrderId() {
    return new Promise(function (resolve, reject) {
      let sql =
        "SELECT displayOrderId FROM orders WHERE isClosed = 0 ORDER BY displayOrderId desc LIMIT 1";

      connection.query(sql, function (err, rows) {
        if (err) return reject(err);

        resolve(rows);
      });
    });
  }

  function getInsertedOrderId(newID) {
    return new Promise(function (resolve, reject) {
      let takeAway = req.body.takeAway === true ? 1 : 0;
      let sqlOrder = `INSERT INTO orders (displayOrderId, paymentMethod, takeAway, status, isClosed) VALUES (${newID}, ${req.body.paymentMethod}, ${takeAway}, "new", 0)`;

      connection.query(sqlOrder, function (err, result) {
        if (err) return reject(err);

        resolve(result);
      });
    });
  }

  getLastOrderId()
    .then(function (rows) {
      const lastId = rows[0].displayOrderId;
      const newID = lastId + 1;

      getInsertedOrderId(newID)
        .then(function (result) {
          const orderInsertedId = result.insertId;
          let items = "";

          for (let i = 0; i < req.body.items.length; i++) {
            const itemId = req.body.items[i];
            let item = global.DISHES.find((o) => o.dishId === itemId);
            if (item.isBunddle) {
              let subItems = item.bunddleItems;
              for (let i = 0; i < subItems.length; i++) {
                const el = subItems[i];

                items += `(${el}, ${orderInsertedId}, "new")`;
                if (i < subItems.length - 1) items += ", ";
              }
            } else {
              items += `(${itemId}, ${orderInsertedId}, "new")`;
            }

            if (i < req.body.items.length - 1) items += ", ";
          }

          let sqlOrderDishes = `INSERT INTO dishesInOrders (dishId, orderId, dishStatus) VALUES ${items}`;
          console.log(sqlOrderDishes);

          connection.query(sqlOrderDishes, function (err, result) {
            if (err) return res.status(500).json(err);
            res.status(200).json({
              orderId: orderInsertedId,
              displayOrderId: newID,
              paymentMethod: req.body.paymentMethod,
              takeAway: req.body.takeAway,
              status: "new",
              items: req.body.items,
            });
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

module.exports = router;