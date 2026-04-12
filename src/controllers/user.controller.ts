import { Request, Response, NextFunction } from "express";
import { updateUserTypeZ, updateUserValidation } from "../models/user.model";
import { updateUserService } from "../services/user.service";

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id); // we need to convert the id from string to number because our database expects a number
    const body = req.body;
    const updateUser = await updateUserService(id, body);

    res.status(200).json({
      status: `User with ${id} updated successfully`,
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};
