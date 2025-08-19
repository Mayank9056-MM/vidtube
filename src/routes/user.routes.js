import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const userRouter = express.Router();

userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

// secured routes
userRouter.route("/logout").post(verifyAuth, logoutUser);

export default userRouter;
