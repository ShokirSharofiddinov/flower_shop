const express = require("express");
const rounter = express.Router();
const orders = require("../controller/order");

rounter.get("/", orders.getAllOrders);

rounter.get("/:id", orders.getOrderById);

rounter.post("/", orders.postOrder)

rounter.put("/:id", orders.updateOrder)

// rounter.get("/:id", orders.deleteOrder) // cann't delete

module.exports = rounter;
