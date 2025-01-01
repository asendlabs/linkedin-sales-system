  import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Circle, GithubIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative grid w-screen items-start justify-center gap-2 overflow-hidden px-10 py-4 pt-20 text-sm sm:px-20 md:px-32 md:text-base lg:px-40">
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <Link href="https://github.com/asendlabs/startstack">
          <Badge
            variant={"outline"}
            className="group flex w-fit gap-1 rounded-full px-3 py-1.5 text-primary"
          >
            <Calendar className="mr-1 size-3" />
            <p className="cursor-pointer group-hover:underline">
              Schedule a free demo to get beta access.
            </p>
          </Badge>
        </Link>
        <h1 className="max-w-[41.5rem] break-words text-center text-4xl font-bold text-black dark:text-white md:text-5xl">
          Starting growing your LinkedIn account with AI.
        </h1>
      </div>
    </section>
  );
}
