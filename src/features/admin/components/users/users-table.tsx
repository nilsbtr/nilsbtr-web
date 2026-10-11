import { UserSearch01Icon } from "@hugeicons/core-free-icons";

import { Badge } from "@/components/ui/badge";
import { TableBody, TableHeader } from "@/components/ui/table";
import { ADMIN_ROLE } from "@/lib/auth/permissions";
import { formatDate, formatRelativeTime } from "@/lib/format";

import type { UserSummary } from "../../types";
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
import { SortableHead } from "../list/sortable-head";
import { RoleBadge, UserStatusBadge } from "../status";
import { Timestamp } from "../timestamp";
import { UserIdentity } from "../user-identity";
import { UserActionsMenu } from "./user-actions-menu";
import { ClearUserFiltersButton } from "./users-toolbar";

/*
 * Columns give way as the screen narrows: first the email and join date, then
 * the last activity, and on phones role and status too. What is out of the
 * ordinary about a user (being an admin, being banned) then moves below their name.
 */

function UserRow({ user, isSelf }: { user: UserSummary; isSelf: boolean }) {
  const isAdmin = user.role === ADMIN_ROLE;

  return (
    <DataTableRow>
      <DataTableCell>
        <UserIdentity
          user={user}
          linked
          badge={isSelf && <Badge variant="secondary">You</Badge>}
          className="max-w-64"
        >
          {(isAdmin || user.ban) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:hidden">
              {isAdmin && <RoleBadge role={user.role} />}
              {user.ban && <UserStatusBadge ban={user.ban} />}
            </div>
          )}
        </UserIdentity>
      </DataTableCell>
      <DataTableCell className="hidden max-w-60 truncate text-muted-foreground lg:table-cell">
        {user.email}
      </DataTableCell>
      <DataTableCell className="hidden sm:table-cell">
        <RoleBadge role={user.role} />
      </DataTableCell>
      <DataTableCell className="hidden sm:table-cell">
        <UserStatusBadge ban={user.ban} />
      </DataTableCell>
      <DataTableCell className="hidden text-muted-foreground md:table-cell">
        {user.lastActiveAt ? (
          <Timestamp date={user.lastActiveAt}>{formatRelativeTime(user.lastActiveAt)}</Timestamp>
        ) : (
          <span className="text-muted-foreground/70">No session</span>
        )}
      </DataTableCell>
      <DataTableCell className="hidden text-muted-foreground lg:table-cell">
        <Timestamp date={user.createdAt}>{formatDate(user.createdAt)}</Timestamp>
      </DataTableCell>
      <DataTableCell className="w-0 text-right">
        <UserActionsMenu user={user} isSelf={isSelf} />
      </DataTableCell>
    </DataTableRow>
  );
}

/** One page of users, with the list's footer. Must be rendered inside a ListQueryProvider. */
export function UsersTable({
  users,
  total,
  currentUserId,
}: {
  users: UserSummary[];
  /** How many users match the query, on all pages. */
  total: number;
  currentUserId: string;
}) {
  if (users.length === 0) {
    return (
      <DataTableFrame>
        <EmptyState
          icon={UserSearch01Icon}
          title="No users match"
          description="Nobody fits this search and these filters. Try other words, or clear them to see everyone."
        >
          <ClearUserFiltersButton variant="outline" />
        </EmptyState>
      </DataTableFrame>
    );
  }

  return (
    <DataTableFrame>
      <DataTable label="Users">
        <TableHeader>
          <DataTableHeaderRow>
            <SortableHead sortKey="name">User</SortableHead>
            <SortableHead sortKey="email" className="hidden lg:table-cell">
              Email
            </SortableHead>
            <DataTableHead className="hidden sm:table-cell">Role</DataTableHead>
            <DataTableHead className="hidden sm:table-cell">Status</DataTableHead>
            <SortableHead
              sortKey="lastActive"
              defaultDirection="desc"
              className="hidden md:table-cell"
            >
              Last active
            </SortableHead>
            <SortableHead sortKey="joined" defaultDirection="desc" className="hidden lg:table-cell">
              Joined
            </SortableHead>
            <DataTableHead className="w-0">
              <span className="sr-only">Actions</span>
            </DataTableHead>
          </DataTableHeaderRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} isSelf={user.id === currentUserId} />
          ))}
        </TableBody>
      </DataTable>
      <ListPagination total={total} noun="user" />
    </DataTableFrame>
  );
}
