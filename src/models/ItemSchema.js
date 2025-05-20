const mongoose = require("mongoose");

const BaseItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    max_stack: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const WeaponSchema = new mongoose.Schema({
  atk: {
    type: Number,
    require: true,
  },
  skill: {
    type: String,
    default: "handling",
  },
  cost: {
    type: Number,
    required: true,
  },
});

const SpellSchema = new mongoose.Schema({
  mgc: {
    type: Number,
    require: true,
  },
  skill: {
    type: String,
    default: "destruction",
  },
  cost: {
    type: Number,
    required: true,
  },
});

const ArmorSchema = new mongoose.Schema({
  def: {
    type: Number,
    require: true,
  },
  skill: {
    type: String,
    default: "deflection",
  },
});

const PotionSchema = new mongoose.Schema({
  restore: {
    type: Number,
    require: true,
  },
  attribute: {
    type: String,
    enum: ["HP", "MP", "SP"],
    require: true,
  },
});

const AccessorySchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  attribute: {
    type: String,
    enum: ["HP", "MP", "SP", "ATK", "DEF", "MGC"],
    require: true,
  },
});

const BaseItem = mongoose.model("Item", BaseItemSchema);

const Misc = BaseItem.discriminator("misc", BaseItemSchema);
const Weapon = BaseItem.discriminator("weapon", WeaponSchema);
const Armor = BaseItem.discriminator("armor", ArmorSchema);
const Potion = BaseItem.discriminator("potion", PotionSchema);
const Spell = BaseItem.discriminator("spell", SpellSchema);
const Accessory = BaseItem.discriminator("accessory", AccessorySchema);

module.exports = { BaseItem, Misc, Weapon, Armor, Potion, Spell, Accessory };
