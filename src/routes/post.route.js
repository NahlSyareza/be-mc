const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.contollers");

router.post("/create", controller.create);
router.get("/get/:_id", controller.get);
router.get("/getAll", controller.getAll);

module.exports = router;
