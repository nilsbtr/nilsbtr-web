import { PageShell } from "@/components/layout/page-shell";
import { RevealGroup } from "@/components/motion";
import { HERO_LEAD, Hero } from "@/features/home/components/hero";
import { HeroGlow } from "@/features/home/components/hero-glow";
import { Intro } from "@/features/home/components/intro";
import { LabeledRow } from "@/features/home/components/labeled-row";
import { SocialIconLinks } from "@/features/social/components/social-icon-links";
import { FeaturedTechMarks } from "@/features/stack/components/featured-tech-marks";

export default function HomePage() {
  return (
    <PageShell size="md" align="center">
      <HeroGlow />
      <Hero />

      {/* Everything below follows the hero, in reading order. */}
      <RevealGroup delay={HERO_LEAD}>
        <Intro />

        <LabeledRow label="Stack" className="mt-12">
          <FeaturedTechMarks label="What I build with" className="max-w-84 sm:max-w-none" />
        </LabeledRow>

        <LabeledRow label="Socials" className="mt-8">
          <SocialIconLinks label="Where to find me" />
        </LabeledRow>
      </RevealGroup>
    </PageShell>
  );
}
