import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const publishVideo = asyncHandler(async (req, res) => {
  // take title and desciption from user
  console.log(req.files);

  let uploadVideo;
  let thumbnail;

  try {
    const { title, description } = req.body;

    if (!(title && description)) {
      throw new ApiError(400, "title and description is required");
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const videoLocalPath = req.files?.video[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath || !thumbnailLocalPath) {
      throw new ApiError(400, "Video and thumbnail are required");
    }

    try {
      uploadVideo = await uploadOnCloudinary(videoLocalPath);
      console.log("Upload on cloudinary uploadVideo", uploadVideo);
    } catch (error) {
      console.log("Error while uploading video", error);
      throw new ApiError(500, "Failed to upload video");
    }

    try {
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
      console.log("Upload on cloudinary thumbnail", thumbnail);
    } catch (error) {
      console.log("Error uploading thumbnail", error);
      throw new ApiError(500, "Failed to upload thumbnail");
    }

    const video = await Video.create({
      owner: user._id,
      videoFile: uploadVideo?.url,
      thumbnail: thumbnail?.url,
      title: title.trim(),
      description,
      duration: uploadVideo?.duration,
    });

    const createVideo = await Video.findById(video?._id).populate("owner");

    if (!createVideo) {
      throw new ApiError(500, "something went wrong while uploading new video");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, createVideo, "video upload successfully on db")
      );
  } catch (error) {
    console.log("video upload failed to db", error);

    if (uploadVideo) {
      await deleteFromCloudinary(uploadVideo.public_id);
    }

    if (thumbnail) {
      await deleteFromCloudinary(thumbnail.public_id);
    }

    throw new ApiError(
      500,
      "Something went wrong while uploading video to db but video and thumbnail were deleted"
    );
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(404, "video id not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  res.status(200).json(new ApiResponse(200, video, "video fetch successfully"));
});

const deletevideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  const deleteVideo = await Video.findByIdAndDelete(videoId);

  if (!deleteVideo) {
    throw new ApiError(404, "video with id not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(204, { video: deleteVideo }, "video deleted successfully")
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!videoId) {
    throw new ApiError(400, "Video id not found");
  }

  if (!(title && description)) {
    throw new ApiError(404, "title and desciption is required");
  }

  let thumbnailLoaclPath;

  if (req.files?.path) {
    thumbnailLoaclPath = req.files.path;
  }
  let thumbnail;
  if (thumbnailLoaclPath) {
    thumbnail = await uploadOnCloudinary(thumbnailLoaclPath);
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title: title.trim(),
        description,
        ...(thumbnail?.url && { thumbnail: thumbnail.url }),
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(new ApiResponse(200, video, "video update successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "video id not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "video not found");
  }

  const updateVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: !video.isPublished,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updateVideo, "Publish status changed successfully")
    );
});

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  let filter = {};

  if (query) {
    filter.$or = [
      {
        title: {
          $regex: query,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  // sorting
  const sort = {};
  if (sortBy) {
    sort[sortBy] = sortType === "asc" ? 1 : -1;
  } else {
    sort.createdAt = -1; // newest first
  }

  // pagination
  const skip = (Number(page) - 1) * Number(limit);

  const allVideo = await Video.find(filter).sort(sort).skip(skip).limit(limit).populate("owner","avatar username fullName");
  const total = await Video.countDocuments(filter);

  let userVideos = null;

  if (userId) {
    userVideos = await Video.find({ user: userId }).populate("owner","avatar username fullName");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        allVideo,
        userVideos,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
        },
      },
      "All videos fetched successfully"
    )
  );
});

export {
  publishVideo,
  getVideoById,
  deletevideo,
  updateVideo,
  togglePublishStatus,
  getAllVideos,
};
