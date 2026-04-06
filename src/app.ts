import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  // auth routes
  app.use("/api/auth", authRoutes);

  app.use(errorHandler);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
