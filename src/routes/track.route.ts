import TrackController from "@/controllers/track.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { trackBodyValidationSchema } from "@/schemas/track.validation.schema";
import { Router } from "express";

class TrackRoutes implements Routes {
	public router = Router();
	public path = "/tracks";
	private trackController = new TrackController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/fetch-track`, this.trackController.getTrack);
		this.router.post(
			`${this.path}/create`,
			[authMiddleware, validationMiddleware(trackBodyValidationSchema, "body")],
			this.trackController.createTrack
		);

		// update a track
		this.router.put(
			this.path + "/update-track/:id",
			[authMiddleware, validationMiddleware(trackBodyValidationSchema, "body")],
			this.trackController.updateTrack
		);

		// get all tracks
		this.router.get(
			this.path + "/get-all-tracks",
			[authMiddleware],
			this.trackController.getAllTracks
		);

		// get sample tracks
		this.router.get(
			this.path + "/sample-tracks",
			[authMiddleware],
			this.trackController.getSampleTracks
		);
	}
}

export default TrackRoutes;
