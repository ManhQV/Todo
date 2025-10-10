// backend/src/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import taskRoute from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ===== CORS (cho cả dev & prod) =====
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

// Cho phép cấu hình qua ENV khi deploy (khuyên dùng)
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
if (process.env.BACKEND_URL) allowedOrigins.push(process.env.BACKEND_URL);

// Đăng ký CORS trước routes
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ===== Body parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== API routes =====
app.use("/api/tasks", taskRoute);

// ===== Static files (Production) =====
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ===== Start server sau khi kết nối DB =====
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Đã kết nối DB, bây giờ có thể xử lý các yêu cầu");
      console.log(`server bắt đầu trên cổng ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Kết nối DB thất bại:", err);
    process.exit(1);
  });
