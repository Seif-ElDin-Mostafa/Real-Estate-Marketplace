import { Router } from "express"
import { createProperty, findProperty, updateProperty, deleteProperty } from "../controllers/property.controller.mjs";
import propertyValidator from '../validators/property.validator.mjs'
import { validate } from "../middleware/validate.middleware.mjs";

const router = Router();

router.post('/', validate(propertyValidator), createProperty);
router.get('/:id', findProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);


export default router;