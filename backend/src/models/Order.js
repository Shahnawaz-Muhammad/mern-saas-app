import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number, default: 1 },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "preparing", "delivered"],
    default: "pending",
  },
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
