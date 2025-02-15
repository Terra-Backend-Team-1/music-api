import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.routes";

import "dotenv/config";
import MusicRoute from "./routes/music.route";

const application = new App([new AuthRoute(), new UserRoute(), new MusicRoute()]);

application.startServer();
