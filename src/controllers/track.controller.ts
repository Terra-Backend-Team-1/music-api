import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "@/interfaces/auth.interface";
import TrackService from "@/services/track.service";

class TrackController {
	private trackService = new TrackService();
	private defaultLimit = 10;
	private defaultPage = 1;

	// get track by id from soundcloud api and send it to the client
	public getTrack = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const track = await this.trackService.getTrack(req.params.id);
			res.status(StatusCodes.OK).json({ data: track });
		} catch (error) {
			next(error);
		}
	};

	// get all tracks with pagination
	public getAllTracks = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit, page } = req.query;
			const tracks = await this.trackService.getAllTracks(
				Number(limit || this.defaultLimit),
				Number(page || this.defaultPage)
			);
			res.status(StatusCodes.OK).json({ data: tracks });
		} catch (error) {
			console.log(error);
			next(error);
		}
	};

	// get sample tracks
	public getSampleTracks = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			// await setSpotifyAccessToken(spotifyAPI);
			// const { body } = await spotifyAPI.search("love", ["playlist"]);
			// const playlistId = body.playlists?.items[0].id;
			// const { body: tracks } = await spotifyAPI.getPlaylistTracks(playlistId!);
			// console.log(tracks.items);
			res.status(StatusCodes.OK).json({
				data: [],
			});
		} catch (error) {
			next(error);
		}
	};

	// create a new track
	public createTrack = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = req.user?._id;
			const track = await this.trackService.createTrack(req.body);
			res.status(StatusCodes.CREATED).json({ data: track });
		} catch (error) {
			next(error);
		}
	};

	// update track by id
	public updateTrack = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const trackId = req.params.id;
			const updatedTrack = await this.trackService.updateTrack(
				req.body,
				trackId
			);
			res.status(StatusCodes.OK).json({ data: updatedTrack });
		} catch (error) {
			next(error);
		}
	};
}

export default TrackController;
