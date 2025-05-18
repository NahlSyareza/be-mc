const mongoose = require("mongoose");

const EnemySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  max_hp: {
    type: Number,
    required: true,
  },
  max_mp: {
    type: Number,
    required: true,
  },
  max_sp: {
    type: Number,
    required: true,
  },
  atk: {
    type: Number,
    required: true,
  },
  def: {
    type: Number,
    required: true,
  },
  mgc: {
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
  sprite: {
    type: String,
  },
  bg: {
    type: String,
    required: true,
  },
  biome: {
    type: String,
    required: true,
  },
});

const Enemy = mongoose.model("Enemy", EnemySchema);

module.exports = Enemy;
