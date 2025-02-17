import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";

import { isEmpty } from "@/utils/util";
import TrackModel from "@/models/track.model";
import { ITrack } from "@/interfaces/track.interface";
import { ITrackCreateData } from "@/schemas/track.validation.schema";

class TrackService {
	public trackModel = TrackModel;

	public createTrack = async (trackData: ITrackCreateData): Promise<ITrack> => {
		if (isEmpty(trackData)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide track infomation"
			);
		}
		const track = await this.trackModel.create(trackData);
		return track;
	};

	// get track by id
	public getTrack = async (trackId: string) => {
		if (!trackId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Track ID");
		}

		const track = await this.trackModel.findById(trackId);
		if (!track) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Track not found");
		}
		return track;
	};

	// get all tracks
	public getAllTracks = async (limit: number, page: number) => {
		const tracks = await this.trackModel
			.find()
			.limit(limit)
			.skip(limit * (page - 1));

		if (!tracks) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Tracks not found");
		}

		return tracks;
	};

	// update a track by id
	public updateTrack = async (trackData: ITrackCreateData, trackId: string) => {
		if (isEmpty(trackData)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide track information"
			);
		}
		const track = await this.trackModel.findByIdAndUpdate(trackId, trackData, {
			new: true,
		});
		if (!track) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Track does not exist");
		}
		return track;
	};

	// delete a track by id
	public deleteTrack = async (trackId: string) => {
		if (!trackId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Track ID");
		}
		const deletedTrack = await this.trackModel.findByIdAndDelete(trackId);
		if (!deletedTrack) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Track not found");
		}
		return deletedTrack;
	};
}

export default TrackService;
