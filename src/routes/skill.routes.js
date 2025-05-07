const express = require("express");
const router = express.Router();
const controller = require("../controllers/skill.controllers");

router.get("/getAll", controller.getAll);
router.post("/create", controller.create);
router.put("/progressXP", controller.progressXP);

module.exports = router;
