import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllEventsAdttend,
  getAllUpcomingEvents,
  getEventDetils,
  registerToEvent,
} from "../controllers/attendee.controller.js";
import AppError from "../utils/AppError.js";

const attendeeRouters = Router();

attendeeRouters.get("/upcoming-events", getAllUpcomingEvents);

attendeeRouters.get("/current-register", authorize, getAllEventsAdttend);

attendeeRouters.get("/:eventId/info", getEventDetils);

attendeeRouters.post("/:eventId/register", authorize, registerToEvent);

// attendeeRouters.all("*", (req, res, next) => {
//   const error = new AppError("Route not found", 404);
//   throw error;
// });

export default attendeeRouters;
