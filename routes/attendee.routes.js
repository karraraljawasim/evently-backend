import { Router } from "express";

const attendeeRouters = Router();

attendeeRouters.get("/", (req, res) => {
  res.json({ title: "GET all upcoming events" });
});

attendeeRouters.get("/:eventId", (req, res) => {
  res.json({ title: "GET specific event details" });
});

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
