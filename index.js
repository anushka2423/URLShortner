import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { checkForAuthentication } from './middleware/auth.js';
import { connectDB } from './connectDb.js';

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);

connectDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("mongodb connected"));

import UrlRoute from "./routes/url.route.js";
import UserRoute from "./routes/users.route.js";
import StaticRoute from "./routes/static.route.js";
import { restricTo } from './middleware/auth.js';

app.use("/url", restricTo(["NORMAL"]), UrlRoute);
app.use("/users", UserRoute);

app.use("/", StaticRoute);

app.listen(PORT, () => console.log(`the server is running http://localhost:${PORT}`));