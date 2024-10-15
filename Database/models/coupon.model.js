import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "coupon code is required"],
      trim: true,
      unique: true,
    },
    discount: {
      type: Number,
      min: 0,
      required: [true, "coupon discount is required"]
    },
    expires: {
      type : String,
      required: [true, "coupon expiry date is required"]
    },
  },
  {
    timestamps: true,
  }
);

const couponModel = mongoose.model("Coupon", schema);

export default couponModel;
