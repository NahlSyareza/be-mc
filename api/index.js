const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.CONNECTION_STRING);

const userRoutes = require("../src/routes/user.routes");
const itemRoutes = require("../src/routes/item.routes");
const postRoutes = require("../src/routes/post.routes");
const skillRoutes = require("../src/routes/skill.routes");
const enemyRoutes = require("../src/routes/enemy.routes");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.get("/", async (req, res) => {
  return res.send("Start querying now!");
});

app.use("/user", userRoutes);
app.use("/skill", skillRoutes);
app.use("/post", postRoutes);
app.use("/item", itemRoutes);
app.use("/enemy", enemyRoutes);

app.listen(PORT, () =>
  console.log(`Backend server has been started on port: ${PORT}`)
);
