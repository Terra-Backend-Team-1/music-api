import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";
//import SongController from "@/controllers/song.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import PlaylistController from "@/controllers/playlist.controller";


class MusicRoute implements Routes {
  public path = "/music"
  //private SongController = new SongController();
  private playlistController = new PlaylistController();
  public router = Router()

  constructor() {
    this.initailizeRoutes()
  }

  public initailizeRoutes = () => {
    //  this.router.get(
    //    this.path,
    //    this.SongController.getSong
    //  )

    this.router.post(
      this.path + "/create-playlist",
      [authMiddleware],
      this.playlistController.createPlaylist
    )

  }
}

export default MusicRoute;
