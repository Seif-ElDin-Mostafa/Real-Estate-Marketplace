import { Router } from "express"
import { register, login, getUser} from "../controllers/auth.controller.mjs";
import userValidator from "../validators/user.validator.mjs";
import { validate } from "../middleware/validate.middleware.mjs";
import { get } from "mongoose";
import { authenticate } from "../middleware/authenticate.middleware.mjs";

const router = Router();

router.post("/register", validate(userValidator), register);

router.post("/login", login);

router.get("/me",authenticate,getUser);

export default router;