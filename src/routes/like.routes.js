import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controllers.js";

const likeRouter = express.Router();

likeRouter.route("/toggle-video/:videoId").patch(verifyAuth, toggleVideoLike);

likeRouter
  .route("/toggle-comment/:commentId")
  .patch(verifyAuth, toggleCommentLike);

likeRouter.route("/toggle-tweet/:tweetId").patch(verifyAuth, toggleTweetLike);

likeRouter.route("/like-videos").get(verifyAuth, getLikedVideos);

export default likeRouter;
