// dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// defined dependencies
import connectDB from "./database/connectDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

connectDB(process.env.MONGODB_URI);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
