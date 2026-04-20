import { Router } from "express";
import { createNewRoomController } from "../controllers/room.controller";
import { validate } from "../middleware/validate.middleware";
import { createRoomValidation } from "../models/room.model";

const router = Router();

router.post(
  "/createRoom",
  validate(createRoomValidation),
  createNewRoomController,
);

export default router;
