import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

/** Link in the corner of an overview panel, to the full list the panel is an excerpt of. */
export function PanelLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group/link inline-flex h-8 shrink-0 items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        strokeWidth={2}
        aria-hidden="true"
        className="size-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}
