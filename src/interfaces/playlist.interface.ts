import { Document } from "mongoose";
import { IUser } from "./user.interface";
import { ITrack } from "./track.interface";

export interface IPlaylist extends Document {
	name: string;
	description: string;
	coverImage: string;
	creator: IUser;
	tracks: ITrack[];
	isPublic: boolean;
	followers: IUser[];
	createdAt: Date;
}
