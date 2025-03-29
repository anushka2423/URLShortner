import express from 'express';
import { connectDB } from './connectDb.js';

const app = express();
const PORT = 3000;

app.use(express.json());

connectDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("mongodb connected"));

import UrlRoute from "./routes/url.route.js";

app.use("/url", UrlRoute);

app.listen(PORT, () => console.log(`the server is running http://localhost:${PORT}`));