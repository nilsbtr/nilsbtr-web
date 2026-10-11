import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CreateInviteButton } from "@/features/admin/components/invites/create-invite-dialog";
import { InvitesTable } from "@/features/admin/components/invites/invites-table";
import { InvitesToolbar } from "@/features/admin/components/invites/invites-toolbar";
import { ListQueryProvider, ListResults } from "@/features/admin/components/list/list-query";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardSection,
} from "@/features/admin/components/shell/dashboard-page";
import {
  INVITE_LIST_DEFAULTS,
  type RawSearchParams,
  getListHref,
  getPageCount,
  parseInviteListQuery,
} from "@/features/admin/lib/list-query";
import { DASHBOARD_ROUTES } from "@/features/admin/lib/routes";
import { countExpiredInvites, listInvites } from "@/features/admin/server/invites";

export const metadata: Metadata = {
  title: "Invites",
};

export default async function InvitesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const query = parseInviteListQuery(await searchParams);
  const [{ invites, total }, expiredCount] = await Promise.all([
    listInvites(query),
    countExpiredInvites(),
  ]);

  // A page past the end, e.g. after the last invite on it was revoked, becomes the last one there is.
  const pageCount = getPageCount(total);
  if (query.page > pageCount) {
    redirect(
      getListHref(DASHBOARD_ROUTES.invites, { ...query, page: pageCount }, INVITE_LIST_DEFAULTS)
    );
  }

  return (
    <DashboardPage>
      <DashboardPageHeader
        title="Invites"
        description="Sign-up is invite-only. Each invite is a link that lets its holder create an account until it is used up or expires."
      >
        <CreateInviteButton />
      </DashboardPageHeader>
      <DashboardSection className="flex flex-col gap-3">
        <ListQueryProvider query={query} defaults={INVITE_LIST_DEFAULTS}>
          <InvitesToolbar expiredCount={expiredCount} />
          <ListResults>
            <InvitesTable invites={invites} total={total} state={query.state} />
          </ListResults>
        </ListQueryProvider>
      </DashboardSection>
    </DashboardPage>
  );
}
