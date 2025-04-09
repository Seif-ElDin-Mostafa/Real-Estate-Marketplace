import { Router } from "express"
import { register, login } from "../controllers/auth.controller.mjs";
import userValidator from "../validators/user.validator.mjs";
import { validate } from "../middleware/validate.middleware.mjs";
import passport from "passport";

const router = Router();

router.post("/register", validate(userValidator), register);

router.post("/login", validate(userValidator), passport.authenticate('basic', { session: false }), login);

export default router;