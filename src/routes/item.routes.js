const express = require("express");
const router = express.Router();
const controller = require("../controllers/item.controllers");

router.post("/create", controller.create);
router.get("/getAll", controller.getAll);
router.get("/get/:id", controller.get);

module.exports = router;
