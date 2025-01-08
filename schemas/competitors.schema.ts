import { z } from "zod";

export const createCompetitorSchema = z.object({
  url: z.string(),
});

export const deleteCompetitorSchema = z.object({
  id: z.string(),
});