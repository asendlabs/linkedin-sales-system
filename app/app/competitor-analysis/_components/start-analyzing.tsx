"use client";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { analyzeCompetitorsAction } from "@/server/competitor-analysis";
import { ArrowRight } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { toast } from "sonner";

export function StartAnalyzinButton() {
  const { execute, result, isPending } = useAction(analyzeCompetitorsAction);
  return (
    <RainbowButton
      className="m-0 h-6 max-w-fit px-3 text-sm !text-background"
      onClick={() => {
        execute()}}
      disabled={isPending}
    >
      Start Analyzing <ArrowRight className="ml-1 size-3" />
    </RainbowButton>
  );
}
