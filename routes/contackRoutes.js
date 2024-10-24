import express from "express";
const router = express.Router();
import contactController from "../controllers/contactController.js";
import validateToken from "../middleware/ValidateTokeHandler.js";

router.use(validateToken);
router.route("/")
.get(contactController.getContact)
.post(contactController.postContact);

router.route("/:id")
.get(contactController.getSpecific)
.put(contactController.updateContact)
.delete(contactController.deleteContact);

export default router;