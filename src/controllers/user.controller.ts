import { StatusCodes } from "http-status-codes";
import UserService from "@/services/user.service";
import { Response, NextFunction, Request } from "express";
import { RequestWithUser } from "@/interfaces/auth.interface";

class UserController {
	private userService = new UserService();

	public updateUser = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id: string = req.user?.id;
			const user = await this.userService.updateUser(req.body, id);
			res.status(StatusCodes.CREATED).json({ data: user });
		} catch (error) {
			next(error);
		}
	};

	public getUsers = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await this.userService.getUsers();
			res.status(StatusCodes.OK).json({ data: users, message: "All users" });
		} catch (error) {
			next(error);
		}
	};

	public getUser = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params;
			const user = await this.userService.getUser(id);
			res.status(StatusCodes.OK).json({ data: user });
		} catch (error) {
			next(error);
		}
	};

	// follow a user by id
	public followUser = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId: string = req.user?.id;
			const { id } = req.params; // user id to follow
			const user = await this.userService.followUser(userId, id);
			res.status(StatusCodes.OK).json({ data: user });
		} catch (error) {
			next(error);
		}
	};

	// unfollow a user by id
	public unfollowUser = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId: string = req.user?.id;
			const { id } = req.params; // user id to unfollow
			const user = await this.userService.unfollowUser(userId, id);
			res.status(StatusCodes.OK).json({ data: user });
		} catch (error) {
			next(error);
		}
	};
}

export default UserController;
