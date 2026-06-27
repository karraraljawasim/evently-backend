import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAttendeesToEvent,
  updateEvent,
} from "../controllers/organizer.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const organizerRouters = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     createEvent:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - location
 *         - date_happens
 *         - max_capacity
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
 *         max_capacity:
 *           type: number
 *     attendees:
 *       type: object
 *       required:
 *         - user_id
 *         - full_name
 *         - email
 *       properties:
 *         user_id:
 *           type: string
 *         full_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 */

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     tags:
 *       - organizer
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Create new event for authorized organizer user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createEvent'
 *     responses:
 *       201:
 *         description: Create event successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 */
organizerRouters.post("/", authorize, createEvent);

/**
 * @swagger
 * /api/v1/{eventId}/attendees:
 *   get:
 *     tags:
 *       - organizer
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Get attendees in specific event for authorized organizer user
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The unique ID (uuidv7) of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of attendees
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/attendees'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 */

organizerRouters.get("/:eventId/attendees", authorize, getAttendeesToEvent);

/**
 * @swagger
 * /api/v1/events/{eventId}:
 *   delete:
 *     tags:
 *       - organizer
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Delete event for authorized organizer user
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The unique ID (uuidv7) of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete event successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 */

organizerRouters.delete("/:eventId", authorize, deleteEvent);

/**
 * @swagger
 * /api/v1/{events}:
 *   put:
 *     tags:
 *       - organizer
 *     security:
 *       - ApiKeyAuth: []
 *       - Bearer: []
 *     summary: Update event for authorized organizer user
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: The unique ID (uuidv7) of the event
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createEvent'
 *     responses:
 *       200:
 *         description: Update event successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Event not found
 *
 */

organizerRouters.put("/:eventId", authorize, updateEvent);

export default organizerRouters;
