import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { PlayList } from "../models/playlist.models.js";
import { Video } from "../models/video.models.js";
import mongoose from "mongoose";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!(name && description)) {
    throw new ApiError(400, "Both playlist name and description are required.");
  }

  if (description.length > 280) {
    throw new ApiError(
      400,
      "Description exceeds the maximum length of 280 characters."
    );
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "Authenticated user not found.");
  }

  const playlist = await PlayList.create({
    owner: user?._id,
    videos: [],
    name: name.trim(),
    description: description.trim(),
  });

  const createdPlaylist = await PlayList.findById(playlist?._id).populate(
    "owner",
    "username email"
  );

  if (!createdPlaylist) {
    throw new ApiError(400, "something went wrong while creating playlist");
  }

  res
    .status(201)
    .json(
      new ApiResponse(201, createdPlaylist, "Playlist created successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (
    !mongoose.isValidObjectId(playlistId) ||
    !mongoose.isValidObjectId(videoId)
  ) {
    throw new ApiError(400, "Invalid playlist or video ID");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video with the specified ID does not exist.");
  }

  if (playlist.videos.includes(video._id)) {
    throw new ApiError(400, "This video is already included in the playlist.");
  }

  playlist.videos.push(video._id);
  await playlist.save();

  const newPlaylist = await PlayList.findById(playlistId).populate(
    "videos",
    "title videoFile thumbnail description duration views"
  );

  if (!newPlaylist) {
    throw new ApiError(
      500,
      "Something went wrong while adding video to playList"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, newPlaylist, "Video added successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (
    !mongoose.isValidObjectId(playlistId) ||
    !mongoose.isValidObjectId(videoId)
  ) {
    throw new ApiError(400, "Invalid playlist or video ID");
  }

  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "playlist not found");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video with the specified ID does not exist.");
  }

  if (!playlist.videos.includes(video._id)) {
    throw new ApiError(400, "This video does not exist in the playlist.");
  }

  playlist.videos = playlist.videos.filter(
    (vidId) => vidId.toString() !== videoId
  );
  await playlist.save();

  const updatedPlaylist = await PlayList.findById(playlistId).populate(
    "videos",
    "title videoFile thumbnail description duration views"
  );

  if (!updatedPlaylist) {
    throw new ApiError(
      500,
      "Something went wrong while deleting video from the playList"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video deleted successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!mongoose.isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  const deletedPlaylist = await PlayList.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedPlaylist,
        "Playlist has been successfully deleted."
      )
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!mongoose.isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID");
  }

  if (!(name || description)) {
    throw new ApiError(
      400,
      "At least one of name or description must be provided."
    );
  }

  // Find existing playlist
  const playList = await PlayList.findById(playlistId);
  if (!playList) {
    throw new ApiError(404, "Playlist not found.");
  }

  // Update playlist
  const updatedPlaylist = await PlayList.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name: name?.trim() || playList.name,
        description: description?.trim() || playList.description,
      },
    },
    {
      new: true,
    }
  ).populate("videos", "title videoFile thumbnail description duration views");

  if (!updatedPlaylist) {
    throw new ApiError(500, "Something went wrong while updating playList");
  }

  // sending response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  // Validate playlist ID
  if (!mongoose.isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playList ID");
  }

  // Fetch playlist and populate videos
  const playList = await PlayList.findById(playlistId).populate(
    "videos",
    "title videoFile thumbnail description duration views"
  );

  if (!playList) {
    throw new ApiError(404, "PlayList not found");
  }

  // sending response
  res
    .status(200)
    .json(new ApiResponse(200, playList, "PlayList fetched successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user ID.");
  }

  if (!(req.user._id.toString() === userId.toString())) {
    throw new ApiError(
      400,
      "You are not authorized to access these playlists."
    );
  }

  const userPlaylists = await PlayList.find({ owner: userId });

  if (userPlaylists.length === 0) {
    throw new ApiError(404, "No playlists found for this user.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userPlaylists,
        "User playlists fetched successfully."
      )
    );
});

export {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
  getPlaylistById,
  getUserPlaylists,
};
