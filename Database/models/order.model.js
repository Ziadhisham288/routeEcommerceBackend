import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    discount: Number,
    totalOrderAfterDiscount: Number,
    paymentMethod: {
      type: String,
      enums: ["cash", "credit"],
      default: "cash",
    },
    shippingAddress: {
      city: String,
      street: String,
    },
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", schema);

export default orderModel;
