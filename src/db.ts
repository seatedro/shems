import postgres from "postgres";

export const sql = postgres({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});
