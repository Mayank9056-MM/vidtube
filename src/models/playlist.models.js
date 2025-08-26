/* 
  id string pk
  owner ObjectId users
  videos ObjectId[] videos
  name string
  description string
  createdAt Date
  updatedAt Date
*/

import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PlayList = mongoose.model("playList", playlistSchema);