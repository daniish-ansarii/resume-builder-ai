import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === "replace-with-a-long-random-secret") {
    throw new Error("Set a unique JWT_SECRET in server/.env before starting the server.");
}

// Database connection
await connectDB()

app.use(express.json({ limit: "5mb" }))
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }))

app.get('/', (req, res)=> res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);

});
