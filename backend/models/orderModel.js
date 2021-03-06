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
    products_name: {
      type: String,
      required: true,
    },

    assigned_to: {
      type: String,
      enum: ["Accountant", "Designer", "Staff", "Writer"],
      default: "Staff",
    },
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
    paid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
