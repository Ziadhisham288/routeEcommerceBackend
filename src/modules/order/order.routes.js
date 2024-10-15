import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { createCashOrder, getUserOrders, onlinePayment } from './order.controller.js';


const orderRouter = express.Router()

orderRouter.route("/")
  .get(protectRoutes, getUserOrders)


orderRouter.route("/:id")
  .post(protectRoutes,createCashOrder)

orderRouter.post("/checkout/:id",protectRoutes, onlinePayment)

export default orderRouter;