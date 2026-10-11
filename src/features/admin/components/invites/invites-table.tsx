import Link from "next/link";

import { Link01Icon, MailAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { UserAvatar } from "@/components/shared/user-avatar";
import { TableBody, TableHeader } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getAvatarSeed } from "@/lib/avatar";
import { formatDate, formatRelativeTime } from "@/lib/format";

import { describeInviteUses, getTokenPreview } from "../../lib/labels";
import type { InviteListQuery } from "../../lib/list-query";
import { getUserHref } from "../../lib/routes";
import type { InviteSummary, Person } from "../../types";
import { EmptyState } from "../empty-state";
import {
  DataTable,
  DataTableCell,
  DataTableFrame,
  DataTableHead,
  DataTableHeaderRow,
  DataTableRow,
} from "../list/data-table";
import { ListPagination } from "../list/list-pagination";
import { InviteStateBadge } from "../status";
import { Timestamp } from "../timestamp";
import { UserLink } from "../user-identity";
import { CopyInviteLinkButton } from "./copy-invite-link-button";
import { CreateInviteButton } from "./create-invite-dialog";
import { RevokeInviteButton } from "./revoke-invite-button";

/** How many of the people who used an invite are shown as faces; the rest are counted. */
const MAX_FACES = 3;

/** The faces of the people who signed up with an invite, each leading to their page. */
function Redeemers({ people }: { people: Person[] }) {
  if (people.length === 0) return null;

  const hiddenCount = people.length - MAX_FACES;

  return (
    <ul aria-label="Used by" className="flex items-center -space-x-1.5">
      {people.slice(0, MAX_FACES).map((person) => (
        <li key={person.id}>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link
                  href={getUserHref(person.id)}
                  aria-label={person.name}
                  className="block rounded-full ring-2 ring-background"
                />
              }
            >
              <UserAvatar size="sm" seed={getAvatarSeed(person)} />
            </TooltipTrigger>
            <TooltipContent>{person.name}</TooltipContent>
          </Tooltip>
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="pl-3 text-xs text-muted-foreground">+{hiddenCount} more</li>
      )}
    </ul>
  );
}

/** When an invite stops working, or stopped. Invites that are over for another reason have no such moment. */
function InviteExpiry({ invite }: { invite: InviteSummary }) {
  if (invite.state !== "active" && invite.state !== "expired") return "—";

  return <Timestamp date={invite.expiresAt}>{formatRelativeTime(invite.expiresAt)}</Timestamp>;
}

function InviteRow({ invite }: { invite: InviteSummary }) {
  const isActive = invite.state === "active";

  return (
    <DataTableRow>
      <DataTableCell>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground"
          >
            <HugeiconsIcon icon={Link01Icon} strokeWidth={1.5} className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs text-foreground">
              {invite.token ? getTokenPreview(invite.token) : "—"}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground sm:hidden">
              <InviteStateBadge state={invite.state} />
              <span>{describeInviteUses(invite)} used</span>
            </div>
          </div>
        </div>
      </DataTableCell>
      <DataTableCell className="hidden sm:table-cell">
        <InviteStateBadge state={invite.state} />
      </DataTableCell>
      <DataTableCell className="hidden sm:table-cell">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{describeInviteUses(invite)}</span>
          <Redeemers people={invite.usedBy} />
        </div>
      </DataTableCell>
      <DataTableCell className="hidden text-muted-foreground md:table-cell">
        <InviteExpiry invite={invite} />
      </DataTableCell>
      <DataTableCell className="hidden max-w-48 lg:table-cell">
        {invite.createdBy ? (
          <UserLink user={invite.createdBy} />
        ) : (
          <span className="text-muted-foreground/70">Deleted user</span>
        )}
      </DataTableCell>
      <DataTableCell className="hidden text-muted-foreground lg:table-cell">
        {invite.createdAt ? (
          <Timestamp date={invite.createdAt}>{formatDate(invite.createdAt)}</Timestamp>
        ) : (
          "—"
        )}
      </DataTableCell>
      <DataTableCell className="w-0">
        <div className="flex items-center justify-end gap-0.5">
          {isActive && invite.token && (
            <CopyInviteLinkButton
              token={invite.token}
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            />
          )}
          <RevokeInviteButton inviteId={invite.id} isActive={isActive} />
        </div>
      </DataTableCell>
    </DataTableRow>
  );
}

const EMPTY_STATES: Record<InviteListQuery["state"], { title: string; description: string }> = {
  all: {
    title: "No invites yet",
    description:
      "Sign-up is invite-only. Create an invite and send its link to someone you want on the site.",
  },
  active: {
    title: "No active invites",
    description: "Nobody can sign up right now. Create an invite to let someone in.",
  },
  expired: {
    title: "No expired invites",
    description: "Invites that run out of time before they are used up are listed here.",
  },
};

/** One page of invites, with the list's footer. Must be rendered inside a ListQueryProvider. */
export function InvitesTable({
  invites,
  total,
  state,
}: {
  invites: InviteSummary[];
  /** How many invites match the query, on all pages. */
  total: number;
  /** The filter in effect, which decides what an empty list says. */
  state: InviteListQuery["state"];
}) {
  if (invites.length === 0) {
    return (
      <DataTableFrame>
        <EmptyState icon={MailAdd01Icon} {...EMPTY_STATES[state]}>
          {state !== "expired" && <CreateInviteButton variant="outline" />}
        </EmptyState>
      </DataTableFrame>
    );
  }

  return (
    <DataTableFrame>
      <DataTable label="Invites">
        <TableHeader>
          <DataTableHeaderRow>
            <DataTableHead>Invite</DataTableHead>
            <DataTableHead className="hidden sm:table-cell">Status</DataTableHead>
            <DataTableHead className="hidden sm:table-cell">Used</DataTableHead>
            <DataTableHead className="hidden md:table-cell">Expires</DataTableHead>
            <DataTableHead className="hidden lg:table-cell">Created by</DataTableHead>
            <DataTableHead className="hidden lg:table-cell">Created</DataTableHead>
            <DataTableHead className="w-0">
              <span className="sr-only">Actions</span>
            </DataTableHead>
          </DataTableHeaderRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <InviteRow key={invite.id} invite={invite} />
          ))}
        </TableBody>
      </DataTable>
      <ListPagination total={total} noun="invite" />
    </DataTableFrame>
  );
}
