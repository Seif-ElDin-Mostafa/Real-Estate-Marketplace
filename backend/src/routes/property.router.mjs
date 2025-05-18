import { Router } from "express"
import { createProperty, findProperty, getAllProperties, updateProperty, deleteProperty } from "../controllers/property.controller.mjs";
import propertyValidator from '../validators/property.validator.mjs'
import { validate } from "../middleware/validate.middleware.mjs";
import { authenticate } from "../middleware/authenticate.middleware.mjs";

const router = Router();

router.post('/', authenticate, validate(propertyValidator), createProperty);
router.get('/:id', authenticate, findProperty);
router.get('/', getAllProperties);
router.put('/:id', authenticate, updateProperty);
router.delete('/:id', authenticate, deleteProperty);


export default router;