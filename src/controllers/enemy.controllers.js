const Enemy = require("../models/EnemySchema");

const create = async (req, res) => {
  const { name, hp, mp, sp, difficulty, level } = req.body;

  const s = new Enemy({ name, hp, mp, sp, difficulty, level });
  try {
    await s.save();

    return res.status(200).json({
      msg: "Enemy created!",
      payload: s,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const s = await Enemy.find().lean();

    return res.status(200).json({
      msg: "Retrieved all enemies!",
      payload: s,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllPopulated = async (req, res) => {
  try {
    const s = await Enemy.find()
      .lean()
      .populate("items")
      .populate({ path: "skills", populate: { path: "skill" } });

    return res.status(200).json({
      msg: "Retrieved all enemies!",
      payload: s,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const addItem = async (req, res) => {
  const { id, item } = req.body;

  try {
    const s = await Enemy.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          items: item,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      msg: `Added new item to enemy! ${s.name}`,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  addItem,
  getAll,
  getAllPopulated,
};
