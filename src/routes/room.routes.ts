import { Router } from "express";
import {
  changeRoomStatusController,
  createNewRoomController,
  deleteRoomByIdController,
  getAllRoomsController,
  getRoomByIdController,
  updateRoomByIdController,
} from "../controllers/room.controller";
import { validate } from "../middleware/validate.middleware";
import {
  changeRoomStatusValidation,
  createRoomValidation,
  updateRoomValidation,
} from "../models/room.model";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { ipLimiter } from "../middleware/ip.limit";

const router = Router();

router.post(
  "/",
  protect,
  restrictTo("ADMIN"),
  validate(createRoomValidation),
  createNewRoomController,
);
router.get("/", getAllRoomsController);
router.get("/:id", getRoomByIdController);
router.patch(
  "/:id",
  protect,
  restrictTo("ADMIN"),
  validate(updateRoomValidation),
  updateRoomByIdController,
);
router.delete("/:id", protect, restrictTo("ADMIN"), deleteRoomByIdController);
router.patch(
  "/changeStatus/:id",
  ipLimiter, // Checks the ip address of the user and limits the number of requests they can make to this endpoint to 10 requests per minute. If the user exceeds this limit, they will receive a 429 Too Many Requests response with a message indicating that they have tried to change the status too many times and should try again in 1 minute.
  protect, // Checks if the user is logged in i.e if they have a valid token. If this is not the case, they will receive a 401 Unauthorized response.
  validate(changeRoomStatusValidation), // Validates the request body against the changeRoomStatusValidation schema. If the request body is not valid, the user will receive a 400 Bad Request response with details about the validation errors.
  changeRoomStatusController,
);

export default router;
