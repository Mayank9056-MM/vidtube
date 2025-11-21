import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controllers.js";

const tweetRouter = express.Router();

tweetRouter.route("/create-tweet").post(verifyAuth, createTweet);
tweetRouter.route("/get-tweet").get(verifyAuth, getUserTweets);
tweetRouter.route("/update-tweet/:tweetId").patch(verifyAuth, updateTweet);
tweetRouter.route("/delete-tweet/:tweetId").delete(verifyAuth, deleteTweet);
tweetRouter.route("/").get(verifyAuth, getAllTweets);

export default tweetRouter;
