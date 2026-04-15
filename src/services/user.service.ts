import { updateUserTypeZ } from "../models/user.model";
import { prisma } from "../config/db";
import { AppError } from "../utils/app.error";
import bcrypt from "bcrypt";

// Have to add tokenization system here where user can only update their own page in service
export const updateUserService = async (
  userId: number,
  data: updateUserTypeZ,
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const hashedPassword = data.password // If password is provided, hash it, otherwise keep it undefined
    ? await bcrypt.hash(data.password, 12)
    : undefined;
  const updateUser = await prisma.user.update({
    where: { id: userId },
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
