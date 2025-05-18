const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "one-handed",
        "two-handed",
        "deflecting",
        "marksman",
        "destruction",
        "heavy-armor",
        "light-armor",
      ],
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
    level: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

SkillSchema.index({ type: 1, user: 1 }, { unique: true });

const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;
