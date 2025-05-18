const Inventory = require("../models/InventorySchema");
const Item = require("../models/ItemSchema");

const add = async (req, res) => {
  const { user, item, count } = req.body;

  try {
    const m = await Item.BaseItem.findById(item);

    const f = await Inventory.findOneAndUpdate(
      { user, item },
      {
        $inc: {
          count: count,
        },
      },
      { new: true }
    );

    if (!f) {
      const d = new Inventory({ user, item, count });
      await d.save();

      return res.status(200).json({
        success: true,
        msg: "Inventory created!",
        payload: d,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Inventory updated!",
      payload: f,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const set = async (req, res) => {
  const { user, item, count } = req.body;

  try {
    const f = await Inventory.findOneAndUpdate(
      { user, item },
      {
        $set: {
          count: count,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Set inventory item!",
      payload: f,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const remove = async (req, res) => {
  const { user, item, count } = req.body;

  try {
    const f = await Inventory.findOneAndUpdate(
      { user, item },
      {
        $inc: {
          count: -count,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Removed inventory item!",
      payload: f,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Inventory.find().lean();

    return res.status(200).json({
      success: true,
      msg: "Inventories retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAllPopulated = async (req, res) => {
  try {
    const d = await Inventory.find().lean().populate("user item");

    return res.status(200).json({
      success: true,
      msg: "Inventories retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { user } = req.params;

  try {
    const d = await Inventory.find({ user });

    return res.status(200).json({
      success: true,
      msg: "User inventory retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getPopulated = async (req, res) => {
  const { user } = req.params;

  try {
    const d = await Inventory.find({ user })
      .populate("item")
      .select("item count");

    return res.status(200).json({
      success: true,
      msg: "User inventory retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  add,
  remove,
  set,
  getAll,
  getAllPopulated,
  get,
  getPopulated,
};
