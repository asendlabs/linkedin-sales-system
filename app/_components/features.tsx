import { Badge } from "@/components/ui/badge";
import React from "react";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Competitor Analysis",
    description:
      "Advanced competitor tracking with engagement metrics, content performance analysis, and audience growth patterns. Includes industry benchmark reporting and gap analysis tools.",
  },
  {
    title: "Content Generation",
    description:
      "AI-powered content creation system with industry-specific templates, viral post structures, and engagement optimization. Features scheduling tools and performance analytics.",
  },
  {
    title: "Growth Strategy",
    description:
      "Personalized growth roadmap with actionable milestones, network expansion tactics, and engagement strategies. Includes target audience analysis and connection optimization.",
  },
  {
    title: "Engagement Tracking",
    description:
      "Real-time monitoring of post performance, follower growth, and interaction metrics. Features detailed analytics dashboard and trend analysis tools.",
  },
  {
    title: "Network Optimization",
    description:
      "Smart connection management with industry targeting, relationship scoring, and outreach automation. Includes lead generation and conversion tracking.",
  },
  {
    title: "Performance Reports",
    description:
      "Comprehensive reporting suite with custom KPIs, growth metrics, and ROI analysis. Features exportable reports and automated insights generation.",
  },
];

const FeatureCard = ({ title, description }: Feature) => {
  return (
    <div className="flex flex-col items-start px-2 py-4">
      <Badge
        variant="outline"
        className="flex w-full items-center justify-center rounded-full px-3 py-1 text-base font-medium text-primary"
      >
        {title}
      </Badge>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export function Features() {
  return (
    <div className="flex w-screen items-center justify-center px-4 pb-20 pt-14 sm:px-36 md:px-48 lg:px-64">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default Features;
