import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Determine which .env file to use
const envPath =
  process.env.DOCKER_ENV === "true"
    ? path.resolve(__dirname, "../../.env") // Use root .env in Docker
    : path.resolve(__dirname, "../.env"); // Use workers/.env for local dev

dotenv.config({ path: envPath });

const pool = new Pool({
  user: process.env.PGUSER || "admin",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "secretscoops",
  password: process.env.PGPASSWORD || "password",
  port: Number(process.env.PGPORT) || 5432,
});

export default pool;