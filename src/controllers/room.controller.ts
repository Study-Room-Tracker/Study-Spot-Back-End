import { Request, Response, NextFunction } from "express";
import { createNewRoomService } from "../services/room.service";

export const createNewRoomController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  const room = await createNewRoomService(data);
  res
    .status(200)
    .json({ Status: "Created a new room successfully", data: room });
};
