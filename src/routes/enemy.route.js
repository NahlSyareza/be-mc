const express = require("express");
const router = express.Router();
const c = require("../controllers/enemy.controllers");

router.post("/create", c.create);
router.put("/addItem", c.addItem);
router.get("/get/:id", c.get);
router.get("/getAll", c.getAll);
router.get("/getAll/p", c.getAllPopulated);
router.get("/getLevelled", c.getLevelled);
router.delete("/delete/:id", c.del);
router.put("/update", c.update);

module.exports = router;
