import { HugeiconsIcon } from "@hugeicons/react";

import { RevealItem } from "@/components/motion";
import { ExternalLink } from "@/components/shared/external-link";
import { LinkArrow } from "@/components/shared/link-arrow";

import { SOCIALS } from "../data";
import type { Social } from "../types";

function SocialListItem({ social }: { social: Social }) {
  return (
    <ExternalLink
      href={social.href}
      className="group/link flex items-center gap-4 rounded-md py-4 transition-transform duration-300 ease-out hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
    >
      <div
        aria-hidden="true"
        className="flex size-10 items-center justify-center rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 group-hover/link:scale-105 group-hover/link:bg-brand/10 group-hover/link:text-brand motion-reduce:transition-none motion-reduce:group-hover/link:scale-100"
      >
        <HugeiconsIcon icon={social.icon} strokeWidth={1.5} className="size-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{social.name}</p>
        <p className="text-xs text-muted-foreground">{social.handle}</p>
      </div>
      <LinkArrow />
    </ExternalLink>
  );
}

/** Every social profile as a detailed row. Must be rendered inside a RevealGroup. */
export function SocialList() {
  return (
    <ul className="divide-y divide-border/60">
      {SOCIALS.map((social) => (
        <RevealItem as="li" key={social.name}>
          <SocialListItem social={social} />
        </RevealItem>
      ))}
    </ul>
  );
}
