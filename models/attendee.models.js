import pool from "../database/db.js";

export const getUpcomingEvents = async () => {
  const result = await pool.query(`
        SELECT event_Id,
               title,
               date_happens
        FROM events
        WHERE date_happens > CURRENT_TIMESTAMP`);
  return result.rows;
};

export const getEventDetil = async (eventId) => {
  const result = await pool.query(
    `
        SELECT *
        FROM events
        WHERE event_id = $1;`,
    [eventId],
  );
  return result.rows;
};

export const registerToEventModel = async (attendeeId, eventId) => {
  const result = await pool.query(
    `
    INSERT INTO registrations (attendee_id, event_id)
    VALUES ($1, $2) RETURNING *;
    `,
    [attendeeId, eventId],
  );

  return result.rows;
};

export const getAllEventsAdttendModel = async (attendeeId) => {
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
