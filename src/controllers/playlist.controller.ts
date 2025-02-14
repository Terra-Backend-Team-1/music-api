import { RequestWithUser } from "@/interfaces/auth.interface";
import { NextFunction, Response } from "express";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import PlaylistService from "@/services/playlist.service";

class PlaylistController {
  public playlistService = new PlaylistService();

  public createPlaylist = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?._id;
      const playlist = await this.playlistService.createPlaylist(req.body, userId);
      res.status(StatusCodes.CREATED).json({ data: playlist })
    } catch (error) {
      next(error)
    }
  }
}


export default PlaylistController
