const express = require("express");
const router = express.Router();
const c = require("../controllers/enemy.controllers");

router.post("/create", c.create);
router.put("/addItem", c.addItem);
router.get("/getAll", c.getAll);
router.get("/getAll/p", c.getAllPopulated);

module.exports = router;
