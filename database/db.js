import { Pool } from "pg";
import { config } from "dotenv";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../config/env.js";

config();
const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    console.log(`Error acquiring client `, err.stack);
  }
  console.log(`Connected to postgreSQL database successfully`);
  release();
});

export default pool;
