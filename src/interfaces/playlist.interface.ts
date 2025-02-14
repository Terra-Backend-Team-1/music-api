import { Document } from "mongoose";
import { IUser } from "./user.interface";
import { ISong } from "./song.interface";

export interface IPlaylist extends Document {
  name: string
  description: string
  coverImage: string
  creator: IUser
  songs: ISong[]
  isPublic: boolean
  followers: IUser[]
  createdAt: Date
}


