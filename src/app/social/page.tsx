import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowUpRight01Icon,
  BlueskyIcon,
  GithubIcon,
  InstagramIcon,
  MusicNote01Icon,
  NewTwitterIcon,
  SpotifyIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const metadata: Metadata = {
  title: "Social",
  description: "Find Nils Böttcher on Instagram, Github, Spotify, stats.fm, Twitter, and Bluesky.",
  openGraph: {
    title: "Social · Nils Böttcher",
    description:
      "Find Nils Böttcher on Instagram, Github, Spotify, stats.fm, Twitter, and Bluesky.",
  },
};

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/nilsbttr",
    handle: "@nilsbttr",
    icon: InstagramIcon,
  },
  {
    name: "Github",
    href: "https://github.com/nilsbtr",
    handle: "nilsbtr",
    icon: GithubIcon,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91",
    handle: "nilsbtr",
    icon: SpotifyIcon,
  },
  {
    name: "stats.fm",
    href: "https://stats.fm/nilsbtr",
    handle: "nilsbtr",
    icon: MusicNote01Icon,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/digitalstave",
    handle: "@digitalstave",
    icon: NewTwitterIcon,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/nilsbtr.bsky.social",
    handle: "@nilsbtr.bsky.social",
    icon: BlueskyIcon,
  },
];

export default function SocialPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-6 pt-20 pb-12">
      <div className="w-full max-w-md">
        <h1 className="mb-8 animate-in text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase duration-700 fade-in-0">
          Socials
        </h1>
        <div className="divide-y divide-border/50">
          {socials.map((social, i) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                animationDelay: `${100 + i * 75}ms`,
                animationFillMode: "backwards",
              }}
              className="group flex animate-in items-center gap-4 py-4 transition-colors duration-500 fade-in-0 slide-in-from-bottom-2"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{social.name}</p>
                <p className="text-xs text-muted-foreground">{social.handle}</p>
              </div>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                strokeWidth={2}
                className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
