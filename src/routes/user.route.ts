import express from "express";
import {
  readAllUser,
  readUserById,
  deleteUserById,
} from "@controllers/user.controller";
import { isAuth } from "@controllers/auth.controller";

export const userRouter = express.Router();

userRouter.get("", isAuth, readAllUser);
userRouter.get("/:id", isAuth, readUserById);
userRouter.post("/delete/:id", isAuth, deleteUserById);
