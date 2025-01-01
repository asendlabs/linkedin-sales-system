import { cn } from "@/lib/utils";
import { Linkedin } from "lucide-react";
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-lg bg-primary p-2.5", className)}>
      <Linkedin className="h-full w-full text-background" />
    </div>
  );
}
