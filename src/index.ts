import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { brandRouter } from "./routes/brand.route";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MG_URI!)
  .then(() => {
    console.log("Connected to Mongodb");
    StartServer();
  })
  .catch((e) => {
    console.log("Error on connecting to Mongodb: ", e);
  });

const StartServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      credentials: true,
      origin: process.env.FE_URI,
    })
  );

  app.use("/api/brands", brandRouter);

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};
