import { CreateInviteButton } from "@/features/admin/components/invites/create-invite-dialog";
import { OpenInvitesPanel } from "@/features/admin/components/overview/open-invites-panel";
import { RecentUsersPanel } from "@/features/admin/components/overview/recent-users-panel";
import { StatTiles } from "@/features/admin/components/overview/stat-tiles";
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardSection,
} from "@/features/admin/components/shell/dashboard-page";
import { listOpenInvites } from "@/features/admin/server/invites";
import { getDashboardStats } from "@/features/admin/server/stats";
import { listRecentUsers } from "@/features/admin/server/users";

/** How many rows each of the overview's excerpts shows. */
const EXCERPT_LENGTH = 5;

export default async function DashboardOverviewPage() {
  const [stats, recentUsers, openInvites] = await Promise.all([
    getDashboardStats(),
    listRecentUsers(EXCERPT_LENGTH),
    listOpenInvites(EXCERPT_LENGTH),
  ]);

  return (
    <DashboardPage>
      <DashboardPageHeader
        title="Overview"
        description="Who has an account, who is signed in, and who can still sign up."
      >
        <CreateInviteButton />
      </DashboardPageHeader>
      <DashboardSection>
        <StatTiles stats={stats} />
      </DashboardSection>
      <DashboardSection className="grid items-start gap-6 lg:grid-cols-2">
        <RecentUsersPanel users={recentUsers} />
        <OpenInvitesPanel invites={openInvites} />
      </DashboardSection>
    </DashboardPage>
  );
}
