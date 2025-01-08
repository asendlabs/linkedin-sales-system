import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h2 className="text-4xl font-bold">
        Uh, oh. We couldn't find that page.
      </h2>
      <Link
        href="/app/dashboard"
        className="flex items-center gap-2 rounded-lg border border-input px-3 py-2 hover:bg-muted"
        prefetch={true}
      >
        <ArrowLeft className="size-5" />
        Return Dashboard
      </Link>
    </main>
  );
}
