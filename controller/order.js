const db = require("../config/db");

exports.getAllOrders = (req, res) => {
  db.query("SELECT * FROM orders", (error, resolt) => {
    if (error) {
      console.log("Error retrieving flowers: ", error);
      return res.status(500).json({ error: "Internam Server Error" });
    }
    res.json(resolt);
  });
};

exports.getOrderById = (req, res) => {
  const orderId = req.params.id;
  db.query("SELECT * FROM orders WHERE id = ?", [orderId], (error, result) => {
    if (error) {
      console.log("Error retrieving flower: ", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result[0]);
  });
};

exports.postOrder = (req, res) => {
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "INSERT INTO orders(customer_id, flower_id, quantity) VALUES(?, ?, ?)",
    [customer_id, flower_id, quantity],
    (error, result) => {
      if (error) {
        console.log("Error retrieving flower: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log(result);
      res.json({
        message: "Order created successfully",
        orderId: result.insertId,
      });
    }
  );
};

exports.updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { customer_id, flower_id, quantity } = req.body;
  db.query(
    "UPDATE orders SET customer_id = ?, flower_id = ?, quantity = ? WHERE id = ?",
    [customer_id, flower_id, quantity,orderId],
    (error,result) => {
        if (error) {
          console.log("Error retrieving flower: ", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({
            massage: "Order update succssfull"
        })
    }
  );
};

// exports.deleteOrder = (req,res) => { // cann't delete
//     const orderId = req.params.id;
//     db.query(
//         "DELETE FROM orders WHERE id = ?",
//         [orderId],
//         (error) => {
//             if (error) {
//               console.log("Error retrieving flower: ", error);
//               return res.status(500).json({ error: "Internal Server Error" }); 
//             }
//             res.json({
//                 message: "Order deleted seccssfull"
//             })
//         }
//     )
// }
