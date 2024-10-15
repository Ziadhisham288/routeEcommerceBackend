import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import userModel from "../../../Database/models/user.model.js";


export const addUserAddress = handleError(async (req, res, next) => {
  let { address } = req.body;

  let user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        addresses: address
      }
    },
    {
      new: true
    }
  );

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(201).json({ message: "Added to addresses successfully", user });
});


export const removeUserAddress = handleError(async (req, res, next) => {
  let { addressId } = req.body;  
  
  let user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        addresses: { _id: addressId }
      }
    },
    {
      new: true
    }
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({ message: "Removed from addresses successfully", user });
});

export const getUserAddresses = handleError(async (req, res, next) => {
  let user = await userModel.findOne(
    {_id : req.user._id}
  ).select("addresses").populate("addresses")

  if (!user) {
    return next(new AppError("User not found", 404))
  }

  res.status(200).json({ message: "Done", user });
});