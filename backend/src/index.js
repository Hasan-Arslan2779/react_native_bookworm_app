import express from "express";
import cors from "cors";
import dotenvx from "@dotenvx/dotenvx";
import authRoutes from "./routes/authRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";

//dotenvx configuration
dotenvx.config();

// Create an Express application
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

//Cors

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/", pageRoutes);

//Listen to the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  // Connect to the database
  connectDB();
});
