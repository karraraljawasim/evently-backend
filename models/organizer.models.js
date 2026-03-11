import pool from "../database/db.js";

export const createEventModele = async (
  eventId,
  title,
  description,
  location,
  dateHappens,
  organizerId,
  maxCapacity,
) => {
  const result = await pool.query(
    `
        INSERT INTO events (event_id, title, description, location , date_happens, organizer_id, max_capacity )
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `,
    [
      eventId,
      title,
      description,
      location,
      dateHappens,
      organizerId,
      maxCapacity,
    ],
  );
  return result.rows;
};

export const updateEventModel = async (
  title,
  dateHappens,
  location,
  description,
  maxCapacity,
  eventId,
) => {
  const result = await pool.query(
    `
    UPDATE events
    SET title = $1,
        date_happens = $2,
        location = $3,
        description = $4,
        max_capacity = $5 
    WHERE event_id = $6 
    RETURNING *;
   `,
    [title, dateHappens, location, description, maxCapacity, eventId],
  );
  return result.rows;
};

export const deleteEventModel = async (eventId) => {
  const result = await pool.query(
    `
    DELETE FROM events 
    WHERE event_id = $1 RETURNING *;
    `,
    [eventId],
  );
  return result.rows;
};

export const getAttendeesToEventMoudel = async (eventId) => {
  const result = await pool.query(
    `
    SELECT users.user_id,
           CONCAT(users.first_name, users.last_name) AS full_name,
           users.email
    FROM users 
    INNER JOIN registrations
      ON users.user_id = registrations.attendee_id
    WHERE registrations.event_id = $1;

           
    `,
    [eventId],
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
