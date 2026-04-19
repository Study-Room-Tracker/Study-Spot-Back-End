import { Request, Response, NextFunction } from "express";

import {
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
} from "../services/user.service";

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersService();
    res
      .status(200)
      .json({ status: "Retrieved all users successfully", data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserByIdService(id);
    res.status(200).json({ status: "Retrieved user successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providedUserId = Number(req.params.id); // we need to convert the id from string to number because our database expects a number

    const userId = Number(req.user!.id);
    if (!req.user) {
      res
        .status(401)
        .json({ message: "Unauthorized: No user information found" });
    }
    const body = req.body;
    const updateUser = await updateUserByIdService(
      providedUserId,
      userId,
      body,
    );

    res.status(200).json({
      status: `User with ${providedUserId} updated successfully`,
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const providedId = Number(req.params.id);
    const userId = Number(req.user!.id);
    if (!req.user) {
      res
        .status(401)
        .json({ message: "Unauthorized: No user information found" });
    }
    const user = await deleteUserByIdService(providedId, userId);
    res.status(200).json({
      status: `Deleted user with id ${providedId} successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
