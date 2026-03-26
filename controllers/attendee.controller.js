import { v7 as uuidv7 } from "uuid";
import {
  registerToEventModel,
  getAllEventsAdttendModel,
  getEventByIdModel,
  updateEventRemainingSeatsModel,
  getUpcomingEventsModel,
  getEventRegistrationToAttendeeModel,
} from "../models/attendee.models.js";
import AppError from "../utils/AppError.js";

export const getAllUpcomingEvents = async (req, res, next) => {
  try {
    const upcomingEvent = await getUpcomingEventsModel();

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

    const event = await getEventByIdModel(eventId);

    if (event.length === 0) {
      const error = new AppError("Event not found", 404);
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

    const event = await getEventByIdModel(eventId);

    if (event.length === 0) {
      const error = new AppError("Event not found", 404);
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

    const registrationExist = await getEventRegistrationToAttendeeModel(
      attendeeId,
      eventId,
    );
    if (registrationExist.length !== 0) {
      const error = new AppError("You alrady registare to this event", 405);
      throw error;
    }

    const registrationId = uuidv7();

    await registerToEventModel(registrationId, attendeeId, eventId);

    if (event[0].remaining_seats > 0)
      await updateEventRemainingSeatsModel(eventId);

    res.status(201).json({
      success: true,
      message: `Register to event successfully `,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEventsAdttend = async (req, res, next) => {
  try {
    const attendeeId = req.user[0].user_id;

    const listOfAttendEvents = await getAllEventsAdttendModel(attendeeId);

    if (listOfAttendEvents.length === 0) {
      const error = new AppError("There are no events You can atttend", 404);
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
