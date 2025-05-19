const Item = require("../models/ItemSchema");

const create = async (req, res) => {
  const { type, name, sprite, extra, desc, max_stack } = req.body;

  let d;

  if (type === "weapon") {
    d = new Item.Weapon({
      type,
      name,
      sprite,
      desc,
      atk: extra.atk,
      cost: extra.cost,
      // skill: extra.skill,
    });
  } else if (type === "armor") {
    d = new Item.Armor({
      type,
      name,
      sprite,
      desc,
      def: extra.def,
      // skill: extra.skill,
    });
  } else if (type === "potion") {
    d = new Item.Potion({
      // type,
      name,
      sprite,
      desc,
      restore: extra.restore,
      attribute: extra.attribute,
    });
  } else if (type === "spell") {
    d = new Item.Spell({
      type,
      name,
      sprite,
      desc,
      mgc: extra.mgc,
      // skill: extra.skill,
      cost: extra.cost,
    });
  } else {
    d = new Item.Misc({
      type,
      name,
      sprite,
      desc,
      max_stack,
    });
  }

  try {
    await d.save();

    return res.status(200).json({
      success: true,
      msg: "Item created!",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const items = await Item.BaseItem.find().lean().sort({
      __t: 1,
      name: 1,
    });

    return res.status(200).json({
      msg: "Items retrieved!",
      payload: items,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Item.BaseItem.findById(id).lean();

    return res.status(200).json({
      success: true,
      msg: "Item retrieved",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

const update = async (req, res) => {};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Item.BaseItem.findOneAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      msg: "Deleted Item record",
      payload: d,
    });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  create,
  getAll,
  get,
  del,
};
