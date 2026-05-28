import {
  createMessageController,
  getAllMessagesController,
} from "../controllers/contact.controller";
import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createMessageValidation } from "../models/contact.model";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post("/", validate(createMessageValidation), createMessageController);
router.get("/", protect, restrictTo("ADMIN"), getAllMessagesController);

export default router;
