import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";
import couponModel from "../../../Database/models/coupon.model.js";
import QRCode from 'qrcode'

export const createCoupon = handleError(async (req, res, next) => {
  let coupon = new couponModel(req.body)
  await coupon.save()
  res.status(201).json({ message: "Coupon created successfuly", coupon });
});

export const getAllCoupons = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find(), req.query).pagination().filter().sort().search().fields()

  const coupons = await apiFeatures.mongooseQuery;
  
  if (!coupons) {
   return next(new AppError("No coupons found", 404))
  }

  res.status(200).json({ message: "All coupons", coupons });
});

export const getCouponById = handleError(async (req, res,next) => {
  const coupon = await couponModel.findOne({_id: req.params.id});

  if (!coupon) {
    return next(new AppError("coupon not found", 404))
  }

  let url = await QRCode.toDataURL(coupon.code)

  res.status(200).json({ message: "coupon found", coupon , url});
});

export const updateCoupon = handleError(async (req, res,next) => {
  const coupon = await couponModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  if (!coupon) {
    return next(new AppError("coupon not found or you do not have permission to update it", 404));
  }

  res.status(200).json({ message: "coupon updated", coupon });
});

export const deleteCoupon = deleteOne(couponModel)