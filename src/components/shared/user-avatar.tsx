"use client";

import { type ComponentProps, useMemo } from "react";

import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createAvatarUri } from "@/lib/avatar";
import { cn } from "@/lib/utils";

/**
 * The face generated for a seed, usually a username. Without a seed it shows a
 * neutral placeholder. Decorative: the name beside it carries the meaning.
 *
 * The face is painted as a background rather than loaded as an image, so it
 * changes in the same frame as the seed, with no loading state in between.
 */
export function UserAvatar({
  seed,
  className,
  style,
  ...props
}: ComponentProps<typeof Avatar> & { seed?: string }) {
  const uri = useMemo(() => (seed ? createAvatarUri(seed) : null), [seed]);

  if (!uri) {
    return (
      <Avatar aria-hidden="true" className={className} style={style} {...props}>
        <AvatarFallback>
          <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} className="size-1/2" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar
      aria-hidden="true"
      className={cn("bg-cover", className)}
      style={{ ...style, backgroundImage: `url("${uri}")` }}
      {...props}
    />
  );
}
