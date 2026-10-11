import type { ComponentProps, ReactNode } from "react";

import Link from "next/link";

import { UserAvatar } from "@/components/shared/user-avatar";
import { getAvatarSeed } from "@/lib/avatar";
import { cn } from "@/lib/utils";

import { getUserHref } from "../lib/routes";
import type { Person } from "../types";

/**
 * Who a user is, at a glance: their generated face, name and handle. With
 * `linked`, the name leads to the user's page.
 */
export function UserIdentity({
  user,
  linked = false,
  size = "default",
  badge,
  className,
  children,
}: {
  user: Person;
  linked?: boolean;
  size?: ComponentProps<typeof UserAvatar>["size"];
  /** A marker shown right after the name. */
  badge?: ReactNode;
  className?: string;
  /** Further lines below the handle. */
  children?: ReactNode;
}) {
  const nameClass = "truncate text-sm font-medium text-foreground";

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <UserAvatar size={size} seed={getAvatarSeed(user)} />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {linked ? (
            <Link
              href={getUserHref(user.id)}
              className={cn(nameClass, "rounded-sm underline-offset-4 hover:underline")}
            >
              {user.name}
            </Link>
          ) : (
            <span className={nameClass}>{user.name}</span>
          )}
          {badge}
        </div>
        {user.username && (
          <p className="truncate text-xs text-muted-foreground">@{user.username}</p>
        )}
        {children}
      </div>
    </div>
  );
}

/** A user on one line: a small face and their name, leading to their page. */
export function UserLink({ user, className }: { user: Person; className?: string }) {
  return (
    <Link
      href={getUserHref(user.id)}
      className={cn(
        "group/user flex w-fit max-w-full items-center gap-2 rounded-sm text-sm text-foreground",
        className
      )}
    >
      <UserAvatar size="sm" seed={getAvatarSeed(user)} />
      <span className="truncate underline-offset-4 group-hover/user:underline">{user.name}</span>
    </Link>
  );
}
