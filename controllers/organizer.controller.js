import { v7 as uuidv7 } from "uuid";
import {
  createEventModele,
  deleteEventModel,
  getAttendeesToEventMoudel,
  getEventByIdModel,
  updateEventModel,
} from "../models/organizer.models.js";
import AppError from "../utils/AppError.js";

export const createEvent = async (req, res, next) => {
  try {
    const { title, description, location, dateHappens, maxCapacity } = req.body;

    if (maxCapacity <= 0) {
      const error = new AppError("MaxCapacity must be greater the zero", 400);
      throw error;
    }

    if (dateHappens < new Date()) {
      const error = new AppError("DateHappens must be in the future", 400);
      throw error;
    }

    const organizerId = req.user[0].user_id;
    console.log(organizerId);

    if (!(title && description && location && dateHappens && maxCapacity)) {
      const error = new AppError("Bad Request", 400);
      throw error;
    }

    if (req.user[0].role !== "Organizer") {
      const error = new AppError("Just organizer can create event", 401);
      throw error;
    }

    const eventId = uuidv7();
    const newEvent = await createEventModele(
      eventId,
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
    const { dateHappens, description, location, maxCapacity } = req.body;
    const eventId = req.params.eventId;

    const event = await getEventByIdModel(eventId);

    if (event.length === 0) {
      const error = new AppError("Event not found");
      throw error;
    }

    if (event[0].organizer_id !== req.user[0].user_id) {
      const error = new AppError(
        "You are not the organizer to this event",
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
    const event = await getEventByIdModel(eventId);

    if (event.length === 0) {
      const error = new AppError("Event not found", 404);
      throw error;
    }

    if (event[0].organizer_id !== req.user[0].user_id) {
      const error = new AppError("You are not the organizer of the event", 401);
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

export const getAttendeesToEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const parseId = parseInt(eventId, 10);

    if (isNaN(parseId)) {
      const error = AppError("Event id must be integer number", 400);
      throw error;
    }

    const event = await getEventByIdModel(eventId);

    if (event.length === 0) {
      const error = new AppError("Event not found", 404);
      throw error;
    }

    if (req.user[0].user_id !== event[0].organizer_id) {
      const error = new AppError(
        "You are not the organizer to this event",
        401,
      );
      throw error;
    }

    const attendeesList = await getAttendeesToEventMoudel(eventId);

    res.status(200).json({
      success: true,
      attendeesList: attendeesList,
    });
  } catch (error) {
    next(error);
  }
};
