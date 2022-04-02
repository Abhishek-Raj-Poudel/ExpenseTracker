const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: "micellaneous",
    },
    shop_id: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Category", ProductSchema);

module.exports = Order;
