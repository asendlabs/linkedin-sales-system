import { z } from "zod";

export const competitorsSchema = z.object({
  url: z.string(),
});
