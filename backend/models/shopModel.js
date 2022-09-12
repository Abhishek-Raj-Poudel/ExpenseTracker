const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    order_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        default: null,
      },
    ],
    staff_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    roles: [String],
    client_id: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    other_orders: [Object],
    service: {
      type: String,
      default: "Service",
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", ShopSchema);

module.exports = Shop;
