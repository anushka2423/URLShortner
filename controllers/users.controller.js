import { User } from "../models/users.model.js";
import {v4 as uuidv4} from "uuid";
import { setUser } from "../service/auth.js";

export async function handleCreateUser(req, res) {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({error: 'Please fill in all fields.'});
    }

    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/");
};

export async function handleUserLogin(req, res) {
    const {email, password} = req.body;

    const user = await User.findOne({email, password});

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uuid", sessionId);

    if(!user)   
        return res.render("login", {error: 'User not found.'});

    return res.redirect("/");
}