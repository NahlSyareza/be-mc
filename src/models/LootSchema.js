const mongoose = require("mongoose");

const LootSchema = new mongoose.Schema(
  {
    biome: {
      type: String,
      required: true,
      enum: ["forest", "jungle", "hallow", "crimson", "corruption"],
    },
    min_level: {
      type: Number,
      required: true,
    },
    max_level: {
      type: Number,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

LootSchema.index({ biome: 1, min_level: 1, max_level: 1 }, { unique: true });

const Loot = mongoose.model("Loot", LootSchema);

module.exports = Loot;
