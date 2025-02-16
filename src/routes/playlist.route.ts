import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";
//import SongController from "@/controllers/song.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import PlaylistController from "@/controllers/playlist.controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
	playlistIdValidationSchema,
	playlistValidationSchema,
} from "@/schemas/playlist.validation.schema";

class MusicRoute implements Routes {
	public path = "/playlist";
	private playlistController = new PlaylistController();
	public router = Router();

	constructor() {
		this.initailizeRoutes();
	}

	public initailizeRoutes = () => {
		// create playlist route
		this.router.post(
			this.path + "/create-playlist",
			[authMiddleware, validationMiddleware(playlistValidationSchema, "body")],
			this.playlistController.createPlaylist
		);

		// delete playlist route
		this.router.delete(
			this.path + "/delete-playlist/:playlistId",
			[
				authMiddleware,
				validationMiddleware(playlistIdValidationSchema, "params"),
			],
			this.playlistController.deletePlaylist
		);

		// get all user playlist route
		this.router.get(
			this.path + "/get-all-playlists",
			[authMiddleware],
			this.playlistController.getAllplaylists
		);

		// get a single playlist route
		this.router.get(
			this.path + "/playlist/:playlistId",
			[
				authMiddleware,
				validationMiddleware(playlistIdValidationSchema, "params"),
			],
			this.playlistController.getPlaylist
		);

		// update a single playlist route
		this.router.put(
			this.path + "/update-playlist/:playlistId",
			[
				authMiddleware,
				validationMiddleware(playlistIdValidationSchema, "params"),
				validationMiddleware(playlistValidationSchema, "body"),
			],
			this.playlistController.updatePlaylist
		);
		// get feautured playlist route
		this.router.get(
			this.path + "/featured-playlist",
			[authMiddleware],
			this.playlistController.getFeaturedPlaylists
		);
	};
}

export default MusicRoute;
