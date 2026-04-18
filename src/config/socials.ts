import {
  BlueskyIcon,
  GithubIcon,
  InstagramIcon,
  MusicNote01Icon,
  NewTwitterIcon,
  SpotifyIcon,
} from "@hugeicons/core-free-icons";

import type { Social } from "@/types/social";

export const SOCIALS: readonly Social[] = [
  {
    name: "Instagram",
    handle: "@nilsbttr",
    href: "https://instagram.com/nilsbttr",
    icon: InstagramIcon,
  },
  {
    name: "Github",
    handle: "nilsbtr",
    href: "https://github.com/nilsbtr",
    icon: GithubIcon,
  },
  {
    name: "Spotify",
    handle: "nilsbtr",
    href: "https://open.spotify.com/user/0hxq229m6k3sbxi4q4mjk3n91",
    icon: SpotifyIcon,
  },
  {
    name: "stats.fm",
    handle: "nilsbtr",
    href: "https://stats.fm/nilsbtr",
    icon: MusicNote01Icon,
  },
  {
    name: "Twitter",
    handle: "@digitalstave",
    href: "https://twitter.com/digitalstave",
    icon: NewTwitterIcon,
  },
  {
    name: "Bluesky",
    handle: "@nilsbtr.bsky.social",
    href: "https://bsky.app/profile/nilsbtr.bsky.social",
    icon: BlueskyIcon,
  },
] as const;
