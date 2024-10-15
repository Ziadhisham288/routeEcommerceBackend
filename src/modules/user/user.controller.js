import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/apiHandler.js";
import ApiFeatures from "../../utils/APIfeatures.js";
import userModel from "./../../../Database/models/user.model.js";

export const addUser = handleError(async (req, res, next) => {
  let userExists = await userModel.findOne({ email: req.body.email });

  if (userExists) {
    return next(new AppError("Email is duplicated", 409));
  }
  
  let user = new userModel(req.body);
  await user.save();

  res.status(201).json({ message: "user added successfuly", user });
});

export const getAllUsers = handleError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  const users = await apiFeatures.mongooseQuery;

  if (!users) {
    return next(new AppError("No users found", 404));
  }

  res.status(200).json({ message: "All users", users });
});

export const getUserById = handleError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({ message: "user found", user });
});

export const updateUser = handleError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({ message: "user updated", user });
});

export const deleteUser = deleteOne(userModel);

export const changePassword  = handleError(async (req, res, next) => {
  
  req.body.changedPasswordAt = Date.now()
  const user = await userModel.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
  });

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  res.status(200).json({ message: "password updated", user });
});
