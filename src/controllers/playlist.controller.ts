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

  // Delete PlaylistService
  public deletePlaylist = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlistId = req.params.playlistId;
      const deletedPlaylist = await this.playlistService.deletePlaylist(playlistId);
      res.status(StatusCodes.CREATED).json({ data: deletedPlaylist, message: "Resource deleted succesfully" })
    } catch (error) {
      next(error)
    }
  }

  // Get all user playlists 
  public getAllplaylists = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;
      const playlists = await this.playlistService.getAllPlaylists(userId);
      res.status(StatusCodes.OK).json({ data: playlists })
    } catch (error) {
      next(error)
    }
  }

  // Get a single playlist 
  public getPlaylist = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const playlistId = req.params.playlistId;
      const playlist = await this.playlistService.getPlaylist(playlistId);
      res.status(StatusCodes.OK).json({ data: playlist })
    } catch (error) {
      next(error)
    }
  }
}


export default PlaylistController
