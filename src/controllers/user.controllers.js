const User = require("../models/UserSchema");
const UserSkill = require("../models/UserSkillSchema");

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();

    return res.status(200).json({
      msg: "User added!",
      payload: user,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getByCredential = async (req, res) => {};

const addSkill = async (req, res) => {
  const { user, skill } = req.body;

  const userSkill = new UserSkill({ skill });
  try {
    await userSkill.save();

    const r = await User.findOneAndUpdate(
      { _id: user },
      {
        $push: {
          skills: userSkill._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Msg",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getSkills = async (req, res) => {
  try {
    const r = await UserSkill.find().populate("skill");

    return res.status(200).json({
      msg: "User skills retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const r = await User.find().lean();

    return res.status(200).json({
      msg: "Users retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllPopulated = async (req, res) => {
  try {
    const r = await User.find()
      .lean()
      .populate("items")
      .populate({
        path: "skills",
        populate: {
          path: "skill",
        },
      });

    return res.status(200).json({
      msg: "Users retrieved!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const user = await User.findById(id)
      .lean()
      .populate({ path: "items" })
      .populate({
        path: "skills",
        populate: {
          path: "skill",
        },
      });

    return res.status(200).json({
      msg: "User found!",
      payload: user,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const addItem = async (req, res) => {
  const { user, item } = req.body;

  try {
    const r = await User.findOneAndUpdate(
      { _id: user },
      {
        $push: {
          items: item,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Added new item to user!",
      payload: r,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  addSkill,
  getAll,
  getAllPopulated,
  get,
  addItem,
  getSkills,
};
