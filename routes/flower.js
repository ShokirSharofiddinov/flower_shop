const express = require('express');
const rounter = express.Router();
const flowerController = require("../controller/flower")

rounter.get("/", flowerController.getAllFlowers);

rounter.get("/:id", flowerController.getFlowerById)

rounter.put("/:id", flowerController.updateFlowerById);

rounter.post("/", flowerController.createFlower)

rounter.delete("/:id", flowerController.deleteFlower);

module.exports = rounter
