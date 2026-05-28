import { createMessageTypeZ } from "../models/contact.model";
import { prisma } from "../config/db";

export const createMessageService = async (data: createMessageTypeZ) => {
  const message = await prisma.contact.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
    },
  });
  return message;
};

export const getAllMessagesService = async () => {
  const messages = await prisma.contact.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      createdAt: true,
    },
  });
  return messages;
};
