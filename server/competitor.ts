"use server";

import { addCompetitor } from "@/data-access/competitor";
import { authActionClient } from "@/lib/procedures";
import { competitorsSchema } from "@/schemas/competitors.schema";
import axios from "axios";

export const createCompetitorAction = authActionClient
  .schema(competitorsSchema)
  .metadata({
    actionName: "createCompetitor",
  })
  .action(async ({ parsedInput, ctx }) => {
    const { userId } = ctx.session;
    const res = await addCompetitor(parsedInput.url, userId);
    if (!res) {
      throw new Error("Failed to create competitor");
    }
    return {
      success: true,
      message: "Competitor created successfully",
      data: res,
    };
  });
