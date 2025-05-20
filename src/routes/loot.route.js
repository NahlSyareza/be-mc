const express = require("express");
const router = express.Router();
const c = require("../controllers/loot.controller");

router.post("/create", c.create);
router.get("/getAll", c.getAll);
router.get("/getAll/p", c.getAllPopulated);
router.get("/getLevelled", c.getLevelled);
router.get("/getLevelled/p", c.getLevelledPopulated);
router.get("/getMerchant/:merchant", c.getMerchant);
router.get("/getMerchant/p/:merchant", c.getMerchantPopulated);
router.delete("/delete/:id", c.del);
router.put("/update", c.update);
router.get("/get/:id", c.get);
router.get("/get/p/:id", c.getPopulated);

module.exports = router;
