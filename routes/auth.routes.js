import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);

authRoutes.post("/sign-in", signIn);

// authRoutes.all("*", (req, rest) => {
//   const error = new AppError("Route not found", 404);
//   throw error;
// });
export default authRoutes;
