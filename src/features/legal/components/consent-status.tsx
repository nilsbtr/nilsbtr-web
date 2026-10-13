"use client";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type ConsentChoice, setConsent, useConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

import type { LegalLanguage } from "../types";

const LABELS = {
  de: {
    heading: "Ihre Entscheidung",
    status: { granted: "Eingewilligt", denied: "Abgelehnt", none: "Noch nicht entschieden" },
    grant: "Einwilligen",
    withdraw: "Einwilligung widerrufen",
    deny: "Ablehnen",
  },
  en: {
    heading: "Your choice",
    status: { granted: "Allowed", denied: "Declined", none: "Not decided yet" },
    grant: "Allow",
    withdraw: "Withdraw consent",
    deny: "Decline",
  },
} as const;

function statusKey(choice: ConsentChoice | null) {
  return choice ?? "none";
}

/**
 * The visitor's current analytics choice, with the controls to change it right
 * where the processing is explained. Withdrawing takes one click, just as
 * agreeing did.
 */
export function ConsentStatus({ lang }: { lang: LegalLanguage }) {
  const consent = useConsent();
  const labels = LABELS[lang];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-2xs font-medium tracking-caps text-muted-foreground uppercase">
          {labels.heading}
        </span>
        {consent === undefined ? (
          <Skeleton className="h-5 w-32" />
        ) : (
          <span
            role="status"
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                consent === "granted" && "bg-brand",
                consent === "denied" && "bg-muted-foreground",
                consent === null && "border border-muted-foreground"
              )}
            />
            {labels.status[statusKey(consent)]}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {consent === "granted" ? (
          <Button variant="outline" onClick={() => setConsent("denied")}>
            {labels.withdraw}
          </Button>
        ) : (
          <>
            {consent === null && (
              <Button variant="outline" onClick={() => setConsent("denied")}>
                {labels.deny}
              </Button>
            )}
            <Button
              variant="outline"
              disabled={consent === undefined}
              onClick={() => setConsent("granted")}
            >
              <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} data-icon="inline-start" />
              {labels.grant}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
