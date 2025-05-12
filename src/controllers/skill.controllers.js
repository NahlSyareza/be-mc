const Skill = require("../models/SkillSchema");
const UserSkill = require("../models/UserSkillSchema");

const create = async (req, res) => {
  const { name } = req.body;

  const skill = new Skill({ name });

  try {
    await skill.save();

    return res.status(200).json({
      msg: "Skill created!",
      payload: skill,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const r = await Skill.find().lean();

    return res.status(200).json({
      msg: "Skills retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const progressXP = async (req, res) => {
  const { id, amount } = req.body;

  console.log(amount);

  try {
    const q1 = await UserSkill.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          progress_xp: amount,
        },
      },
      { new: true }
    );

    const r = await UserSkill.findById(id).lean();

    console.log(
      `Progress XP: ${r.progress_xp} Level Up XP: ${r.level_up_xp} Level: ${r.level}`
    );

    if (r.progress_xp >= r.level_up_xp) {
      const over = r.progress_xp - r.level_up_xp;
      const next = r.level_up_xp * 1.5;
      const q2 = await UserSkill.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $inc: {
            level: 1,
          },
          $set: {
            progress_xp: over,
            level_up_xp: next,
          },
        },
        { new: true }
      );

      console.log(
        `Level Up! Progress XP: ${over} Level Up XP: ${next} Level: ${
          r.level + 1
        }`
      );

      return res.status(200).json({
        msg: "Level up!",
        payload: q2,
      });
    }

    return res.status(200).json({
      msg: "XP gained!",
      payload: q1,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
  progressXP,
};
