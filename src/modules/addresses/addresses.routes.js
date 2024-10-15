import express from 'express'
import { protectRoutes } from '../auth/auth.controller.js';
import { addUserAddress, getUserAddresses, removeUserAddress } from './addresses.controller.js';

const addressRouter = express.Router()

addressRouter.patch("/", protectRoutes,addUserAddress)
addressRouter.delete("/", protectRoutes,removeUserAddress)
addressRouter.get("/", protectRoutes,getUserAddresses)

export default addressRouter;