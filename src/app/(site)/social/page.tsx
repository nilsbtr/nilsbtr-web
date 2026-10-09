import type { Metadata } from "next";

import { PageHeader, PageHeaderDescription } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { RevealGroup } from "@/components/motion";
import { siteConfig } from "@/config/site";
import { SocialList } from "@/features/social/components/social-list";

const DESCRIPTION =
  "Find Nils Böttcher on Instagram, Github, Spotify, stats.fm, Twitter, and Bluesky.";

export const metadata: Metadata = {
  title: "Social",
  description: DESCRIPTION,
  openGraph: {
    title: `Social · ${siteConfig.name}`,
    description: DESCRIPTION,
  },
};

export default function SocialPage() {
  return (
    <PageShell size="md" align="center">
      <RevealGroup stagger={0.09}>
        <PageHeader eyebrow="Social" title="Where to find me" className="mb-8">
          <PageHeaderDescription>
            Everywhere else I&apos;m online. Say hi on whichever you prefer.
          </PageHeaderDescription>
        </PageHeader>
        <SocialList />
      </RevealGroup>
    </PageShell>
  );
}
