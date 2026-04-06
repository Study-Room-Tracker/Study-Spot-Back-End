import dotenv from "dotenv";
import { createApp } from "./app";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const startServer = async () => {
  try {
    console.info("DB Connected");
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DB NOT CONNECTED", error);
    process.exit(1);
  }
};

startServer();
