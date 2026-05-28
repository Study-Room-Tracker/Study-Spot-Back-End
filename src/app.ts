import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import roomRoutes from "./routes/room.routes";
import contactRoutes from "./routes/contact.routes";
import cors from "cors";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET, POST, PATCH, DELETE",
    }),
  );

  // auth routes
  app.use("/api/auth", authRoutes);

  // user routes
  app.use("/api/users", userRoutes);

  // room routes
  app.use("/api/rooms", roomRoutes);

  app.use("/api/contact", contactRoutes);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use(errorHandler);

  return app;
};
