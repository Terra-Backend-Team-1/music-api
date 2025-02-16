import SpotifyWebApi from "spotify-web-api-node";
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT_URI,
} from "@/config";

export const spotifyAPI = new SpotifyWebApi({
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
	redirectUri: SPOTIFY_REDIRECT_URI,
});
