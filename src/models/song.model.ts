import mongoose, { Schema } from "mongoose";
import { ISong } from "@/interfaces/song.interface";


const songSchema = new Schema<ISong>({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    yt_id: {
        type: String,
        required: true
    },
    stream_url:{
        type: String
    },
    created_at:{
        type: Date,
        defualt: Date.now()
    }
})


const SongModel = mongoose.model<ISong>("song", songSchema);

export default SongModel