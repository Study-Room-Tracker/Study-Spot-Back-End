import { Request, Response, NextFunction } from "express";
import {
  createMessageService,
  getAllMessagesService,
} from "../services/contact.service";

export const createMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const message = await createMessageService(req.body);
    res
      .status(200)
      .json({ Status: "Message sent successfully", data: message });
  } catch (error) {
    next(error);
  }
};

export const getAllMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messages = await getAllMessagesService();
    res
      .status(200)
      .json({ Status: "Messages retrieved successfully", data: messages });
  } catch (error) {
    next(error);
  }
};
