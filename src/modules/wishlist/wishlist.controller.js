import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import userModel from "../../../Database/models/user.model.js";


export const addToWishList = handleError(async (req, res, next) => {
  let { product } = req.body;

  let user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        wishList: product
      }
    },
    {
      new: true
    }
  );

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(201).json({ message: "Added to wishlist successfully", user });
});



export const removeFromWishList = handleError(async (req, res, next) => {
  let { product } = req.body;
  let user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        wishList: product
      }
    },
    {
      new: true
    }
  );

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(200).json({ message: "Removed from wishlist successfully", user });
});


export const getUserWishList = handleError(async (req, res, next) => {
  let user = await userModel.findOne(
    {_id : req.user._id}
  ).select("wishList").populate("wishList")

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(200).json({ message: "Done", user });
});