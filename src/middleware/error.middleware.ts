import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import { AppError } from "../utils/app.error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Express requires all 4 params for error middleware.
  void req;
  void next;

  let statusCode = 500;
  let message = "Server Error";
  let details: unknown;

  // Custom application errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Zod Validation Errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
  }

  // Prisma Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma error codes
    // P2002: Unique constraint failed
    // P2025: Record not found
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate key error: A record with this value already exists.";
      details = {
        fields: err.meta?.target,
      };
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found.";
    }
  }

  if (statusCode === 500) {
    console.error("Unexpected error:", err);
  }

  res.status(statusCode).json({
    message,
    ...(details !== undefined ? { details } : {}),
  });
};
