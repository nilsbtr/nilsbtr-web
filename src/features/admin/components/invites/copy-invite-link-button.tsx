"use client";

import type { ComponentProps } from "react";

import { getInviteUrl } from "../../lib/labels";
import { CopyButton } from "../copy-button";

/** Copies the link that redeems an invite. */
export function CopyInviteLinkButton({
  token,
  ...props
}: Omit<ComponentProps<typeof CopyButton>, "value" | "label"> & { token: string }) {
  // Built on press: the link's origin is the one the dashboard is open on.
  return <CopyButton value={() => getInviteUrl(token)} label="Copy invite link" {...props} />;
}
