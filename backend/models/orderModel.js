const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    client_name: {
      type: String,
      required: true,
    },

    client_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    product_name: [
      {
        type: String,
        required: true,
      },
    ],
    products_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],
    total_price: {
      type: Number,
      required,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Category", OrderSchema);

module.exports = Order;
