import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "preparing", "delivered"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  deliveryAddress: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
