import mongoose, { Model, Schema } from "mongoose";
import { IPlaylist } from "@/interfaces/playlist.interface";

type PlaylistModelType = Model<IPlaylist>;
const playistSchema = new Schema<IPlaylist>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	coverImage: {
		type: String,
		required: true,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	tracks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Track",
		},
	],
	isPublic: {
		type: Boolean,
		default: true,
	},
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const PlaylistModel = mongoose.model<IPlaylist, PlaylistModelType>(
	"Playlist",
	playistSchema
);

export default PlaylistModel;
