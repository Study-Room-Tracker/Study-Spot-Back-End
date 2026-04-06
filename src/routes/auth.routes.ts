import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import {
  registerUserValidation,
  loginUserValidation,
} from "../models/auth.model";

const router = Router();

router.post(
  "/register",
  validate(registerUserValidation),
  registerUserController,
);

router.post("/login", validate(loginUserValidation), loginUserController);

export default router;
