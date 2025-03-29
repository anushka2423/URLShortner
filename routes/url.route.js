import express from "express";
import { handleAnalyticsOfUrl, handleGenerateShortUrl, handleRedirectUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/:id", handleRedirectUrl);

router.get("/analytics/:id", handleAnalyticsOfUrl);

export default router;