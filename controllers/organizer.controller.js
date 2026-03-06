import pool from "../database/db.js";
import {
  createEventModele,
  deleteEventModel,
  updateEventModel,
} from "../models/organizer.models.js";
import AppError from "../utils/AppError.js";

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, location, dateHappens, maxCapacity } = req.body;
    const organizerId = req.user[0].user_id;

    if (!(title && description && location && dateHappens, maxCapacity)) {
      const error = new AppError("Bad Requiste", 400);
      throw error;
    }

    if (req.user[0].role !== "Organizer") {
      const error = new AppError("Just Organizer Can Create Event", 401);
      throw error;
    }

    const newEvent = await createEventModele(
      title,
      description,
      location,
      dateHappens,
      organizerId,
      maxCapacity,
    );

    res.status(201).json({
      success: true,
      message: "Create event successfully",
      newEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    // if (req.user.role !== "Organizer") {
    //   const error = new AppError("Update Events Allows Just To Organizer", 401);
    //   throw error;
    // }
    const { dateHappens, description, location, maxCapacity } = req.body;
    const eventId = req.params.eventId;

    const event = await (async (eventId) => {
      const result = await pool.query(
        `
          SELECT organizer_id
          FROM events
          WHERE event_id = $1;

        `,
        [eventId],
      );
      return result.rows;
    })(eventId);

    if (event.length === 0) {
      const error = new AppError("Event Not found");
      throw error;
    }

    if (event[0].organizer_id !== req.user[0].user_id) {
      const error = new AppError(
        "you are not the organizer to this event",
        401,
      );
      throw error;
    }

    const updatedEvent = await updateEventModel(
      dateHappens,
      description,
      location,
      maxCapacity,
    );

    res.status(200).json({
      success: true,
      updatedEvent: updatedEvent[0],
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await (async (eventId) => {
      const result = await pool.query(
        `
        SELECT event_id,
               organizer_id
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
    console.log(event);
    if (event[0].organizer_id !== req.user[0].user_id) {
      const error = new AppError("You are not the owner of the event", 401);
      throw error;
    }

    const deletedEvent = await deleteEventModel(eventId);

    res.status(200).json({
      success: true,
      deletedEvent: deletedEvent[0],
    });
  } catch (error) {
    next(error);
  }
};
