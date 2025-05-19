const express = require("express");
const router = express.Router();
const c = require("../controllers/inventory.controller");

router.post("/add", c.add);
router.get("/getAll", c.getAll);
router.get("/getAll/p", c.getAllPopulated);
router.get("/get/:user", c.get);
router.get("/get/p/:user", c.getPopulated);
router.put("/remove", c.remove);
router.put("/set", c.set);
router.delete("/delete/:id", c.del);

module.exports = router;
