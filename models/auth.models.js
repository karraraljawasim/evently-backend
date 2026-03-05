import pool from "../database/db.js";

export const createUser = async (
  firstName,
  lastName,
  email,
  role,
  password,
) => {
  const result = await pool.query(
    `
        INSERT INTO users(firstName, lastName, email, role, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [firstName, lastName, email, role, password],
  );
  return result.rows[0];
};

export const getUser = async (email) => {
  const result = await pool.query(
    `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
    [email],
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
        SELECT email
        FROM users
        WHERE email = $1;
        `,
    [email],
  );
  return result.rows;
};
