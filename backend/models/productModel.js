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
      default: null,
    },
    shop_id: {
      type: mongoose.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
    image: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
