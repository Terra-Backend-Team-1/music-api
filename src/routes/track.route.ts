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
	}
}

export default TrackRoutes;
