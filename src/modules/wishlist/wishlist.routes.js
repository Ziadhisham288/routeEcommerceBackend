import express from 'express'
import { addToWishList, getUserWishList, removeFromWishList } from './wishlist.controller.js';
import { protectRoutes } from './../auth/auth.controller.js';

const wishListRouter = express.Router()

wishListRouter.patch("/", protectRoutes,addToWishList)
wishListRouter.delete("/", protectRoutes,removeFromWishList)
wishListRouter.get("/", protectRoutes,getUserWishList)

export default wishListRouter;