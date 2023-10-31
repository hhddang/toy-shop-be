import { Request, Response } from "express";
import { userModel } from "@models";
import { failedResponse, successResponse } from "@utils";
import { UserResponse } from "@types";

const readAllUser = (req: Request, res: Response) => {
  return userModel
    .find({}, { password: false })
    .then((users) => {
      if (users) {
        const response: UserResponse[] = users.map((user) => ({
          _id: user._id.toString(),
          email: user.email!,
          name: user.name!,
          isAdmin: user.isAdmin,
        }));
        return res.status(200).json(successResponse({ users: response }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch((error) =>
      res.status(500).json(failedResponse("Cannot get all: " + error))
    );
};

const readUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  return userModel
    .findById(id, { password: false })
    .then((user) => {
      if (user) {
        const response: UserResponse = {
          _id: user._id.toString(),
          email: user.email!,
          name: user.name!,
          isAdmin: user.isAdmin,
        };
        return res.status(200).json(successResponse({ user: response }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch((error) =>
      res.status(500).json(failedResponse("Cannot get by id: " + error))
    );
};

const deleteUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  return userModel
    .findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        return res.status(200).json(successResponse({ message: "Deleted" }));
      } else {
        return res.status(404).json(failedResponse("Not found"));
      }
    })
    .catch((error) =>
      res.status(500).json(failedResponse("Cannot delete by id: " + error))
    );
};

export { readAllUser, readUserById, deleteUserById };
