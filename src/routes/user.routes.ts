import { Router } from "express";
import { Routes } from "@/interfaces/route.interface";
import UserController from "@/controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { followUserValidationSchema } from "@/schemas/user.validation.schema";

class UserRoute implements Routes {
	public path = "/user";
	private userController = new UserController();
	public router = Router();

	constructor() {
		this.inizializeRoutes();
	}

	public inizializeRoutes() {
		this.router.put(
			this.path + "/:id",
			[authMiddleware],
			this.userController.updateUser
		);
		this.router.get(this.path, [authMiddleware], this.userController.getUsers);

		// get user by id route
		this.router.get(
			this.path + "/:id",
			[authMiddleware],
			this.userController.getUser
		);

		// follow user by id route
		this.router.put(
			this.path + "/follow/:id",
			[
				authMiddleware,
				validationMiddleware(followUserValidationSchema, "params"),
			],
			this.userController.followUser
		);

		// unfollow user by id route
		this.router.put(
			this.path + "/unfollow/:id",
			[
				authMiddleware,
				validationMiddleware(followUserValidationSchema, "params"),
			],
			this.userController.unfollowUser
		);
	}
}

export default UserRoute;
