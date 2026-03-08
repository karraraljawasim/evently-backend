import pool from "../database/db.js";
import {
  getUpcomingEvents,
  getEventDetil,
  registerToEventModel,
  getAllEventsAdttendModel,
} from "../models/attendee.models.js";
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
    const parserId = parseInt(eventId, 10);
    if (isNaN(parserId)) {
      const error = new AppError("Event Id  must be number", 400);
      throw error;
    }

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

export const registerToEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await (async (eventId) => {
      const result = await pool.query(
        `
          SELECT max_capacity,
                 remaining_seats
          FROM events
          WHERE event_id = $1;
        `,
        [eventId],
      );
      return result.rows;
    })(eventId);

    if (event.length === 0) {
      const error = new AppError("Event Not Found", 404);
      throw error;
    }

    if (req.user[0].role !== "Attendee") {
      const error = new AppError("Register Allow to Attendee Only", 401);
      throw error;
    }

    if (event[0].remaining_seats === 0) {
      const error = new AppError("No Seats to this event", 500);
      throw error;
    }

    const attendeeId = req.user[0].user_id;

    const registeredToEvent = await registerToEventModel(attendeeId, eventId);
    if (event[0].remaining_seats > 0) {
      await (async (eventId) => {
        const result = await pool.query(
          `
        UPDATE events 
        SET remaining_seats = remaining_seats - 1
        WHERE event_id = $1;
        `,
          [eventId],
        );
      })(eventId);
    }
    res.status(201).json({
      success: true,
      message: `Registerd to event successfully `,
      registerToEvent: registeredToEvent[0],
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEventsAdttend = async (req, res, next) => {
  try {
    if (req.user[0].role === "Organizer") {
      const error = new AppError("Allow just to attendees", 401);
      throw error;
    }

    const attendeeId = req.user[0].user_id;

    const listOfAttendEvents = await getAllEventsAdttendModel(attendeeId);

    if (listOfAttendEvents.length === 0) {
      const error = new AppError("Not Events Attend", 404);
      throw error;
    }

    res.status(200).json({
      success: true,
      listOfAttendEvents: listOfAttendEvents,
    });
  } catch (error) {
    next(error);
  }
};
