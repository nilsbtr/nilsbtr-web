import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CreateInviteButton } from "@/features/admin/components/invites/create-invite-dialog";
import { ListQueryProvider, ListResults } from "@/features/admin/components/list/list-query";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardSection,
} from "@/features/admin/components/shell/dashboard-page";
import { UsersTable } from "@/features/admin/components/users/users-table";
import { UsersToolbar } from "@/features/admin/components/users/users-toolbar";
import {
  type RawSearchParams,
  USER_LIST_DEFAULTS,
  getListHref,
  getPageCount,
  parseUserListQuery,
} from "@/features/admin/lib/list-query";
import { DASHBOARD_ROUTES } from "@/features/admin/lib/routes";
import { requireAdmin } from "@/features/admin/server/session";
import { listUsers } from "@/features/admin/server/users";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const [admin, query] = await Promise.all([requireAdmin(), searchParams.then(parseUserListQuery)]);
  const { users, total } = await listUsers(query);

  // A page past the end, e.g. after the last user on it was deleted, becomes the last one there is.
  const pageCount = getPageCount(total);
  if (query.page > pageCount) {
    redirect(
      getListHref(DASHBOARD_ROUTES.users, { ...query, page: pageCount }, USER_LIST_DEFAULTS)
    );
  }

  return (
    <DashboardPage>
      <DashboardPageHeader
        title="Users"
        description="Everyone with an account. Open a user to edit their details, or use the menu at the end of their row."
      >
        <CreateInviteButton />
      </DashboardPageHeader>
      <DashboardSection className="flex flex-col gap-3">
        <ListQueryProvider query={query} defaults={USER_LIST_DEFAULTS}>
          <UsersToolbar />
          <ListResults>
            <UsersTable users={users} total={total} currentUserId={admin.user.id} />
          </ListResults>
        </ListQueryProvider>
      </DashboardSection>
    </DashboardPage>
  );
}
