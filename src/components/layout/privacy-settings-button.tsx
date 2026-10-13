"use client";

import { setConsent } from "@/lib/consent";

/** Brings the analytics prompt back, so an earlier answer can be changed. */
export function PrivacySettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => setConsent(null)} className={className}>
      Privacy settings
    </button>
  );
}
