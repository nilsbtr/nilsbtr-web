import type { Metadata } from "next";
import Link from "next/link";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { RevealGroup, RevealItem } from "@/components/motion";
import { SOCIALS } from "@/config/socials";

export const metadata: Metadata = {
  title: "Social",
  description: "Find Nils Böttcher on Instagram, Github, Spotify, stats.fm, Twitter, and Bluesky.",
  openGraph: {
    title: "Social · Nils Böttcher",
    description:
      "Find Nils Böttcher on Instagram, Github, Spotify, stats.fm, Twitter, and Bluesky.",
  },
};

export default function SocialPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6 pt-20 pb-12">
      <RevealGroup stagger={0.09} className="w-full max-w-md">
        <RevealItem
          as="h1"
          variant="fade"
          className="mb-8 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase"
        >
          Socials
        </RevealItem>
        <div className="divide-y divide-border/50">
          {SOCIALS.map((social) => (
            <RevealItem key={social.name}>
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 transition-transform duration-300 ease-out hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 group-hover:text-primary motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                  <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{social.name}</p>
                  <p className="text-xs text-muted-foreground">{social.handle}</p>
                </div>
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                />
              </Link>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </div>
  );
}
