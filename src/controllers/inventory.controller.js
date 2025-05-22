const Inventory = require("../models/InventorySchema");
const Item = require("../models/ItemSchema");

const add = async (req, res) => {
  const { user, item, count } = req.body;

  try {
    const m = await Inventory.findOne({ user, item }).lean().populate("item");

    if (!m) {
      const i = await Item.BaseItem.findOne({ _id: item }).lean();
      console.log(i.max_stack);
      let finalCount = Math.min(i.max_stack, count);
      console.log(finalCount);
      const d = new Inventory({ user, item, count: parseInt(finalCount) });
      await d.save();

      return res.status(200).json({
        success: true,
        msg: "Inventory created!",
        payload: d,
      });
    }

    if (m.count >= m.item.max_stack || count >= m.item.max_stack) {
      const x = await Inventory.findOneAndUpdate(
        {
          user,
          item,
        },
        {
          $set: {
            count: m.item.max_stack,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        msg: "Max stack reached!",
        payload: x,
      });
    }

    const f = await Inventory.findOneAndUpdate(
      { user, item },
      {
        $inc: {
          count: count,
        },
      },
      { new: true }
    );

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
  const { id, count } = req.body;

  try {
    const f = await Inventory.findOneAndUpdate(
      { _id: id },
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

    if (f.count < 1) {
      const d = await Inventory.findOneAndDelete({
        user,
        item,
      });

      return res.status(200).json({
        success: true,
        msg: "Deleted Inventory record",
        payload: d,
      });
    }

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
    const d = await Inventory.find()
      .lean()
      .populate("user item")
      .sort({ user: 1 });

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
    const d = await Inventory.find({ user }).populate("item");
    // .select("item count");

    return res.status(200).json({
      success: true,
      msg: "User inventory retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Inventory.findById(id).lean();

    return res.status(200).json({
      success: true,
      msg: "Retrieved Inventory record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getByIdPopulated = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Inventory.findById(id).lean().populate("user item");

    return res.status(200).json({
      success: true,
      msg: "Retrieved Inventory record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Inventory.findOneAndDelete({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      msg: "Deleted Inventory record",
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
  del,
  getById,
  getByIdPopulated,
};
