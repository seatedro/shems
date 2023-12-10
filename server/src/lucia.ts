import { type Env, lucia } from "lucia";
import { hono } from "lucia/middleware";
import { sql } from "./db";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import { github } from "@lucia-auth/oauth/providers";
import { env } from "./env";

export const auth = lucia({
  env: process.env.NODE_ENV == "dev" ? "DEV" : "PROD",
  middleware: hono(),
  adapter: postgresAdapter(sql, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
      githubUsername: data.username,
    };
  },
  experimental: {
    debugMode: true,
  },
});

export const githubAuth = github(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
});

export type Auth = typeof auth;
