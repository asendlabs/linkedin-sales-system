import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  // Server-side environment variables
  server: {
    // Database URLs
    DATABASE_URL_DEVELOPMENT: z.string(),
    DATABASE_URL_PRODUCTION: z.string(),

    // Authentication credentials
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    BETTER_AUTH_SECRET: z.string(),

    // API keys
    RESEND_API_KEY: z.string(),

    // OpenAI
    OPENAI_API_KEY: z.string(),
    OPENAI_ORG_ID: z.string(),
    OPENAI_PROJECT_ID: z.string(),
  },

  // Client-side public environment variables
  client: {
    // Application settings
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_CACHE_ENCRYPTION_KEY: z.string(),

    // Analytics
    NEXT_PUBLIC_POSTHOG_API_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  },

  // Linking runtime environment variables
  runtimeEnv: {
    // Database URLs
    DATABASE_URL_DEVELOPMENT: process.env.DATABASE_URL_DEVELOPMENT,
    DATABASE_URL_PRODUCTION: process.env.DATABASE_URL_PRODUCTION,

    // Authentication credentials
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    // API keys
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    // Application settings
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CACHE_ENCRYPTION_KEY:
      process.env.NEXT_PUBLIC_CACHE_ENCRYPTION_KEY,

    // Analytics
    NEXT_PUBLIC_POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.POSTHOG_HOST,

    // OpenAI
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
    OPENAI_PROJECT_ID: process.env.OPENAI_PROJECT_ID,
  },
});

export default env;
