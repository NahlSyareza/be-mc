const Skill = require("../models/SkillSchema");

const create = async (req, res) => {
  const { type, user } = req.body;

  const skill = new Skill({ type, user });

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

const getAllPopulated = async (req, res) => {
  try {
    const r = await Skill.find().lean().populate("user");

    return res.status(200).json({
      msg: "Skills retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
  getAllPopulated,
};
