import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const { username } = req.params;

  if (username.trim().length === 0) {
    throw new ApiError(404, "username is required");
  }

  const user = await User.findOne({ username: username.trim() });

  if (!user) {
    throw new ApiError(400, "user with username not found");
  }
  const channelId = user._id;

  if (!channelId) {
    throw new ApiError(401, "Unauthorized request");
  }

  // total subscribers
  const totalSubs = await Subscription.countDocuments({
    channel: channelId,
  });

  // total videos
  const totalVideos = await Video.countDocuments({ owner: channelId });

  const viewsAvg = await Video.aggregate([
    {
      $match: {
        owner: channelId,
      },
    },
    {
      $group: {
        _id: null,
        totalViews: {
          $sum: "$views",
        },
      },
    },
  ]);
  console.log(viewsAvg, "avg views");
  const totalViews = viewsAvg[0]?.totalViews || 0;

  // total likes
  const totalLikes = await Like.countDocuments({
    video: {
      $in: await Video.find({
        owner: channelId,
      }).distinct("_id"),
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        totalSubs,
        totalVideos,
        totalViews,
        totalLikes,
      },
      "Date fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const { username } = req.params;

  if (username.trim().length === 0) {
    throw new ApiError(404, "username is required");
  }

  const user = await User.findOne({ username: username.trim() });

  if (!user) {
    throw new ApiError(400, "user with username not found");
  }
  const channelId = user._id;

  const allVideos = await Video.find({ owner: channelId });
  const videosCount = await Video.countDocuments({ owner: channelId });

  if (!allVideos || allVideos.length === 0) {
    throw new ApiError(404, "No videos found for this channel");
  }

  if (videosCount === 0) {
    throw new ApiError(400, "No video uploaded by user");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos: allVideos,
        total: videosCount,
      },
      "All videos fetched successfully"
    )
  );
});

export { getChannelStats, getChannelVideos };
