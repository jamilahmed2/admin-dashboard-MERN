import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from './db.js'
import authRoutes from './routes/authRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js'; 

connectDB();

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes); // Use Auth Routes
app.use("/api/admin", adminRoutes); // Use Admin Routes

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
