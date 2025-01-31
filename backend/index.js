import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

import connectDb from "./config/db.js";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//routes

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
