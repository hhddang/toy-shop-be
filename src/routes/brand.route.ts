import express from "express";
import {
  createBrand,
  readAllBrand,
  readBrandById,
  updateBrandById,
  deleteBrandById,
} from "@controllers/brand.controller";
import { isAuth } from "@controllers/auth.controller";

export const brandRouter = express.Router();

brandRouter.post("/create", isAuth, createBrand);
brandRouter.get("", isAuth, readAllBrand);
brandRouter.get("/:id", isAuth, readBrandById);
brandRouter.post("/update/:id", isAuth, updateBrandById);
brandRouter.post("/delete/:id", isAuth, deleteBrandById);
