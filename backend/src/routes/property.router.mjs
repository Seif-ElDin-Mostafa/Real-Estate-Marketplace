import { Router } from "express"
import { createProperty, findProperty, updateProperty, deleteProperty } from "../controllers/property.controller.mjs";
import propertyValidator from '../validators/property.validator.mjs'
import { validate } from "../middleware/validate.middleware.mjs";
import passport from "passport";
import {local} from "../helpers/auth-setup.mjs"
const router = Router();

const authenticate = passport.authenticate(local, { session: false });

router.post('/', createProperty);
router.get('/:id', findProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);


export default router;