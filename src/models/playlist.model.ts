import mongoose, { Schema } from "mongoose";
import { IPlaylist } from "@/interfaces/playlist.interface";


const playistSchema = new Schema<IPlaylist>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "Song"
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})


const PlaylistModel = mongoose.model<IPlaylist>("Playlist", playistSchema);

export default PlaylistModel;
