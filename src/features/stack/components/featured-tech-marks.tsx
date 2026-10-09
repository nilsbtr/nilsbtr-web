import { IconLink, IconLinkList } from "@/components/shared/icon-links";

import { FEATURED } from "../data";

/** Icon row of the headline tech, shown on the home page and the stack banner. */
export function FeaturedTechMarks({
  label,
  showTaglines = false,
  className,
}: {
  /** Accessible name of the list. */
  label: string;
  /** Add each tech's tagline as a second tooltip line. */
  showTaglines?: boolean;
  className?: string;
}) {
  return (
    <IconLinkList label={label} className={className}>
      {FEATURED.map((tech) => {
        const mark = tech.marks?.[0];
        if (!mark) return null;
        const Mark = mark.Component;
        return (
          <IconLink
            key={tech.id}
            label={tech.name}
            description={showTaglines ? tech.tagline : undefined}
            href={tech.href}
          >
            <Mark aria-hidden="true" className="size-5" title={tech.name} />
          </IconLink>
        );
      })}
    </IconLinkList>
  );
}
