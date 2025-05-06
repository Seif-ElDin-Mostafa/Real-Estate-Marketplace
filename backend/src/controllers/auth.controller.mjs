import Users from "../models/user.model.mjs"
import hashPassword from "../helpers/hash.mjs"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../helpers/config.mjs";


export const register = async (req, res) => {
    try {
        const {body: {username, password, role, email, phone}} = req;
        const hashedPassword = hashPassword(password);
        const user = await Users.create({username, password: hashedPassword, role, email, phone});
        return res.status(201).send({ success: true, data: user, message:"User Registered", error:null});
    } catch (error) {
        console.error('Error registering user', error);
        return res.status(400).send(error.errors);
    }
}


export const login = async (req, res) => {
    const {body: {username, password}} = req;
    try {
        const user = await Users.findOne(username);
        const hashedPassword = hashPassword(password);
        const isMatch = await bcrypt.compare(hashedPassword, user.password);
        if(!user || !isMatch) return res.status(401).send({ success: false, message:"Invalid Credentials"});

        const payload = {id: user._id, username: user.username, role: user.role};
        const token = jwt.sign(payload, JWT_SECRET);

        return res.status(200).json({token});
    } catch (error) {
        console.error('Error logging in user', error);
        return res.status(400).send(error.errors);
    }
  };