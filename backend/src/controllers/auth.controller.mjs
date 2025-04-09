import Users from "../models/user.model.mjs"
import hashPassword from "../Helpers/Hash.mjs"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const {body: {username, password}} = req;
        const hashedPassword = await hashPassword(password);
        const user = await Users.create(username, hashedPassword);
        return res.status(201).send(user);
    } catch (error) {
        console.error('Error registering user', error);
        return res.status(400).send(error.errors);
    }
}

export const login = async (req, res) => {
    try {
        const {body: {username, password}} = req;
        const user = await Users.findOne({username: username});
        if(!user) return res.sendStatus(404);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.sendStatus(401);
        return res.status(200).send(user);
    } catch (error) {
        console.error('Error logging in user', error);
        return res.status(400).send(error.errors);
    }
}