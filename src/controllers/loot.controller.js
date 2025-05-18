const Loot = require("../models/LootSchema");

const create = async (req, res) => {
  const { biome, min_level, max_level } = req.body;

  const d = new Loot({ biome, min_level, max_level });
  try {
    await d.save();

    return res.status(200).json({
      success: true,
      msg: "Created new Loot entry!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const add = async (req, res) => {
  const { loot, items } = req.body;
  const arr = [];

  try {
    const d = await Loot.findById(loot);

    if (!d) {
      return res.status(200).json({
        success: false,
        msg: "Loot entry doesn't exist",
        payload: d,
      });
    }

    items.map(async (e) => {
      await Loot.findOneAndUpdate(
        { _id: loot },
        {
          $push: {
            items: e,
          },
        }
      ).finally(arr.push(e));
    });

    return res.status(200).json({
      success: true,
      msg: "Added items to Loot entry!",
      payload: arr,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Loot.find().lean();

    return res.status(200).json({
      success: true,
      msg: "Retrieved all Loot entry",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllPopulated = async (req, res) => {
  try {
    const d = await Loot.find().lean().populate("items");

    return res.status(200).json({
      success: true,
      msg: "Retrieved all Loot entry",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  add,
  getAll,
  getAllPopulated,
};
