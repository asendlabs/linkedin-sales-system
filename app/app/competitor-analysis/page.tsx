import { PageTitle } from "@/components/page-title";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ArrowRight } from "lucide-react";
import { AddProfileDialog } from "./_components/add-profile-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCompetitors } from "@/data-access/competitor";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import Markdown from "react-markdown";

import { CompetitorCard } from "./_components/competitor-card";
import { MarkdownViewer } from "./_components/markdown";
import { StartAnalyzinButton } from "./_components/start-analyzing";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const competitors = await getCompetitors(session?.user.id as string);
  return (
    <main className="h-[90%]">
      <PageTitle selfLabel="Competitor Analysis" />
      <section className="grid h-full grid-flow-row gap-3.5 px-4 pb-5 md:grid-cols-[25%_1fr]">
        <div className="h-full border-none shadow-none">
          <h1 className="flex flex-row items-center justify-between p-2 px-1 font-medium">
            <span>Database</span>
            <AddProfileDialog />
          </h1>
          <ScrollArea>
            {competitors &&
              competitors.length > 0 &&
              competitors.map((c) => (
                <CompetitorCard key={c.id} url={c.url} id={c.id} />
              ))}
          </ScrollArea>
        </div>
        <div className="h-full rounded-md border border-input">
          {" "}
          <h1 className="flex flex-row items-center justify-between p-3 pt-4 font-medium">
            <span>Competitor Analysis</span>
            <StartAnalyzinButton />
          </h1>
          <ScrollArea className="h-full max-h-[42rem]">
            <MarkdownViewer
              content={`### **Common Patterns:**

- **Effective Hooks**
    - **Technique**: Start with a bold statement or a surprising statistic.
    - **Proof**: Posts that open with a strong hook see 90%+ engagement rates. For example:
        - *"80% of B2B leads come from LinkedIn, but only 0.08% of creators generate them consistently."* (400 likes, 120 comments)
        - Compare: *"Here are some tips for better engagement on LinkedIn."* (70 likes, 10 comments)
- **Engagement Triggers**
    - **Technique**: Use emotional appeals and questions to spark conversations.
    - **Proof**: Posts that include direct questions or emotional stories receive 2.5x more comments. For instance:
        - *"What keeps you going when others quit?"* generated 115 comments.
        - Compare: A straightforward statement like *"Persistence is key."* received only 20 comments.
- **Call-to-Action (CTA)**
    - **Technique**: Clear and actionable CTAs boost engagement.
    - **Proof**: Posts with CTAs like *"Comment 'ANALYZE' for access!"* result in 40% more interaction.
        - Example: *"Comment 'IGNITE' for access to my tool!"* (300 likes, 400 comments)
        - Without a clear CTA, a post gets lower engagement, like *"Check out my profile."* (50 likes, 5 comments)

### Actionable Insights:

- **Do's**:
    - Use strong, attention-grabbing hooks at the start of your posts.
        - Example: Begin with a shocking statistic or bold claim.
        - Expected result: 50% higher engagement.
    - Ask open-ended questions to encourage comments.
        - Example: *"What’s your top goal for 2025?"*
        - Expected result: Increase comments by 2x.
    - Include clear CTAs to guide your audience on what to do next.
        - Example: *"Comment below for more tips!"*
        - Expected result: Boost interactions by 40%.
- **Don'ts**:
    - Avoid vague statements that don’t invite engagement.
        - Example: Skip phrases like *"Here’s something to think about."*
        - Better option: Pose a question instead.
    - Don’t forget to include CTAs; posts without them see a drop in engagement.
        - Example: Avoid endings like *"Let me know what you think."* without a clear directive.
    - Refrain from long paragraphs; keep content scannable with bullet points or short sentences.

### **The Science Behind It:**

- **Hooks** capture attention quickly, crucial in a crowded space like LinkedIn where users scroll rapidly.
- **Emotional appeals** and **questions** foster a sense of community and connection, making users more likely to engage.
- **CTAs** are vital as they provide a clear next step, lowering the effort needed for engagement and increasing response rates.
- Engagement metrics show that posts with effective hooks and CTAs can see up to a 300% increase in visibility due to LinkedIn’s algorithm favoring interaction-rich content.

By implementing these tactics and avoiding common pitfalls, you can significantly boost your LinkedIn engagement and effectiveness.`}
            />
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}
