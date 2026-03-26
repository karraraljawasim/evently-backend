import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { JWT_SECRET } from "../config/env.js";
import { findUserByIdModel } from "../models/auth.models.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new AppError("Unauthorized", 401);
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await findUserByIdModel(decoded.userId);
    if (!user) {
      const error = new AppError("Unauthorized", 401);
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorize;
