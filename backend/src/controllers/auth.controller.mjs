import Users from "../models/user.model.mjs"
import hashPassword from "../Helpers/Hash.mjs"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const {body: {username, password, role, email, phone}} = req;
        const hashedPassword = hashPassword(password);
        const user = await Users.create({username, hashedPassword, role, email, phone});
        return res.status(201).send({ success: true, data: user, message:"User Registered", error:null});
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
        return res.status(200).send({ success: true, data: user, message:"User Logged In", error:null});
    } catch (error) {
        console.error('Error logging in user', error);
        return res.status(400).send(error.errors);
    }
}