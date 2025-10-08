// backend/server.js
import dotenv from "dotenv";
import express from "express";
import taskRoute from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// 👉 Đặt middleware parse body TRƯỚC routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "http://localhost:5173"}));

// Routes
app.use("/api/tasks", taskRoute);



// Kết nối DB
connectDB().then(() => {
    app.listen(PORT, () => {
  console.log("Đã kết nối DB, bây giờ có thể xử lý các yêu cầu");
    console.log(`server bắt đầu trên cổng ${PORT}`);
});
});




