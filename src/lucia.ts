import { type Env, lucia } from "lucia";
import { hono } from "lucia/middleware";
import { sql } from "./db";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";

const env: Env = process.env.NODE_ENV == "dev" ? "DEV" : "PROD";
export const auth = lucia({
  env,
  middleware: hono(),
  adapter: postgresAdapter(sql, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
  experimental: {
    debugMode: true
  }
});

export type Auth = typeof auth;
