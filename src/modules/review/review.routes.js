import express from 'express'
import { addReview, deleteReview, getAllReviews, getReviewById, updateReview } from './review.controller.js';
import { protectRoutes } from './../auth/auth.controller.js';

const reviewRouter = express.Router()


reviewRouter.route("/")
  .post(protectRoutes, addReview)
  .get(getAllReviews)

reviewRouter.route("/:id")
  .get( getReviewById)
  .patch(protectRoutes, updateReview)
  .delete(deleteReview)

export default reviewRouter;