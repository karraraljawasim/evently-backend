import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/organizer.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const organizerRouters = Router();

organizerRouters.post("/", authorize, createEvent);

organizerRouters.get("/:eventId/attendees", (req, res) => {
  res.json({ title: "GET all attendees to thier event " });
});

organizerRouters.put("/:eventId", authorize, updateEvent);

organizerRouters.delete("/:eventId", authorize, deleteEvent);

export default organizerRouters;
