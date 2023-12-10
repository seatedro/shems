import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DATABASE: z.string().url(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    NODE_ENV: z.string(),
  },
  runtimeEnv: process.env
});