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
        INSERT INTO users(first_name, last_name, email, role, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [firstName, lastName, email, role, password],
  );
  return result.rows;
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
  return result.rows;
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

export const findUserById = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM users
     WHERE user_id = $1;
    `,
    [userId],
  );
  return result.rows;
};
