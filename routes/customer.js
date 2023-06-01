const express = require("express");
const rounter = express.Router();
const customers = require("../controller/customer");

rounter.get("/", customers.getAllCustomers);

rounter.get("/:id", customers.getCustomerById);

rounter.post("/", customers.postCustomer);

rounter.put("/:id", customers.updateCustomer);

rounter.delete("/:id", customers.deleteCustomer);

module.exports = rounter;