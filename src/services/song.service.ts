import SongModel from "@/models/song.model";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import YTMusic from "ytmusic-api";
import { ISongData } from "@/interfaces/song.interface";

class SongService {
    public songModel = SongModel;
    public ytmusic = new YTMusic();

    public createSong = async(songData: ISongData) =>{

    }
}