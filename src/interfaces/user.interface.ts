import { Document } from "mongoose";

export interface IUser extends Document<any> {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	varified: boolean;
	varificationToken?: string;
	verificationTokenExpiresBy: number;
	role: "admin" | "user";
	following: IUser[] | string[];
	followers: IUser[] | string[];
	created_at: Date;
	updated_at: Date;
	dateOfBirth: Date;
	profileImage: string;
}
