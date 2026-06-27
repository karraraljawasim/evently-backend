import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllCurrentRegisterEvents,
  getAllUpcomingEvents,
  getEventDetails,
  registerToEvent,
} from "../controllers/attendee.controller.js";

const attendeeRouters = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *     Bearer:
 *       type: http
 *       scheme: Bearer
 *       bearerFormat: JWT
 *   schemas:
 *     upcomingEvents:
 *       type: object
 *       required:
 *         - event_id
 *         - title
 *         - date_happens
 *       properties:
 *         even_id:
 *           type: string
 *         title:
 *           type: string
 *         dateHappens:
 *           type: string
 *     event:
 *       type: object
 *       required:
 *         - event_id
 *         - title
 *         - description
 *         - location
 *         - date_happens
 *         - max_capacity
 *         - organizer_id
 *       properties:
 *         event_id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         date_happens:
 *           type: string
 *           format: date
 *         max_capacity:
 *           type: number
 *         organizer_id:
 *           type: string
 *     currentRegisterEvents:
 *       type: object
 *       required:
 *         - event_id
 *         - title
 *         - organizer_id
 *         - location
 *         - date_happens
 *         - register_at
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         date_happens:
 *           type: string
 *           format: date
 *         register_at:
 *           type: string
 *           format: date
 *         organizer_id:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/events/upcoming:
 *   get:
 *     tags:
 *       - attendee
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Get upcoming events for authenticated attendee user
 *     responses:
 *       200:
 *         description: List of upcoming events
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/upcomingEvents'
 *       401:
 *         description: Not authenticated
 */

attendeeRouters.get("/upcoming", authorize, getAllUpcomingEvents);

/**
 * @swagger
 * /api/v1/events/current-register:
 *   get:
 *     tags:
 *       - attendee
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Get current register events for authenticated attendee user
 *     responses:
 *       200:
 *         description: List of current register events
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/currentRegisterEvents'
 *       401:
 *         description: Not authenticated
 */

attendeeRouters.get(
  "/current-register",
  authorize,
  getAllCurrentRegisterEvents,
);

/**
 * @swagger
 * /api/v1/events/{eventId}:
 *   get:
 *     tags:
 *       - attendee
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Get event details for authenticated attendee user
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The unique ID (uuidv7) of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get event details
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/event'
 *       401:
 *         description: Not authenticated
 */

attendeeRouters.get("/:eventId", authorize, getEventDetails);

/**
 * @swagger
 * /api/v1/events/{eventId}/register:
 *   post:
 *     tags:
 *       - attendee
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Register to event for authenticated attendee user
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID (uuidv7) of the event
 *     responses:
 *       201:
 *         description: Register to event successfully
 *       401:
 *         description: Not authenticated
 *       405:
 *         description: You already registered to event
 *       404:
 *         description: Event not found
 */

attendeeRouters.post("/:eventId/register", authorize, registerToEvent);

export default attendeeRouters;
