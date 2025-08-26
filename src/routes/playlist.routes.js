import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controllers.js";

const playlistRouter = express.Router();

playlistRouter.route("/create-playlist").post(verifyAuth, createPlaylist);

playlistRouter
  .route("/add-video/playlist/:playlistId/video/:videoId")
  .post(verifyAuth, addVideoToPlaylist);

playlistRouter
  .route("/delete-playlist/playlist/:playlistId")
  .delete(verifyAuth, deletePlaylist);

playlistRouter
  .route("/delete-video/playlist/:playlistId/video/:videoId")
  .delete(verifyAuth, removeVideoFromPlaylist);

playlistRouter
  .route("/update-playlist/:playlistId")
  .patch(verifyAuth, updatePlaylist);

playlistRouter
  .route("/get-playlist/:playlistId")
  .get(verifyAuth, getPlaylistById);

playlistRouter
  .route("/user-playlist/:userId")
  .get(verifyAuth, getUserPlaylists);

export default playlistRouter;
