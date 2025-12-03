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

    const totalSubscribers = await Subscription.countDocuments({
      channel: channelId,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isSubscribed: false, totalSubscribers },
          "Unsubscribed successfully"
        )
      );
  }

  // subscribe
  const subscription = await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { isSubscribed: !!subscription, totalSubscribers },
        "Subscription successfully"
      )
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const subscriptions = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "username email avatar coverImage");

  // Add subscriber count to each channel
  const channelsWithCounts = await Promise.all(
    subscriptions.map(async (sub) => {
      const count = await Subscription.countDocuments({
        channel: sub.channel._id,
      });

      return {
        ...sub.toObject(),
        subscribers: count, // new field
      };
    })
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSubs: subscriptions.length,
        channels: channelsWithCounts,
      },
      "Subscribed channels fetched"
    )
  );
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

const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { subscriber } = req.query;

  const channel = await User.findOne({ username });

  if (!channel) throw new ApiError(404, "Channel not found");

  const existing = await Subscription.exists({
    channel: channel._id,
    subscriber,
  });

  const totalSubscribers = await Subscription.countDocuments({
    channel: channel._id,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      isSubscribed: !!existing,
      totalSubscribers,
    })
  );
});

export {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
  getSubscriptionStatus,
};
