import SongModel from "@/models/song.model";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { ISongData } from "@/interfaces/song.interface";
import { isEmpty } from "@/utils/util";

class SongService {
  public songModel = SongModel;

  public createSong = async (songData: ISongData) => {
    if (isEmpty(songData)) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide song infomation")
    }
    const song = await this.songModel.create(songData);
    return song
  }

  public getSong = async (songId: string) => {
  }
}

export default SongService
