const Item = require("../models/ItemSchema");
const Inventory = require("../models/InventorySchema");
const Loot = require("../models/LootSchema");

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

const update = async (req, res) => {
  const { id, max_stack, desc, type, extra } = req.body;

  try {
    let d;
    switch (type) {
      case "armor":
        d = await Item.Armor.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              max_stack,
              desc,
              def: extra.def,
            },
          }
        );

        return res.status(200).json({
          success: true,
          msg: "Updated Item type armor record!",
          payload: d,
        });

      case "weapon":
        d = await Item.Weapon.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              max_stack,
              desc,
              atk: extra.atk,
              cost: extra.cost,
            },
          }
        );
        return res.status(200).json({
          success: true,
          msg: "Updated Item type weapon record!",
          payload: d,
        });

      case "spell":
        d = await Item.Spell.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              max_stack,
              desc,
              mgc: extra.mgc,
              cost: extra.cost,
            },
          }
        );
        return res.status(200).json({
          success: true,
          msg: "Updated Item type spell record!",
          payload: d,
        });

      case "potion":
        d = await Item.Potion.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              max_stack,
              desc,
              attribute: extra.attribute,
              restore: extra.restore,
            },
          }
        );

        return res.status(200).json({
          success: true,
          msg: "Updated Item type potion record!",
          payload: d,
        });

      default:
        d = await Item.Misc.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: {
              max_stack,
              desc,
            },
          }
        );

        return res.status(200).json({
          success: true,
          msg: "Updated Item type misc record!",
          payload: d,
        });
    }
  } catch (e) {
    return res.status(400).send(e);
  }
};

const del = async (req, res) => {
  const { id } = req.params;

  try {
    const d = await Item.BaseItem.findOneAndDelete({ _id: id });
    const i = await Inventory.deleteMany({ item: id });
    const u = await Loot.Loot.deleteMany({ item: id });

    return res.status(200).json({
      success: true,
      msg: "Deleted Item record",
      payload: [d, i, u],
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
  update,
};
