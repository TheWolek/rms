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

module.exports = router;
