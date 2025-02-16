import { config } from "dotenv";

config();
// set path for .env file
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
	PORT,
	JWT_LIFETIME,
	JWT_SECRET,
	ORIGIN,
	MONGO_URI,
	CREDENTIALS,
	SOUNDCLOUD_CLIENT_ID,
	SOUNDCLOUD_BASE_URL,
} = process.env;
