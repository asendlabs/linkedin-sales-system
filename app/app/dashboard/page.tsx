import React, { Suspense } from "react";
import { PageTitle } from "@/components/page-title";
import { Metadata } from "next";
import { RandomToast } from "./_components/random-toast";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
};

export default function DashboardRoute() {
  return (
    <main>
      <PageTitle selfLabel="Dashboard" />
      <section></section>
    </main>
  );
}
