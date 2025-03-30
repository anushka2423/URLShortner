import { getUser } from "../service/auth.js";

export async function restricToLogedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uuid;
    if(!userUid) return res.render("login");

    const user = getUser(userUid);
    if(!user) return res.render("login");

    req.user = user;
    next();
};

export async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uuid;
    const user = getUser(userUid);

    req.user = user;
    next();
}