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
  // return 200 with
  // {orderId: INT, displayOrderId: INT, paymentMethod: INT, takeAway: BOOL,
  // status: "new", items: [INT, INT]}

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
      let lastId = 0;
      if (rows.length !== 0) lastId = rows[0].displayOrderId;
      const newID = lastId + 1;

      getInsertedOrderId(newID)
        .then(function (result) {
          const orderInsertedId = result.insertId;
          let items = "";
          let totalPrice = 0;

          for (let i = 0; i < req.body.items.length; i++) {
            const itemId = req.body.items[i];
            let item = global.DISHES.find((o) => o.dishId === itemId);
            totalPrice += item.price;

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

          connection.query(sqlOrderDishes, function (err, result) {
            if (err) return res.status(500).json(err);
            res.status(200).json({
              orderId: orderInsertedId,
              displayOrderId: newID,
              paymentMethod: req.body.paymentMethod,
              takeAway: req.body.takeAway,
              status: "new",
              items: req.body.items,
              totalPrice: totalPrice,
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

router.put("/:id", (req, res) => {
  // recive {status: STR ("new", "inProg", "rdy", "done")}
  // return 400 if no params were passed
  // return 400 if any of parameters does not match
  // return 400 if new status is "rdy" and not all items are ready
  // return 500 if there was DB error

  const statuses = ["new", "inProg", "rdy", "done"];

  if (req.params.id === undefined) {
    return res.status(400).json({ message: "pole id jest wymagane" });
  }

  if (req.body.status === undefined) {
    return res.status(400).json({ message: "pole status jest wymagane" });
  }

  if (req.body.status !== undefined) {
    if (!statuses.includes(req.body.status)) {
      return res.status(400).json({ message: "zły format pola status" });
    }

    if (req.body.status === "rdy") {
      function checkIfAllItemsAreReady() {
        return new Promise(function (resolve, reject) {
          let sql = `SELECT count(orderId) as allItems, 
            (select count(dishStatus) from dishesInOrders dio where orderId = ${req.params.id} and dishStatus = 'done') as readyItems 
            FROM dishesInOrders dio
            where orderId = ${req.params.id};`;

          connection.query(sql, function (err, rows) {
            if (err) return reject(err);

            resolve(rows);
          });
        });
      }

      checkIfAllItemsAreReady()
        .then((rows) => {
          if (rows[0].allItems !== rows[0].readyItems) {
            return res
              .status(400)
              .json({ message: "zamówienie nie jest jeszcze gotowe" });
          }

          let sql = `UPDATE orders SET status = '${req.body.status}' WHERE orderId = ${req.params.id}`;

          connection.query(sql, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json({});
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      let sql = `UPDATE orders SET status = '${req.body.status}' WHERE orderId = ${req.params.id}`;
      connection.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({});
      });
    }
  }
});

router.post("/:id/finish", (req, res) => {
  //recive id:INT via params
  //return 400 if id is not valid
  //return 400 if there is no such order
  //return 400 if order is not in rdy state
  //return 500 if there was DB error
  //return 200 on success

  if (req.params.id === undefined) {
    return res.status(400).json({ message: "pole id jest wymagane" });
  }

  const reg = /^\d{1,}$/;

  if (!req.params.id.match(reg)) {
    return res.status(400).json({ message: "zły format pola id" });
  }

  function getOrder() {
    return new Promise(function (resolve, reject) {
      let sql = `SELECT * FROM orders WHERE orderId = ${req.params.id}`;

      connection.query(sql, function (err, rows) {
        if (err) return reject(err);
        if (rows.length === 0) return reject(false);
        resolve(rows);
      });
    });
  }

  getOrder()
    .then((rows) => {
      if (rows[0].status !== "rdy") {
        return res
          .status(400)
          .json({ message: "nie można zakończyć nie gotowego zamówienia" });
      }

      if (rows[0].isClosed === 1) {
        return res
          .status(400)
          .json({ message: "zamówienie jest juz zakończone" });
      }

      let orderId = rows[0].orderId;

      let sql = `UPDATE orders SET isClosed = 1, status = 'done' WHERE orderId = ${orderId}; DELETE FROM dishesInOrders WHERE orderId = ${orderId};`;

      connection.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({});
      });
    })
    .catch((err) => {
      if (err === false) {
        res
          .status(400)
          .json({ message: "zamówienie o podanym id nie istnieje" });
      } else {
        res.status(500).json(err);
      }
    });
});

module.exports = router;
