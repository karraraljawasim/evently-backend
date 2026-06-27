import jwt from "jsonwebtoken";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import {
  createUserModel,
  findUserByEmailModel,
} from "../models/auth.models.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!(firstName && lastName && email && role && password)) {
      const error = new AppError("Bad Request", 400);
      throw error;
    }

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      const error = new AppError(
        "Please provide a valid email address format",
        400,
      );
      throw error;
    }

    const user = await findUserByEmailModel(normalizedEmail);
    if (user.length !== 0) {
      const error = new AppError("The user already exists", 409);
      throw error;
    }
    const userId = uuidv7();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUserModel(
      userId,
      firstName,
      lastName,
      normalizedEmail,
      role,
      hashedPassword,
    );

    const token = jwt.sign({ userId: newUser[0].user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      token,
      message: "User signUp successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      const error = new AppError("Email and Password is required", 400);
      throw error;
    }

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      const error = new AppError(
        "Please provide a valid email address format",
        400,
      );
      throw error;
    }
    const user = await findUserByEmailModel(normalizedEmail);
    if (user.length === 0) {
      const error = new AppError("User not found", 404);
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      const error = new AppError("Invalid Password");
      throw error;
    }

    const token = jwt.sign({ userId: user[0].user_id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "User Sign In Successfully",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
