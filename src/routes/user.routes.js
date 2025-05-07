const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");

router.post("/create", controller.create);
router.post("/addSkill", controller.addSkill);
router.get("/getAll", controller.getAll);
router.get("/getAll/p", controller.getAllPopulated);
router.get("/get/:id", controller.get);
router.post("/addItem", controller.addItem);
router.get("/getSkills", controller.getSkills);

module.exports = router;
