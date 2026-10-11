import type { ReactNode } from "react";

import { ShieldUserIcon, UserBlock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ADMIN_ROLE, type Role } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";

import { INVITE_STATE_LABELS, ROLE_LABELS, describeBanTerm } from "../lib/labels";
import type { Ban, InviteState } from "../types";

/*
 * States are never told by color alone: each one is spelled out, and the color
 * of its dot or badge only backs the word up.
 */

const DOT_TONES = {
  /** In effect, working as intended. */
  positive: "bg-brand",
  /** Over, or not in effect. */
  neutral: "bg-muted-foreground/50",
};

function StateLabel({
  tone,
  className,
  children,
}: {
  tone: keyof typeof DOT_TONES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm whitespace-nowrap", className)}>
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", DOT_TONES[tone])} />
      {children}
    </span>
  );
}

/** A user's role. Admins stand out; the plain user role, which most accounts have, stays quiet. */
export function RoleBadge({ role }: { role: Role }) {
  if (role !== ADMIN_ROLE) {
    return <span className="text-sm text-muted-foreground">{ROLE_LABELS[role]}</span>;
  }

  return (
    <Badge variant="outline" className="border-brand/40 bg-brand/10">
      <HugeiconsIcon icon={ShieldUserIcon} strokeWidth={2} className="text-brand" />
      {ROLE_LABELS[role]}
    </Badge>
  );
}

/** Whether a user can sign in. A ban says for how long and why when hovered or focused. */
export function UserStatusBadge({ ban }: { ban: Ban | null }) {
  if (!ban) {
    return (
      <StateLabel tone="positive" className="text-muted-foreground">
        Active
      </StateLabel>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<Badge variant="destructive" tabIndex={0} />}>
        <HugeiconsIcon icon={UserBlock01Icon} strokeWidth={2} />
        Banned
      </TooltipTrigger>
      <TooltipContent className="flex-col items-start gap-0.5">
        <span className="font-medium">Banned {describeBanTerm(ban)}</span>
        {ban.reason && <span className="text-background/70">{ban.reason}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

export function InviteStateBadge({ state }: { state: InviteState }) {
  const isActive = state === "active";

  return (
    <StateLabel
      tone={isActive ? "positive" : "neutral"}
      className={cn(!isActive && "text-muted-foreground")}
    >
      {INVITE_STATE_LABELS[state]}
    </StateLabel>
  );
}
