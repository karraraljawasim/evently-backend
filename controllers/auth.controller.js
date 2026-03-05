import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import { createUser, getUser, findUserByEmail } from "../models/auth.models.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!(firstName && lastName && email && role && password)) {
      const error = new AppError("Bad Request", 400);
      throw error;
    }

    const user = await findUserByEmail(email);
    if (user.length !== 0) {
      const error = new AppError("User Already Exists", 409);
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser(
      firstName,
      lastName,
      email,
      role,
      hashedPassword,
    );

    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      token,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      const error = new AppError("Bad Request", 400);
      throw error;
    }

    const user = await getUser(email);
    if (user.length === 0) {
      const error = new AppError("User not found", 404);
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new AppError("Invalid Password");
      throw error;
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

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
