import { HugeiconsIcon } from "@hugeicons/react";

import { IconLink, IconLinkList } from "@/components/shared/icon-links";

import { SOCIALS } from "../data";

/** Compact icon row of every social profile. */
export function SocialIconLinks({ label, className }: { label: string; className?: string }) {
  return (
    <IconLinkList label={label} className={className}>
      {SOCIALS.map((social) => (
        <IconLink key={social.name} label={social.name} href={social.href}>
          <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-5" />
        </IconLink>
      ))}
    </IconLinkList>
  );
}
