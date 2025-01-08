"use client";
import { Button } from "@/components/ui/button";
import { Competitor } from "@/database/types";
import { deleteCompetitorAction } from "@/server/competitor-analysis";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { set } from "zod";

function parseLinkedInUrl(url: string): string {
  try {
    // Create a URL object to parse the input URL
    const parsedUrl = new URL(url);

    // Check if the URL is from LinkedIn
    if (!parsedUrl.hostname.includes("linkedin.com")) {
      throw new Error("Invalid LinkedIn URL");
    }

    // Extract the path and split it into segments
    const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);

    // Check if the path is in the expected format
    if (
      pathSegments.length < 2 ||
      (pathSegments[0] !== "in" && pathSegments[0] !== "company")
    ) {
      throw new Error("Invalid LinkedIn path format");
    }

    // Format the output as "linkedIn/{username or company}"
    return `linkedIn/${pathSegments[1]}`;
  } catch (error) {
    // Handle invalid URLs
    toast.error(
      error instanceof Error ? error.message : "Something went wrong",
    );
    return "Invalid URL";
  }
}

export const CompetitorCard = ({ url, id }: { url: string; id: string }) => {
  const [loading, setLoading] = React.useState(false);
  const { execute, isPending } = useAction(deleteCompetitorAction);
  const router = useRouter();
  return (
    <div className="group flex h-full flex-row items-center justify-between gap-2 rounded-md border border-input px-3 py-2.5 font-medium">
      <span
        onClick={() => {
          setLoading(true);
          try {
            router.push(url);
          } catch (error) {
          } finally {
            setLoading(false);
          }
        }}
        className="cursor-pointer underline-offset-4 group-hover:underline"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            Loading...
          </div>
        ) : (
          parseLinkedInUrl(url)
        )}
      </span>
      <Button
        className="m-0 size-6 max-w-fit px-2 hover:text-red-600"
        variant="outline"
        size={"icon"}
        onClick={async () => {
          execute({ id });
          router.refresh();
        }}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  );
};
