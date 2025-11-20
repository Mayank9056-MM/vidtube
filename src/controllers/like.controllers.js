import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.models.js";
import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Comment } from "../models/comment.models.js";
import { Tweet } from "../models/tweet.models.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "video ID is not valid");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const userId = req.user._id;

  // check if already like on video
  const existingLike = await Like.findOne({
    video: videoId,
    likedBy: userId,
  });

  let isLiked = false;

  if (existingLike) {
    // Unlike (remove document)
    await Like.findByIdAndDelete(existingLike._id);
  } else {
    isLiked = true;
    // like on video
    const likedVideo = await Like.create({
      video: videoId,
      likedBy: userId,
    });

    const dbLikedVideo = await Like.findById(likedVideo._id);

    if (!dbLikedVideo) {
      throw new ApiError(500, "Something went wrong while liking Video");
    }
  }

  const totalLikes = await Like.countDocuments({ video: videoId });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isLiked, totalLikes },
        "Video like toggle successfully"
      )
    );
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.isValidObjectId(commentId)) {
    throw new ApiError(400, "comment ID is not valid");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "comment not found");
  }

  const userId = req.user._id;

  // check if already like on Comment
  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  let isCommentLiked = false;

  if (existingLike) {
    // Unlike (remove document)
    await Like.findByIdAndDelete(existingLike._id);
  } else {
    // like on Comment
    isCommentLiked = true;
    const likedComment = await Like.create({
      comment: commentId,
      likedBy: userId,
    });

    const dbLikedComment = await Like.findById(likedComment._id);

    if (!dbLikedComment) {
      throw new ApiError(500, "Something went wrong while liking comment");
    }
  }

  const totalLikes = await Like.countDocuments({ comment: commentId });

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { isCommentLiked, totalLikes },
        "Comment liked successfully"
      )
    );
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!mongoose.isValidObjectId(tweetId)) {
    throw new ApiError(400, "tweet ID is not valid");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(404, "tweet not found");
  }

  const userId = req.user._id;

  // check if already like on Tweet
  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: userId,
  });

  if (existingLike) {
    // Unlike (remove document)
    const unlikedTweet = await Like.findByIdAndDelete(existingLike._id);

    return res
      .status(200)
      .json(new ApiResponse(200, unlikedTweet, "Tweet unliked successfully"));
  }

  // like on Tweet
  const likedTweet = await Like.create({
    tweet: tweetId,
    likedBy: userId,
  });

  const dbLikedTweet = await Like.findById(likedTweet._id);

  if (!dbLikedTweet) {
    throw new ApiError(500, "Something went wrong while liking tweet");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, likedTweet, "Tweet liked successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const likedVideos = await Like.find({
    likedBy: userId,
    video: { $exists: true },
  }).populate("video");

  // if (likedVideos.length === 0) {
  //   throw new ApiError(400, "No likes found");
  // }

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "All like videos fetched successfully")
    );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
