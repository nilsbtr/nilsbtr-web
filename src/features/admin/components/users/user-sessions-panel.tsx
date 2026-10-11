import { LaptopIcon, SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { formatDate, formatRelativeTime } from "@/lib/format";

import type { UserDetail, UserSession } from "../../types";
import { Panel, PanelBody } from "../shell/panel";
import { Timestamp } from "../timestamp";
import { RevokeSessionButton, SignOutEverywhereButton } from "./session-controls";

function SessionItem({ userId, session }: { userId: string; session: UserSession }) {
  return (
    <li className="flex items-center gap-3 px-5 py-3.5">
      <div
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground"
      >
        <HugeiconsIcon
          icon={session.isMobile ? SmartPhone01Icon : LaptopIcon}
          strokeWidth={1.5}
          className="size-4.5"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
          {session.device}
          {session.isCurrent && <Badge variant="secondary">This device</Badge>}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {session.ipAddress && <>{session.ipAddress} · </>}
          Signed in <Timestamp date={session.createdAt}>{formatDate(session.createdAt)}</Timestamp>
          {" · "}
          Active{" "}
          <Timestamp date={session.lastActiveAt}>
            {formatRelativeTime(session.lastActiveAt)}
          </Timestamp>
        </p>
      </div>
      {!session.isCurrent && <RevokeSessionButton userId={userId} session={session} />}
    </li>
  );
}

/** Where a user is signed in, with the means to sign them out again. */
export function UserSessionsPanel({ user, isSelf }: { user: UserDetail; isSelf: boolean }) {
  // The administrator's own session is what they are here with; it is not up for ending.
  const revocable = user.sessions.filter((session) => !session.isCurrent);

  return (
    <Panel
      title="Sessions"
      description="Every browser and device this account is signed in on."
      action={
        <SignOutEverywhereButton user={user} isSelf={isSelf} disabled={revocable.length === 0} />
      }
    >
      {user.sessions.length > 0 ? (
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {user.sessions.map((session) => (
            <SessionItem key={session.id} userId={user.id} session={session} />
          ))}
        </ul>
      ) : (
        <PanelBody>
          <p className="text-sm text-muted-foreground">Not signed in anywhere right now.</p>
        </PanelBody>
      )}
    </Panel>
  );
}
