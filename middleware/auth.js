import { getUser } from "../service/auth.js";

// export async function restricToLogedInUserOnly(req, res, next) {
//     // const userUid = req.cookies?.token;
//     const userUid = req.headers["authorization"];
//     if(!userUid) return res.render("login");

//     const token = userUid.split("Bearer ")[1];
//     const user = getUser(token);
//     if(!user) return res.render("login");

//     req.user = user;
//     next();
// };

export function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    // const autherizationHeaderValue = req.headers["authorization"];
    req.user = null;

    if(!tokenCookie) {
        return next();
    }

    // const token = autherizationHeaderValue.split("Bearer ")[1];
    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}

export function restricTo(roles=[]) {
    return function(req, res, next) {
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("unautherized");

        return next();
    }
}