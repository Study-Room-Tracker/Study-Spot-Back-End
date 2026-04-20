import { createRoomTypeZ } from "../models/room.model";
import { prisma } from "../config/db";
import { AppError } from "../utils/app.error";

export const createNewRoomService = async (data: createRoomTypeZ) => {
  const room = await prisma.room.create({
    data: {
      name: data.name,
      status: data.status,
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return room;
};
