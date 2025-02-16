import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { isEmpty } from "../utils/util";

class UserService {
	private userModel = UserModel;

	public updateUser = async (userData: IUser, id: string) => {
		if (isEmpty(userData)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a field");
		}
		const user = await this.userModel.findByIdAndUpdate(id, userData, {
			new: true,
		});
		if (!user) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
		}
		return user;
	};

	public getUser = async (id: string): Promise<IUser> => {
		const user = await this.userModel.findById(id);
		if (!user) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "User not found");
		}
		return user;
	};

	public getUsers = async (): Promise<IUser[]> => {
		const users = await this.userModel.find();
		return users;
	};

	public deleteUser = async (id: string): Promise<IUser> => {
		if (!id) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide an id");
		}
		const user = await this.userModel.findByIdAndDelete(id);
		if (!user) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
		}
		return user;
	};

	// follow a user by id
	public followUser = async (userId: string, followId: string) => {
		if (!userId || !followId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide user id");
		}
		if (userId === followId) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Cannot follow yourself"
			);
		}
		const user = await this.userModel.findById(userId);
		const followUser = await this.userModel.findById(followId);
		if (!user || !followUser) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
		}
		if ((user.following as string[]).includes(followId)) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Already following user"
			);
		}
		await user.updateOne({ $push: { following: followId } });
		await followUser.updateOne({ $push: { followers: userId } });
		return user;
	};

	// unfollow a user by id
	public unfollowUser = async (userId: string, unfollowId: string) => {
		if (!userId || !unfollowId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide user id");
		}
		if (userId === unfollowId) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Cannot unfollow yourself"
			);
		}
		const user = await this.userModel.findById(userId);
		const unfollowUser = await this.userModel.findById(unfollowId);
		if (!user || !unfollowUser) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "User does not exist");
		}
		if (!(user.following as string[]).includes(unfollowId)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Not following user");
		}
		await user.updateOne({ $pull: { following: unfollowId } });
		await unfollowUser.updateOne({ $pull: { followers: userId } });
		return user;
	};
}

export default UserService;
