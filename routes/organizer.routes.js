import { Router } from "express";

const organizerRouters = Router();

organizerRouters.post("/", (req, res) => {
  res.json({ title: "Create new event" });
});

organizerRouters.get("/:eventId/attendees", (req, res) => {
  res.json({ title: "GET all attendees to thier event " });
});

organizerRouters.put("/:eventId", (req, res) => {
  res.json({ title: "UPDATE event" });
});

organizerRouters.delete("/:eventId", (req, res) => {
  res.json({ title: "DELETE event" });
});

export default organizerRouters;
