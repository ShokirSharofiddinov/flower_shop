const express = require("express");
const rounter = express.Router();

const flowerRoutes = require("./flower")
rounter.use("/flowers", flowerRoutes)

const customerRoutes = require("./customer")
rounter.use("/customers",customerRoutes)

const orderRoutes = require("./order");
rounter.use("/orders", orderRoutes);

module.exports = rounter;
