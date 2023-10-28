import express from "express";
import brandController from "../controllers/brand.controller";

export const brandRouter = express.Router();

brandRouter.post("/create", brandController.createBrand);
brandRouter.get("", brandController.readAllBrand);
brandRouter.get("/:id", brandController.readBrandById);
brandRouter.post("/update/:id", brandController.updateBrandById);
brandRouter.post("/delete/:id", brandController.deleteBrandById);
