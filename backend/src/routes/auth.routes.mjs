import { Router } from "express"
import { register, login, getUser, updateMe, updateUser, deleteUser, deleteMe, changePassword} from "../controllers/auth.controller.mjs";
import userValidator from "../validators/user.validator.mjs";
import { validate } from "../middleware/validate.middleware.mjs";
import { get } from "mongoose";
import { authenticate } from "../middleware/authenticate.middleware.mjs";

const router = Router();

router.post("/register", validate(userValidator), register);

router.post("/login", login);

router.get("/",authenticate,getUser);

router.put("/",authenticate,updateMe);

router.put("/:id",authenticate,updateUser);

router.delete("/", authenticate, deleteMe);

router.delete("/:id", authenticate, deleteUser);

router.put("/change-password", authenticate, changePassword);

export default router;