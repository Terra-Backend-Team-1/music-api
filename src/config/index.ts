import { config } from "dotenv";

config();
// set path for .env file
//config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  JWT_LIFETIME,
  JWT_SECRET,
  ORIGIN,
  MONGO_URI,
  CREDENTIALS,
  SOUNDCLOUD_CLIENT_ID,
  SOUNDCLOUD_BASE_URL
} = process.env;

//export const MONGO_URI =
//  process.env.NODE_ENV === "production"
//    ? process.env.MONGO_URI
//    : "mongodb://127.0.0.1:27017/music-api";
