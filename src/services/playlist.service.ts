import PlaylistModel from "@/models/playlist.model";
import HTTPException from "@/exceptions/http.exception";
import { isEmpty } from "@/utils/util";
import { IPlaylistData } from "@/schemas/playlist.validation.schema";
import { StatusCodes } from "http-status-codes";

class PlaylistService {
	public playlistModel = PlaylistModel;

	public createPlaylist = async (
		playlistData: IPlaylistData,
		userId: string
	) => {
		if (isEmpty(playlistData)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide Playlist Information"
			);
		}
		const newPlaylist = new PlaylistModel({
			name: playlistData.name,
			description: playlistData.description,
			coverImage: playlistData.coverImage,
			creator: userId,
			isPublic: playlistData.isPublic,
		});
		newPlaylist.save();
		return newPlaylist;
	};

	public getAllPlaylists = async (
		userId: string,
		limit: number,
		page: number
	) => {
		const playlists = await this.playlistModel
			.find({ creator: userId })
			.limit(limit)
			.skip(limit * (page - 1));
		if (!playlists) {
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"User Playlists not found"
			);
		}
		return playlists;
	};

	// get feautured playlist
	public getFeaturedPlaylists = async (limit: number, page: number) => {
		const playlists = await this.playlistModel
			.find({ isPublic: true })
			.limit(limit)
			.skip(limit * (page - 1));
		if (!playlists) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Playlists not found");
		}
		return playlists;
	};

	public getPlaylist = async (playlistId: string) => {
		if (!playlistId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Playlist ID");
		}
		const playlist = await this.playlistModel.findById(playlistId);
		if (!playlist) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Playlist not found");
		}
		return playlist;
	};

	public deletePlaylist = async (playlistId: string) => {
		if (isEmpty(playlistId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Playlist ID");
		}
		const deletedPlaylist = await this.playlistModel.findByIdAndDelete(
			playlistId
		);
		if (!deletedPlaylist) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Playlist not found");
		}
		return deletedPlaylist;
	};

	// update a playlist by id
	public updatePlaylist = async (
		playlistId: string,
		playlistData: IPlaylistData
	) => {
		if (isEmpty(playlistData)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Provide playlist information"
			);
		}
		const playlist = await this.playlistModel.findByIdAndUpdate(
			playlistId,
			playlistData,
			{
				new: true,
			}
		);
		if (!playlist) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Playlist does not exist");
		}
		return playlist;
	};
}

export default PlaylistService;
