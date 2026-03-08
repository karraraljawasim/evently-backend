import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAttendeesToEvent,
  updateEvent,
} from "../controllers/organizer.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const organizerRouters = Router();

organizerRouters.post("/", authorize, createEvent);

organizerRouters.get("/:eventId/attendees", authorize, getAttendeesToEvent);

organizerRouters.put("/:eventId", authorize, updateEvent);

organizerRouters.delete("/:eventId", authorize, deleteEvent);

// organizerRouters.all("*", (req, res, next) => {
//   const error = new AppError("Route not found", 404);
//   throw error;
// });

export default organizerRouters;
