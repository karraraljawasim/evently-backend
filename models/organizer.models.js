import pool from "../database/db.js";

export const createEventModele = async (
  title,
  description,
  location,
  dateHappens,
  organizerId,
  maxCapacity,
) => {
  const result = await pool.query(
    `
        INSERT INTO events (title, description, location , date_happens, organizer_id, max_capacity )
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `,
    [title, description, location, dateHappens, organizerId, maxCapacity],
  );
  return result.rows;
};

export const updateEventModel = async (
  dateHappens,
  location,
  description,
  maxCapacity,
) => {
  const result = await pool.query(
    `
    UPDATE events
    SET date_happens = $1,
        location = $2,
        description = $3,
        max_capacity = $4 RETURNING *;
   `,
    [dateHappens, location, description, maxCapacity],
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
