import express from 'express';
import { URL } from '../models/url.model.js';
import { restricTo } from '../middleware/auth.js';

const router = express.Router();

router.get("/", restricTo(["NORMAL"]), async (req, res) => {
    // if(!req.user) res.redirect("/login");
    const allurls = await URL.find({ generatedBy: req?.user?._id});
    return res.render("home", {
        urls: allurls
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

export default router;