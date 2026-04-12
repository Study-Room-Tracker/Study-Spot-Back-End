import { Router } from "express";
import { updateUserController } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { updateUserValidation } from "../models/user.model";

const router = Router();

router.patch(
  "/updateUser/:id",
  validate(updateUserValidation),
  updateUserController,
);

export default router;
