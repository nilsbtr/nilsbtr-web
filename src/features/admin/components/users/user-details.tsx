import Link from "next/link";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_ROLE } from "@/lib/auth/permissions";
import { getAvatarSeed } from "@/lib/avatar";
import { formatDate, formatRelativeTime } from "@/lib/format";

import { DASHBOARD_ROUTES } from "../../lib/routes";
import type { UserDetail } from "../../types";
import { DashboardPage, DashboardSection } from "../shell/dashboard-page";
import { Panel, PanelBody } from "../shell/panel";
import { RoleBadge, UserStatusBadge } from "../status";
import { Timestamp } from "../timestamp";
import { DeleteUserButton } from "./delete-user-button";
import { UserAccessControls } from "./user-access-controls";
import { UserPasswordForm } from "./user-password-form";
import { UserProfileForm } from "./user-profile-form";
import { UserSessionsPanel } from "./user-sessions-panel";

function UserHeader({ user, isSelf }: { user: UserDetail; isSelf: boolean }) {
  return (
    <DashboardSection as="header">
      <Link
        href={DASHBOARD_ROUTES.users}
        className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        All users
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-4">
        <UserAvatar seed={getAvatarSeed(user)} className="size-16" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h1 className="font-serif text-2xl text-foreground sm:text-3xl">{user.name}</h1>
            {isSelf && <Badge variant="secondary">You</Badge>}
            {user.role === ADMIN_ROLE && <RoleBadge role={user.role} />}
            {user.ban && <UserStatusBadge ban={user.ban} />}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {user.username && <>@{user.username} · </>}
            Joined <Timestamp date={user.createdAt}>{formatDate(user.createdAt)}</Timestamp>
            {user.lastActiveAt && (
              <>
                {" · "}
                Active{" "}
                <Timestamp date={user.lastActiveAt}>
                  {formatRelativeTime(user.lastActiveAt)}
                </Timestamp>
              </>
            )}
          </p>
        </div>
      </div>
    </DashboardSection>
  );
}

/**
 * Everything about one user: who they are, what they may do, where they are
 * signed in, and the controls for all of it.
 *
 * On their own page, an administrator finds their details and sessions, but
 * not the controls: their profile and password are edited on the profile page,
 * and nobody demotes, bans or deletes themselves.
 */
export function UserDetails({ user, isSelf }: { user: UserDetail; isSelf: boolean }) {
  return (
    <DashboardPage>
      <UserHeader user={user} isSelf={isSelf} />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-6">
          <DashboardSection>
            {isSelf ? (
              <Panel
                title="This is your account"
                description="Your own details and password are edited on your profile page."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href="/profile" />}
                  >
                    Open profile
                  </Button>
                }
              />
            ) : (
              <Panel
                title="Profile"
                description="Their username is their handle on the site, and their avatar is drawn from it."
              >
                <PanelBody>
                  <UserProfileForm user={user} />
                </PanelBody>
              </Panel>
            )}
          </DashboardSection>
          <DashboardSection>
            <UserSessionsPanel user={user} isSelf={isSelf} />
          </DashboardSection>
        </div>

        <div className="flex flex-col gap-6">
          <DashboardSection>
            <Panel
              title="Access"
              description={
                isSelf
                  ? "Your own role and sign-in can only be changed by another admin."
                  : "What they may do, and whether they can sign in at all."
              }
            >
              <UserAccessControls user={user} isSelf={isSelf} />
            </Panel>
          </DashboardSection>
          {!isSelf && (
            <>
              <DashboardSection>
                <Panel
                  title="Password"
                  description="Set a new password for them when they are locked out."
                >
                  <PanelBody>
                    <UserPasswordForm user={user} />
                  </PanelBody>
                </Panel>
              </DashboardSection>
              <DashboardSection>
                <Panel
                  title="Delete account"
                  description="Removes the account and everything that belongs to it. This can't be undone."
                  action={<DeleteUserButton user={user} />}
                />
              </DashboardSection>
            </>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}
