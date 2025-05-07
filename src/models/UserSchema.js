const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hp: {
      type: Number,
      default: 100,
    },
    mp: {
      type: Number,
      default: 100,
    },
    sp: {
      type: Number,
      default: 100,
    },
    level: {
      type: Number,
      default: 0,
    },
    guild: {
      type: String,
      default: "None",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "User_Skill" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
