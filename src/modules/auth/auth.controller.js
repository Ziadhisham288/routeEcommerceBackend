import userModel from "../../../Database/models/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";

export const signUp = handleError(async (req, res, next) => {
  let userExists = await userModel.findOne({ email: req.body.email });

  if (userExists) {
    return next(new AppError("Email already exists", 409));
  }

  let user = new userModel(req.body);
  await user.save();

  res.status(201).json({ message: "signed up successfully", user });
});

export const signIn = handleError(async (req, res, next) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (!user)
    return next(new AppError("User not found, register instead?", 404));

  const match = await bcrypt.compare(password, user.password);

  if (!match) return next(new AppError("Password is incorrect", 404));

  let token = jwt.sign(
    { name: user.name, userId: user._id, role: user.role },
    "userKey"
  );
  return res.json({ message: "Signed in successfuly", token });
});

export const protectRoutes = handleError(async (req, res, next) => {
  let { token } = req.headers;

  if (!token) return next(new AppError("Token not provided", 401));

  let decoded = await jwt.verify(token, "userKey");

  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user not found", 404));

  if (user.changedPasswordAt) {
    let changedPasswordTime = parseInt(user.changedPasswordAt.getTime() / 1000);
    if (changedPasswordTime > decoded.iat)
      return next(new AppError("Invalid token", 401));
  }


  req.user = user
  next();
});


export const allowTo = (...roles) => {
  return handleError(async (req,res,next) => {
    
    if(!roles.includes(req.user.role)){
      return next(new AppError("Not authorized", 403))
    }

    next()
  })
}