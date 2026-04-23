import {
  changeRoomStatustypeZ,
  createRoomTypeZ,
  updateRoomTypeZ,
} from "../models/room.model";
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

export const getAllRoomsService = async () => {
  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return rooms;
};

export const getRoomByIdService = async (roomId: number) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!room) {
    throw new AppError(`Room with id ${roomId} could not be found`, 404);
  }
  return room;
};

export const updateRoomByIdService = async (
  roomId: number,
  data: updateRoomTypeZ,
) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    throw new AppError(`Room with id ${roomId} could not be found`, 404);
  }
  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId,
    },
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
  return updatedRoom;
};

export const deleteRoomByIdService = async (roomId: number) => {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    throw new AppError(`Room with id ${roomId} could not be found`, 404);
  }
  const deletedRoom = await prisma.room.delete({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return deletedRoom;
};

export const changeRoomStatusSerivce = async (
  roomId: number,
  data: changeRoomStatustypeZ,
) => {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
  if (!room) {
    throw new AppError(`Room with id ${roomId} could not be found`, 404);
  }
  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId,
    },
    data: {
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
  return updatedRoom;
};
