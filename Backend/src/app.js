import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import notes from "./routes/notes.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./src/.env" });

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.set("port", process.env.PORT);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", notes);
app.get("/", (req, res) => {
  res.send("Campus Codex Backend is running 🚀");
});

app.use((err, req, res, next) => {
  console.error("Error :", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const start = async () => {
  try {
    let connectionDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo Connected DB Host : ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
      console.log(`Server listening on  http://localhost:${app.get("port")}`);
    });
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
  }
};

start();
