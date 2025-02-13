import { Router } from "express";
import { Routes } from "@/interfaces/route.interface";
import UserController from "@/controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";

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
	}
}

export default UserRoute;
