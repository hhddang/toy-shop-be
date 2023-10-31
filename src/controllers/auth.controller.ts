import { NextFunction, Request, Response } from "express";
import { userModel } from "@models";
import { failedResponse, successResponse, generateToken } from "@utils";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@types";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = (req: Request, res: Response) => {
  const { email, password, name, isAdmin } = req.body as RegisterRequest;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json(failedResponse("Field 'email', 'password', or 'name' is empty"));
  }

  userModel.find({ email }).then((users) => {
    if (users.length > 0) {
      return res.status(400).json(failedResponse("Email is already used"));
    }
  });

  const user = new userModel({
    email,
    password: bcrypt.hashSync(password),
    name,
    isAdmin,
  });
  return user
    .save()
    .then((user) => {
      const response: RegisterResponse = {
        _id: user._id.toString(),
        email: user.email!,
        name: user.name!,
        isAdmin: user.isAdmin,
        token: generateToken({
          _id: user._id,
          email,
          name,
          isAdmin: isAdmin || false,
        }),
      };
      return res.status(200).json(successResponse({ user: response }));
    })
    .catch(() => res.status(500).json(failedResponse("Cannot register")));
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body as LoginRequest;
  return userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password!)) {
          const response: LoginResponse = {
            _id: user._id.toString(),
            email: user.email!,
            name: user.name!,
            isAdmin: user.isAdmin,
            token: generateToken({
              _id: user._id,
              email: user.email,
              name: user.name,
              isAdmin: user.isAdmin,
            }),
          };
          res.status(200).json(successResponse({ user: response }));
        } else {
          res.status(404).json(failedResponse("Wrong password"));
        }
      } else {
        res.status(404).json(failedResponse("Email is not existed"));
      }
    })
    .catch(() => res.status(500).json(failedResponse("Cannot login")));
};

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split("Bearer ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decode as {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
    next();
  } else {
    res.status(401).json(failedResponse("JWT token not found in request"));
  }
};

export { register, login, isAuth };
