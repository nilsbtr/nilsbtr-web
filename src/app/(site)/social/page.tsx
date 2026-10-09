import type { Metadata } from "next";

import { RevealGroup, RevealItem } from "@/components/motion";
import { eyebrowVariants } from "@/components/shared/eyebrow";
import { siteConfig } from "@/config/site";
import { SocialList } from "@/features/social/components/social-list";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-dvh items-center justify-center px-6 pt-20 pb-12">
      <RevealGroup stagger={0.09} className="w-full max-w-md">
        <RevealItem as="h1" variant="fade" className={cn(eyebrowVariants(), "mb-8")}>
          Socials
        </RevealItem>
        <SocialList />
      </RevealGroup>
    </div>
  );
}
