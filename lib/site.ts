import { socialLinks } from "@/content/socialLinks";

const DEFAULT_SITE_URL = "https://nilsbtr.com";

function normalizeSiteUrl(siteUrl: string): string {
  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

const siteUrl = normalizeSiteUrl(process.env["NEXT_PUBLIC_SITE_URL"] ?? DEFAULT_SITE_URL);

export const siteConfig = {
  name: "Nils Btr.",
  title: "Nils Btr. | Connect",
  description:
    "Official social links for Nils Btr. Find Instagram, GitHub, Spotify, stats.fm, Twitter/X, and Bluesky in one place.",
  url: siteUrl,
  locale: "en_US",
  twitterHandle: "@nilsbtr",
  socialProfiles: socialLinks.map((link) => link.url),
  keywords: [
    "Nils Btr",
    "nilsbtr",
    "social links",
    "link in bio",
    "GitHub",
    "Instagram",
    "Spotify",
    "Bluesky",
    "Twitter",
    "stats.fm",
  ],
} as const;
