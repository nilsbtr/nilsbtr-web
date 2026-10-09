import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { RevealItem } from "@/components/motion";
import { ExternalLink } from "@/components/shared/external-link";

import { SOCIALS } from "../data";
import type { Social } from "../types";

function SocialListItem({ social }: { social: Social }) {
  return (
    <ExternalLink
      href={social.href}
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
    </ExternalLink>
  );
}

/** Every social profile as a detailed row. Must be rendered inside a RevealGroup. */
export function SocialList() {
  return (
    <div className="divide-y divide-border/50">
      {SOCIALS.map((social) => (
        <RevealItem key={social.name}>
          <SocialListItem social={social} />
        </RevealItem>
      ))}
    </div>
  );
}
