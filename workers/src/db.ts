// src/db.ts - Database Connection Setup
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const pool = new Pool({
  user: process.env.POSTGRES_USER || "admin",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "secretscoops",
  password: process.env.POSTGRES_PASSWORD || "password",
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

export default pool;