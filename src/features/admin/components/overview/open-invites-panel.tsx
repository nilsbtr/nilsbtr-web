import { formatRelativeTime } from "@/lib/format";

import { describeInviteUses, getTokenPreview } from "../../lib/labels";
import { INVITE_LIST_DEFAULTS, getListHref } from "../../lib/list-query";
import { DASHBOARD_ROUTES } from "../../lib/routes";
import type { InviteSummary } from "../../types";
import { CopyInviteLinkButton } from "../invites/copy-invite-link-button";
import { CreateInviteButton } from "../invites/create-invite-dialog";
import { Panel, PanelBody } from "../shell/panel";
import { Timestamp } from "../timestamp";
import { PanelLink } from "./panel-link";

const OPEN_INVITES_HREF = getListHref(
  DASHBOARD_ROUTES.invites,
  { ...INVITE_LIST_DEFAULTS, state: "active" },
  INVITE_LIST_DEFAULTS
);

/** The invites that can still be redeemed, the ones that run out soonest first. */
export function OpenInvitesPanel({ invites }: { invites: InviteSummary[] }) {
  return (
    <Panel
      title="Open invites"
      description="Links that still let someone sign up, soonest to expire first."
      action={<PanelLink href={OPEN_INVITES_HREF}>All invites</PanelLink>}
    >
      {invites.length > 0 ? (
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {invites.map((invite) => (
            <li key={invite.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div className="min-w-0">
                <p className="font-mono text-xs text-foreground">
                  {invite.token ? getTokenPreview(invite.token) : "—"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {describeInviteUses(invite)} used · expires{" "}
                  <Timestamp date={invite.expiresAt}>
                    {formatRelativeTime(invite.expiresAt)}
                  </Timestamp>
                </p>
              </div>
              {invite.token && (
                <CopyInviteLinkButton
                  token={invite.token}
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <PanelBody className="flex flex-col items-start gap-4">
          <p className="text-sm text-muted-foreground">
            There is no open invite, so nobody can sign up right now.
          </p>
          <CreateInviteButton variant="outline" size="sm" />
        </PanelBody>
      )}
    </Panel>
  );
}
