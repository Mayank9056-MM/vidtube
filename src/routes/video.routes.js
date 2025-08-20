import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { upload } from "../middlewares/multer.middleware.js";
import { publishVideo } from "../controllers/video.controllers.js";

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

export default videoRouter;
