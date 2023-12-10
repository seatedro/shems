import postgres from "postgres";
import { env } from "./env";

export const sql = postgres({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DATABASE,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
});
