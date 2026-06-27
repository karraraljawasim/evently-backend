import pool from "../database/db.js";

export const getUpcomingEventsModel = async () => {
  const result = await pool.query(`
        SELECT event_id,
               title,
               date_happens
        FROM events
        WHERE date_happens > CURRENT_TIMESTAMP;`);
  return result.rows;
};

export const registerToEventModel = async (
  registrationId,
  attendeeId,
  eventId,
) => {
  const result = await pool.query(
    `
    INSERT INTO registrations (registration_id, attendee_id, event_id)
    VALUES ($1, $2, $3 );
    `,
    [registrationId, attendeeId, eventId],
  );

  return result.rows;
};

export const getAllCurrentRegisterEventsModel = async (attendeeId) => {
  const result = await pool.query(
    `
    SELECT events.event_id,
           events.title,
           events.location,
           events.date_happens,
           events.organizer_id,
           registrations.register_at
    FROM events 
    INNER JOIN registrations 
      ON events.event_id = registrations.event_id
    WHERE registrations.attendee_id = $1;
    `,
    [attendeeId],
  );
  return result.rows;
};

export const getEventByIdModel = async (eventId) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM events
    WHERE event_id = $1;
    `,
    [eventId],
  );
  return result.rows;
};

export const updateEventRemainingSeatsModel = async (eventId) => {
  const result = await pool.query(
    `
        UPDATE events 
        SET remaining_seats = remaining_seats - 1
        WHERE event_id = $1;
        `,
    [eventId],
  );
  return result.rows;
};

export const getEventRegistrationToAttendeeModel = async (
  attendeeId,
  eventId,
) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM registrations 
    WHERE attendee_id = $1 AND event_id = $2;`,
    [attendeeId, eventId],
  );
  return result.rows;
};
