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
