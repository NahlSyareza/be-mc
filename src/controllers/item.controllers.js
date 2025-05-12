const Item = require("../models/ItemSchema");

const create = async (req, res) => {
  const { name, damage, weight } = req.body;
  const item = new Item({ name, damage, weight });
  try {
    await item.save();

    return res.status(200).json({
      msg: "Item created!",
      payload: item,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const items = await Item.find().lean();

    return res.status(200).json({
      msg: "Items retrieved!",
      payload: items,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
};
