import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.models.js";

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  if (content.length > 280) {
    throw new ApiError(400, "Maximum length hit");
  }

  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!video?._id) {
    throw new ApiError(404, "Video with id not found");
  }

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(404, "user with id not found");
  }

  const comment = await Comment.create({
    video: video._id,
    owner: userId,
    content: content.trim(),
  });

  if (!comment?._id) {
    throw new ApiError(500, "Something went wrong while creating comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "comment created successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || !content.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  if (content.length > 280) {
    throw new ApiError(400, "Maximum letters hit");
  }

  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(404, "Comment id not found");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment with id not found");
  }

  const video = await Video.findById(comment.video);

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  if (req.user._id.toString() !== comment.owner.toString()) {
    throw new ApiError(400, "user not found");
  }

  const updateComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content.trim(),
      },
    },
    {
      new: true,
    }
  );

  if (!updateComment) {
    throw new ApiError(500, "Something went wrong while updating comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updateComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment id is required");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (req.user._id.toString() !== comment.owner.toString()) {
    throw new ApiError(403, "You are not authorized to delete this comment");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(500, "Something went wrong while deleting comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));
});

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params; // object id

  const { page = 1, limit = 10 } = req.query; // page and limit -> string from url

  if (!videoId) {
    throw new ApiError(400, "video id is required");
  }

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const comments = await Comment.find({ video: videoId })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  const totalComments = await Comment.countDocuments({ video: videoId });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        comments,
        pagination: {
          totalComments,
          currentPage: pageNumber,
          totalPage: Math.ceil(totalComments / limitNumber),
          limit: limitNumber,
        },
      },
      "Comments fetched successfully"
    )
  );
});

export { addComment, updateComment, deleteComment, getVideoComments };
