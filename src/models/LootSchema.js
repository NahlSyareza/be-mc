const mongoose = require("mongoose");

const LootSchema = new mongoose.Schema(
  {
    level: {
      type: Number,
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true }
);

const EnemyLootSchema = new mongoose.Schema({
  biome: {
    type: String,
    required: true,
    enum: ["forest", "jungle", "hallow", "crimson", "corruption"],
  },
});

const MerchantLootSchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: true,
  },
});

MerchantLootSchema.index({ merchant: 1 }, { unique: true });

const Loot = mongoose.model("Loot", LootSchema);

const EnemyLoot = Loot.discriminator("enemy_loot", EnemyLootSchema);
const MerchantLoot = Loot.discriminator("merchant_loot", MerchantLootSchema);

module.exports = { Loot, EnemyLoot, MerchantLoot };
