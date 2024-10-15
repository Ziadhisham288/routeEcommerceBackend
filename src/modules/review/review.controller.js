import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";
import reviewModel from "../../../Database/models/review.model.js";

export const addReview = handleError(async (req, res, next) => {
  req.body.createdBy = req.user._id
  let hasReview = await reviewModel.findOne({createdBy: req.user._id, product: req.body.product})
  if(hasReview) 
    return next(new AppError("You already have a review on this product!", 409))
  
    let review = new reviewModel(req.body);
  await review.save();
  res.status(201).json({ message: "Review added successfuly", review });
});

export const getAllReviews = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query).pagination().filter().sort().search().fields()

  const reviews = await apiFeatures.mongooseQuery;
  
  if (!reviews) {
   return next(new AppError("No reviews found", 404))
  }

  res.status(200).json({ message: "All reviews", reviews });
});

export const getReviewById = handleError(async (req, res,next) => {
  const review = await reviewModel.findOne({_id: req.params.id});

  if (!review) {
    return next(new AppError("Review not found", 404))
  }

  res.status(200).json({ message: "review found", review });
});

export const updateReview = handleError(async (req, res,next) => {
  const review = await reviewModel.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );


  if (!review) {
    return next(new AppError("Review not found or you do not have permission to update it", 404));
  }

  res.status(200).json({ message: "Review updated", review });
});

export const deleteReview = deleteOne(reviewModel)