const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4001;
const CONNECTION_STRING = "mongodb://mongodb:27017/major_computer";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(CONNECTION_STRING);

const user = require("./src/routes/user.route");
const item = require("./src/routes/item.route");
const post = require("./src/routes/post.route");
const skill = require("./src/routes/skill.route");
const enemy = require("./src/routes/enemy.route");
const inventory = require("./src/routes/inventory.route");
const loot = require("./src/routes/loot.route");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.get("/", async (req, res) => {
  return res.send("Start querying now!");
});

app.use("/user", user);
app.use("/skill", skill);
app.use("/post", post);
app.use("/item", item);
app.use("/enemy", enemy);
app.use("/inv", inventory);
app.use("/loot", loot);

app.listen(PORT, () =>
  console.log(`Backend server has been started on port: ${PORT}`)
);
