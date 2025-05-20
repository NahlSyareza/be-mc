const Loot = require("../models/LootSchema");
const random = require("../utils/misc.util");

const create = async (req, res) => {
  const { item, level, type, extra } = req.body;

  let d;

  if (type === "enemy_loot") {
    d = new Loot.EnemyLoot({
      item,
      level,
      biome: extra.biome,
    });
  } else {
    d = new Loot.MerchantLoot({
      item,
      level,
      merchant: extra.merchant,
    });
  }
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

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Loot.Loot.findById(id).lean();

    return res.status(200).json({
      success: true,
      msg: "Retrieved Loot record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getPopulated = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Loot.Loot.findById(id).lean().populate("item");

    return res.status(200).json({
      success: true,
      msg: "Retrieved Loot record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Loot.Loot.find().lean();

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
    const d = await Loot.Loot.find().lean().populate("item").sort({ level: 1 });

    return res.status(200).json({
      success: true,
      msg: "Retrieved all Loot entry",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getLevelled = async (req, res) => {
  const { level, biome } = req.query;

  try {
    const d = await Loot.EnemyLoot.findOne({
      biome: biome,
      level: {
        $lte: Math.max(1, level - 5),
        $gte: level + 5,
      },
    }).lean();

    const num = random.getRandomInt(d.items.length);

    return res.status(200).json({
      success: true,
      msg: "Retrieved Loot record from levelled range!",
      payload: d.items[num],
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getLevelledPopulated = async (req, res) => {
  const { level, biome } = req.query;

  try {
    const [d] = await Loot.EnemyLoot.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $unwind: "$item",
      },
      {
        $match: {
          biome: biome,
          level: {
            $lte: parseInt(level),
          },
        },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "Retrieved Loot record from levelled range!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getMerchant = async (req, res) => {
  const { merchant } = req.params;

  try {
    const d = await Loot.MerchantLoot.find({
      merchant,
    }).lean();

    return res.status(200).json({
      success: true,
      msg: `Retrieved Loot for ${merchant}`,
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getMerchantPopulated = async (req, res) => {
  const { merchant } = req.params;

  try {
    const d = await Loot.MerchantLoot.find({
      merchant,
    })
      .lean()
      .populate("item");

    return res.status(200).json({
      success: true,
      msg: `Retrieved Loot for ${merchant}`,
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Loot.Loot.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Delete Loot record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const update = async (req, res) => {
  const { id, level } = req.body;

  try {
    const d = await Loot.Loot.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          level,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      msg: "Updated Loot type enemy loot record!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
  getAllPopulated,
  getLevelled,
  getLevelledPopulated,
  getMerchant,
  getMerchantPopulated,
  del,
  update,
  get,
  getPopulated,
};
