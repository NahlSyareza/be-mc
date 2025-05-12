const mongoose = require("mongoose");

const EnemySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },
  mp: {
    type: Number,
    required: true,
  },
  sp: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User_Skill",
    },
  ],
  sprite: {
    type: String,
  },
});

const Enemy = mongoose.model("Enemy", EnemySchema);

module.exports = Enemy;
