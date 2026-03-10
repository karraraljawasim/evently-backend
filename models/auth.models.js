import pool from "../database/db.js";

export const createUserModel = async (
  userId,
  firstName,
  lastName,
  email,
  role,
  password,
) => {
  const result = await pool.query(
    `
        INSERT INTO users(user_id, first_name, last_name, email, role, password)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [userId, firstName, lastName, email, role, password],
  );
  return result.rows;
};

export const findUserByEmailModel = async (email) => {
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

export const findUserByIdModel = async (userId) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM users
    WHERE user_id =$1;
    `,
    [userId],
  );
  return result.rows;
};
