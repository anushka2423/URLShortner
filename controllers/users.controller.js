import { User } from "../models/users.model.js";
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

    const token = setUser(user);
    res.cookie("token", token);

    // res.json({ token });

    if(!user)   
        return res.render("login", {error: 'User not found.'});

    return res.redirect("/");
}