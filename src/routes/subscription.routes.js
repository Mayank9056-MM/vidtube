import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  getSubscribedChannels,
  getSubscriptionStatus,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controllers.js";

const susbscriptionRouter = express.Router();

susbscriptionRouter
  .route("/toggle-sub/:channelId")
  .patch(verifyAuth, toggleSubscription);
susbscriptionRouter
  .route("/subscribed-channels/:subscriberId")
  .get(verifyAuth, getSubscribedChannels);
susbscriptionRouter
  .route("/subscribers/:channelId")
  .get(verifyAuth, getUserChannelSubscribers);
susbscriptionRouter
  .route("/status/:username")
  .get(verifyAuth, getSubscriptionStatus);

export default susbscriptionRouter;
