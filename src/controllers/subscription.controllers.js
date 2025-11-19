import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.models.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params; // to whom subscribe
  const userId = req.user._id; // subscriber

  if (userId.toString() === channelId) {
    throw new ApiError(400, "You cannot subscribe to yourself");
  }

  // check if already subscriber

  const existingSub = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });

  if (existingSub) {
    // unsubscribe
    await existingSub.deleteOne();
    return res
      .status(200)
      .json(new ApiResponse(200, false, "Unsubscribed successfully"));
  }

  // subscribe
  const subscription = await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, !!subscription, "Subscription successfully"));
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const channels = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "username email avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, channels, "subscribed channels fetched"));
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const subscribers = await Subscription.find({
    channel: channelId,
  }).populate("subscriber", "username email avatar");

  return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "subscribers fetched"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
