import { ArrowUpRight } from "lucide-react";

import type { SocialLink, SocialLinkId } from "@/content/socialLinks";
import { cn } from "@/lib/cn";

const brandStyles: Record<SocialLinkId, string> = {
  instagram:
    "bg-provider-instagram-base text-provider-instagram-ink hover:bg-provider-instagram-hover hover:text-provider-instagram-ink-hover",
  github:
    "bg-provider-github-base text-provider-github-ink hover:bg-provider-github-hover hover:text-provider-github-ink-hover",
  spotify:
    "bg-provider-spotify-base text-provider-spotify-ink hover:bg-provider-spotify-hover hover:text-provider-spotify-ink-hover",
  statsfm:
    "bg-provider-statsfm-base text-provider-statsfm-ink hover:bg-provider-statsfm-hover hover:text-provider-statsfm-ink-hover",
  twitter:
    "bg-provider-twitter-base text-provider-twitter-ink hover:bg-provider-twitter-hover hover:text-provider-twitter-ink-hover",
  bluesky:
    "bg-provider-bluesky-base text-provider-bluesky-ink hover:bg-provider-bluesky-hover hover:text-provider-bluesky-ink-hover",
};

export type SocialLinkCardProps = Readonly<{
  link: SocialLink;
}>;

export function SocialLinkCard({ link }: SocialLinkCardProps) {
  const Icon = link.icon;
  const styleClass =
    brandStyles[link.id] ?? "bg-theme-surface text-theme-ink hover:bg-theme-canvas";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={`Open ${link.name} profile: ${link.handle}`}
      className={cn(
        "group relative flex items-center justify-between p-6 sm:p-8",
        "border-theme-stroke border-4",
        "transform shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all duration-100 ease-in-out hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[16px_16px_0_rgba(0,0,0,1)]",
        "focus-visible:ring-theme-ink focus-visible:ring-offset-theme-canvas focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:outline-none",
        styleClass,
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="bg-theme-surface text-theme-ink border-theme-stroke hidden border-4 p-3 transition-transform duration-100 ease-out group-hover:rotate-12 sm:block">
          <Icon size={32} strokeWidth={2.5} />
        </div>
        <div className="bg-theme-surface text-theme-ink border-theme-stroke border-4 p-2 transition-transform duration-100 ease-out group-hover:rotate-12 sm:hidden">
          <Icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="mb-1 text-2xl leading-none font-black tracking-tight uppercase sm:text-3xl">
            {link.name}
          </span>
          <span className="font-mono text-sm font-bold opacity-80 sm:text-base">{link.handle}</span>
        </div>
      </div>
      <div className="border-theme-stroke bg-theme-ink text-theme-canvas group-hover:bg-theme-surface group-hover:text-theme-ink hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 transition-colors duration-100 sm:flex">
        <ArrowUpRight size={24} strokeWidth={3} />
      </div>
    </a>
  );
}
