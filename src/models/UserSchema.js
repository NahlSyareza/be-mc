const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    max_hp: {
      type: Number,
      default: 100,
    },
    max_mp: {
      type: Number,
      default: 25,
    },
    max_sp: {
      type: Number,
      default: 25,
    },
    atk: {
      type: Number,
      default: 1,
    },
    def: {
      type: Number,
      default: 1,
    },
    mgc: {
      type: Number,
      default: 1,
    },
    level: {
      type: Number,
      default: 1,
    },
    guild: {
      type: String,
      default: "None",
    },
    bg: {
      type: String,
      required: true,
    },
    p_xp: {
      type: Number,
      default: 0,
    },
    l_xp: {
      type: Number,
      default: 100,
    },
    sprite: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
