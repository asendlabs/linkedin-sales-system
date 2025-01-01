import React, { Suspense } from "react";
import { PageTitle } from "@/components/page-title";
import { Metadata } from "next";
import { RandomToast } from "./_components/random-toast";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Home",
  },
};

export default function HomeRoute() {
  return (
    <main>
      <PageTitle selfLabel="Home" />
      <section></section>
    </main>
  );
}
