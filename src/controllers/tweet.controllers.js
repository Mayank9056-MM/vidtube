/*
 add pagination and limit,sortBy in getUsertweets
*/

import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.models.js";

const createTweet = asyncHandler(async (req, res) => {
  /*
  id string pk
  owner ObjectId users
  content string
  createdAt Date
  updatedAt Date  
    */

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "tweet content is required");
  }

  if (content.length > 280) {
    throw new ApiError(400, "maximum length passed for content");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "user not found");
  }

  const tweet = await Tweet.create({
    owner: user._id,
    content: content.trim(),
  });

  const createdTweet = await Tweet.findById(tweet._id);

  if (!createdTweet) {
    throw new ApiError(500, "something went wrong while creating tweet");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTweet, "tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const userTweets = await Tweet.find({ owner: req.user?._id }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, userTweets, "all user tweets fetched successfully")
    );
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "new content is required");
  }

  if (content.length > 280) {
    throw new ApiError(400, "maximum letters hit");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) throw new ApiError(404, "tweet not found");

  if (tweet.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "You cannot update this tweet");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: content.trim(),
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTweet) {
    throw new ApiError(500, "Something went wrong while updating tweet");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!tweetId) {
    throw new ApiError(400, "id not found");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "tweet not found");
  }

  if (tweet.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You cannot delete this tweet");
  }

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTweet, "tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
