import Link from "next/link";

import { surfaceVariants } from "@/components/shared/surface";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

import { INVITE_LIST_DEFAULTS, USER_LIST_DEFAULTS, getListHref } from "../../lib/list-query";
import { DASHBOARD_ROUTES } from "../../lib/routes";
import type { DashboardStats } from "../../types";

/**
 * One headline number: what it counts, the count, and a line that puts it in
 * context. The tile leads to the list behind the number.
 */
function StatTile({
  label,
  value,
  detail,
  href,
}: {
  label: string;
  value: number;
  detail: string;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          surfaceVariants(),
          "flex h-full flex-col p-5 transition-colors hover:border-(--surface-accent) hover:bg-card"
        )}
      >
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="mt-2 text-3xl leading-none font-semibold text-foreground">
          {formatCount(value)}
        </span>
        <span className="mt-2.5 text-xs text-muted-foreground">{detail}</span>
      </Link>
    </li>
  );
}

/** The dashboard's headline numbers. */
export function StatTiles({ stats }: { stats: DashboardStats }) {
  const usersHref = (query: Partial<typeof USER_LIST_DEFAULTS>) =>
    getListHref(DASHBOARD_ROUTES.users, { ...USER_LIST_DEFAULTS, ...query }, USER_LIST_DEFAULTS);

  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatTile
        label="Users"
        value={stats.users}
        detail={
          stats.newUsers > 0
            ? `+${formatCount(stats.newUsers)} in the last 30 days`
            : "None new in the last 30 days"
        }
        href={usersHref({})}
      />
      <StatTile
        label="Signed in"
        value={stats.signedIn}
        detail="With a session that is still valid"
        href={usersHref({ sort: "lastActive" })}
      />
      <StatTile
        label="Open invites"
        value={stats.openInvites}
        detail={
          stats.expiredInvites > 0
            ? `${formatCount(stats.expiredInvites)} more expired`
            : "None expired"
        }
        href={getListHref(
          DASHBOARD_ROUTES.invites,
          { ...INVITE_LIST_DEFAULTS, state: "active" },
          INVITE_LIST_DEFAULTS
        )}
      />
      <StatTile
        label="Banned"
        value={stats.banned}
        detail={stats.banned > 0 ? "Can't sign in for now" : "Nobody is locked out"}
        href={usersHref({ status: "banned" })}
      />
    </ul>
  );
}
