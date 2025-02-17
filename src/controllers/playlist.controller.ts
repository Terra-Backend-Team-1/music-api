import { RequestWithUser } from "@/interfaces/auth.interface";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PlaylistService from "@/services/playlist.service";
import { spotifyAPI } from "@/config/spotify";

class PlaylistController {
	public playlistService = new PlaylistService();
	private spotify = spotifyAPI;
	private defaultLimit = 10;
	private defaultPage = 1;

	public createPlaylist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = req.user?._id;
			const playlist = await this.playlistService.createPlaylist(
				req.body,
				userId
			);
			res.status(StatusCodes.CREATED).json({ data: playlist });
		} catch (error) {
			next(error);
		}
	};

	// Delete PlaylistService
	public deletePlaylist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const playlistId = req.params.playlistId;
			const deletedPlaylist = await this.playlistService.deletePlaylist(
				playlistId
			);
			res.status(StatusCodes.CREATED).json({
				data: deletedPlaylist,
				message: "Resource deleted succesfully",
			});
		} catch (error) {
			next(error);
		}
	};

	// Get all user playlists with pagination

	public getAllplaylists = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit, page } = req.query;
			const userId = req.user?.id;
			const playlists = await this.playlistService.getAllPlaylists(
				userId,
				Number(limit || this.defaultLimit),
				Number(page || this.defaultPage)
			);
			res.status(StatusCodes.OK).json({ data: playlists });
		} catch (error) {
			next(error);
		}
	};

	// Get a single playlist
	public getPlaylist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const playlistId = req.params.playlistId;
			const playlist = await this.playlistService.getPlaylist(playlistId);
			res.status(StatusCodes.OK).json({ data: playlist });
		} catch (error) {
			next(error);
		}
	};

	// Update a single playlist
	public updatePlaylist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const playlistId = req.params.playlistId;
			const updatedPlaylist = await this.playlistService.updatePlaylist(
				playlistId,
				req.body
			);
			res.status(StatusCodes.OK).json({ data: updatedPlaylist });
		} catch (error) {
			next(error);
		}
	};

	// get featured playlists
	public getFeaturedPlaylists = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { limit, page } = req.query;
			const playlists = await this.playlistService.getFeaturedPlaylists(
				Number(limit || this.defaultLimit),
				Number(page || this.defaultPage)
			);
			res.status(StatusCodes.OK).json({ data: playlists });
		} catch (error) {
			next(error);
		}
	};
}

export default PlaylistController;
