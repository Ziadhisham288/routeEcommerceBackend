import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { addToCart, applyCoupon, deleteCart, getUserCart, removeCartItem, updateCart } from './cart.controller.js';

const cartRouter = express.Router()


cartRouter.route("/")
  .post(protectRoutes, addToCart)
  .get(protectRoutes, getUserCart)
  .patch(protectRoutes, updateCart)

cartRouter.route("/applycoupon/:code")
  .patch(protectRoutes,applyCoupon)

cartRouter.route("/:id")
  .delete(protectRoutes, removeCartItem)

cartRouter.delete("/deletecart/:id", deleteCart)

export default cartRouter;