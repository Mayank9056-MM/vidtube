import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controllers.js";

const dashboardRouter = express.Router();

dashboardRouter
  .route("/channel-stats/:username")
  .get(verifyAuth, getChannelStats);
dashboardRouter
  .route("/channel-videos/:username")
  .get(verifyAuth, getChannelVideos);

export default dashboardRouter;
