import { Document } from "mongoose"

export interface ISong extends Document {
  title: string
  artist: string
  duration: string
  genre: string
  album: string
  release_date: string
  stream_url: string
  yt_id: string
  created_at: Date
}


