import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

// 1. Middlewares
app.use(cors({
    origin: "https://yobixai-rasd.onrender.com", 
    credentials: true
}));

app.use(express.json());      
app.use(cookieParser());      

// 2. API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

// 3. Simple Home Route (Isme koi wildcard '*' nahi hai, isliye error nahi aayegi)
app.get("/", (req, res) => {
    res.status(200).json({ message: "Yobix Backend is Live and Running! 🚀" });
});

// 4. Server Start
app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port: ${port}`);
});