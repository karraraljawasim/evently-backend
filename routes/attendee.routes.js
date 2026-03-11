import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  getAllEventsAdttend,
  getAllUpcomingEvents,
  getEventDetils,
  registerToEvent,
  searchByTitle,
} from "../controllers/attendee.controller.js";

const attendeeRouters = Router();

attendeeRouters.get("/upcoming-events", getAllUpcomingEvents);

attendeeRouters.get("/current-register", authorize, getAllEventsAdttend);

attendeeRouters.get("/:eventId/info", getEventDetils);

attendeeRouters.get("/title-search/:title", searchByTitle);

attendeeRouters.post("/:eventId/register", authorize, registerToEvent);

export default attendeeRouters;
