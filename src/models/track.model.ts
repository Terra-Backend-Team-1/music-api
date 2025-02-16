import mongoose, { Model, Schema } from "mongoose";
import { ITrack } from "@/interfaces/track.interface";

type TrackModelType = Model<ITrack>;

const trackSchema = new Schema<ITrack>({
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	album: {
		type: String,
		required: true,
	},
	release_date: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	duration: {
		type: String,
		required: true,
	},
	stream_url: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		defualt: Date.now(),
	},
});

const TrackModel = mongoose.model<ITrack, TrackModelType>("Track", trackSchema);

export default TrackModel;
