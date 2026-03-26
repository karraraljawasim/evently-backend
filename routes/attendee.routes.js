import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllEventsAdttend,
  getAllUpcomingEvents,
  getEventDetils,
  registerToEvent,
} from "../controllers/attendee.controller.js";

const attendeeRouters = Router();

attendeeRouters.get("/upcoming", authorize, getAllUpcomingEvents);

attendeeRouters.get("/current-register", authorize, getAllEventsAdttend);

attendeeRouters.get("/:eventId", authorize, getEventDetils);

attendeeRouters.post("/:eventId/register", authorize, registerToEvent);

export default attendeeRouters;
