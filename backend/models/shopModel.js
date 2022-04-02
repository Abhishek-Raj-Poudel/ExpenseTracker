const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],
    service: {
      type: String,
      default: "service",
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
