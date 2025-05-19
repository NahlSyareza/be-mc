const express = require("express");
const router = express.Router();
const controller = require("../controllers/item.controllers");

router.post("/create", controller.create);
router.get("/getAll", controller.getAll);
router.get("/get/:id", controller.get);
router.delete("/delete/:id", controller.del);

module.exports = router;
