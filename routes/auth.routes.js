import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         role:
 *           type: string
 *           enum: [Attendee, Organizer]
 *     SignInRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - auth
 *     summary: Sign up to app
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpRequest'
 *     responses:
 *       200:
 *         description: Sign up successfully
 *       400:
 *         description: Invalid data input
 */
authRoutes.post("/sign-up", signUp);

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     tags:
 *       - auth
 *     summary: Sign in to app
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInRequest'
 *     responses:
 *       201:
 *         description: Sign in successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Invalid email or password
 *
 */

authRoutes.post("/sign-in", signIn);

export default authRoutes;
