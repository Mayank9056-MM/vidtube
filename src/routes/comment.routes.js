import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controllers.js";

const commentRouter = express.Router();

commentRouter.route("/add-comment/:videoId").post(verifyAuth, addComment);
commentRouter
  .route("/update-comment/:commentId")
  .patch(verifyAuth, updateComment);
commentRouter
  .route("/delete-comment/:commentId")
  .delete(verifyAuth, deleteComment);
commentRouter.route("/get-comments/:videoId").get(verifyAuth, getVideoComments);

export default commentRouter;
