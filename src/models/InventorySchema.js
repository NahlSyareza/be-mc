const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

InventorySchema.index({ user: 1, item: 1 }, { unique: true });

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
