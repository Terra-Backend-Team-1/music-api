import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";
import SongController from "@/controllers/song.controller";


class MusicRoute implements Routes {
  public path = "/music"
  private SongController = new SongController();
  public router = Router()

  constructor() {
    this.initailizeRoutes()
  }

  public initailizeRoutes = () => {
    this.router.get(
      this.path,
      this.SongController.getSong
    )
  }
}

export default MusicRoute;
