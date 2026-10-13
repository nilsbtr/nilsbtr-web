"use client";

import { useId } from "react";

import { Analytics01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, m } from "motion/react";

import { DURATION, EASE } from "@/components/motion";
import { TextLink } from "@/components/shared/text-link";
import { Button } from "@/components/ui/button";
import { setConsent, useConsent } from "@/lib/consent";

/** Waits for the page's opening sequence before asking. */
const ENTER_DELAY = 1.2;

/**
 * Asks once whether analytics may run. It does not block the page: until the
 * visitor answers, nothing is measured. Both answers are offered as equal
 * buttons, so declining is as easy as agreeing.
 */
export function ConsentBanner() {
  const consent = useConsent();
  const titleId = useId();
  const descriptionId = useId();

  return (
    <AnimatePresence>
      {consent === null && (
        <m.section
          key="consent"
          role="region"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: DURATION.enter, ease: EASE.out, delay: ENTER_DELAY },
          }}
          exit={{ opacity: 0, y: 8, transition: { duration: DURATION.fast, ease: EASE.out } }}
          className="fixed inset-x-4 bottom-4 z-50 rounded-xl border border-border/60 bg-popover/95 p-5 text-popover-foreground shadow-lg backdrop-blur-xl sm:right-auto sm:left-6 sm:max-w-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-full bg-brand/10 text-brand">
              <HugeiconsIcon icon={Analytics01Icon} strokeWidth={1.75} className="size-4" />
            </span>
            <h2 id={titleId} className="font-serif text-base">
              Mind if I count your visit?
            </h2>
          </div>
          <p id={descriptionId} className="mt-3 text-sm leading-relaxed text-muted-foreground">
            With your consent, Vercel Web Analytics and Speed Insights record which pages are
            visited and how fast they load. No cookies, no ads, no profile of you. You can change
            your mind at any time in the footer. Details are in the{" "}
            <TextLink href="/privacy#analytics">privacy policy</TextLink>.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setConsent("denied")}>
              Decline
            </Button>
            <Button variant="outline" onClick={() => setConsent("granted")}>
              Allow
            </Button>
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}
