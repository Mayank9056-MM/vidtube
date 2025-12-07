import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeCurrentPassword,
  changeUserPassword,
  forgotPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controllers.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const userRouter = express.Router();

// unsecured routes

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
userRouter.route("/refresh-token").post(refreshAccessToken);

// secured routes
userRouter.route("/logout").post(verifyAuth, logoutUser);
userRouter.route("/change-password").post(verifyAuth, changeCurrentPassword);
userRouter.route("/update-account").patch(verifyAuth, updateAccountDetails);
userRouter.route("/current-user").get(verifyAuth, getCurrentUser);
userRouter
  .route("/avatar")
  .patch(verifyAuth, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/cover-image")
  .patch(verifyAuth, upload.single("coverImage"), updateUserCoverImage);
userRouter.route("/c/:username").get(verifyAuth, getUserChannelProfile);
userRouter.route("/history").get(verifyAuth, getWatchHistory);
userRouter.route("/change-password").get(verifyAuth, changeUserPassword);
userRouter.route("/forgot-password").get(forgotPassword);
userRouter.route("/reset-password/:token").get(resetPassword);

export default userRouter;
