import { RevealGroup } from "@/components/motion";
import { Hero } from "@/features/home/components/hero";
import { Intro } from "@/features/home/components/intro";
import { LabeledRow } from "@/features/home/components/labeled-row";
import { SocialIconLinks } from "@/features/social/components/social-icon-links";
import { FeaturedTechMarks } from "@/features/stack/components/featured-tech-marks";

export default function HomePage() {
  return (
    <RevealGroup className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 pt-24 pb-20">
      <Hero />
      <Intro />

      <LabeledRow label="Stack" className="mt-12">
        <FeaturedTechMarks
          label="What I build with"
          className="max-w-80 gap-y-4 sm:max-w-none sm:gap-y-3"
        />
      </LabeledRow>

      <LabeledRow label="Socials" className="mt-8">
        <SocialIconLinks label="Where to find me" />
      </LabeledRow>
    </RevealGroup>
  );
}
