import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { createCoupon, deleteCoupon, getAllCoupons, getCouponById, updateCoupon } from './coupon.controller.js';

const couponRouter = express.Router()


couponRouter.route("/")
  .post(protectRoutes, createCoupon)
  .get(getAllCoupons)

couponRouter.route("/:id")
  .get( getCouponById)
  .patch(protectRoutes, updateCoupon)
  .delete(deleteCoupon)

export default couponRouter;