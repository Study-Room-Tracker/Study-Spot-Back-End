import type { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";
import { RegisterUserTypeZ, LoginUserTypeZ } from "../models/auth.model";

export const registerUserController = async (
  req: Request<{}, {}, RegisterUserTypeZ>, // the first {} is for params, the second {} is for query, and RegisterUserTypeZ is for body
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
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request<{}, {}, LoginUserTypeZ>,
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
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      },
    });
  } catch (error) {
    next(error);
  }
};
