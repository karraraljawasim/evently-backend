import { config } from "dotenv";
config();

export const {
  PORT,
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
