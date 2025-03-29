import shortid from "shortid";
import { URL } from "../models/url.model.js";

export async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortId = shortid(8);
    await URL.create({ 
        shortId : shortId,
        redirectUrl: body.url,
        visitHistory : []
    });

    return res.status(201).json({
        id: shortId
    });
};

export async function handleRedirectUrl(req, res) {
    const shortId = req.params.id;
    const entry = await URL.findOneAndUpdate(
        { shortId }, {$push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }}
    );

    res.redirect(entry?.redirectUrl);
}

export async function handleAnalyticsOfUrl(req, res) {
    const shortId = req.params.id;
    const result = await URL.findOne({shortId});

    return res.status(201).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}