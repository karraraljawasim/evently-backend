import { getUpcomingEvents, getEventDetil } from "../models/attendee.models.js";
import AppError from "../utils/AppError.js";

export const getAllUpcomingEvents = async (req, res, next) => {
  try {
    const upcomingEvent = await getUpcomingEvents();

    if (upcomingEvent.length === 0) {
      const error = new AppError("Not Upcoming Event", 404);
      throw error;
    }

    res.status(200).json({
      success: true,
      upcomingEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventDetils = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;

    const event = await getEventDetil(eventId);

    if (event.length === 0) {
      const error = new AppError("Event Not Found", 404);
      throw error;
    }

    res.status(200).json({
      success: true,
      event: event[0],
    });
  } catch (error) {
    next(error);
  }
};
