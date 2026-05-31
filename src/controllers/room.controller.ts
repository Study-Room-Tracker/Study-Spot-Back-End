import { Request, Response, NextFunction } from "express";
import {
  changeRoomStatusService,
  createNewRoomService,
  deleteRoomByIdService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomByIdService,
} from "../services/room.service";

export const createNewRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const room = await createNewRoomService(data);
    res
      .status(200)
      .json({ status: "Created a new room successfully", data: room });
  } catch (error) {
    next(error);
  }
};

export const getAllRoomsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rooms = await getAllRoomsService();
    res
      .status(200)
      .json({ status: "Retrieved all rooms successfully", data: rooms });
  } catch (error) {
    next(error);
  }
};

export const getRoomByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = Number(req.params.id);
    const room = await getRoomByIdService(roomId);
    res.status(200).json({
      status: `Retreived room with ${roomId} successfully`,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRoomByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = Number(req.params.id);
    const data = req.body;
    const updatedRoom = await updateRoomByIdService(roomId, data);
    res.status(200).json({
      status: `Updated room with id ${roomId} successfully`,
      data: updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRoomByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = Number(req.params.id);
    const deletedRoom = await deleteRoomByIdService(roomId);
    res.status(200).json({
      status: `Deleted room with id ${roomId} successfully`,
      data: deletedRoom,
    });
  } catch (error) {
    next(error);
  }
};

export const changeRoomStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = Number(req.params.id);
    const data = req.body;
    const room = await changeRoomStatusService(roomId, data);
    res.status(200).json({
      status: `Updated status of room with id ${roomId} successfully`,
      data: room,
    });
  } catch (error) {
    next(error);
  }
};
