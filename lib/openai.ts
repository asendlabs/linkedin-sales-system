import env from "@/env";
import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  organization: env.OPENAI_ORG_ID,
  project: env.OPENAI_PROJECT_ID,
});
