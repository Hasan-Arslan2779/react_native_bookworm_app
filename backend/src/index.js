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
app.use(
  express.json({
    limit: "50mb", // Increase the limit for large image uploads
  })
);
const port = process.env.PORT || 3001;

//Cors

app.use(cors({}));

// Middleware
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/", pageRoutes);

//Listen to the server
// ...existing code...
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
// ...existing code...
