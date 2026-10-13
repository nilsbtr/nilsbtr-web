"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { hasAnalyticsConsent, useConsent } from "@/lib/consent";

/** Drops an event when consent was withdrawn after the scripts had loaded. */
function onlyWithConsent<T>(event: T): T | null {
  return hasAnalyticsConsent() ? event : null;
}

/**
 * Vercel Web Analytics and Speed Insights, loaded only once the visitor has
 * agreed to them. Until then neither script is on the page.
 */
export function ConsentedAnalytics() {
  const consent = useConsent();

  if (consent !== "granted") return null;

  return (
    <>
      <Analytics beforeSend={onlyWithConsent} />
      <SpeedInsights beforeSend={onlyWithConsent} />
    </>
  );
}
