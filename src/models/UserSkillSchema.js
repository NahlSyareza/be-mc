const mongoose = require("mongoose");

const UserSkillSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    level: {
      type: Number,
      default: 15,
    },
    progress_xp: {
      type: Number,
      default: 0,
    },
    level_up_xp: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const UserSkill = mongoose.model("User_Skill", UserSkillSchema);

module.exports = UserSkill;
