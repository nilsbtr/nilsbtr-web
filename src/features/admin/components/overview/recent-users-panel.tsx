import { ADMIN_ROLE } from "@/lib/auth/permissions";
import { formatRelativeTime } from "@/lib/format";

import { DASHBOARD_ROUTES } from "../../lib/routes";
import type { UserSummary } from "../../types";
import { Panel } from "../shell/panel";
import { RoleBadge, UserStatusBadge } from "../status";
import { Timestamp } from "../timestamp";
import { UserIdentity } from "../user-identity";
import { PanelLink } from "./panel-link";

/** The users who joined last, newest first. */
export function RecentUsersPanel({ users }: { users: UserSummary[] }) {
  return (
    <Panel
      title="Newest users"
      description="The latest people to create an account."
      action={<PanelLink href={DASHBOARD_ROUTES.users}>All users</PanelLink>}
    >
      <ul className="divide-y divide-border/60 border-t border-border/60">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between gap-4 px-5 py-3">
            <UserIdentity
              user={user}
              linked
              badge={
                <>
                  {user.role === ADMIN_ROLE && <RoleBadge role={user.role} />}
                  {user.ban && <UserStatusBadge ban={user.ban} />}
                </>
              }
            />
            <Timestamp
              date={user.createdAt}
              className="shrink-0 text-xs whitespace-nowrap text-muted-foreground"
            >
              {formatRelativeTime(user.createdAt)}
            </Timestamp>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
