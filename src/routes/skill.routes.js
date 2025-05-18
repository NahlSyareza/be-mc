const express = require("express");
const router = express.Router();
const controller = require("../controllers/skill.controllers");

router.get("/getAll", controller.getAll);
router.post("/create", controller.create);
router.get("/getAll/p", controller.getAllPopulated);

module.exports = router;
