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
    products_name: [
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
      required: true,
    },
    recept_images: [
      {
        type: String,
        default: null,
      },
    ],
    paid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
