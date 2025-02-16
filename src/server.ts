import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.routes";

import "dotenv/config";
import PlaylistRoute from "./routes/playlist.route";
import TrackRoutes from "./routes/track.route";

const application = new App([
	new AuthRoute(),
	new UserRoute(),
	new PlaylistRoute(),
	new TrackRoutes(),
]);

application.startServer();
