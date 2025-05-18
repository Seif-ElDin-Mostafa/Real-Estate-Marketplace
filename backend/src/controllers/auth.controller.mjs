import Users from "../models/user.model.mjs"
import hashPassword from "../helpers/hash.mjs"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../helpers/config.mjs";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, password, role, email, phone } = req.body;

  
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }, { phone }]
    });

    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: 'Username, email, or phone number already in use',
        error: 'Conflict'
      });
    }

    const hashedPassword = hashPassword(password);
    const user = await Users.create({
      username,
      password: hashedPassword,
      role,
      email,
      phone
    });

    return res.status(201).send({
      success: true,
      data: user,
      message: 'User Registered',
      error: null
    });
  } catch (error) {
    next(error);
  }
}


export const login = async (req, res, next) => {
    const {body: {username, password}} = req;
    try {
       const user = await Users.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user || !isMatch) return res.status(401).send({ success: false, message:"Invalid Credentials"});

        const payload = {id: user._id, username: user.username, role: user.role};
        const token = jwt.sign(payload, JWT_SECRET);

        return res.status(200).json({token});
    } catch (error) {
        next(error);
    }
  };
 export const getUser = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const users = await Users.find({});
      return res.status(200).send({ success: true, data: users, message: "Users Found", error: null });
    }
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.sendStatus(404);  
    }

    return res.status(200).send({ success: true, data: user, message: "User Found", error: null });
  } catch (error) {
    next(error);
  }
};
export const updateMe = async (req, res, next) => {
    try{
          const { body } = req;
          const user = await Users.findByIdAndUpdate(req.user.id, body, { new: true });
          if (!user) return res.sendStatus(404);
          return res.status(200).send({ success: true, data: user, message: "User Updated", error: null });
    }
    catch(error){
        next(error);
    }
}
export const updateUser = async (req, res, next) => {
    try{
        if (req.user.role !== "admin") return res.sendStatus(403);
          const { body } = req;
          const user = await Users.findByIdAndUpdate(req.params.id, body, { new: true });
          if (!user) return res.sendStatus(404);
          return res.status(200).send({ success: true, data: user, message: "User Updated", error: null });
    }
    catch(error){
        next(error);
    }
}
  