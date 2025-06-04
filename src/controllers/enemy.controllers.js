const Enemy = require("../models/EnemySchema");

const create = async (req, res) => {
  const {
    name,
    max_hp,
    max_mp,
    max_sp,
    atk,
    def,
    mgc,
    difficulty,
    level,
    sprite,
    bg,
    biome,
  } = req.body;

  const s = new Enemy({
    name,
    max_hp,
    max_mp,
    max_sp,
    difficulty,
    level,
    sprite,
    atk,
    def,
    mgc,
    bg,
    biome,
  });

  try {
    await s.save();

    return res.status(200).json({
      success: true,
      msg: "Enemy created!",
      payload: s,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const s = await Enemy.find().lean().sort({
      biome: 1,
      level: 1,
    });

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

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Enemy.findById(id);

    return res.status(200).json({
      success: true,
      msg: `${d.name} retrieved`,
      payload: d,
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

const getLevelled = async (req, res) => {
  const { level, biome } = req.query;

  try {
    const lower = Math.max(1, parseInt(level) - 5);
    const upper = parseInt(level) + 5;

    // console.log(lower);
    // console.log(upper);

    const [d] = await Enemy.aggregate([
      {
        $match: {
          biome: biome,
          level: {
            $lte: upper,
            // $gte: lower,
          },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "Retrieved Enemy record from levelled range",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const update = async (req, res) => {
  const { id, max_hp, atk, def, mgc, level } = req.body;

  try {
    const d = await Enemy.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          max_hp,
          atk,
          def,
          mgc,
          level,
        },
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Updated Enemy record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Enemy.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Deleted Enemy record",
      payload: d,
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
  get,
  getLevelled,
  del,
  update,
};
