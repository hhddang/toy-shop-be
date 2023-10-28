import { NextFunction, Request, Response } from "express";
import { brandModel } from "../models/brand.model";
import { failedResponse, successResponse } from "../utils/response";

const createBrand = (req: Request, res: Response, next: NextFunction) => {
  const { name, image } = req.body;
  if (!name) {
    return res.status(500).json(failedResponse("Field 'name' is required"));
  }
  if (!image) {
    return res.status(500).json(failedResponse("Field 'image' is required"));
  }

  const brand = new brandModel({ name, image });
  return brand
    .save()
    .then((brand) => res.status(201).json(successResponse({ brand })))
    .catch(() => res.status(500).json(failedResponse("Cannot create")));
};

const readAllBrand = (req: Request, res: Response, next: NextFunction) => {
  return brandModel
    .find()
    .then((brands) => {
      if (brands) {
        res.status(200).json(successResponse({ brands }));
      } else {
        res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot read all")));
};

const readBrandById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json(failedResponse("Param 'id' is required"));
  }

  return brandModel
    .findById(id)
    .then((brand) => {
      if (brand) {
        return res.status(200).json(successResponse({ brand }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot find by id")));
};

const updateBrandById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json(failedResponse("Param 'id' is required"));
  }

  return brandModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((brand) => {
      if (brand) {
        return res.status(201).json(successResponse({ brand }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot update by id")));
};

const deleteBrandById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!id) {
    return res.status(500).json(failedResponse("Param 'id' is required"));
  }

  return brandModel
    .findByIdAndDelete(id)
    .then((brand) => {
      if (brand) {
        return res.status(201).json(successResponse({ message: "Deleted" }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot delete by id")));
};

export default {
  createBrand,
  readAllBrand,
  readBrandById,
  updateBrandById,
  deleteBrandById,
};
