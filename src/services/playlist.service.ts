import PlaylistModel from "@/models/playlist.model";
import HTTPException from "@/exceptions/http.exception";
import { isEmpty } from "@/utils/util";
import { IPlaylistData } from "@/schemas/playlist.validation.schema";
import { StatusCodes } from "http-status-codes";
import { STATES } from "mongoose";

class PlaylistService {
  public playlistModel = PlaylistModel;

  public createPlaylist = async (playlistData: IPlaylistData, userId: string) => {
    if (isEmpty(playlistData)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Playlist Information");
    }
    const newPlaylist = new PlaylistModel({
      name: playlistData.name,
      description: playlistData.description,
      coverImage: playlistData.coverImage,
      creator: userId,
      isPublic: playlistData.isPublic
    });
    newPlaylist.save();
    return newPlaylist;
  }

  public getAllPlaylists = async (userId: string) => {
    const playlists = await this.playlistModel.find({ creator: userId });
    if (!playlists) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "User Playlists not found");
    }
    return playlists;
  }

  public getPlaylist = async (playlistId: string) => {
    if (!playlistId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Playlist ID");
    }
    const playlist = await this.playlistModel.findById(playlistId);
    if (!playlist) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Playlist not found");
    }
    return playlist;
  }

  public deletePlaylist = async (playlistId: string) => {
    if (isEmpty(playlistId)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Playlist ID");
    }
    const deletedPlaylist = await this.playlistModel.findOneAndDelete(playlistId);
    if (!deletedPlaylist) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Playlist not found");
    }
    return deletedPlaylist;
  }
}

export default PlaylistService;
