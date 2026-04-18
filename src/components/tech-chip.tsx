import type { CSSProperties } from "react";

import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import type { Tech, TechMark } from "@/types/tech";

type TechChipVariant = "compact" | "full";
type BadgeSize = "sm" | "md";

type TechChipProps = {
  tech: Tech;
  variant?: TechChipVariant;
  style?: CSSProperties;
  className?: string;
};

function MonogramBadge({ initials, size }: { initials: string; size: BadgeSize }) {
  const sizeClass =
    size === "sm" ? "size-5 text-[0.55rem]" : "size-6 text-[0.6rem]";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[5px] bg-foreground/8 font-mono font-semibold tracking-wider text-foreground/70 ring-1 ring-foreground/10 ring-inset",
        sizeClass
      )}
    >
      {initials}
    </span>
  );
}

function MarkCluster({
  marks,
  initials,
  size,
}: {
  marks?: TechMark[];
  initials?: string;
  size: BadgeSize;
}) {
  if (marks && marks.length > 0) {
    const iconSize = size === "md" ? "size-[1.125rem]" : "size-4";
    return (
      <span className="flex shrink-0 items-center gap-1.5">
        {marks.map((mark) => (
          <mark.Component
            key={mark.label}
            title={mark.label}
            className={cn(iconSize, "text-foreground/80 transition-colors duration-300")}
          />
        ))}
      </span>
    );
  }
  if (initials) {
    return <MonogramBadge initials={initials} size={size} />;
  }
  return null;
}

export function TechChip({ tech, variant = "compact", style, className }: TechChipProps) {
  const primaryBrand = tech.marks?.[0]?.brand ?? "var(--primary)";
  const chipStyle = {
    "--chip-accent": primaryBrand,
    ...style,
  } as CSSProperties;

  if (variant === "compact") {
    return (
      <span
        style={chipStyle}
        className={cn(
          "group/chip inline-flex h-9 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 text-sm font-medium text-foreground/85 transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-(--chip-accent) hover:bg-card hover:text-foreground hover:shadow-sm",
          className
        )}
      >
        <MarkCluster marks={tech.marks} initials={tech.initials} size="sm" />
        <span className="leading-none">{tech.name}</span>
      </span>
    );
  }

  const hasHref = Boolean(tech.href);
  const commonProps = {
    style: chipStyle,
    className: cn(
      "group/chip relative flex h-full flex-col gap-3 rounded-xl border border-border/50 bg-card/30 p-5 text-left transition-all duration-300",
      "hover:-translate-y-0.5 hover:border-(--chip-accent) hover:bg-card hover:shadow-md",
      className
    ),
  };

  const body = (
    <>
      <div className="flex items-center justify-between">
        <MarkCluster marks={tech.marks} initials={tech.initials} size="md" />
        {hasHref && (
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={1.5}
            className="size-3.5 text-muted-foreground/40 transition-all duration-300 group-hover/chip:translate-x-0.5 group-hover/chip:-translate-y-0.5 group-hover/chip:text-(--chip-accent)"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm leading-none font-medium text-foreground">{tech.name}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{tech.description}</p>
      </div>
    </>
  );

  if (hasHref) {
    return (
      <a href={tech.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {body}
      </a>
    );
  }
  return <div {...commonProps}>{body}</div>;
}
