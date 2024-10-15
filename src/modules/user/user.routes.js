import express from "express";
import {
  addUser,
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter.route("/").post(addUser).get(getAllUsers);

userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

userRouter.put("/changepassword/:id", changePassword);

export default userRouter;
