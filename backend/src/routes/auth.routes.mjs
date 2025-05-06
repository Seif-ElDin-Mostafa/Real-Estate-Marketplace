import { Router } from "express"
import { register, login } from "../controllers/auth.controller.mjs";
import userValidator from "../validators/user.validator.mjs";
import { validate } from "../middleware/validate.middleware.mjs";

const router = Router();

router.post("/register", validate(userValidator), register);

router.post("/login", login);

export default router;