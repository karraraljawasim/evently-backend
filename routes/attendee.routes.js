import { Router } from "express";
import {
  getAllUpcomingEvents,
  getEventDetils,
} from "../controllers/attendee.controller.js";

const attendeeRouters = Router();

attendeeRouters.get("/", getAllUpcomingEvents);

attendeeRouters.get("/:eventId", getEventDetils);

attendeeRouters.post("/:eventId/register", (req, res) => {
  res.json({ title: "Cleck and register to specific event " });
});

attendeeRouters.get("/current-register", (req, res) => {
  res.json({
    title:
      "GET a list of all the events they are currently registered to attend",
  });
});

export default attendeeRouters;
