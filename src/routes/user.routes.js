const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");

router.post("/create", controller.create);
router.get("/getAll", controller.getAll);
router.get("/getAll/p", controller.getAllPopulated);
router.get("/get/:id", controller.get);
router.post("/addItem", controller.addItem);
router.post("/dummy", controller.getAssocSkill);
router.get("/getItems/:user", controller.getItems);
router.post("/login", controller.getByCredential);

module.exports = router;
