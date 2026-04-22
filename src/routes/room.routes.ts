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
} from "../models/room.model";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/createRoom",
  protect,
  restrictTo("ADMIN"),
  validate(createRoomValidation),
  createNewRoomController,
);
router.get("/getAllRooms", getAllRoomsController);
router.get("/getRoom/:id", getRoomByIdController);
router.patch(
  "/updateRoom/:id",
  protect,
  restrictTo("ADMIN"),
  validate(createRoomValidation),
  updateRoomByIdController,
);
router.delete(
  "/deleteRoom/:id",
  protect,
  restrictTo("ADMIN"),
  deleteRoomByIdController,
);
router.patch(
  "/changeStatus/:id",
  protect,
  validate(changeRoomStatusValidation),
  changeRoomStatusController,
);

export default router;
