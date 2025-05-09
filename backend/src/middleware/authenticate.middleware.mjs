import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../helpers/config.mjs";

export const authenticate = (req, res, next) => {
     const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ error: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) return res.status(401).send({error: "Invalid token"});
        req.user = payload;
        next();
    })
}