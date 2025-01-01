import Link from "next/link";
import { HeaderButton } from "./header-button";
import { GithubIcon, LogInIcon } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <section className="flex w-screen items-center justify-between border-b border-border px-10 py-3.5 sm:px-20 md:px-32 lg:px-40">
      <Link className="flex items-center gap-2 font-medium" href={"/"}>
        LinkedIn Growth System
      </Link>
      <div className="flex items-center gap-2">
        <HeaderButton
          href="/login"
          label="Login"
          icon={<LogInIcon className="size-4" />}
        />
        <ModeToggle caller="page" />
      </div>
    </section>
  );
}
