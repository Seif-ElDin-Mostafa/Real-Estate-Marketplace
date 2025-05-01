import Users from "../models/user.model.mjs"
import hashPassword from "../helpers/hash.mjs"


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
    return res.status(200).send({
      success: true,
      data: req.user,
      message: "User Logged In",
      error: null
    });
  };