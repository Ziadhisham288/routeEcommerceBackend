import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { createCashOrder, createOnlineOrder, getUserOrders, onlinePayment } from './order.controller.js';


const orderRouter = express.Router()

orderRouter.route("/")
  .get(protectRoutes, getUserOrders)


orderRouter.route("/:id")
  .post(protectRoutes,createCashOrder)

orderRouter.post("/checkout/:id",protectRoutes, onlinePayment)

orderRouter.post('/webhook', express.raw({type: 'application/json'}), createOnlineOrder)

export default orderRouter;