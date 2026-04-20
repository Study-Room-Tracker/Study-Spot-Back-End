import { updateUserTypeZ } from "../models/user.model";
import { prisma } from "../config/db";
import { AppError } from "../utils/app.error";
import bcrypt from "bcrypt";

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  return users;
};

export const getUserByIdService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  if (!user) {
    throw new AppError(`User with ${userId} not found`, 404);
  }
  return user;
};

// Have to add tokenization system here where user can only update their own page in service
export const updateUserByIdService = async (
  providedUserId: number,
  userId: number,
  data: updateUserTypeZ,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: providedUserId },
  });
  if (!existingUser) {
    throw new AppError(`User with ${providedUserId} not found`, 404);
  }
  if (providedUserId !== userId) {
    throw new AppError("Forbidden: You can only update your own profile", 403); // This works by extracting the userId from the token and comparing it with the providedUserId in the request parameters. If they don't match, it means they are trying to update someone else's profile, and we throw a 403 Forbidden error.
  }

  const hashedPassword = data.password // If password is provided, hash it, otherwise keep it undefined
    ? await bcrypt.hash(data.password, 12)
    : undefined;
  const updateUser = await prisma.user.update({
    where: { id: providedUserId },
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  return updateUser;
};

export const deleteUserByIdService = async (
  providedId: number,
  userId: number,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: providedId },
  });

  if (!existingUser) {
    throw new AppError(`User with ${providedId} not found`, 404);
  }
  if (providedId !== userId) {
    throw new AppError("Forbidden: You can only delete your own profile", 403);
  }
  const deleteUser = await prisma.user.delete({
    where: {
      id: providedId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
  return deleteUser;
};
