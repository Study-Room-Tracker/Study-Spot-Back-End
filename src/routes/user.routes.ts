import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { updateUserValidation } from "../models/user.model";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

// Have to add restrict to admin role here
router.get("/getAllUsers", getAllUsersController);
router.get("/getUser/:id", getUserByIdController);
router.patch(
  "/updateUser/:id",
  protect,
  validate(updateUserValidation),
  updateUserByIdController,
);
router.delete("/deleteUser/:id", protect, deleteUserByIdController);

export default router;
