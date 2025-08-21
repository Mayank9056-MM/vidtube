import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deletevideo,
  getAllVideos,
  getVideoById,
  publishVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controllers.js";

const videoRouter = express.Router();

videoRouter.route("/upload-video").post(
  verifyAuth,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo
);

videoRouter.route("/get-video/:videoId").get(verifyAuth, getVideoById);
videoRouter.route("/delete-video/:videoId").delete(verifyAuth, deletevideo);
videoRouter
  .route("/update-video/:videoId")
  .patch(verifyAuth, upload.single("thumbnail"), updateVideo);
videoRouter
  .route("/toggle-video/:videoId")
  .patch(verifyAuth, togglePublishStatus);
videoRouter.route("/all-videos").get(verifyAuth, getAllVideos);

export default videoRouter;
