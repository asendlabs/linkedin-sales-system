"use server";

import {
  addCompetitor,
  deleteCompetitor,
  getCompetitors,
} from "@/data-access/competitor";
import { authActionClient } from "@/lib/procedures";
import {
  createCompetitorSchema,
  deleteCompetitorSchema,
} from "@/schemas/competitors.schema";
import axios from "axios";

interface LinkedInPost {
  postText?: string;
  postLink: string;
  is_repost: boolean;
  socialCount: any;
  postedAt: string;
  postedAgo: string;
  urn: string;
  competitorUrl?: string; // Added to track which competitor the post belongs to
}
export const createCompetitorAction = authActionClient
  .schema(createCompetitorSchema)
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

export const deleteCompetitorAction = authActionClient
  .schema(deleteCompetitorSchema)
  .metadata({
    actionName: "deleteCompetitor",
  })
  .action(async ({ parsedInput, ctx }) => {
    const res = await deleteCompetitor(parsedInput.id);
    return {
      success: true,
      message: "Competitor deleted successfully",
      data: res,
    };
  });

export const analyzeCompetitorsAction = authActionClient
  .metadata({
    actionName: "analyzeCompetitors",
  })
  .action(async ({ ctx }) => {
    try {
      const { userId } = ctx.session;
      const res = await getCompetitors(userId);
      if (!res) {
        throw new Error("Failed to get competitors");
      }

      interface LinkedInPostWithCompetitorId extends LinkedInPost {
        competitorId: string;
      }

      const allPosts: Partial<LinkedInPostWithCompetitorId>[] = [];

      for (const competitor of res) {
        const options = {
          method: "GET",
          url: "https://linkedin-data-scraper.p.rapidapi.com/profile_updates",
          params: {
            profile_url: competitor.url,
            page: "1",
          },
          headers: {
            "x-rapidapi-key":
              "bfbf5b93b0mshf5fca9062a8c18cp10a742jsnc825e0a53411",
            "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          const competitorPosts: Partial<LinkedInPostWithCompetitorId>[] =
            response.data.posts;

          // Add competitor URL to each post for reference
          const postsWithCompetitor = competitorPosts.map((post) => ({
            ...post,
            competitorId: competitor.id,
          }));

          allPosts.push(...postsWithCompetitor);
        } catch (error) {
          console.error(
            `Failed to fetch posts for competitor ${competitor.url}:`,
            error,
          );
          // Continue with other competitors even if one fails
          continue;
        }
      }

      // await db.insert(competitorPosts).values(...dbSchemaAllPosts);

      return {
        success: true,
        message: "Competitor analysis completed successfully",
        data: allPosts,
      };
    } catch (error) {
      return {
        success: false,
        message: "Internal server error",
        data: error,
      };
    }
  });
