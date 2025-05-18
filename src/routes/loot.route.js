const express = require("express");
const router = express.Router();
const c = require("../controllers/loot.controller");

router.post("/create", c.create);
router.post("/add", c.add);
router.get("/getAll", c.getAll);
router.get("/getAll/p", c.getAllPopulated);

module.exports = router;
