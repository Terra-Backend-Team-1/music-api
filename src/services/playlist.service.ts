import PlaylistModel from "@/models/playlist.model";
import HTTPException from "@/exceptions/http.exception";
import { isEmpty } from "@/utils/util";
import { IPlaylistData } from "@/schemas/playlist.validation.schema";
import { StatusCodes } from "http-status-codes";

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
}

export default PlaylistService;
