import type { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";
import { RegisterUserTypeZ } from "../models/auth.model";

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserTypeZ>, // the first {} is for params, the second {} is for query, and RegisterUserTypeZ is for body so we have params and query as empty objects
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await registerUserService(data);

    if (!newUser) {
      return res.status(500).json({ status: "Failed to create user" });
    }

    res.status(201).json({
      status: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const user = await loginUserService(data);

    if (!user) {
      return res.status(401).json({ status: "Invalid email or password" });
    }

    res.status(200).json({
      status: "Logged in successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
