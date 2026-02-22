import {
  Activity,
  CloudLightning,
  Github,
  Instagram,
  Music,
  Twitter,
  type LucideIcon,
} from "lucide-react";

export const socialLinkIds = [
  "instagram",
  "github",
  "spotify",
  "statsfm",
  "twitter",
  "bluesky",
] as const;

export type SocialLinkId = (typeof socialLinkIds)[number];

export type SocialLink = Readonly<{
  id: SocialLinkId;
  name: string;
  url: string;
  icon: LucideIcon;
  handle: string;
}>;

export const socialLinks: ReadonlyArray<SocialLink> = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/nilsbttr",
    icon: Instagram,
    handle: "@nilsbttr",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/nilsbtr",
    icon: Github,
    handle: "nilsbtr",
  },
  {
    id: "spotify",
    name: "Spotify",
    url: "https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91",
    icon: Music,
    handle: "nilsbtr",
  },
  {
    id: "statsfm",
    name: "stats.fm",
    url: "https://stats.fm/nilsbtr",
    icon: Activity,
    handle: "nilsbtr",
  },
  {
    id: "twitter",
    name: "Twitter / X",
    url: "https://twitter.com/digitalstave",
    icon: Twitter,
    handle: "@digitalstave",
  },
  {
    id: "bluesky",
    name: "Bluesky",
    url: "https://bsky.app/profile/nilsbtr.bsky.social",
    icon: CloudLightning,
    handle: "@nilsbtr.bsky.social",
  },
];
